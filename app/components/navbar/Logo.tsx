'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    //Logo as text

    <div
        onClick={() => router.push('/')}
        className="hidden md:block cursor-pointer text-xl md:text-2xl 
        font-bold text-white bg-blue-500 rounded p-2 tracking-widest uppercase">
        zigo
    </div>

    //Logo as Image
    /*
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/logo.png" 
      height="100" 
      width="100" 
      alt="Logo" 
    /> */
   );
}
 
export default Logo;