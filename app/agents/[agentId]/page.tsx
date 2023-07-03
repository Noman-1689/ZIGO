'use client'

import { useParams } from "next/navigation";
import agentsData from '../agents.json';
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { BiArea, BiBath, BiPhoneCall } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { SlScreenDesktop } from "react-icons/sl";
import { MdBalcony, MdOutlineKitchen } from "react-icons/md";
import { TbSofa } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { IoBedOutline } from "react-icons/io5";
import { FaPhoneVolume, FaSquare, FaUserTie, FaUsers } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { BsFillPhoneFill } from "react-icons/bs";

const AgentId = () => {
  const params = useParams();
  const id = params?.agentId;
  const iddd = typeof id !== 'undefined' ? parseInt(id as string) : undefined;

  const agent = agentsData.find((item) => item.id === iddd);

  return (
    <Container>
      <div className="mt-10"></div>
      <Heading title={agent?.name || ""} center />

      <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>

            <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">

                <div className=" text-xl font-semibold flex flex-row items-center gap-2 mb-4">
                    {/* <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} /> */}
                </div>
                        
                <div className="flex flex-row items-center justify-between mb-2">

                    <div className="font-semibold">
                        <span className="text-md me-2">Manager</span>
                        <span className="text-2xl">{agent?.manager_name}</span>
                    </div>

                      <div className="flex items-center">
                        <span className="ml-2">Establish Year: {agent?.establishment_year}</span>
                      </div>

                    </div>                 

                <div className="flex flex-row items-center gap-8 font-light text-neutral-500">

                    <div className="flex items-center">
                      <HiExternalLink className="mr-2 fill-blue-500" />
                      <a href={agent?.website} target="_blank" className="text-blue-500">Website</a>
                    </div>

                    <div className="flex items-center">
                      <FaUsers className="mr-2 fill-blue-500" />
                      <span>{agent?.no_of_employees}</span>
                    </div>

                </div>
            </div>
            
             <hr />
             
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">Description</span>
                <div className="text-md font-light text-neutral-500">{agent?.description}</div>
              </div>

              <hr />
            
              <div>
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">Contact Person</span>

                  <div className="flex flex-row flex-wrap gap-4">    

                      <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <FaUserTie size={40}/>
                          <p className="text-end text-sm">{agent?.contact_person || "None"}</p>  
                      </div>
                
                      <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <FaPhoneVolume size={40}/>
                          <p className="text-end text-sm">{agent?.mobile || "None"}</p>
                        </div>

                   

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <BsFillPhoneFill size={40}/>
                          <p className="text-end text-sm">{agent?.phone || "None"}</p>
                        </div>

                        {/*

                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <TbSofa size={40}/>
                          <p className="text-end text-sm">{property?.drawingRoom || "None"}</p>
                        </div>
                  
                        <div className="w-40 h-auto p-4 shadow-sm flex flex-col gap-4 bg-slate-100 rounded-md hover:shadow-lg">
                          <GrUserWorker size={40}/>
                          <p className="text-end text-sm">{property?.serventQuaters || "None"}</p>
                        </div> */}

                  </div>

                    </div>
                </div>

                    <hr />
             
                    <div className="flex flex-col gap-4">
                        <span className="text-xl font-semibold">Location</span>
                    <div className="text-md font-light text-neutral-500">{agent?.location}</div>

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
                                
                                <div className="py-4 px-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-neutral-100">
              <th className="py-2 px-4 text-left font-semibold text-neutral-500">Weekday</th>
              <th className="py-2 px-4 text-left font-semibold text-neutral-500">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Monday</td>
              <td className="py-2 px-4 text-left">10 am - 08:00 pm</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Tuesday</td>
              <td className="py-2 px-4 text-left">10:00 am - 05:00 pm</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Wednesday</td>
              <td className="py-2 px-4 text-left">10 am - 08:00 pm</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Thursday</td>
              <td className="py-2 px-4 text-left">10 am - 08:00 pm</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Friday</td>
              <td className="py-2 px-4 text-left">10 am - 08:00 pm</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Saturday</td>
              <td className="py-2 px-4 text-left">10 am - 08:00 pm</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <td className="py-2 px-4 text-left font-medium">Sunday</td>
              <td className="py-2 px-4 text-left">off</td>
            </tr>
          </tbody>
        </table>
      </div>

                                </div>
                             </div>

                        </div>
    </Container>
  );
};

export default AgentId;