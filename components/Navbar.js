import Link from 'next/link'
import ColorSwitch from './ColorSwitch'
import Image from 'next/image'

const Navbar = () => {
  return(
    <nav>
      <div className="w-screen mx-auto py-3 px-3 sm:px-6 lg:px-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-auto items-center justify-between px-4 py-2 ">

          <div className="flex-initial items-center block align-middle">
          <Link href="/"><a>
              <div className="align-middle mr-3 hidden sm:inline-block">
                <Image className="transform rotate rotate-45" src="/svg/logo-symbol.svg" height={50} width={60} />
              </div>
              <div className="hidden sm:inline-block">
                  <h1 className="font-sans text-xl"><span className="font-bold">Nico</span><span className="ml-1">Abbink</span></h1>
              </div>
            </a></Link>
          </div>

          <div className="w-0 flex-auto text-md md:text-md items-baseline space-x-5 text-center text-base font-light text-black dark:text-white">
            {/*
              <Link href="/"><a className="">Home</a></Link>
              <Link href="/cases"><a>Projects</a></Link>
              <Link href="/about"><a>About</a></Link>
              <Link href="/contact"><a>Contact</a></Link>
            */}
          </div>

          <div className="flex flex-wrap items-center py-2">
            <ColorSwitch toggleName={"ColorSwitch"}> </ColorSwitch>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
