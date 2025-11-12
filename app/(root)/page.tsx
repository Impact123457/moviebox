import Image from "next/image";
export default function Home() {
  return (
  <>
  <div className="flex">
    
    <div className="divH1">
      <h1 className="heading">Welcome to MovieBox</h1>
        <p className="opis">
          MovieBox is your personal movie tracker.Where movies live beyond the credits. 
          Track what you watch, make playlists, save what you like and kepp track of what you wish to watch next.
          Made for the true movie lovers! We wish you happy scrolling and may the force be with you.
        </p>
    </div>

    <div className="divImg">
        <Image src="/r2d2&c3po.png" alt="droids" width={600} height={600}/>
    </div>  

  </div>
  <section className="bg-black text-primary py-10">

      <h2 className="h2">WE OFFER YOU</h2>

      <div className="karticeDIV">

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">❤️Liking movies</h3>
            <p className="text">
              Mark movies you love or want to remember. 
              Helps you track favorites and get tailored recommendations.
            </p>
          </div>
        </div>

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">🔎Browsing movies</h3>
            <p className="text">
              Discover new films or revisit classics by 
              searching through genres, years, popularity, or curated lists.
            </p>
          </div>
        </div>

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">📚Log watched movies</h3>
            <p className="text">
              Keep a personal record of all movies you have seen, including ratings, dates, and notes. 
              Perfect for reflecting on your viewing history.
            </p>
          </div>
        </div>

        <div className="kartica">
          <div className="p-3">
            <h3 className="h3">🎞️Create lists</h3>
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
