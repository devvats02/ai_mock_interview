import AuthButtons from '@/components/AuthButton';
import Footer from '@/components/Footer';
import ResumeButtons from '@/components/ResumeButton';
import { isAuthenticated } from '@/lib/actions/auth.action';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {ReactNode} from 'react'

const RootLayout = async ({children} : {children : ReactNode})=>{

    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) redirect("/sign-in");
    
    return(
        <div className="root-layout">
      <nav className='flex'>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={35} height={30} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        <ResumeButtons/>
        <AuthButtons/>
      </nav>
      

      {children}
      <Footer/>
    </div>
    )
}
export default RootLayout;