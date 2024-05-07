import { Button } from '@/components/ui/button'
import React from 'react'
import { AddNewCustomer } from './AddNew'
import { CustomersTable } from './CustomersTable'

const CustomersPage = async () => {
    return (
        <div className='py-10'>
            <div className="flex items-center">
                <h3 className='mb-4 font-semibold text-4xl'>Customers</h3>
                <AddNewCustomer />
            </div>

            <CustomersTable />
        </div>
    )
}

export default CustomersPage