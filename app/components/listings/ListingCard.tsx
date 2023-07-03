'use client'

import useCities from "@/app/hooks/useCities";
import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import { IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { BiArea, BiBath } from "react-icons/bi";
import { FaSquare } from "react-icons/fa";
import Button from "../Button";


interface ListingCardProps{

    data: SafeListing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
}


const ListingCard : React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,

  }) => {

    const router = useRouter();
    const { getByValue } = useCities();

    const city = getByValue(data.city);
    const location = data.locationValue
    const roomCount = data.roomCount
    const bathroomCount = data.bathroomCount
    const area = data.area
    const type = data.type
    let rent = '';

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    
        if (disabled) {
          return;
        }
    
        onAction?.(actionId)
      }, [disabled, onAction, actionId]);

      const price = useMemo(() => {
        if (reservation) {
          return reservation.totalPrice;
        }
    
        return data.price;
      }, [reservation, data.price]);
    
      const reservationDate = useMemo(() => {
        if (!reservation) {
          return null;
        }
      
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
    
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
      }, [reservation]);

      
      const [createdAt, setCreatedAt] = useState(data.createdAt);
      const [timeDifference, setTimeDifference] = useState('');
    

      //------------------------------------------------------------
      useEffect(() => {
        const calculateTimeDifference = () => {
          const createdAtDate = new Date(createdAt);
          const currentDate = new Date();
    
          const differenceInSeconds = Math.floor((currentDate.getTime() - createdAtDate.getTime()) / 1000);
    
          if (differenceInSeconds < 60) {
            setTimeDifference(`${differenceInSeconds} second`);
          } else if (differenceInSeconds < 3600) {
            const minutes = Math.floor(differenceInSeconds / 60);
            setTimeDifference(`${minutes} minute`);
          } else if (differenceInSeconds < 86400) {
            const hours = Math.floor(differenceInSeconds / 3600);
            setTimeDifference(`${hours} hour`);
          } else {
            const days = Math.floor(differenceInSeconds / 86400);
            setTimeDifference(`${days} day`);
          }
        };
    
        calculateTimeDifference();
      }, [createdAt]);

      //------------------------------------------------------------

      const formattedPriceee = useMemo(() => {
        if (price < 1000) {
          return price.toString();
        } else if (price >= 1000 && price < 100000) {
          const thousands = Math.floor(price / 1000);
          const remainder = price % 1000 === 0 ? '' : `.${Math.floor(price % 1000 / 100)}`;
          return `${thousands}${remainder}K`;
        } else if (price >= 100000 && price < 10000000) {
          const lacs = Math.floor(price / 100000);
          const remainder = price % 100000 === 0 ? '' : `.${Math.floor(price % 100000 / 10000)}`;
          return `${lacs}${remainder} lac`;
        } else if (price >= 10000000) {
          const crores = Math.floor(price / 10000000);
          const remainder = price % 10000000 === 0 ? '' : `.${Math.floor(price % 10000000 / 1000000)}`;
          return `${crores}${remainder} crore`;
        }
      
        return price
        
      }, [price]);
      
      if(data.purpose === "Rent"){
          rent = "/month";
      }
      //------------------------------------------------------------
      const [purpose, setType] = useState(data.purpose);

  
    return ( 
        <div  onClick={() => router.push(`/listings/${data.id}`)} 
            className="col-span-1 cursor-pointer group">

            <div className="flex flex-col gap-2 w-full border">
                <div className="aspect-video w-full relative overflow-hidden">

                    <Image className="object-cover h-full w-full group-hover:scale-110 transition"
                       fill src={data.imageSrc} alt="Listing"/>

                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser}/>
                    </div>   
                </div>

                <div className="px-4 text-sm">
                  
                <div className="flex flex-row items-center justify-between mb-4">

                  <div className="font-semibold">
                    <span className="text-sm me-2">PKR</span>
                    <span className="text-xl">{formattedPriceee}</span>
                    <span className="text-sm ms-2">{rent}</span>
                  </div>

                  <div className="flex items-center">

                    <span  style={{ color: purpose === 'Sell' ? '#25b579' : '#ff9800' }}> 
                      <FaSquare/>
                    </span>

                    <span className="ml-2">{type}</span>
                    </div>
                </div>                  

                <div className="flex flex-row items-center gap-8 mb-2">

                  {roomCount>0 && (
                    <div className="flex items-center">
                      <IoBedOutline className="mr-2" />
                      <span>{roomCount}</span>
                    </div>
                  )}

                    
                  {bathroomCount>0 && (
                    <div className="flex items-center">
                      <BiBath className="mr-2" />
                      <span>{bathroomCount}</span>
                    </div>
                  )}
      
                    
                    <div className="flex items-center">
                      <BiArea className="mr-2" />
                      <span>{area} Marla</span>
                    </div>

                 </div>

                  <div className="flex flex-row items-center gap-10 mb-2">

                    <div className="flex items-center">
                      <IoLocationOutline className="mr-2" />
                      <span>{city?.value}</span>
                    </div>

                 </div>

                  <div className="flex flex-row items-center gap-10 mb-2">

                    <div className="flex items-center">
                      <span>Added {timeDifference} ago</span>
                    </div>
                    
                 </div>

                 </div>

                 {onAction && actionLabel && (
                  <Button
                    disabled={disabled}
                    small
                    label={actionLabel} 
                    onClick={handleCancel}
                  />
        )}
            </div>
        </div>
     );
}
 
export default ListingCard;