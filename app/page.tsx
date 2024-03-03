import InfoCard from "./components/InfoCard";
import InfoContainer from "./components/InfoContainer";
import TitleAnim from "./components/TitleAnim";
import UrlForm from "./components/UrlForm";

export default function page() {
  return (
    <main className="">
      <InfoCard />
      <TitleAnim />
      <UrlForm />
      <InfoContainer />
    </main>
  );
}
