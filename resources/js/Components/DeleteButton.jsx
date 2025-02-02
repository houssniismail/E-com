import { usePage } from "@inertiajs/react";
import React from "react";
import { useForm } from "react-hook-form";


const DeleteButton = ({ Id, onDelete }) => {
    const { handleSubmit } = useForm();
    const { props } = usePage();
    const csrfToken = props.csrf_token;
    const onSubmit = async () => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const response = await fetch(`/category/${Id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Category deleted successfully!");
                if (onDelete) onDelete(Id);
            } else {
                alert("Failed to delete the category.");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="_token" value={csrfToken} />
            <button
                type="submit"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
                Delete
            </button>
        </form>
    );
};

export default DeleteButton;
