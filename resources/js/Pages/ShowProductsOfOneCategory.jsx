import React, { useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

const ShowProductsOfOneCategory = ({ auth }) => {
  const { props } = usePage();
  const category = props.category;
  const [qty, setQty] = useState(1)
  const csrfToken = props.csrf_token;

  const HandelClick = () => {
    setQty(prevQty => prevQty + 1);
  }


  return (
    <>
      <Head title="index" />
      <div className="bg-gray-50 text-black/50  dark:bg-black dark:text-white/50">
        <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="grid grid-cols-3 items-center gap-2 py-10 lg:grid-cols-3">
              <div className="flex lg:col-start-1 lg:justify-start">
                <img className='w-40' src="../images/ZawadiBasket.png" alt="" />
              </div>
              <div>
                {/* <form className="max-w-md mx-auto">
                  <div className="relative">
                    <input type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none rounded-lg bg-gray-50 " placeholder="Search Mockups, Logos..." required />
                    <button type="submit" value={""} className="text-white absolute end-2.5 bottom-2.5  outline-none font-medium rounded-lg text-sm px-4 py-2  ">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </button>
                  </div>
                </form> */}
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

        {
          category ? (
            <div>
              <div className=' flex px-12 items-center w-full border my-5 h-16 bg-[#a09892] text-white'>
                <p className=' font-bold text-[20px]'> Category: <span > {category.name}</span></p>
              </div>
              <div className=' mx-8 grid grid-cols-4  '>
                {
                  category?.products ?
                    category.products.map((product) => (
                      <div id="docs-card " className="flex bg-white justify-center" key={product.id}>
                        <div className="relative flex items-center bg-white justify-center gap-6 lg:items-end my-8">
                          <div id="docs-card-content" className="flex items-start gap-6 flex-col">
                            <div className=" w-full">
                              <img
                                src={`/storage/${product.image}`}
                                className="rounded-t-[20px] h-40 w-full"
                                alt={product.name}
                              />
                              <div className="bg-[#0bc15c] text-white">
                                <p>Free Shipping Over</p>
                                <p>30$</p>
                              </div>
                            </div>
                            <div>
                              <h1>{product.name}</h1>
                              <p>{product.description || 'No description available'}</p>
                              <p>{product.favorites || 0} favorites</p>
                            </div>
                            <div>
                              <img className="w-6" src="/images/etoile.png" alt="star icon" />
                            </div>
                            <form action={route('sale')} method='POST' >
                              <input type="hidden" name="_token" value={csrfToken} />
                              <div className='grid grid-cols-2 items-center mb-6'>
                                <div>
                                  <p>{product.price}$</p>
                                </div>
                                <div className='flex items-center'>
                                  {/* <p>Size</p> */}
                                  <select name="size" id="">
                                    <option value="">choose size</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                  </select>
                                </div>
                              </div>
                              <div className='grid grid-cols-2 w-full h-12 '>
                                <div className="relative flex items-center h-12 max-w-[8rem]">
                                  <button
                                    type="button"
                                    onClick={() => setQty(prevQty => Math.max(prevQty - 1, 1))} // Prevent negative values
                                    id="decrement-button"
                                    className="bg-gray-100 h-12 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 p-3 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                  >
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                  </button>

                                  {/* <input
                                    type="number"
                                    id="quantity-input"
                                    name="qty"
                                    min="0"
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))} // Allow manual input
                                    className="bg-gray-50 border-x-0 border-gray-300 h-12 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                  /> */}

                                  <input type="text" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="bg-gray-50 border-x-0 border-gray-300 h-12 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly={true} />
                                  <button onClick={() => HandelClick()} type="button" id="increment-button" className="bg-gray-100 dark:bg-gray-700 h-12 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300  p-3  focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" >
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                  </button>
                                </div>
                                <input hidden name='product_id' type="text" value={product.id} />
                                <div className=' flex justify-end'>
                                  <button type='submit' className=' w-full text-center text-white p-2 bg-[#ea580c] h-12'>Add To Cart</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    ))
                    :
                    <div>
                      <p>This category does not have a products</p>
                    </div>
                }
              </div>
            </div>
          ) : (
            <div>
              <p>Category Does Not Exist</p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ShowProductsOfOneCategory