import AddNewButton from '@/components/AddNewButton'
import PageHeading from '@/components/PageHeading'
import React from 'react'

const Promotion = () => {
  return (
    <div className="min-h-[90vh]">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9] flex justify-between items-center">
        <PageHeading title={"Promotion List"} backPath="/dashboard" />
        <AddNewButton target="promotion/add-new" />
      </div>
      {/* <JobList /> */}
    </div>
  )
}

export default Promotion