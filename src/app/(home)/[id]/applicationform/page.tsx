
import ApplicationForm from '@/components/ApplicationForm'
import React from 'react'

const page =async ({params}:any) => {
    const {id} = await params
    console.log(id)
  return (
    <div>
      <ApplicationForm position={id} />
    </div>
  )
}

export default page