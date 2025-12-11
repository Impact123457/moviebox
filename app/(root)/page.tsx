import Image from "next/image";
import {auth} from "@/auth";
export default async function Home() {
  return (
  <>
  <div className="flex md:flex-row">
    <div className="divH1">
      <h1 className="heading">Welcome to MovieBox</h1>
        <p className="opis">
          <b>movieBox</b> is the ultimate app for movie lovers.
          <br></br>
          Keep track of everything you watch, create custom playlists, save your favorites, and organize your “must-watch” list for the next movie night.
          Whether you are a casual viewer or a dedicated cinephile, MovieBox helps you never lose track of a single title. Discover new films, revisit old classics, and share your cinematic journey with friends.
          <br></br>
          Designed for true movie enthusiasts, MovieBox turns your movie-watching experience into a fully organized, enjoyable journey. 
          <br></br><br></br>
          <b>- Happy scrolling and may the force be with you!</b>
        </p>
    </div>
    <div className="divImg">
      <Image src="/r2d2&c3po.png" alt="droids" width={400} height={400}/>
    </div>  

  </div>
  <section className="bg-black text-primary py-5">
      <h2 className="h2">WE OFFER YOU</h2>
      <div className="karticeDIV">
        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">Liking movies</h3>
            <p className="text">
              Mark movies you love or want to remember. 
              Helps you track favorites and get tailored recommendations.
            </p>
          </div>
        </div>

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">Browsing movies</h3>
            <p className="text">
              Discover new films or revisit classics by 
              searching through genres, years, popularity, or curated lists.
            </p>
          </div>
        </div>

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">Log watched movies</h3>
            <p className="text">
              Keep a personal record of all movies you have seen, including ratings, dates, and notes. 
              Perfect for reflecting on your viewing history.
            </p>
          </div>
        </div>

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">Create lists</h3>
            <p className="text">
              Organize movies into themed or personal collections, like 
              “Absolute cinema” or “Cozy night” for easy access.
            </p>
          </div>
        </div>
      </div>
  </section>
  </>
  );
}
