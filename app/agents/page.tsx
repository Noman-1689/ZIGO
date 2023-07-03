'use client'

import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import agentsData from './agents.json';
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { HiExternalLink } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";


export default function Agents() {
  const router = useRouter();

  return (
    <Container>
      <div className="mt-10"></div>

      <Heading title="Agents" subtitle="Find Top Real Estate Agents in Pakistan" center />

      <div className="mt-20 grid gap-4 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">

        {agentsData.map((agent) => (

          <div key={agent.id} className="border rounded-lg p-4 shadow-sm hover:shadow-xl cursor-pointer" 
          onClick={()=>router.push(`/agents/${agent.id}`)}>
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 mr-6">
                <Image className="rounded-full" height="64" width="64" alt="Avatar" src="/images/placeholder.jpg" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{agent.name}</h3>

                 <div className="flex flex-row items-center flex-wrap mb-2">

                    <div className="flex items-center mr-20">
                      <IoLocationOutline className="mr-2" />
                      <span>Lahore</span>
                    </div>

                    <div className="flex items-center">
                      <FaUsers className="mr-2" />
                      <span>{agent.no_of_employees}</span>
                    </div>

                </div>

                <div className="flex items-center">
                    <HiExternalLink className="mr-2 fill-blue-500" />
                    <a href={agent.website} target="_blank" className="text-blue-500">Website</a>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
