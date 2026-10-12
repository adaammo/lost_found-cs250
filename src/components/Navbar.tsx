"use client"
import { X } from "lucide-react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../lib/authConstant";
import { UserDatabaseProfile } from "../lib/types";
import AuthButtons from "../ui/Nav/AuthButtons";
{/**
  This is the navbar function.
  It reads a users existence and shows login/signup if it doesnt exist or a default profile picture
  @return navbar ui
   */}

export default function Navbar({ user }: { user: UserDatabaseProfile | null }) {
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [logInModal, setLogInModal] = useState<boolean>(false);
  const [logOutModal, setLogOutModal] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  return (
    <div className="flex w-full items-center justify-between h-16.25 py-2">
      <Image
        src="/lost_found_logo.svg"
        alt="Lost&Found@SDSU logo"
        height={65}
        width={65}
        sizes="800px"
        className="object-contain max-h-full"
      />
      {/** Conditional render: If a user is not logged in then register auth buttons else its their profile */}

      {!user ? (
        <AuthButtons signUpModal={signUpModal} logInModal={logInModal} setSignUpModal={setSignUpModal} setLogInModal={setLogInModal} />
      ) : (

        <div className="flex gap-1 items-center">
          <Image
            onClick={() => setLogOutModal(p => !p)}
            src="/blank_pfp.png"
            alt="Profile Picture"
            height={50}
            width={50}
            className="object-contain cursor-pointer rounded-full border border-(--border-stronger)" />
          <AnimatePresence>
            {logOutModal && (
              <motion.button
                initial = {{opacity: 0, x: 10}}
                animate = {{opacity: 1, x: 0}}
                exit = {{opacity: 0, x: 10}}
                transition={{duration: 0.25, ease: easeInOut}}
                onClick={async () => {
                  await authService.logout();
                  setLogOutModal(false);
                  router.refresh();
                }}
                className="flex gap-1 rounded-md cursor-pointer border border-(--border) bg-(--btn-primary) px-6 py-2 font-bold text-sm  hover:opacity-75 duration-200"
              >
                Log out?
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}