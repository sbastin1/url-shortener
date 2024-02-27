"use server";

import prisma from "@/prisma/db";

export const createLinks = async (isDeclared: string, urlLink: string) => {
  await prisma.link.create({
    data: {
      id: isDeclared,
      link: urlLink,
    },
  });
};
