import Link from "next/link";
import Image from "next/image";

function Header() {
  return <header className="flex justify-between items-center">
<Link href="/">
    <div>
        <Image 
        src="https://www.shareicon.net/data/128x128/2015/11/08/668675_box_512x512.png"
        alt="logo"
        className=""
        height={50}
        width={50}
        />
    </div>
    <h1 className="font-bold text-xl">Dropbox</h1>
</Link>
    </header>;
}

export default Header;
