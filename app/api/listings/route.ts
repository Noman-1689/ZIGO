import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { 

    title,
    description,
    purpose,
    category,
    type,
    city,
    locationValue,
    area,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    tvLounge,
    balcony,
    kitchen,
    drawingRoom,
    servantQuaters,
    contact  

   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
        
    title,
    description,
    purpose,
    category,
    type,
    city: city.value,
    area: parseInt(area, 10),
    roomCount,
    bathroomCount,
    imageSrc,   
    locationValue,
    price: parseInt(price, 10),
    tvLounge,
    balcony,
    kitchen,
    drawingRoom,
    servantQuaters, 
    contact,
    userId: currentUser.id

    }
  });

  return NextResponse.json(listing);
}