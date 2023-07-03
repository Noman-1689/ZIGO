'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";  
import Button from "../Button";

import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";


const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);
    const [isAgent, setIsAgent] = useState(false); // State to track the checkbox value

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({

        defaultValues: {
          name: '',
          email: '',
          password: '',
          role: '',
        },
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        data.role = data.role ? "agent" : "user";

        axios.post('/api/register', data)

        .then(() => {
          
          toast.success("Success!")
          loginModal.onOpen();
          registerModal.onClose();
          
        })

        .catch((error) => {
          toast.error('Something went wrong.');

        })

        .finally(() => {
          setIsLoading(false);
        })
      }

      const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
      }, [registerModal, loginModal])
      

      const handleCheckboxChange = useCallback(() => {
        setIsAgent(!isAgent); // Toggle the checkbox value
      }, [isAgent]);

      //Body content start ------------------------------------------

      const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
              title="Welocme to ZIGO"
              subtitle="Create an account"
              center
            />

              <Input 
              id="name"
              label="Name"
              type="text"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
                
            />

            <Input 
              id="email"
              type="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
                
            />

              <Input 
              id="password"
              type="password"
              label="Password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
                
            />

              <Input 
              id="role"
              type="checkbox"
              label="Register as Agent?"
              disabled={isLoading}
              register={register}
              errors={errors}
              onChange={handleCheckboxChange}
            />

            {isAgent && (

              <div className="flex flex-col gap-4">

                <hr />

                <Input 
                  id="agency"
                  label="Agency Name"
                  type="text"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required/>

                <Input 
                  id="agency_description"
                  label="Agency Description"
                  type="text"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required/>
                

                <Input 
                  id="agency_address"
                  label="Address"
                  type="text"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required/>

              </div>
            )}

        </div>
      )
    
       //Body content end ------------------------------------------

       //Footer content start ------------------------------------------
       
       const footerContent = (

        <div className="flex flex-col gap-4 mt-3">
        
        {!isAgent && (

          
        <>
        <hr />

        <Button 
          outline 
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')} 
        />

        {/* <Button 
          outline 
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => {}}
        /> */}

      </>

        )}

          <div className="text-neutral-500 text-center mt-4 font-light">

            <p>Already have an account?
              <span onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline"> Login</span>
            </p>
          </div>

        </div>
      )
    

      
       //Footer content end ------------------------------------------

    return ( 
        <Modal
        disabled = {isLoading}
        isOpen = {registerModal.isOpen}
        title = "Register"
        actionLabel ="Continue"
        onClose = {registerModal.onClose}
        onSubmit = {handleSubmit(onSubmit)}
        body = {bodyContent}
        footer = {footerContent} 
        />
     );
}
 
export default RegisterModal;