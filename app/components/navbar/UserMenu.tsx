'use client'

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useRegisterModel from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useSellModal from "@/app/hooks/useSellModel";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const router = useRouter();
  const registerModal = useRegisterModel();
  const loginModal = useLoginModal();
  const sellModal = useSellModal();

  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Adjust the delay time (in milliseconds) as needed
    setTimeoutId(newTimeoutId);
  };

  const onSell = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //Open sell model
    sellModal.onOpen();
  }, [loginModal, currentUser, sellModal]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onSell}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Advertise
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-max bg-white overflow-hidden right-0 top-12 text-sm z-50">
          <div className="flex flex-col cursor-pointer">
            {currentUser?.role === "agent" ? (
              <>
                {/* <MenuItem onClick={() => router.push('/agents/my-profile')} label="My profile" /> */}
                <MenuItem onClick={() => router.push('/properties')} label="My properties" />
                <MenuItem onClick={() => router.push('/favorites')} label="My favourites" />
                <MenuItem onClick={() => router.push('/reservations')} label="My reservation" />
                <MenuItem onClick={() => router.push('/trips')} label="My visits" />
                <MenuItem onClick={sellModal.onOpen} label="Advertise" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : currentUser?.role === "user" ? (
              <>

                <MenuItem onClick={() => router.push('/properties')} label="My properties" />
                <MenuItem onClick={() => router.push('/favorites')} label="My favourites" />
                <MenuItem onClick={() => router.push('/reservations')} label="My reservation" />
                <MenuItem onClick={() => router.push('/trips')} label="My visits" />
                
                <MenuItem onClick={sellModal.onOpen} label="Advertise" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
