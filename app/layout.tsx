import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import SellModal from './components/modals/SellModal'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'ZIGO',
  description: 'Property website',  //changes possible
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
 

  return (

    <html lang="en">



      <body className={font.className}>

        <ClientOnly>

          <ToasterProvider/>

          <SearchModal/>
          <SellModal/>
          <RegisterModal/>
          <LoginModal/>

          <Navbar currentUser={currentUser}/>


          
        </ClientOnly>

        <div className='pb-20'>
          {children}
        </div>
      </body>


    </html>
  )
}
