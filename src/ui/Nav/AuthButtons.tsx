import { authService } from "@/src/lib/authConstant"
import { X } from "lucide-react"
import { easeInOut } from "motion"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { startTransition, useState, useTransition } from "react"
type AuthButtonProps = {
    signUpModal: boolean;
    logInModal: boolean
    setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
    setLogInModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AuthButtons({ signUpModal, logInModal, setSignUpModal, setLogInModal }: AuthButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null)
    return (
        <div className="flex flex-row gap-2 font-bold">
            {/** ###### Sign up form  ####### */}
            <div className="relative">
                <button
                    onClick={() => {
                        setSignUpModal(true)
                        setLogInModal(false)
                    }}
                    className="py-2  px-4 bg-(--btn-secondary) border cursor-pointer border-(--border) rounded-md text-[14px] hover:opacity-75 duration-200 ease-in-out">
                    Sign up
                    {/** Modal assisted by DaisyUI for less effort on styling it */}
                </button>
                {/** IT NEEDS Z-2000 to actually be dead center on the screen. */}
                {/** AnimatePresense is used to catch onload/ofload of the boolean. Helps play exit animation. */}

                <AnimatePresence>
                    {signUpModal && (
                        <motion.div
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => {
                                setError(null);
                                setSignUpModal(false);
                            }
                            }
                            className="fixed flex items-center justify-center z-2000 top-1/2 left-1/2 bg-black/80 -translate-x-1/2 -translate-y-1/2 w-screen h-screen">
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: easeInOut }}
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={(e) => {
                                    startTransition(async () => {
                                        setError(null);
                                        e.preventDefault()
                                        e.stopPropagation();
                                        const formInfo = new FormData(e.currentTarget)
                                        const email = String(formInfo.get("email")) ?? ""
                                        const password = String(formInfo.get("password")) ?? ""
                                        const first_name = String(formInfo.get("first_name")) ?? ""
                                        const last_name = String(formInfo.get("last_name")) ?? ""
                                        const response = await authService.registerAccount(email, password, first_name, last_name)
                                        if (response.ok) {
                                            // Session is now valid and a refresh will switch to profile stuff.
                                            setSignUpModal(false);
                                            return router.refresh();
                                        }
                                        else {
                                            return setError(response.error)
                                        }
                                    })
                                }}
                                className="flex flex-col gap-2 w-1/4 bg-(--bg-secondary) p-5 rounded-md shadow shadow-black">
                                <X size={14} onClick={() => setSignUpModal(false)} className="self-end" />
                                {/** Form : Email, first name last name phone number password */}
                                <div className="flex items-center justify-between gap-3">

                                    <div className="flex flex-1 flex-col gap-1">
                                        <p className="text-sm font-semibold">
                                            First name
                                        </p>

                                        <input
                                            name="first_name"
                                            type="text"
                                            placeholder="First name"
                                            required
                                            className="w-full rounded-md border border-(--border) bg-(--bg-secondary) px-3 py-2 outline-none transition focus:border-(--text-primary)"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col gap-1">
                                        <p className="text-sm font-semibold">
                                            Last name <span className = "text-xs"> (optional)</span>
                                        </p>

                                        <input
                                            name="last_name"
                                            type="text"
                                            placeholder="Last name"
                                            className="w-full rounded-md border border-(--border) bg-(--bg-secondary) px-3 py-2 focus:border-(--text-primary)"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold" >
                                        Email
                                    </p>

                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="your-email@gmail.com"
                                        required
                                        className=" w-full rounded-md border border-(--border) bg-(--bg-secondary) px-3 py-2 outline-none transition focus:border-(--text-primary)"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold">
                                        Password
                                    </p>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-md border border-(--border) bg-(--bg-secondary) px-3 py-2 outline-none transition focus:border-(--text-primary)"
                                    />
                                </div>

                                {/** Auth button, show loading animation when pending */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-(--btn-primary) hover:bg-(--btn-primary-hover) rounded-md duration-300 cursor-pointer p-2"
                                >
                                    {!isPending ? "Sign up" : <span className="loading loading-balls loading-md" />}
                                </button>

                                <p className="text-center text-sm opacity-70">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => {
                                            setSignUpModal(false)
                                            setLogInModal(true)
                                        }}
                                        type="button"
                                        className="font-semibold underline hover:opacity-70"
                                    >
                                        Log in
                                    </button>
                                </p>
                                {error && (
                                    <p className="font-extrabold text-red-500 self-center">
                                        {error}
                                    </p>
                                )}
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/** ###### Log in form  ####### */}
            <div className="relative">
                <button
                    onClick={() => {
                        setSignUpModal(false)
                        setLogInModal(true)
                    }}
                    className="py-2 px-4 bg-(--btn-primary) cursor-pointer border border-(--border) rounded-md text-[14px] hover:opacity-75 duration-200 ease-in-out">
                    Log in
                </button>
                <AnimatePresence>
                    {logInModal && (
                        <motion.div
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => {
                                setError(null);
                                setLogInModal(false)
                            }
                            }
                            className="fixed flex items-center justify-center z-2000 top-1/2 left-1/2 bg-black/80 -translate-x-1/2 -translate-y-1/2 w-screen h-screen">
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: easeInOut }}
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={(e) => {
                                    startTransition(async () => {
                                        setError(null);
                                        e.preventDefault()
                                        e.stopPropagation();
                                        const formInfo = new FormData(e.currentTarget)
                                        const email = String(formInfo.get("email")) ?? ""
                                        const password = String(formInfo.get("password")) ?? ""
                                        const response = await authService.signIn(email, password)
                                        if (response.ok) {
                                            // Session is now valid and a refresh will switch to profile stuff.
                                            setLogInModal(false);
                                            return router.refresh();
                                        }
                                        else {
                                            return setError(response.error)
                                        }
                                    })
                                }}
                                className="flex flex-col gap-2 w-1/4 bg-(--bg-secondary) p-5 rounded-md shadow shadow-black">
                                <div className="flex flex-col gap-1">
                                    <X size={14} onClick={() => setLogInModal(false)} className="self-end" />
                                    <p className="text-sm font-semibold" >
                                        Email
                                    </p>

                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="your-email@gmail.com"
                                        required
                                        className=" w-full rounded-md border border-(--border) bg-(--bg-secondary) px-3 py-2 outline-none transition focus:border-(--text-primary)"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold">
                                        Password
                                    </p>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-md border border-(--border) bg-(--bg-secondary) px-3 py-2 outline-none transition focus:border-(--text-primary)"
                                    />
                                </div>
                                {/** Auth button, show loading animation when pending */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-(--btn-primary) hover:bg-(--btn-primary-hover) rounded-md duration-300 cursor-pointer p-2"
                                >
                                    {!isPending ? "Sign up" : <span className="loading loading-balls loading-md" />}
                                </button>

                                <p className="text-center text-sm opacity-70">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => {
                                            setSignUpModal(true)
                                            setLogInModal(false)
                                        }}
                                        type="button"
                                        className="font-semibold underline hover:opacity-70"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                                {error && (
                                    <p className="font-extrabold text-red-500 self-center">
                                        {error}
                                    </p>
                                )}
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}