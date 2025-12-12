import Image from "next/image";
const Liked = () => {
    return(
        <button className="cursor-pointer mx-3">
            <Image src="/heart.png" alt="heart" width={30} height={30}></Image>
        </button>
    )
}
export default Liked;