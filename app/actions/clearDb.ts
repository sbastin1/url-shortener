"use server";

import chalk from "chalk";
import prisma from "@/prisma/db";

export default async function ClearDb() {
  try {
    await prisma.link.deleteMany();
    console.log(
      chalk.green.bold("[OK]"),
      chalk.green("Database has been cleared.")
    );
  } catch {
    console.log(
      chalk.red.bold("[ERROR]"),
      chalk.red("Database could not be cleared.")
    );
  }
}

ClearDb(); //Put this here so you could still run "npm run cleardb"
