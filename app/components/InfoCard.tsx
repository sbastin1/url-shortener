"use client";

import React, { useState } from "react";
import "./InfoCard.css";
import Image from "next/image";
import TrashCan from "../assets/trashcan.svg";
import Update from "../assets/update.svg";
import ClearDb from "../actions/clearDb";

export default function InfoCard() {
  const [isOpened, setIsOpened] = useState(false);
  const [isResponse, setIsResponse] = useState(false);

  return (
    <>
      <div className="">
        <div
          className={`textbox-transition absolute w-[50em] h-[664px] bg-white right-0 left-0 m-auto rounded-b-2xl z-10 ${
            isOpened ? "textbox-true" : "textbox-false"
          }`}
        >
          <div className="flex flex-col gap-4 text-center font-semibold text-lg w-[38em] m-auto">
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

              <button className="bg-lime-400 p-2 rounded-xl flex pr-3">
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
            {isResponse && (
              <p className="absolute text-left top-[41em] ml-24 text-sm">
                DB has been sucessfully cleared
              </p>
            )}
            <footer className=" mt-[36px] right-0 left-0 m-auto ">
              Made by Sebastian Wilden
            </footer>
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
