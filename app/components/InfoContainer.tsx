import React from "react";
import Image from "next/image";
import link from "../assets/link.svg";
import shorten from "../assets/shorten.svg";
import share from "../assets/share.svg";
import arrow_right from "../assets/arrow_right.svg";

export default function InfoContainer() {
  return (
    <>
      <div className="flex flex-col mt-[25em] bg-[#111111] ">
        <section className="text-white m-auto">
          <Image className="m-auto" src={link} alt="Link Icon" height={150} />
          <h1 className="w-[20rem] text-center m-auto text-xl">
            Select a link you would like to shorten
          </h1>
        </section>
        <Image
          className="m-auto rotate-90"
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
          <h1 className="w-[20rem] mt-[8px] text-center m-auto text-xl">
            Paste your copied link above to instantly shorten it
          </h1>
        </section>
        <Image
          className="m-auto rotate-90"
          src={arrow_right}
          alt="Right Arrow"
          height={150}
          width={100}
        />
        <section className="text-white m-auto pb-8">
          <Image className="m-auto" src={share} alt="Share Icon" height={150} />
          <h1 className="w-[20rem] text-center m-auto text-xl">
            Share your link with family, friends or even the entire world!
          </h1>
        </section>
      </div>
    </>
  );
}
