'use client'

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CitySelect, { CitySelectValue } from "../inputs/CitySelect";
import qs from "query-string";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import { purposes } from "../navbar/Categories";

enum STEPS {

    CITY = 0,
    INFO = 1,
    TYPE = 2,
  }

const SearchModal = () => {

    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [city, setCity] = useState<CitySelectValue>();
    const [step, setStep] = useState(STEPS.CITY);

    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [area, setArea] = useState(5);

    const [purpose, setPurpose] = useState("Buy");

      const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [city]);

      const onBack = useCallback(() => {
        setStep((value) => value - 1);
      }, []);
    
      const onNext = useCallback(() => {
        setStep((value) => value + 1);
      }, []);

      
      const onSubmit = useCallback(async()=>{

        if(step != STEPS.TYPE){
            return onNext();
        }

        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any ={
            ...currentQuery,
            city: city?.value,
            location,
            roomCount,
            bathroomCount,
            area,
            purpose,
        }


          const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
          }, { skipNull: true });

          setStep(STEPS.CITY);
          searchModal.onClose();
          router.push(url);

      },[ 
        step, 
        searchModal, 
        location,
        city, 
        router, 
        roomCount,
        area,
        purpose,
        onNext,
        bathroomCount,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.TYPE) {
          return 'Search'
        }
    
        return 'Next'
      }, [step]);
    
      const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CITY) {
          return undefined
        }
    
        return 'Back'
      }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" center/>

            <CitySelect 
                value={city} 
                onChange={(value) => 
                setCity(value as CitySelectValue)} 
            />

            <hr />
            <Map center={city?.latlng} />
        </div>
    )

    if(step === STEPS.TYPE){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Select your category" subtitle="What kind of property do you want to search?" center/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">

            {purposes.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(value) => setPurpose(value)}
                  selected={purpose===item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
             ))}
          </div>
        </div>
      )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
              <Heading
                title="More information"
                subtitle="Find your perfect place!"
                center
              />

              <Counter 
                onChange={(value) => setRoomCount(value)}
                value={roomCount}
                title="Rooms" 
                subtitle="How many rooms do you need?"
              />     

              <hr />
              <Counter 
                onChange={(value) => setBathroomCount(value)}
                value={bathroomCount}
                title="Bathrooms"
                subtitle="How many bahtrooms do you need?"
              />

              <hr />
              <Counter 
                onChange={(value) => setArea(value)}
                value={area}
                title="Area"
                subtitle="How much area do you need?"
              />

            </div>
          )
    }

    return ( 
        <Modal
        isOpen={searchModal.isOpen}
        title="Filters"
        actionLabel={actionLabel}
        onSubmit={onSubmit}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CITY ? undefined : onBack}
        onClose={searchModal.onClose}
        body={bodyContent}
        />
     );
}
 
export default SearchModal;