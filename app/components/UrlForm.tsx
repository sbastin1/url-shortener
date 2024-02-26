"use client";
import { ChangeEvent, useState } from "react";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { server } from "../actions/server";
import { FaRegCopy } from "react-icons/fa";

export default function UrlForm() {
  let [urlLink, setUrlLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isDeclared, setIsDeclared] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isTitle, setIsTitle] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

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

  const isValidLink = () => {
    return regex1.test(urlLink) || regex2.test(urlLink);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setIsDeclared("id" + Math.random().toString(16).slice(2));

    if (!isValidLink()) {
      setIsLoading(false);
      setIsValidUrl(false);
      return;
    }

    setIsValidUrl(isValidLink());

    if (regex2.test(urlLink) === true) {
      urlLink = prefix + urlLink;
    }

    const res = await fetch("http://localhost:4000/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        id: isDeclared,
        link: urlLink,
      }),
    });
    res.status === 201 &&
      setTimeout(() => {
        setIsLoading(false);
      }, 500),
      setIsSuccess(true);
    fetchTitle();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSuccess(false);
    setUrlLink(e.target.value);
  };

  const handleClick = () => {
    navigator.clipboard.writeText(`localhost:3000/${isDeclared}`);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex justify-center mt-64">
        <div className="relative">
          <input
            placeholder="Type in your url"
            className="text-center w-[40em] p-4 rounded-l-xl text-2xl bg-[#EDEDED]"
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
          {!isLoading && <span>Shorten</span>}
        </button>
      </div>

      <div id="container">
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
                href={`localhost:3000/${isDeclared}`}
                className="text-[#DA0037]"
              >{`localhost:3000/${isDeclared}`}</a>
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
