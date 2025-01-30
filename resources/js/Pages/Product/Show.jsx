import React from 'react'
import { usePage } from '@inertiajs/react';

const Show = () => {
    const { id } = usePage().props;
    return (
        <div>Show {id} </div>
    )
}

export default Show