import { UserButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <div className='flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800'>
        <div className='py-10 flex flex-col bg-[#2B2929] dark:bg-slate-800'>
          <h1 className='text-5xl font-bold  text-white space-y-5 px-5 py-5'>
            Welcome to Dropbox. <br /><br />
            Storing everything for you and your business needs. All in one place
          </h1>
          <p className='pb-20 pt-5 px-5 text-white'>
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize, and access files from anywhere.
            Securely store important document and media, and experience the
            convenience of easy file management and sharing in one centralized
            solution.
          </p>

          <Link
            href='/dashboard'
            className='flex cursor-pointer p-5 bg-blue-500 w-fit mx-5 text-white'
          >
            Try it for free!
            <ArrowRight className='ml-10' />
          </Link>
        </div>
        <div>
          <video autoPlay loop muted className='rounded-lg px-5'>
            <source
              src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4'
              type='video/mp4'
            />
            your browser does not support this video tag.
          </video>
        </div>
      </div>

      <UserButton />
    </main>
  );
}
