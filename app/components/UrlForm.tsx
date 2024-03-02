"use client";
import { ChangeEvent, useRef, useState } from "react";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { server } from "../actions/server";
import { FaRegCopy } from "react-icons/fa";
import { createLinks } from "../actions/createLink";
import { disconnectDB } from "../actions/disconnect";

export default function UrlForm() {
  let [urlLink, setUrlLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isTitle, setIsTitle] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const isDeclared = useRef("");

  const fetchTitle = async () => {
    const { title, offline } = await server(urlLink);
    setIsTitle(title);
    setIsOffline(offline);
  };

  const prefix = "http://";
  const regex1 =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
  const regex2 =
    /^([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])$/;

  // Check if link is valid
  const isValidLink = () => {
    return regex1.test(urlLink) || regex2.test(urlLink);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Actvating the loading bar
    setIsLoading(true);

    // Creation of the ID
    isDeclared.current = "id" + Math.random().toString(16).slice(2);

    // If the link is not valid, it will remove the loading bar and throw an error for the user
    if (!isValidLink()) {
      setIsLoading(false);
      setIsValidUrl(false);
      return;
    }
    // An http tag is added to the link if it's missing one.
    setIsValidUrl(isValidLink());

    if (regex2.test(urlLink) === true) {
      urlLink = prefix + urlLink;
    }

    // Saves the Link in the DB
    try {
      await createLinks(isDeclared.current, urlLink);
      disconnectDB();
    } catch (e) {
      console.log("Catch triggered in newUrlForm.tsx:64");
    }
    console.log("PLACMEMENT HERE");
    setTimeout(() => {
      setIsLoading(false);
    }, 500),
      setIsSuccess(true);
    fetchTitle();
  };
  // This visually removes the shortened link if the original link is changed
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSuccess(false);
    setUrlLink(e.target.value);
  };
  // If the click the "copy" symbol, it automatically copies the shortened link for them.
  const handleClick = () => {
    navigator.clipboard.writeText(`localhost:3000/${isDeclared.current}`);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 500);
  };

  return (
    <form id="main" onSubmit={handleSubmit} className="">
      <div className="flex justify-center mt-20">
        <div className="relative">
          <input
            placeholder="Type in your url"
            className="text-center w-[32em] p-4 rounded-l-xl text-2xl bg-[#EDEDED]"
            onChange={handleChange}
            value={urlLink}
          />
          <p className=" text-[#DA0037] absolute text-xl">
            {!isValidUrl && <span>This is not a valid url!</span>}
          </p>
        </div>
        <button
          className="bg-[#DA0037] p-4 rounded-r-xl text-2xl w-[5em]"
          disabled={isLoading && !isValidUrl}
        >
          {isLoading && (
            <span>
              <ScaleLoader height={7} color="#ffffff" />
            </span>
          )}
          {!isLoading && (
            <span className="text-white font-semibold">Shorten</span>
          )}
        </button>
      </div>

      <div id="container" className="absolute left-0 right-0">
        {isSucess && (
          <div className="bg-[#EDEDED] w-[45em] text-2xl m-auto rounded-2xl overflow-hidden mt-10 p-6">
            <div className=" ">
              <h1 className="flex justify-left font-bold">{isTitle}</h1>
              <a
                href={
                  regex2.test(urlLink) ? (urlLink = prefix + urlLink) : urlLink
                }
                className="flex justify-left"
              >
                {regex2.test(urlLink) ? (urlLink = prefix + urlLink) : urlLink}
              </a>
            </div>
            <hr className="bg-[#bbbbbb] mt-2 mb-2 h-1 rounded-2xl" />
            <div className="flex">
              <a
                href={`localhost:3000/${isDeclared.current}`}
                className="text-[#DA0037]"
              >{`localhost:3000/${isDeclared.current}`}</a>
              {!isCopy ? (
                <FaRegCopy
                  className="text-[#171717] mt-1 ml-2 cursor-pointer"
                  onClick={handleClick}
                />
              ) : (
                <ClipLoader
                  color="#171717"
                  size={20}
                  className="mt-2 ml-2"
                  loading
                />
              )}
            </div>
            {isOffline && <h2 className="text-2xl text-red-700">OFFLINE</h2>}
          </div>
        )}
      </div>
    </form>
  );
}
