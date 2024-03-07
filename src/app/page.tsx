import { Button } from "@/components";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen md:px-10 py-5 p-5">
      <p className="mx-auto md:w-8/12 text-center pt-20 pb-5 font-extralight text-xl md:text-5xl">
        Built With{" "}
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Next Js
        </a>
        ,{" "}
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Tailwind CSS
        </a>
        ,{" "}
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Wagmi
        </a>
        ,{" "}
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Viem
        </a>{" "}
        &{" "}
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Rainbowkit
        </a>
      </p>
      <div className="text-center pt-5">
        <a
          href=""
          target="_blank"
          className="border px-6 py-3 rounded-md mt-2 border-[#272727] hover:bg-[#272727] transition-all"
        >
          See Examples
        </a>
      </div>
    </main>
  );
}
