"use server";

import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

export const disconnectDB = () => {
  try {
    prisma.$disconnect;
    console.log(chalk.green.bold("Successfully disconnected from DB"));
  } catch (e) {
    console.log(
      chalk.red.bold("An error occured when trying to disconnect from the DB")
    );
    console.log(e);
  }
};
