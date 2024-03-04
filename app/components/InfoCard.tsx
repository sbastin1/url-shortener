"use client";

import React, { ChangeEvent, useState } from "react";
import "./InfoCard.css";
import Image from "next/image";
import TrashCan from "../assets/trashcan.svg";
import Update from "../assets/update.svg";
import Github from "../assets/github-mark.svg";
import ClearDb from "../actions/clearDb";
import updateUrl from "../actions/updateDb";

export default function InfoCard() {
  const [isOpened, setIsOpened] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [isOldId, setIsOldId] = useState("");
  const [isCustomId, setIsCustomId] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleChangeShortUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOldId(e.target.value);
  };

  const handleChangeCustomId = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCustomId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isOldId === "") {
      setIsInputEmpty(true);
      return;
    }

    if (isCustomId === "") {
      setIsInputEmpty(true);
      return;
    }

    updateUrl(isOldId, isCustomId);
  };

  return (
    <>
      <div className="">
        <div
          className={`textbox-transition absolute w-[50em] h-[664px] bg-white right-0 left-0 m-auto rounded-b-2xl z-10 ${
            isOpened ? "textbox-true" : "textbox-false"
          }`}
        >
          <div className="flex flex-col gap-4 text-center font-semibold text-lg w-[38em] m-auto mt-2">
            <h1 className="text-red-600 font-extrabold text-4xl">Warning!</h1>
            <p className="text-red-600">
              This Url Shortener has been created and is being hosted for
              demonstration purposes only.
            </p>
            <p className="text-red-600">
              Your created URLs could get deleted at any point!
            </p>

            <h2 className="text-4xl mt-10">Information about this Project</h2>
            <p>
              This is my first <span className="font-bold">publicly</span>{" "}
              accessible project which i created as a proof of concept.
            </p>
            <p>
              The entire project has been created with NextJS and is being
              hosted on a VPS.
            </p>
            <p>
              It solely exists to proof that i am able to work with an ORM even
              though i could rebuild it with the mySQL package
            </p>
            <p>
              The website is fully responsive and to really make it a full CRUD
              application, i decided to include a Clear DB button, aswell an
              input box to customize your shortened url.
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                onClick={() => {
                  ClearDb();
                  setIsResponse(true);
                  setTimeout(() => {
                    setIsResponse(false);
                  }, 3000);
                }}
                className="bg-red-600 p-2 rounded-xl flex pr-3"
              >
                <Image
                  className="mr-1 m-auto"
                  src={TrashCan}
                  alt="Trashcan Icon"
                  height={15}
                  width={25}
                />{" "}
                Clear DB
              </button>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-evenly gap-16">
                  <div>
                    <input
                      placeholder="Old ID eg. id453546"
                      className="w-28 h-full -mr-12 text-center rounded-lg text-[0.8rem] border-lime-400 px-2 border-4"
                      onChange={handleChangeShortUrl}
                      value={isOldId}
                    />

                    {isInputEmpty && (
                      <p className="absolute text-[0.7rem] text-red-700 ">
                        Your Inputs can not be empty
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      placeholder="Custom ID"
                      className="w-24 h-full -mr-12 text-center rounded-lg text-[0.8rem] border-lime-400 px-2 border-4"
                      onChange={handleChangeCustomId}
                      value={isCustomId}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-lime-400 p-2 rounded-xl flex pr-3"
                  >
                    <Image
                      className="mr-1 m-auto"
                      src={Update}
                      alt="Update Icon"
                      height={15}
                      width={25}
                    />
                    Update URL
                  </button>
                </div>
              </form>
            </div>
            {isResponse && (
              <p className="absolute text-left top-[41em] ml-24 text-sm">
                DB has been sucessfully cleared
              </p>
            )}
            <a
              href="https://github.com/sbastin1"
              target="_blank"
              className="  right-0 left-0 m-auto p-4 cursor-pointer hover:text-xl credits-shadow transition-all flex"
            >
              Made by Sebastian Wilden
              <Image
                className="ml-4"
                src={Github}
                alt="Github Icon"
                height={0}
                width={30}
              />
            </a>
          </div>
        </div>
        <div
          className={` button-hover button-transition absolute right-0 left-0 m-auto bg-white w-36 h-10 text-center rounded-b-2xl cursor-pointer z-10 ${
            isOpened ? "button-true" : "button-false"
          }`}
          onClick={() => {
            if (!isOpened) {
              setIsOpened(true);
            } else {
              setIsOpened(false);
            }
          }}
        >
          <h1 className="mt-2 button-text font-semibold">CLICK ME</h1>
        </div>
      </div>
    </>
  );
}
