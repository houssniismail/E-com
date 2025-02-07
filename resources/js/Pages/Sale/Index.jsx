import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Index = ({ auth }) => {
    return (
        <>
            <Head title="index" />
            <div className="bg-gray-50 min-h-screen text-black/50 dark:bg-black dark:text-white/50">
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                /> */}
                <div className="relative flex  flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-3 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-1 lg:justify-start">
                                <img className='w-40' src="./images/ZawadiBasket.png" alt="" />
                            </div>
                            <div>
                                <form className="max-w-md mx-auto">
                                    {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
                                    <div className="relative">
                                        <input type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none rounded-lg bg-gray-50 " placeholder="Search Mockups, Logos..." required />
                                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5  outline-none font-medium rounded-lg text-sm px-4 py-2  ">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <div className='grid grid-cols-2 items-center'>
                                        <Link
                                            href={route(`${auth.user.role}.dashboard`)}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('cart')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.75 8.25A.75.75 0 0 0 3 9v10.125c0 1.418 1.207 2.625 2.625 2.625h12.75c1.418 0 2.625-1.149 2.625-2.566V9a.75.75 0 0 0-.75-.75H3.75Z" clipRule="evenodd"></path>
                                                <path d="M7.5 8.25v-1.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5v1.5"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href={'login'}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index