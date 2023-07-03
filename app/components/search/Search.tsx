'use client';

import useCities from '@/app/hooks/useCities';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiArea, BiBath, BiSearch} from 'react-icons/bi'
import { IoBedOutline } from 'react-icons/io5';

const Search = () => {

    const searchModal = useSearchModal();
    const params = useSearchParams();
    const {getByValue} = useCities();

    const city = params?.get('city');
    const purpose = params?.get('purpose');
    const roomCount = params?.get('roomCount');
    const bathroomCount = params?.get('bathroomCount');
    const area = params?.get('area');

    const cityLable = useMemo(()=>{
        if(city){
            return getByValue(city as string)?.label;
        }
        return "City";
    },[getByValue, city]);

    const purposeLabel = useMemo(()=>{
        if(purpose){
            return `On ${purpose}`
        }

        return "Type";
    },[purpose]);

    const infoLabel = useMemo(()=>{
        if(roomCount || bathroomCount || area){
            return (
                <div className="flex flex-row items-center gap-6">

                <div className="flex items-center">
                  <IoBedOutline className="mr-2" />
                  <span>{roomCount}</span>
                </div>

                <div className="flex items-center">
                  <BiBath className="mr-2" />
                  <span>{bathroomCount}</span>
                </div>
                
                <div className="flex items-center">
                  <BiArea className="mr-2" />
                  <span>{area} Marla</span>
                </div>

             </div>
                
              );
        }

        return "Information";
    },[roomCount])

    return ( 
        <div onClick={searchModal.onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full 
            shadow-sm hover:shadow-md transition cursor-pointer">
        
            <div className="flex flex-row items-center justify-between">

                <div className="text-sm font-semibold px-6">{cityLable}</div>

                <div className="hidden sm:block text-sm font-semibold px-11 border-x-[1px] flex-1 text-center">
                    {infoLabel}
                </div>

                <div className="text-sm pl-6 pr-2  flex flex-row items-center gap-3">
            
                    <div className="hidden sm:block">{purposeLabel}</div>
            
                    <div className="p-2 bg-blue-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
            
                </div>
            </div>
        </div>
    );
}
 
export default Search;