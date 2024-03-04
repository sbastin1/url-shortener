"use server";

import prisma from "@/prisma/db";

export default async function updateUrl(oldId: string, newId: string) {
  let test = false;
  try {
    const updateLink = await prisma.link.update({
      where: {
        id: oldId,
      },
      data: {
        id: newId,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
