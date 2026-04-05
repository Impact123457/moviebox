import { default as NextAuth } from 'next-auth';
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client";
import { USER_BY_GITHUB_ID_QUERY, USER_BY_EMAIL_QUERY, USER_BY_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  //zaupaj hostu da ne meče errorja o nezaupanju
  trustHost: true,
  //providers so vsi nacini s katerimi se uporabnik lahko prijavi
  //lahko z credentials ali z github
  providers: [
    //pridobi credentials in login strani, nato preveri ce obstajajo
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) return null;

  //zapise iz credentials v spremenljivke podatke
  const email = String(credentials.email);
  const password = String(credentials.password);

  //preveri ali uporabnik obstaja in ga pridobi, s tem preveri ce je gmail pravilno vpisan.
  const user = await client.fetch(
  USER_BY_EMAIL_QUERY, { email });

  if (!user) return null;
  if (!user.password) return null;

  //preveri ce je geslo pravilno
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) return null;

  //ce je vse praavilno, returna pdatke ki se zapisejo v session
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    emailVerified: null,
    image: user.image,
  };
}
    }),
    GitHub],
  callbacks: {
    //callbacks se izvedejo po vsaki prijavi. tu se shranijo vsi podatki v session in v bazo, ce je prijava nova in z githubom.
    async signIn({ user, profile, account }) {
      //ce je prijavljen z githubom, se preveri ali ta ze obstaja, ce ne, se doda uporabik v bazo.
      if(account?.provider == "github"){
        const existingUser = await client.fetch(USER_BY_GITHUB_ID_QUERY, { 
          id: profile?.id,
       });
      if(!existingUser){
        await writeClient.create({
          _type: 'user',
          id: profile?.id,
          name: user?.name,
          email: user?.email,
          imageUrl: user?.image,
        })
      }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
    //v jwt se vsi podatki shranijo v token, ki dovoljuje to prijavo in session. 
    //shrani se tudi, kateri provider je bil izbran, kajti s tem si pomagamo v drugih delih kode
    // credentials login
    if (user && account?.provider === "credentials") {
      token.id = user.id;
      //console.log(user.id)
      token.provider = "credentials";
    }

    // github login
    if (account?.provider === "github" && profile) {
      const dbUser = await client.fetch(
        USER_BY_GITHUB_ID_QUERY,
        { id: profile.id }
      );

      token.id = dbUser?._id;
      token.provider = "github";
      token.imageUrl = dbUser?.imageUrl;
    }

    return token;
  },

    async session({ session, token }){
      //vsi podatki v tokenu se shranijo v session. specificno v sessin.user
      Object.assign(session.user, {id: token.id, imageUrl: token.imageUrl, provider: token.provider});
      return session;
    },
  }
})
