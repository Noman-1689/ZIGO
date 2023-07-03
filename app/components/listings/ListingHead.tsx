'use client';

import Image from "next/image";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import useCities from "@/app/hooks/useCities";
import Button from "../Button";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";

interface ListingHeadProps {
  title: string;
  city: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  city,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  
  const { getByValue } = useCities();
  const location = getByValue(city);

  return ( 
    <>

    <div className="mt-10">

      <Heading
        title={title}
        subtitle={`${locationValue}, ${location?.label}`}
      />
      
    </div>

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />

        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
 
    </>
   );
}
 
export default ListingHead;