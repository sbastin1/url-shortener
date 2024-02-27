import { notFound, redirect } from "next/navigation";

export default async function page({ params }: { params: { url: string } }) {
  async function Redirector() {
    // Try to fetch original link

    try {
      const res = await fetch("http://localhost:4000/links/" + params.url);

      const ress = await res.json();

      return ress.link;
    } catch {
      notFound();
    }
  }

  const ShortenedURL = await Redirector();
  // Redirect to original link
  redirect(`${ShortenedURL}`);
}
