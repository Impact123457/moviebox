import Image from "next/image";
const Watched = () => {
    return(
        <button className="cursor-pointer">
            <Image src="/didntView.png" alt="didntView" width={30} height={30}></Image>
        </button>
    )
}
export default Watched;