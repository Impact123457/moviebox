import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
export default function Layout({children}: Readonly<{ children: React.ReactNode}>){
    return(
        <main>
            <SessionProvider>
            <Navbar/>
            {children}
            <Footer />
            </SessionProvider>
        </main>
    );
}

