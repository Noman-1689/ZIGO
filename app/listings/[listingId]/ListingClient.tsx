'use client';

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { types } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
      user: SafeUser;
    };
    currentUser?: SafeUser | null;
  }

  
  const ListingClient: React.FC<ListingClientProps> = ({listing,reservations = [],currentUser}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
    
        reservations.forEach((reservation: any) => {
          const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate)
          });
    
          dates = [...dates, ...range];
        });
    
        return dates;
      }, [reservations]);

      const [isLoading, setIsLoading] = useState(false);
      const [totalPrice, setTotalPrice] = useState(listing.price);
      const [dateRange, setDateRange] = useState<Range>(initialDateRange);

      const onCreateReservation = useCallback(() => {
        if (!currentUser) {
          return loginModal.onOpen();
        }
        setIsLoading(true);
  
        axios.post('/api/reservations', {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: listing?.id
        })
        .then(() => {
          toast.success('Listing reserved!');
          setDateRange(initialDateRange);
          router.push('/trips');
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
    },
    [
      totalPrice, 
      dateRange, 
      listing?.id,
      router,
      currentUser,
      loginModal
    ]);
    
  
    /******************* If we use tokken functionality ***********************/

    // useEffect(() => {
    //     if (dateRange.startDate && dateRange.endDate) {
    //       const dayCount = differenceInDays(
    //         dateRange.endDate, 
    //         dateRange.startDate
    //       );
          
    //       if (dayCount && listing.price) {
    //         setTotalPrice(dayCount * listing.price);
    //       } else {
    //         setTotalPrice(listing.price);
    //       }
    //     }
    //   }, [dateRange, listing.price]);


    /****************** For type icons ********************/

    // const type = useMemo(()=>{
    //     return types.find((item)=>{
    //         item.label === listing.type
    //     })
    // },[listing.type])

    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    city={listing.city}
                    locationValue = {listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                    />

                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                  
                    <ListingInfo
                        user={listing.user}
                        purpose={listing.purpose}
                        type = {listing.type}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        area = {listing.area}
                        city={listing.city}
                        price = {listing.price}
                        tvLounge={listing.tvLounge}
                        balcony={listing.balcony}
                        kitchen={listing.kitchen}
                        drawingRoom={listing.drawingRoom}
                        servantQuaters={listing.servantQuaters}

                    />

                    <div className="order-first mb-10 md:order-last md:col-span-3">
                    <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setDateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        disabledDates={disabledDates}
                        />
                    </div>
                </div>

                </div>
            </div>
        </Container>
     );
}
 
export default ListingClient;