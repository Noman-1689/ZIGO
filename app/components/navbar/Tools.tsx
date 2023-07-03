'use client'

import { useCallback, useState } from "react";
import Link from "next/link";

const Tools = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Adjust the delay time (in milliseconds) as needed
    setTimeoutId(newTimeoutId);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={toggleOpen} className="cursor-pointer hover:text-blue-500 transition duration-300">
      <Link  href="/mytools">Tools</Link>
      </div>

      {isOpen && (
        <div className="absolute mt-2 py-2 w-max bg-white rounded-md shadow-lg z-50">
          <div className="flex flex-col cursor-pointer">
          
            <Link href="/mytools/tool1" className="linkStyle">Mortgage calculator</Link>
            <Link href="/mytools/tool2" className="linkStyle">Affordability calculator</Link>
            <Link href="/mytools/tool3" className="linkStyle">Construction cost</Link>
            <Link href="/mytools/tool4" className="linkStyle">Land Records</Link>
            <Link href="/mytools/tool5" className="linkStyle">Area converter</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;