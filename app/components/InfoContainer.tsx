import React from "react";
import Image from "next/image";
import link from "../assets/link.svg";
import shorten from "../assets/shorten.svg";
import share from "../assets/share.svg";
import arrow_right from "../assets/arrow_right.svg";

export default function InfoContainer() {
  return (
    <>
      <div className="mt-[17em] w-full h-[15em] bg-[#131313] flex justify-evenly">
        <section className="text-white ml-24">
          <Image className="m-auto" src={link} alt="Link Icon" height={150} />
          <h1 className="w-[20rem] text-center text-xl">
            Select a link you would like to shorten
          </h1>
        </section>
        <Image
          className="m-auto"
          src={arrow_right}
          alt="Right Arrow"
          height={150}
          width={100}
        />
        <section className="text-white">
          <Image
            className="m-auto mt-5"
            src={shorten}
            alt="Shorten Icon"
            height={120}
          />
          <h1 className="w-[20rem] mt-[8px] text-center text-xl">
            Paste your copied link above to instantly shorten it
          </h1>
        </section>
        <Image
          className="m-auto"
          src={arrow_right}
          alt="Right Arrow"
          height={150}
          width={100}
        />
        <section className="text-white mr-24">
          <Image className="m-auto" src={share} alt="Share Icon" height={150} />
          <h1 className="w-[20rem] text-center text-xl">
            Share your link with family, friends or even the entire world!
          </h1>
        </section>
      </div>
    </>
  );
}
