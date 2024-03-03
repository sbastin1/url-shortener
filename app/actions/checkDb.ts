import chalk from "chalk";
import prisma from "@/prisma/db";

export default async function hello() {
  let show = await prisma.link.findMany();
  console.log(show);
  console.log(
    chalk.green.bold("[OK]"),
    chalk.green("Database has been logged.")
  );
}

hello();
