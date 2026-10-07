"use client"
import Image from "next/image";
export default function Navbar({loggedIn}: {loggedIn: boolean}){
    console.log(loggedIn)
    return(
        <div className="flex w-full items-center justify-between h-16.25 py-2">
          <Image
            src="/lost_found_logo.svg"
            alt="Lost&Found@SDSU logo"
            height={65}
            width={65}
            sizes="800px"
            className="object-contain max-h-full"
          />
          {!loggedIn ? (
            <div className="flex flex-row gap-2 font-bold">
              <button className="py-2 px-4 bg-(--btn-secondary) border cursor-pointer border-(--border) rounded-md text-[14px] hover:opacity-75 duration-200 ease-in-out">
                Sign in
              </button>
              <button className="py-2 px-4 bg-(--btn-primary) cursor-pointer border border-(--border) rounded-md text-[14px] hover:opacity-75 duration-200 ease-in-out">
                Log in
              </button>
            </div>
          ) : (
            <div className="">
              <Image
                src="/blank_pfp.png"
                alt="Profile Picture"
                height={65}
                width={65}
                className="object-contain rounded-full border border-(--border-stronger)" />
            </div>
          )}
        </div>
    )
}