import React from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const Edit = ({ auth, product }) => {
  const { props } = usePage();
  const successMessage = props.flash?.success;
  const csrfToken = props.csrf_token;

  const { data, setData, put, processing } = useForm({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    image: null
  });

  const handleFileChange = (e) => {
    setData('image', e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name || '');
    formData.append('description', product.description || '');
    formData.append('price', product.price || '');

    if (product.image) {
      formData.append('image', product.image);
    }

    put(route('product.update', product.id), {
      data: formData,
      preserveScroll: true,
      onBefore: () => console.log("Updating product..."),
      onSuccess: () => console.log("Product updated successfully!"),
      onError: (errors) => console.error(errors),
    });
  };

  return (
    <div>

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
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit} encType="multipart/form-data" >
          <input type="hidden" name="_token" value={csrfToken} />
          <div className="mb-5">
            <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" id="product_name" name='name' value={data.name} onChange={(e) => setData('name', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">product description</label>
            <textarea id="description" name='description' value={data.description} onChange={(e) => setData('description', e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

          </div>
          <div className="mb-5">
            <label htmlFor="product_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
            <input type="number" id="product_price" name='price' value={data.price} onChange={(e) => setData('price', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required step="0.01" />
          </div>
          <div className="mb-5">
            <label htmlFor="product_image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
            <input type="file" id="product_image" name='image' onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" accept="image/*" />
          </div>
          <button type="submit" disabled={processing} className="text-white bg-[#f97316] hover:bg-[#f97316] focus:ring-4 focus:outline-none focus:ring-[#f97316] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#f97316] dark:hover:bg-[#f97316] dark:focus:ring-[#f97316]">Update Product</button>
        </form>
      </div>
    </div>

  )
}

export default Edit;