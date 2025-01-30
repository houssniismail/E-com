import { usePage } from '@inertiajs/react'
import React from 'react'

const Update = () => {
  const {id} = usePage().props;
  return (
    <div>Edit {id} </div>
  )
}

export default Update