"use server";

import notFound from "../not-found";

export const server = async (urlLink: string) => {
  try {
    const res = await fetch(urlLink);
    const html = await res.text();

    const opening = html.indexOf("<title>");
    const closing = html.indexOf("</title>");
    return {
      title: html.substring(opening + 7, closing),
      offline: false,
    };
  } catch (err) {
    return {
      title: "Not found",
      offline: true,
    };
  }
};
