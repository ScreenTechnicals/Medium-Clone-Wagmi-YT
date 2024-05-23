import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="w-full border-b border-[#2d2d2d] flex items-center justify-between md:px-10 p-5 py-5">
      <Link href={"/"} className="text-xl md:text-3xl 2xl:text-4xl font-bold">
        <span className="flex items-center gap-2">
          <Image
            src={"/images/medium-logo.webp"}
            width={60}
            height={60}
            alt="medium logo"
          />
          <span className="font-serif">Medium</span>
        </span>
      </Link>

      {/* <ConnectWalletButton /> */}
      <div className="flex items-center gap-4">
        <Link href={"/create-post"}>
          <span className="flex items-center gap-1 text-xl">
            <span>Write</span>
            <FaEdit size={24} />
          </span>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};
