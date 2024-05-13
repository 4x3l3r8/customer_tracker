/* eslint-disable react/prop-types */
import { type RankingInfo, rankItem, rankings } from '@tanstack/match-sorter-utils';
import {
    type ColumnDef,
    type Row,
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { type ReactElement, useEffect, useMemo, useState } from 'react';
// import { DebouncedInput } from './DebouncedInput';
import { MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { isEmptyObject } from '@/lib/utils';
import { type TableDataPrimitiveObject } from './index.t';
import { Checkbox } from '../ui/checkbox';
import DebouncedInput from './DebouncedInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface CustomTableProps<T extends TableDataPrimitiveObject> {
    title?: string;
    data: T[];
    columns: ColumnDef<T, string | number>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    size?: "sm" | "md" | "lg",
    variant?: "simple" | "striped";
    selectable?: boolean;
    isLoading?: boolean;
    SelectableAction?: (data: object) => ReactElement
}


export const fuzzyFilter = <TData extends Record<string, unknown> = Record<string, string>>(
    row: Row<TData>,
    columnId: string,
    value: string | number,
    addMeta: (arg0: { itemRank: RankingInfo }) => void
) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value as string, {
        threshold: rankings.MATCHES
    });

    // Store the itemRank info
    addMeta({
        itemRank
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};


export const TableComponent = <T extends TableDataPrimitiveObject>({
    data: tableData,
    columns: tableColumns,
    variant = "striped",
    selectable,
    title,
    searchPlaceholder = 'Search',
    isLoading,
    SelectableAction = (data: object) => <Button size={"icon"} onClick={() => alert(JSON.stringify(data))} variant={"ghost"}><MoreVertical /></Button>,
}: CustomTableProps<T>) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({})

    // const data = useMemo(() => tableData, [tableData]);
    const [data, setData] = useState<T[]>([]);

    const columns = useMemo(() => {
        if (!selectable) {
            return tableColumns
        } else {
            return [
                {
                    id: 'select',
                    header: ({ table }) => (
                        <Checkbox
                            checked={
                                table.getIsAllPageRowsSelected() ||
                                (table.getIsSomePageRowsSelected() && "indeterminate")
                            }
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                            aria-label="Select all"
                        />
                    ),
                    cell: ({ row }) => (
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    ),
                    enableSorting: false,
                    enableHiding: false
                },
                ...tableColumns
            ]
        }
    }, [selectable, tableColumns]);

    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    const table = useReactTable({
        data,
        columns,
        // columns:[],
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            globalFilter,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getRowId: (row) => row.id.toString(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    });

    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const rowsPerPage = table.getRowModel().rows.length;

    // Calculate the current range of records being displayed
    const startIndex = useMemo(() => pageIndex * pageSize, [pageIndex, pageSize]);
    const endIndex = useMemo(
        () => startIndex + (rowsPerPage || 1 - 1),
        [startIndex, rowsPerPage]
    );

    /* The above code is checking if the variable `variant` is equal to the string "striped". If the
    condition is true, the variable `striped` will be assigned a value of `true`. */
    const striped = variant === "striped"


    return (
        <Card>
            <CardContent className='p-3 overflow-hidden'>
                <div className='w-full items-center px-2 md:px-6 lg:px-8'>
                    <div className='whitespace-nowrap bg-white flex mb-3 items-center'>
                        {title && (
                            <h3 className="text-lg font-medium">{title}</h3>
                        )}
                        {!title && !isLoading && selectable && !isEmptyObject(rowSelection) && SelectableAction(rowSelection)}

                        {!isLoading && (
                            <div
                                className='ml-auto flex gap-2 items-center'
                            >
                                <DebouncedInput
                                    value={globalFilter ?? ''}
                                    onUpdate={(value) =>
                                        setGlobalFilter(String(value))
                                    }
                                    placeholder={searchPlaceholder}
                                />

                                {title && selectable && !isEmptyObject(rowSelection) && SelectableAction(rowSelection)}
                            </div>
                        )}

                    </div>
                    <div className="rounded-md border-[#D4D4D8] overflow-auto w-full">
                        <Table
                            className="w-full rounded-t-md divide-[#D4D4D8] text-start"
                        >
                            <TableHeader className='rounded-t-md bg-gray-800' color={!striped ? "white" : "black"}>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow className='rounded-t-md border-b-2' key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            if (header.id !== "Actions") {
                                                return (
                                                    <TableHead className=''
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        scope="col"
                                                    >
                                                        {header.isPlaceholder ? null : (
                                                            <Button variant={"link"} onClick={() => header.column.toggleSorting()} className={`${header.column.getCanSort() ? "cursor-pointer" : "cursor-default"}`} size={"sm"}>
                                                                <div className='flex items-start'>
                                                                    <span className='text-md'>
                                                                        {flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                    </span>

                                                                    {/* sort icons  */}
                                                                    {header.column.getCanSort() && (
                                                                        <div className='flex flex-col h-[12px] text-primary'>
                                                                            {{
                                                                                asc: (
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth="1.5"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                                                                                        />
                                                                                    </svg>
                                                                                ),
                                                                                desc: (
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth="1.5"
                                                                                        stroke="currentColor"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                                                                                        />
                                                                                    </svg>
                                                                                ),
                                                                                none: <></>
                                                                            }[
                                                                                header.column.getIsSorted()
                                                                                    ? String(header.column.getIsSorted())
                                                                                    : 'none'
                                                                            ] ?? <></>}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Button>
                                                        )}
                                                    </TableHead>
                                                );
                                            } else {
                                                return (
                                                    <TableHead key={header.id} className=''>
                                                        {header.isPlaceholder ? null : (
                                                            <span color={!striped ? "white" : "gray.600"} onClick={() => header.column.toggleSorting()} className={`${header.column.getCanSort() ? "cursor-pointer" : "cursor-default"}`}>
                                                                <div className='flex items-center'>
                                                                    <span className='ml-0'>
                                                                        {flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        )}
                                                    </TableHead>
                                                )
                                            }
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="border-t bg-white divide-y divide-[#D2E1EF]">
                                {/* if isLoading, use skeleton rows  */}
                                {isLoading &&
                                    new Array(5).fill("").map((_, i) => (
                                        <TableRow key={i} className="hover:bg-gray-100">
                                            {table.getHeaderGroups()[0]?.headers.map((header) => {
                                                return (
                                                    <TableCell
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        className="px-6 py-4 whitespace-nowrap"
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center  w-full">
                                                            <div className="text-sm text-gray-900 w-full">
                                                                <TdSkeleton />
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                {!isLoading &&
                                    table.getRowModel().rows.map((row) => {
                                        return (
                                            <TableRow key={row.id} className="hover:bg-gray-100">
                                                {row.getVisibleCells().map((cell) => {
                                                    if (cell.column.id !== "Actions") {
                                                        return (
                                                            <TableCell
                                                                key={cell.id}
                                                                scope="row"
                                                                className="py-4 whitespace-nowrap"
                                                            >
                                                                <div className="d-flex align-items-center justify-content-start">
                                                                    <div className="fs-3 text-lg text-gray-900 w-100 d-flex">
                                                                        {flexRender(
                                                                            cell.column.columnDef.cell,
                                                                            cell.getContext()
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                key={cell.id}
                                                                scope="row"
                                                                className="py-4 whitespace-nowrap"
                                                            >
                                                                <div className='flex justify-center'>
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                        )
                                                    }
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                {table.getRowModel().rows.length < 1 && (
                                    <TableRow className='text-center'>
                                        <TableCell className='text-center' colSpan={table.getAllColumns().length}>
                                            No data available!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {!isLoading && table.getPageCount() > 0 && (
                        <div className='flex flex-wrap md:flex-nowrap py-3 gap-2 md:gap-5 px-3 items-center justify-end'>
                            <span className='flex text-sm flex-row items-start md:items-center gap-1'>
                                <div>Showing</div>
                                {startIndex + 1} - {endIndex} of {table.getPageCount()}{' '}
                                {table.getPageCount() > 1 ? 'pages' : 'page'}
                            </span>

                            {(
                                <div>
                                    <Button
                                        variant="ghost"
                                        size={"icon"}
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            version="1.1"
                                            viewBox="0 0 17 17"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g></g>
                                            <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
                                        </svg>
                                    </Button>
                                    <Button
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                        variant="ghost"
                                        size={"icon"}
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            version="1.1"
                                            viewBox="0 0 17 17"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g></g>
                                            <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
                                        </svg>
                                    </Button>
                                </div>
                            )}

                            <Select
                                defaultValue={table.getState().pagination.pageSize.toString()}
                                onValueChange={(e) => {
                                    table.setPageSize(Number(e));
                                }}
                            >
                                <SelectTrigger className='w-full md:w-1/4'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} className="fs-4" value={pageSize.toString()}>
                                            Show {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};


export const TdSkeleton = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-5 bg-gray-200 animate-pulse"></div>
        </div>
    );
};
