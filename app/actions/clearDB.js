import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

async function hello() {
  await prisma.link.deleteMany();
  console.log(
    chalk.green.bold("[OK]"),
    chalk.green("Database has been cleared.")
  );
}

hello();
