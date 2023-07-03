'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useCities from "@/app/hooks/useCities";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ReservationListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {

  const router = useRouter();

  const { getByValue } = useCities();
  const city = getByValue(data.city);

  const location = data.locationValue

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div  onClick={() => router.push(`/listings/${data.id}`)} 
    className="col-span-1 cursor-pointer group">

    <div className="flex flex-col gap-2 w-full border">
        <div className="aspect-video w-full relative overflow-hidden">

            <Image className="object-cover h-full w-full group-hover:scale-110 transition"
               fill src={data.imageSrc} alt="Listing"/>

            <div className="absolute top-3 right-3">
                <HeartButton listingId={data.id} currentUser={currentUser}/>
            </div>   
        </div>
        
        <div className="px-4 font-semibold text-lg">
          {location}, {city?.label}
        </div>
        <div className="px-4 font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="px-4 flex flex-row items-center gap-1">

         <div className="font-light">PKR</div>
         <div className="font-semibold">{price}</div>

        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ReservationListingCard;