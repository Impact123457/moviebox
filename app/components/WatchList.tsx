import Image from "next/image";
const WatchList = () => {
    return(
        <button className="cursor-pointer mx-3">
            <Image src="/watchList.png" alt="watch" width={30} height={30}></Image>
        </button>
    )
}
export default WatchList;