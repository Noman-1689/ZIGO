'use client'

import Search from "./Search";

const SearchSection = () => {

  const imageURL = "https://www.slidebackground.com/uploads/real-estate-background/real-estate-homebuy-home-banner-background-homebuym-1.jpg";

  return (
    <div className="h-1/3 flex items-center justify-center">
     <div className="bg-cover bg-center h-full w-full flex items-center justify-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageURL})`,
            opacity: 1,
          }}
>
        <div className="text-4xl font-bold text-white capitalize text-center bg-opacity-75 w-2/5">
          <h1 className="mb-8">Your dream house</h1>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
