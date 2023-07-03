import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import React from "react";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import Search from "../search/Search";
import Buy from "./Buy";
import Rent from "./Rent";
import Tools from "./Tools";
import Agents from "./Agents";

interface NavbarProps{
    currentUser?: SafeUser | null;
    
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {

    return ( 
        <div className="fiexd w-full bg-white z-10 shadow-md">
            <div className="py-4 border-b-[1px]">

                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                       <Logo />

                        <Buy/>
                        <Rent/>

                       <Search/>
                        
                       <Agents/>
                       <Tools/>

                       <UserMenu currentUser={currentUser}/>

                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
     );
}
 
export default Navbar;