'use client'

import data from '../json_data/PropertyRent.json';
import { useParams } from 'next/navigation';
import { BiArea, BiBath, BiPhoneCall } from 'react-icons/bi';
import { IoBedOutline } from 'react-icons/io5';
import { FaSquare } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import HeartButton from '@/app/components/HeartButton';
import Heading from '@/app/components/Heading';
import Image from 'next/image';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { TbSofa } from 'react-icons/tb';
import { GrUserWorker } from 'react-icons/gr';

const RentId = () => {

  const params = useParams();

  const id = params?.rentId;
  const iddd = typeof id !== 'undefined' ? parseInt(id as string) : undefined;

  console.log(typeof(iddd));

  const property = data.find((item) => item.id === iddd);

  return (
    <>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">

                 <div className="mt-10">

                    <Heading
                        title={property?.title || ""}
                        subtitle={property?.location}
                        />
      
                    </div>

                        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                            <Image
                                src="/images/image1.webp"
                                fill
                                className="object-cover w-full"
                                alt="Image"
                                />

                        <div className="absolute top-5 right-5">
                            
                        </div>
                    </div>

            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>

            <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">

                <div className=" text-xl font-semibold flex flex-row items-center gap-2 mb-4">
                    {/* <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} /> */}
                </div>
                        
                <div className="flex flex-row items-center justify-between mb-2">

                    <div className="font-semibold">
                        <span className="text-md me-2">PKR</span>
                        <span className="text-2xl">{property?.price}</span>
                    </div>

                    <div className="flex items-center">

                        <span  style={{ color: property?.purpose === 'Sell' ? '#25b579' : '#ff9800' }}> 
                        <FaSquare/>
                        </span>

                        <span className="ml-2">{property?.type}</span>
                    </div>
                    </div>                 

                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">


                    <div className="flex items-center">
                      <IoBedOutline className="mr-2" />
                      <span>{property?.bedRoom}</span>
                    </div>
            
                    <div className="flex items-center">
                      <BiBath className="mr-2" />
                      <span>{property?.bathRoom || "0"}</span>
                    </div>

                    <div className="flex items-center">
                      <BiArea className="mr-2" />
                      <span>{property?.size}</span>
                    </div>

                </div>
            </div>
            
             <hr />
             
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">Description</span>
                <div className="text-md font-light text-neutral-500">{property?.description}</div>
              </div>

              <hr />
            
              <div>
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">Features</span>

                  <div className="flex flex-row flex-wrap gap-4">    

                      <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <SlScreenDesktop size={40}/>
                          <p className="text-end text-sm">{property?.tvLounge || "None"}</p>  
                      </div>
                
                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <MdBalcony size={40}/>
                          <p className="text-end text-sm">{property?.balcony || "None"}</p>
                        </div>

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <MdOutlineKitchen size={40}/>
                          <p className="text-end text-sm">{property?.kitchen || "None"}</p>
                        </div>

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <TbSofa size={40}/>
                          <p className="text-end text-sm">{property?.drawingRoom || "None"}</p>
                        </div>
                  
                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <GrUserWorker size={40}/>
                          <p className="text-end text-sm">{property?.serventQuaters || "None"}</p>
                        </div>

                  </div>

                    </div>
                </div>

                    <hr />
             
                    <div className="flex flex-col gap-4">
                        <span className="text-xl font-semibold">Location</span>
                    <div className="text-md font-light text-neutral-500">{property?.location}</div>

                </div>
                </div>

                <div className="order-first mb-10 md:order-last md:col-span-3">
                        <div className="flex flex-row gap-4 mb-4 justify-end">
          
                            <button onClick={()=>{}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <BiPhoneCall size={25}/>
                             </button>
  
                            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <AiOutlineWhatsApp size={25}/>
                            </button>
  
                            </div>



                            <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">

                                 <div className="flex flex-row items-center gap-1 p-4">

                            <div className="text-2xl font-semibold">Availablity Schedule</div>

                                </div>

                                <hr />
                                
                                <div className='mt-5 py-4 px-4'>Any</div>

                                </div>
                             </div>

                        </div>

        </div>
        </div>
        
    </>
  );
};

export default RentId;