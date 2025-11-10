import Navbar from "../components/Navbar";
export default function({children}: Readonly<{ children: React.ReactNode}>){
    return(
        <main>
            <Navbar/>
            {children}
        </main>
    );
}