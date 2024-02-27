import { notFound, redirect } from "next/navigation";
import prisma from "@/prisma/db";
import { disconnectDB } from "../actions/disconnect";

import chalk from "chalk";

export default async function page({ params }: { params: { url: string } }) {
  // Try to fetch original link

  let links = await prisma.link.findUnique({
    where: {
      id: params.url,
    },
  });
  console.log(chalk.yellow.bold(links?.link));
  disconnectDB();

  if (links?.link === undefined) {
    console.log(chalk.red.bold("Redirect failed"));
    notFound();
  } else {
    console.log("Redirect is succesful");
    redirect(`${links.link}`);
  }
}
