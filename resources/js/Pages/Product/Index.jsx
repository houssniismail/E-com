import DeleteButton from '@/Components/DeleteButton';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth }) {

  const { props } = usePage();
  const products = props.products || [];

  const handleProductDelete = (deletedId) => {
    setCategoryList(categoryList.filter((category) => category.id !== deletedId));
  };
  return (
    <>
      <Head title="index" />
      <div className="bg-gray-50 h-[100vh] text-black/50 dark:bg-black dark:text-white/50">
        <img
          id="background"
          className="absolute -left-20 top-0 max-w-[877px]"
        />
        <div className="relative flex  flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
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
                      href={route('login')}
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
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
          <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">Image</th>
                      <th scope="col" className="px-4 py-3">Name</th>
                      <th scope="col" className="px-4 py-3">Price</th>
                      <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <p>No products found.</p>
                    ) : (
                      products.map((product) => (
                        <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" key={product.id}>
                          <th
                            scope="row"
                            className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <img
                              src={`/storage/${product.image}`}
                              alt={product.name}
                              className="w-auto h-8 mr-3"
                            />

                          </th>
                          <td className="px-4 py-2">{product.name}</td>
                          <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${product.price}
                          </td>
                          <td className=" flex ">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show</button>
                            <DeleteButton Id={product.id} onDelete={handleProductDelete} />                              <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                              <a href={`/product/${product.id}/edit`} className="text-white">Edit</a>
                            </button>

                          </td>
                        </tr>
                      ))
                    )}

                  </tbody>
                </table>
              </div>
              <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>


                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Previous</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Next</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

