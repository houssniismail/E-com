import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl ">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900">
                            <div className=" grid grid-cols-4 max-w-screen-2xl ">
                                <a className=' m-4 w-full border p-4 text-center font-bold text-[30px] rounded-lg text-white bg-[#22c55e] ' href={'/products'}>List of products</a>
                                <a className=' m-4 w-full border p-4 text-center font-bold text-[30px] rounded-lg text-white bg-[#22c55e] ' href={'/categories'}>List of Categories</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
