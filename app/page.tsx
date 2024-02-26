import UrlForm from "./components/UrlForm";
import Image from "next/image";
import waves from "./Rastergrafik.svg";

export default function page() {
  return (
    <main className="">
      <h1 className="text-7xl text-white text-center mt-[1em] ">
        Simple Shortener
      </h1>
      <UrlForm />
    </main>
  );
}
