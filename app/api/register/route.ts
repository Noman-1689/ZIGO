import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
    name,
    password,
    role,
    agency,
    agency_description,
    agency_address,

   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      role,
      agency,
      agency_description,
      agency_address
    }
  });

  return NextResponse.json(user);
}