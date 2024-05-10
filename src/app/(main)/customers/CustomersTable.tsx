"use client"
import { TableComponent } from '@/components/common/CustomTable'
import { Button } from '@/components/ui/button'
import { type Customer } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import { useMemo } from 'react'

export const CustomersTable = ({ customers }: { customers: Customer[] }) => {

    const columns = useMemo<ColumnDef<Customer, object | number | string>[]>(() => [
        {
            accessorFn: (_row, index) => index + 1,
            header: "S/N",
        },
        {
            accessorKey: "name",
            header: "Name"
        }, {
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "phone",
            header: "Phone"
        },
        {
            accessorKey: "id",
            id: "Actions",
            accessorFn: (row) => {
                return row.name
            },
            enableSorting: false,
            header: "Actions",
            cell: () => {
                return (
                    <Button size={"icon"} variant={"ghost"}><MoreVertical /></Button>
                )
            }
        }
    ], [])

    return (
        <TableComponent data={customers} columns={columns} selectable isLoading={!customers} />
    )
}
