import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

async function hello() {
  let show = await prisma.link.findMany();
  console.log(show);
  console.log(
    chalk.green.bold("[OK]"),
    chalk.green("Database has been logged.")
  );
}

hello();
