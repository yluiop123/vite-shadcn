import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "@/lib/axios"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { toast } from "sonner"
export default function User() {

    const intl = useIntl();
    const statusEnum = new Map([["0", "停用"], ["1", "启用"]]);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetchData(page,size,username); // 初次加载
    }, [page, size, username]);
    const [data, setData] = useState<{
        list: User[]
        total: number
    }>({
        list: [],
        total: 0,
    })
    function fetchData(page = 1, size = 10, username = "") {
        axios.post("/system/users", {
            page,
            size,
            username
        }).then(res => {
            setData(res.data);
        })
    }
    function handleEdit(row: User) {
        
    }
    function handleDelete(row: User) {
        axios.delete("/system/users/"+row.id).then(res => {
            if(res.data.code === "S"){
                fetchData(page,size,username);
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
        })
        
    }
    type User = {
        id: string
        name: string
        username: string
        email: string
        dept: string
        deptName: string
        defaultRole: string
        status: "0" | "1"
        create: string
        update: string
        phone: string
    }
    const columns: ColumnDef<User>[] = [
        {
            id: "select",
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
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {intl.formatMessage({ id: 'page.system.user.header.user' })}
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "username",
            header: intl.formatMessage({ id: 'page.system.user.header.userName' }),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("username")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: intl.formatMessage({ id: 'page.system.user.header.status' }),
            cell: ({ row }) => (
                <div className="capitalize">{statusEnum.get(row.getValue("status"))}</div>
            ),
        },
        {
            accessorKey: "email",
            header: intl.formatMessage({ id: 'page.system.user.header.email' }),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: intl.formatMessage({ id: 'page.system.user.header.phone' }),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("phone")}</div>
            ),
        },
        {
            accessorKey: "deptName",
            header: intl.formatMessage({ id: 'page.system.user.header.deptName' }),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("deptName")}</div>
            ),
        },
        {
            accessorKey: "defaultRole",
            header: intl.formatMessage({ id: 'page.system.user.header.defaultRole' }),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("defaultRole")}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original as User;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.username)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(user)}>{intl.formatMessage({ id: 'button.edit' })}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(user)}>{intl.formatMessage({ id: 'button.delete' })}</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ]
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: data.list,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-3">
                <Input
                    placeholder="Filter Names..."
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-2">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {data.total} row(s) selected.
                </div>
                <div className="space-x-2">
                    {page} /{" "}
                    {Math.ceil(data.total / size)}{"   "}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page * size >= data.total}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
