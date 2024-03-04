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
      <div
        className={`textbox-transition absolute w-[27em] h-[56em] bg-white right-0 left-0 m-auto rounded-b-2xl z-10 ${
          isOpened ? "textbox-true" : "textbox-false"
        }`}
      >
        <div className="flex flex-col gap-4 text-center font-semibold text-lg w-[20em] m-auto mt-2">
          <h1 className="text-red-600 font-extrabold text-4xl">Warning!</h1>
          <p className="text-red-600 text-lg">
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
            The entire project has been created with NextJS and is being hosted
            on a VPS.
          </p>
          <p>It soley exists to proof that i am able to work with an ORM.</p>
          <p>
            The website is fully responsive and to really make it a full{" "}
            <span className="font-bold">CRUD</span> application, i included a
            Clear DB button, aswell as a way to customize your own shortened
            link.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row">
              <button
                type="button"
                onClick={() => {
                  ClearDb();
                  setIsResponse(true);
                  setTimeout(() => {
                    setIsResponse(false);
                  }, 3000);
                }}
                className="bg-red-600 p-2  rounded-xl flex flex-row w-[8em] m-auto justify-center"
              >
                <Image
                  className=""
                  src={TrashCan}
                  alt="Trashcan Icon"
                  height={15}
                  width={25}
                />{" "}
                Clear DB
              </button>
              <button
                type="submit"
                className="bg-lime-400 p-2 rounded-xl flex flex-row justify-center m-auto w-[8em]"
              >
                <Image
                  className=""
                  src={Update}
                  alt="Update Icon"
                  height={15}
                  width={25}
                />
                Update URL
              </button>
            </div>
            <div className="flex flex-row h-14 mt-4 justify-evenly">
              <input
                placeholder="Old ID eg. id453546"
                className="w-[10em] text-center rounded-lg text-[0.8rem] border-lime-400 px-2 border-4 outline-none"
                onChange={handleChangeShortUrl}
                value={isOldId}
              />

              {isInputEmpty && (
                <p className="absolute text-[0.7rem] text-red-700 ">
                  Your Inputs can not be empty
                </p>
              )}

              <input
                placeholder="Custom ID"
                className="w-[10em] text-center rounded-lg text-[0.8rem] border-lime-400 px-2 border-4 outline-none"
                onChange={handleChangeCustomId}
                value={isCustomId}
              />
            </div>
          </form>

          {isResponse && (
            <p className="absolute text-left top-[41em] ml-24 text-sm">
              DB has been sucessfully cleared
            </p>
          )}
          <a
            href="https://github.com/sbastin1"
            target="_blank"
            className="-mt-3 m-auto p-4 cursor-pointer hover:text-xl credits-shadow transition-all flex"
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
    </>
  );
}
