import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import { ThemeToggler } from './ThemeToggler';

function Header() {
  return (
    <header className='flex justify-between items-center'>
      <Link href='/' className='flex items-center space-x-2'>
        <div className='bg-[#0160fe] w-fit'>
          <Image
            src='https://www.shareicon.net/data/128x128/2015/11/08/668675_box_512x512.png'
            alt='logo'
            className='invert'
            height={50}
            width={50}
          />
        </div>
        <h1 className='font-bold text-xl'>Dropbox</h1>
      </Link>

      <div className='flex space-x-2 items-center px-5'>
        <ThemeToggler />

        <UserButton afterSignOutUrl='/' />
        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode='modal' />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
