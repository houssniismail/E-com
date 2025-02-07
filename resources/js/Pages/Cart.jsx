import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

const Cart = ({ auth }) => {
    const { props } = usePage();
    const csrfToken = props.csrf_token;
    const [productsSale, setProductsSale] = useState(props.productsSale)
    const handleRemove = async (saleId) => {
        try {
            const response = await fetch(`/sale/${saleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete sale');
            }

            setProductsSale(prevState => prevState.filter(sale => sale.id !== saleId));

        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };



    return (
        <>
            <Head title="index" />
            <div className="bg-gray-50 h-[100vh] text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-3 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-1 lg:justify-start">
                                <img className='w-40' src="./images/ZawadiBasket.png" alt="" />
                            </div>
                            <div>
                                <form className="max-w-md mx-auto">
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
                                    <Link
                                        href={route(`${auth.user.role}.dashboard`)}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
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

                <div className=' grid grid-cols-3 m-3'>
                    <div className='col-span-2 border m-4'>
                        <div className=' rounded-t-lg  border h-16 flex items-center mx-4 mt-4 pl-8 bg-[#f5f5f5]'>
                            <p>Seller: <span className=' text-black font-bold'>Trendyol</span></p>
                        </div>
                        <div className='mx-4'>
                            {
                                productsSale && productsSale.length > 0 ? (
                                    <div>
                                        {productsSale.map(sale => (
                                            <div key={sale.id}>
                                                {sale && sale.products.length > 0 && (
                                                    <div className='grid grid-cols-4 pt-4'>

                                                        <div className='pl-4 mx-auto'>
                                                            <img className='w-16' src={`/storage/${sale.products[0].image}`} alt={sale.products[0].name} />
                                                        </div>

                                                        <div className='pl-4 mx-auto'>
                                                            <p className='text-black font-bold'>{sale.products[0].name}</p>
                                                            <p>Delivery 21 - 23 January</p>
                                                            <p>Size: {sale.size}</p>
                                                        </div>
                                                        <div className='pl-4 mx-auto'>
                                                            <p className='text-black font-bold'>{sale.products[0].price} AED</p>
                                                            <p>Savings: 44.00 AED</p>
                                                        </div>
                                                        <div className='text-red-600 pl-4 mx-auto'>
                                                            <button onClick={() => handleRemove(sale.id)}>
                                                                <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20.979 4.5H15.75V2.25A.75.75 0 0 0 15 1.5H9a.75.75 0 0 0-.75.75V4.5H3.021L3 6.375h1.547l.942 14.719A1.5 1.5 0 0 0 6.984 22.5h10.032a1.5 1.5 0 0 0 1.496-1.404l.941-14.721H21L20.979 4.5ZM8.25 19.5l-.422-12h1.547l.422 12H8.25Zm4.5 0h-1.5v-12h1.5v12Zm1.125-15h-3.75V3.187A.188.188 0 0 1 10.313 3h3.374a.188.188 0 0 1 .188.188V4.5Zm1.875 15h-1.547l.422-12h1.547l-.422 12Z"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <p>No sales found.</p>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                    <div className='border m-4'>
                        <div className=' m-4 border rounded-xl bg-white'>
                            <form className="m-8 max-w-md mx-auto">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative px-4">
                                    <input type="search" id="default-search" className=" block w-full p-4 ps-10 h-12 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                    <button type="submit" className="text-white right-4 absolute end-0 bottom-0 h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className=' m-4 border rounded-xl bg-white'>
                            <div className='mx-4 my-2'>
                                <h1>Order summary</h1>
                            </div>
                            <div className=' flex justify-between mx-4'>
                                <p>Subtotal</p>
                                <p className=' font-bold text-black'>222.98 AED</p>
                            </div>
                            <div className=' flex justify-between mx-4'>
                                <p>Shipping</p>
                                <p className=' font-bold text-black'>30.00 AED</p>
                            </div>
                            <div className=' flex justify-between mx-4'>
                                <p>Free Shipping over 100 AED</p>
                                <p className=' font-bold text-green-500'>-30.00 AED</p>
                            </div>
                            <div className='my-2 p-3 mx-4 h-12 bg-[#f0fdf4] text-white rounded-xl flex justify-between '>
                                <p className=' text-black font-bold'>Promotions</p>
                                <p className='text-green-500'>-30.00 AED</p>
                            </div>
                            <div className=' flex justify-between mx-4'>
                                <p>Total <span>(VAT included)</span></p>
                                <p>136.89 AED</p>
                            </div>
                            <div className='mx-4 my-2 '>
                                <button className=' h-12 w-full bg-[#f27a1a] text-white rounded-xl'>Check Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart