'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import useContactModal from "@/app/hooks/useContactModal"

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {

  const contactModal = useContactModal();

  return ( 

    <>

<div className="flex flex-row gap-4 mb-4 justify-end">
          
          <button onClick={contactModal.onOpen} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <BiPhoneCall size={25}/>
          </button>
  
          <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <AiOutlineWhatsApp size={25}/>
          </button>
  
        </div>



    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">

      <div className="flex flex-row items-center gap-1 p-4">

        <div className="text-2xl font-semibold">Availablity Schedule</div>

      </div>

      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
        onChangeDate(value.selection)}
      />

      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
        />
      </div>

      <hr />

      {/* <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>PKR {totalPrice}</div>
      </div> */}

    </div>

    </>
   );
}
 
export default ListingReservation;