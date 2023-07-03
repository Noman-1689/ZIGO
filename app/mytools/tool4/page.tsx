import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";

export default function Tool4() {

  const information = [
    {
      title: "All Records on Transfer of Land",
      description: "Save yourself from the hassle of traditional methods. Book an appointment and get your Fards and Mutation in a digital format."
    },
    {
      title: "Location & Addresses of Properties",
      description: "Find all the relevant details of any property's location, with its complete official address, including information such as tehsil, district, and tasla etc."
    },
    {
      title: "All Records of Ownership",
      description: "Check out all the ownership information of any property unit for transparent transactions, including possession history."
    },
  ]


    return (
      <Container>
        <div className="mt-10"></div>
        <Heading
          title="Land Records"
          subtitle="Providing you with an all-inclusive platform to help you get verified property details with digital convenience."
          center
         />

          <div className="flex flex-col md:flex-row justify-center my-20 gap-8">

            <div className="flex flex-col items-center text-center w-2/6 sm:w-full p-8 shadow-md hover:border-2 hover:border-blue-500 hover:shadow-lg">
                <h3 className="text-2xl font-semibold">Punjab</h3>
                <p className="my-4">Get verified land record details via Punjab Land Record Authority (PLRA)</p>
                <a href="https://onlinefard.punjab-zameen.gov.pk/" target="_blank" rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    
                  Punjab Land Records
                </a>
            </div>

            <div className="flex flex-col items-center text-center w-2/6 sm:w-full p-8 shadow-md hover:border-2 hover:border-blue-500 hover:shadow-lg">
                <h3 className="text-2xl font-semibold">Sindh</h3>
                <p className="my-4">Acquire certified land record details via the Sindh Board of Revenue (BoR)</p>
                <a href="http://sindhzameen.gos.pk/SearchCNIC.aspx" target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    
                  Sindh Land Records
                </a>
            </div>

          </div>


          <Heading
            title="Information in Land Records"
            subtitle="revent forgeries and counter discrepancies in documents with computerised details of original land records in your respective provinces."
            center
            />

        <div className="mt-10 grid gap-x-32 gap-y-16 
          grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-3 
          lg:grid-cols-3 
          xl:grid-cols-3 
          2xl:grid-cols-3">

    
      {information.map((information, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col text-center justify-center">
            <h3 className="text-lg font-semibold mb-2">{information.title}</h3>
            <p className="text-sm">{information.description}</p>
          </div>
        </div>
      ))}
    </div>

  </Container>
    )
  }
  