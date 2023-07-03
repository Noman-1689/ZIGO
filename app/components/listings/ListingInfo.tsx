'use client';

import dynamic from "next/dynamic";

import useCities from "@/app/hooks/useCities";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import { IoBedOutline } from "react-icons/io5";
import { BiArea, BiBath } from "react-icons/bi";
import { FaSquare } from "react-icons/fa";
import { useMemo } from "react";

import { MdBalcony, MdOutlineKitchen } from "react-icons/md";
import {SlScreenDesktop} from "react-icons/sl"
import {GrUserWorker} from "react-icons/gr"
import { TbSofa } from "react-icons/tb";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {

    user: SafeUser,
    description: string;
    roomCount: number;
    bathroomCount: number;
    area: number;
    price: number;
    type:string;
    purpose: string;
    city: string;
    tvLounge?: number | null,
    balcony?: number | null,
    kitchen?: number | null,
    drawingRoom?: number | null,
    servantQuaters?: number | null
}

const ListingInfo: React.FC<ListingInfoProps> = ({

    user,
    description,
    roomCount,
    bathroomCount,
    area,
    type,
    purpose,
    city,
    price,
    tvLounge,
    balcony,
    kitchen,
    drawingRoom,
    servantQuaters

  }) => {
    
    const { getByValue } = useCities();
    const location = getByValue(city);

    /* Formated Price */

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

    return ( 
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">

                <div className=" text-xl font-semibold flex flex-row items-center gap-2 mb-4">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                
                
                <div className="flex flex-row items-center justify-between mb-2">

                    <div className="font-semibold">
                        <span className="text-md me-2">PKR</span>
                        <span className="text-2xl">{formattedPriceee}</span>
                    </div>

                    <div className="flex items-center">

                        <span  style={{ color: purpose === 'Sell' ? '#25b579' : '#ff9800' }}> 
                        <FaSquare/>
                        </span>

                        <span className="ml-2">{type}</span>
                    </div>
                    </div>                 

                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">

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
            </div>
            
             <hr />
             
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">Description</span>
                <div className="text-md font-light text-neutral-500">{description}</div>
              </div>

              <hr />
            
              <div>
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">Features</span>

                  <div className="flex flex-row flex-wrap gap-4">

                    {tvLounge && tvLounge > 0 && (

                      <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <SlScreenDesktop size={40}/>
                          <p className="text-end text-sm">TV Lounge: {tvLounge}</p>  
                      </div>

                    )}

                      {balcony && balcony > 0 && (

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <MdBalcony size={40}/>
                          <p className="text-end text-sm">Balcony: {balcony}</p>
                        </div>

                      )}

                      {kitchen && kitchen > 0 && (

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <MdOutlineKitchen size={40}/>
                          <p className="text-end text-sm">kitchen: {kitchen}</p>
                        </div>

                      )}

                      {drawingRoom && drawingRoom > 0 && (

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <TbSofa size={40}/>
                          <p className="text-end text-sm">Drawing Room: {drawingRoom}</p>
                        </div>

                      )}

                      {servantQuaters && servantQuaters > 0 && (
                        
                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <GrUserWorker size={40}/>
                          <p className="text-end text-sm">Servant Quaters: {servantQuaters}</p>
                        </div>

                      )}

                  </div>

              </div>
              </div>

             <hr />
             <Map  center={location?.latlng ? location.latlng.map(Number) : undefined} />

        </div>
     );
}
 
export default ListingInfo;