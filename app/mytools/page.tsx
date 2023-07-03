'use client'

import { IconContext } from "react-icons";
import Container from "../components/Container";
import Heading from "../components/Heading";
import {SiHomeadvisor} from "react-icons/si"
import { AiFillCalculator } from "react-icons/ai";
import { GiCrane } from "react-icons/gi";
import { RiFileShield2Fill } from "react-icons/ri";
import { BsPiggyBankFill } from "react-icons/bs";
import { useRouter } from "next/navigation";



export default function Tools() {

  const router = useRouter();

  const calculators = [
    {
      name: "Mortgage Calculator",
      icon: SiHomeadvisor,
      description: "Calculate your monthly mortgage payments, interest rates, and loan options.",
      route: "/mortgage-calculator",
      color: "fill-blue-500",
      bgcolor: "bg-blue-200",
      bordercolor: "border-blue-500",
      routes: '/mytools/tool1'
      
    },
    {
      name: "Affordability Calculator",
      icon: BsPiggyBankFill,
      description: "Discover your maximum affordable price range based on your income and expenses.",
      route: "/affordability-calculator",
      color: "fill-yellow-500",
      bgcolor: "bg-yellow-200",
      bordercolor: "border-yellow-500",
      routes: '/mytools/tool2'
    },
    {
      name: "Construction Cost Calculator",
      icon: GiCrane,
      description: "Estimate the expenses involved in your construction or remodeling project.",
      route: "/construction-cost-calculator",
      color: "fill-rose-500",
      bgcolor: "bg-rose-200",
      bordercolor: "border-rose-500",
      routes: '/mytools/tool3'
    },
    {
      name: "Land Records",
      icon: RiFileShield2Fill,
      description: "Providing you with an all-inclusive platform to help you get verified property details with digital convenience.",
      route: "/area-converter",
      color: "fill-cyan-500",
      bgcolor: "bg-cyan-200",
      bordercolor: "border-cyan-500",
      routes: '/mytools/tool4'
    },
    {
      name: "Area Converter",
      icon: AiFillCalculator,
      description: "Effortlessly convert between different units of area measurement.",
      route: "/area-converter",
      color: "fill-teal-500",
      bgcolor: "bg-teal-200",
      bordercolor: "border-teal-500",
      routes: '/mytools/tool5'
    },
  ];

  return (
    <Container>
    <div className="mt-10"></div>
    <Heading
      title="Tools"
      subtitle="Unlock the full potential of your real estate journey with our comprehensive tools."
      center
    />
    <div className="mt-20 grid gap-x-32 gap-y-16 
      grid-cols-1 
      sm:grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-2 
      xl:grid-cols-3 
      2xl:grid-cols-3">

      {calculators.map((calculator, index) => (
        <div key={index} className="flex">
          <IconContext.Provider value={{ className: `w-5/12 h-auto mr-6 p-4 border-0 rounded-md  ${calculator.color} ${calculator.bgcolor} ${calculator.bordercolor} hover:border-4` }}>
            <calculator.icon onClick={() => router.push(calculator.routes)}/>
          </IconContext.Provider>
          <div>
            <h3 className="text-lg font-semibold">{calculator.name}</h3>
            <p className="text-sm">{calculator.description}</p>
          </div>
        </div>
      ))}
    </div>
  </Container>
  );
}
