"use client";

import React, { useEffect, useState } from "react";
import "../globals.css";

export default function TitleAnim() {
  let titles = ["Link Snipper", "Url Shortener", "Web Shrinker"];

  const [title, setTitle] = useState("");

  // Fisher Yates Algo || Terrible for a typewriter but im too lazy to change it :/
  function shuffleArray(array: Array<String>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function animatedTitle() {
    // 2. Split string into it's letters
    shuffleArray(titles);
    setTimeout(() => {
      let splitTitle: string = "";
      let letter = titles[0].split("");

      //Deletes the title step by step and repeats the function
      function DeleteAndRepeat() {
        for (let i = 0; i < letter.length; i++) {
          setTimeout(() => {
            splitTitle = splitTitle.substring(0, splitTitle.length - 1);
            setTitle(splitTitle);
            if (i === letter.length - 1) {
              animatedTitle();
            }
          }, 300 * (i + 1));
        }
      }

      // 3. Put each letter into the setTitle Variable
      for (let i = 0; i < letter.length; i++) {
        setTimeout(() => {
          splitTitle += letter[i];
          setTitle(splitTitle);
          if (i === letter.length - 1) {
            setTimeout(() => {
              DeleteAndRepeat();
            }, 3000);
          }
        }, 300 * (i + 1));
      }
    }, 500);
  }

  useEffect(() => {
    animatedTitle();
  }, []);

  return (
    <>
      <div className="flex mt-[12em] justify-center">
        <h1 className="overflow-hidden text-[4em] text-white whitespace-nowrap ">
          {title}
        </h1>
        <span className="line text-[4em] text-white">_</span>
      </div>
    </>
  );
}
