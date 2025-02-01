import { useForm } from "@inertiajs/react";
import React from "react";


const DeleteButton = ({ categoryId, onDelete }) => {
    const { handleSubmit } = useForm();

    const onSubmit = async () => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const response = await fetch(`/category/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Category deleted successfully!");
                if (onDelete) onDelete(categoryId); // Notify parent to update UI
            } else {
                alert("Failed to delete the category.");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
