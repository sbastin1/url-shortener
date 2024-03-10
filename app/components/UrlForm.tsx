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

  const prefix = "http://";
  const regex1 =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
  const regex2 =
    /^([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])$/;

  const fetchTitle = async () => {
    const { title, offline } = await server(urlLink);
    setIsTitle(title);
    setIsOffline(offline);
  };

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
    navigator.clipboard.writeText(`url.venatric.net/${isDeclared.current}`);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 500);
  };

  return (
    <form
      id="main"
      onSubmit={handleSubmit}
      className="flex flex-col justify-center mt-20"
    >
      <input
        placeholder="Type in your url"
        className="text-center m-auto max-w-[15em] p-4 rounded-2xl text-2xl bg-[#EDEDED] outline-none lg:min-w-[34em] xl:rounded-r-3xl"
        onChange={handleChange}
        value={urlLink}
      />

      {!isValidUrl && (
        <span className="text-[#DA0037] text-xl absolute left-0 right-0 m-auto w-[10em] xl:mt-[2em] xl:right-[30em]">
          This is not a valid url!
        </span>
      )}

      <button
        className="bg-[#DA0037] p-4 rounded-2xl text-2xl w-[10em] m-auto mt-12 lg:w-[20em] xl:mt-0 xl:w-[6em] xl:-translate-y-[64px] xl:translate-x-[14em] xl:rounded-l-none"
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

      {/* Form Output */}

      {isSucess && (
        <div className="bg-[#EDEDED] max-w-[20em] text-2xl m-auto rounded-2xl p-6 absolute right-0 left-0 bottom-[-2em] lg:max-w-[34em] xl:bottom-[12em]">
          <div className=" ">
            <h1 className="flex justify-left font-bold">{isTitle}</h1>
            <a
              target="_blank"
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
              href={
                regex2.test(urlLink) ? (urlLink = prefix + urlLink) : urlLink
              }
              className="text-[#DA0037]"
            >{`url.venatric.net/${isDeclared.current}`}</a>
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
    </form>
  );
}
