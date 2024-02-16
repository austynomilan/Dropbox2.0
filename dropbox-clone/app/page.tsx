import { UserButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <div>
        <div className='p-10 flex flex-col'>
          <h1 className='text-5xl font-bold bg-[#2B2929] dark:bg-slate-800 text-white space-y-5   '>
            Welcome to Dropbox. <br />
            Storing everything for you and your business needs. All in one place
          </h1>

          <Link href='/dashboard' className='flex '>
            Try it for free!
            <ArrowRight className='ml-5' />
          </Link>
        </div>
      </div>

      <UserButton />
    </main>
  );
}
