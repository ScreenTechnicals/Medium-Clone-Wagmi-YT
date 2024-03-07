import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/images/_404.svg"}
          alt="_404 image loading..."
          width={500}
          height={500}
          priority
          quality={100}
          className="w-[250px] md:w-[500px]"
        />
        <h2 className="text-2xl md:text-5xl text-center pt-5 md:pt-10">
          We lost that page 🥲
        </h2>
        <p className="text-sm md:text-xl font-medium text-gray-600 dark:text-gray-400 text-center px-8 sm:px-16 py-2 md:py-4">
          Sorry, the page you are looking for doesn’t exit or has been moved.
        </p>
        <Link
          href={"/"}
          className="border px-6 py-3 rounded-xl mt-2 border-[#272727] hover:bg-[#272727] transition-all"
        >
          Go Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
