import { api } from '@/trpc/server'
import { AddNewCustomer } from './AddNew'
import { CustomersTable } from './CustomersTable'

const CustomersPage = async () => {
    const customers = await api.customer.getAll()
    return (
        <div className='py-10'>
            <div className="flex items-center">
                <h3 className='mb-4 font-semibold text-4xl'>Customers</h3>
                <AddNewCustomer />
            </div>

            <CustomersTable customers={customers} />
        </div>
    )
}

export default CustomersPage