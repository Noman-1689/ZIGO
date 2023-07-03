'use client'

import useSellModal from "@/app/hooks/useSellModel";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { types, purposes } from '../navbar/Categories';
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CitySelect from "../inputs/CitySelect";
import Input from "../inputs/Input";
import dynamic from 'next/dynamic'
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FeatureCounter from "../inputs/FeatureCounter";
import { Checkbox } from "@material-tailwind/react";

enum STEPS{

    PURPOSE = 0,
    TYPE = 1,
    LOCATION = 2,
    INFO = 3,
    DESCRIPTION = 4,
    FEATURES1 = 5,
    IMAGES = 6,

}

const SellModal = () => {

    const router = useRouter();
    const sellModal = useSellModal();

    const [step, setStep] = useState(STEPS.PURPOSE);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({

        defaultValues:{

            title: '',
            description: '',
            purpose: '',
            category: '',
            type: '',
            city: null,
            locationValue: '',
            area: 1,
            roomCount: 0,
            bathroomCount: 0,
            imageSrc: '',
            contact: '',
            price: 1,
            tvLounge: 0,
            balcony: 0,
            kitchen: 0,
            drawingRoom: 0,
            servantQuaters: 0

        }
    });

    const purpose = watch('purpose');
    const type = watch('type');
    const city = watch('city');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const tvLounge = watch('tvLounge');
    const balcony = watch('balcony');
    const kitchen = watch('kitchen');
    const drawingRoom = watch('drawingRoom');
    const servantQuaters = watch('servantQuaters');

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [city]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value)=> value - 1);
    }

    const onNext = ()=>{
        setStep((value)=> value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        
        if(step !== STEPS.IMAGES){
            return onNext();
        }
        
        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Listing Created!');
            router.refresh();
            reset();
            setStep(STEPS.PURPOSE);
            sellModal.onClose();
        })
        .catch(()=>{
            toast.error('Something went wrong!');
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.IMAGES){
            return 'Create';
        }

        return 'Next';
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.PURPOSE){
            return undefined;
        }

        return 'Back';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="What do you want to do?" subtitle="Select your purpose"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">

            {purposes.map((item) => (
            <div key={item.label} className="col-span-1">
                <CategoryInput
                    onClick={(purpose) => setCustomValue('purpose', purpose)}
                    selected={purpose===item.label}
                    label={item.label}
                    icon={item.icon}
            />
          </div>
        ))}
            </div>
        </div>
    )

    if(step === STEPS.TYPE){
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading title="What kind of property do you have?" subtitle="Select your category"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">

            {types.map((item) => (
            <div key={item.label} className="col-span-1">
                <CategoryInput
                    onClick={(type) => setCustomValue('type', type)}
                    selected={type===item.label}
                    label={item.label}
                    icon={item.icon}
            />
          </div>
        ))}
            </div>
        </div>
        )
    }

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" subtitle="Help us find you!"/>

                <CitySelect value={city} onChange={(value)=>setCustomValue('city',value)}/>
                
                <Input
                    id="locationValue"
                    label="Address"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />

                <Map center={city?.latlng}/>
            </div>
        )
    }

    if(step === STEPS.INFO){

        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place" subtitle="What amenites do you have?"/>

                <Counter
                    title="Room"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value)=> setCustomValue('roomCount', value)}
                />

                <hr />

                <Counter
                    title="Bathroom"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value)=> setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share your details" subtitle=""/>

                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <Input
                    id="contact"
                    label="Phone Number"
                    type="tel"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <hr />

                <Input
                    id="area"
                    label="Area in marla"
                    type = "number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <Input
                    id="price"
                    label={watch('purpose') === 'Rent' ? 'Rent / month' : 'Price'}
                    type="number"
                    formatPrice={true}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    if(step === STEPS.FEATURES1){

        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add features of your place" subtitle="What amenites do you have?"/>
    
                    <FeatureCounter
                    title="TV Lounge"
                    value={tvLounge}
                    onChange={(value)=> setCustomValue('tvLounge', value)}
                    />

                    <FeatureCounter
                    title="Balcony"
                    value={balcony}
                    onChange={(value)=> setCustomValue('balcony', value)}
                    />

                    <FeatureCounter
                    title="Kitchen"
                    value={kitchen}
                    onChange={(value)=> setCustomValue('kitchen', value)}
                    />

                    <FeatureCounter
                    title="Drawing Room"
                    value={drawingRoom}
                    onChange={(value)=> setCustomValue('drawingRoom', value)}
                    />

                    <FeatureCounter
                    title="Servant Quaters"
                    value={servantQuaters}
                    onChange={(value)=> setCustomValue('servantQuaters', value)}
                    />

            </div>
            )

    }


    if(step === STEPS.IMAGES){
        bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Add images of your place" subtitle="Show how your place look like"/>

            <ImageUpload
                onChange={(value) => setCustomValue('imageSrc', value)}
                value={imageSrc}
            />
        </div>
        )
    }

    return ( 
        <Modal 
            isOpen = {sellModal.isOpen}
            onClose={sellModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel= {actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.PURPOSE ? undefined : onBack}
            title="Upload your property details"
            body={bodyContent}
        />
     );
}
 
export default SellModal;