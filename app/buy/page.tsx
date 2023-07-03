'use client'

import React from 'react';
import data from './json_data/PropertySell.json';

import Container from '../components/Container';
import ClientOnly from '../components/ClientOnly';
import { IoBedOutline, IoLocationOutline } from 'react-icons/io5';
import { BiArea, BiBath } from 'react-icons/bi';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { FaSquare } from 'react-icons/fa';

function BuyPage() {
    
     const router = useRouter();

  return (
    <ClientOnly>
    <Container>
    <div className="pt-10 grid 
        grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-4
        gap-8">

        {data.map((data)=>{

          return(

            <div key={data.id}>

                <div onClick={()=> router.push(`/buy/${data.id}`)}  
                    className="col-span-1 cursor-pointer group">

                    <div className="flex flex-col gap-2 w-full border">
                        <div className="aspect-video w-full relative overflow-hidden">

                            <Image
                                src="/images/image1.webp"
                                fill
                                className="object-cover w-full"
                                alt="Image"
                                />

                        </div>

                    <div className="px-4 text-sm">
                  
                        <div className="flex flex-row items-center justify-between mb-4">

                            <div className="font-semibold">
                                <span className="text-sm me-2">PKR</span>
                                <span className="text-xl">{data.price}</span>
                            </div>

                        <div className="flex items-center">

                            <span  style={{ color: data.purpose === 'Sell' ? '#25b579' : '#ff9800' }}> 
                            <FaSquare/>
                            </span>

                            <span className="ml-2">{data.type}</span>
                        </div>
                    </div>                  

                    <div className="flex flex-row items-center gap-8 mb-2">

                        <div className="flex items-center">
                            <IoBedOutline className="mr-2" />
                            <span>{data.bedRoom}</span>
                        </div>
                

                        <div className="flex items-center">
                            <BiBath className="mr-2" />
                            <span>{data.bathRoom}</span>
                        </div>

    
                        <div className="flex items-center">
                            <BiArea className="mr-2" />
                            <span>{data.size}</span>
                        </div>

                    </div>

                    <div className="flex flex-row items-center gap-10 mb-2">

                        <div className="flex items-center">
                            <IoLocationOutline className="mr-2" />
                            <span>{data.location}</span>
                        </div>

                    </div>

                    <div className="flex flex-row items-center gap-10 mb-2">

                        <div className="flex items-center">
                            <span> {data.uploadtime} </span>
                        </div>

                    </div>

                </div>

                </div>
            </div>
        </div>

          )
          
        })}
    </div>

  </Container>
</ClientOnly>
  );
}

export default BuyPage;