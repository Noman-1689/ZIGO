import prisma from "@/app/libs/prismadb";

export interface IListingsParams {

  userId?: string;
  roomCount?: number;
  bathroomCount?: number;
  area?: number;
  city?: string;
  purpose?: string;
  type?: string

}

export default async function getListings(params: IListingsParams){
    try{

        const {
          userId,
          roomCount,
          bathroomCount,
          area,
          purpose,
          city,
          type 

        } = params;

        let query: any ={};

        if(userId){
          query.userId = userId;
        }

        if(purpose){
          query.purpose = purpose;
        }

        if(type){
          query.type = type;
        }
        

        if(roomCount){
          query.roomCount = {
            gte: +roomCount
          }
        }

        if(bathroomCount){
          query.bathroomCount = {
            gte: +bathroomCount
          }
        }

        if(area){
          query.area = {
            gte: +area
          }
        }

        if(city){
          query.city = city;
        }

        const listings = await prisma.listing.findMany({

          where: query,
          
            orderBy:{
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          }));
      
          return safeListings;
        } catch (error: any) {
          throw new Error(error);
        }
      }