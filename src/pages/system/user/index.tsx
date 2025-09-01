import { GroupTreeSelectPopover } from "@/components/group-tree-select-popver";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "@/lib/axios";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "sonner";
import AddDialog from "./add-dialog";
import EditDialog from "./edit-dialog";
function StatusSwitch({ initial, onChange }: { initial: string; onChange: (val: string) => void }) {
  const [checked, setChecked] = useState(initial === "1")
  return (
    <Switch
      checked={checked}
      onCheckedChange={(value) => {
        setChecked(value)
        onChange(value ? "1" : "0")
      }}
    />
  )
}
export default function User() {
    const intl = useIntl();
    type TableParams = {
        page: number
        size: number
        filterField: string
        filterValue: string
        group: string
        groupName: string
        orderField?: string
        orderValue?: "asc" | "desc"
    }
  
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        filterField: 'name',
        filterValue: '',
        group: '',
        groupName: ''
    } as TableParams);

    useEffect(() => {
        function fetchData(params: TableParams) {
            axios.post("/system/users", params).then(res => {
                setData(res.data.data);
            })
        }
        fetchData(params); // 初次加载
    }, [params]);
    const [data, setData] = useState<{
        list: User[]
        total: number
    }>({
        list: [],
        total: 0,
    })
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [id, setId] = useState('' as string);


    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    function handleEdit(row: User) {
        setId(row.id);
        setIsEditDialogOpen(true);
    }
    function handleReset(row: User) {
        axios.post("/system/users/reset/" + row.id).then(res => {
            toast.success(res.data.message);
        })
    }
    function handleDelete(rows: User[]) {
        if (rows.length === 0) {
            return;
        }
        axios.delete("/system/users", {
            data: rows.map(item => item.id)
        }).then(res => {
            setParams({ ...params, page: 1 });
            toast.success(res.data.message);
        })

    }
    function handleStatusChange(row: User) {
        axios.post("/system/users/edit",
            {...row}).then(res => {
            toast.success(res.data.message);
        })
    }
    type User = {
        id: string
        name: string
        username: string
        email: string
        group: string
        groupName: string
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
            meta: {
                title: intl.formatMessage({ id: 'page.system.user.header.name' }),
            },
            enableHiding: false,
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            // column.toggleSorting(column.getIsSorted() === "asc")
                            const isAsc = column.getIsSorted() === "asc";
                            const newSorting = [{ id: "name", desc: isAsc }];
                            table.setSorting(newSorting);
                            setParams({ ...params, orderValue: isAsc ? "desc" : "asc", orderField: 'name' } )                        
                            }}
                    >
                        {intl.formatMessage({ id: 'page.system.user.header.name' })}
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div >{row.getValue("name")}</div>,
        },
        {
            accessorKey: "username",
            header: intl.formatMessage({ id: 'page.system.user.header.userName' }),
            cell: ({ row }) => (
                <div >{row.getValue("username")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: intl.formatMessage({ id: 'page.system.user.header.email' }),
            cell: ({ row }) => (
                <div >{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: intl.formatMessage({ id: 'page.system.user.header.phone' }),
            cell: ({ row }) => (
                <div >{row.getValue("phone")}</div>
            ),
        },
        {
            accessorKey: "groupName",
            header: intl.formatMessage({ id: 'page.system.user.header.groupName' }),
            cell: ({ row }) => (
                <div >{row.getValue("groupName")}</div>
            ),
        },
        {
            accessorKey: "create",
            header: intl.formatMessage({ id: 'page.system.user.header.createTime' }),
            cell: ({ row }) => (
                <div >{row.getValue("create")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: intl.formatMessage({ id: 'page.system.user.header.status' }),
            cell: ({ row }) =>
                <StatusSwitch
                initial={row.getValue("status") as string}
                onChange={(val) => {
                    handleStatusChange({id: row.original.id,status:val } as User);
                }}/>
            ,
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
                            <DropdownMenuLabel>{intl.formatMessage({ id: 'table.actions' })}</DropdownMenuLabel>

                            {/* <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.username)}
                            >
                                Copy payment ID
                            </DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(user)}>{intl.formatMessage({ id: 'button.edit' })}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete([user])}>{intl.formatMessage({ id: 'button.delete' })}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReset(user)}>{intl.formatMessage({ id: 'button.reset.password' })}</DropdownMenuItem>
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
            <EditDialog id={id} setOpen={setIsEditDialogOpen} open={isEditDialogOpen} 
            onSave={() => setParams({ ...params, page: 1 })} />

            <div className="flex items-center py-3 gap-4">
                <GroupTreeSelectPopover
                    onChange={(node) => {
                        if (node.length > 0) {
                            setParams({ ...params, group: node[0].id, groupName: node[0].name })
                        }
                    }}
                />
                <Select
                    onValueChange={(value) =>
                        setParams({ ...params, filterField: value })
                    } defaultValue={params.filterField}>
                    <SelectTrigger className="flex items-center">
                        <SelectValue placeholder="FilterField" />
                    </SelectTrigger>
                    <SelectContent>
                        {table
                            .getAllColumns()
                            .filter((column) => ['name', 'username', 'email', 'phone'].includes(column.id))
                            .map((column) => {
                                const header = column.columnDef.header;
                                const meta = column.columnDef.meta as { title: string };
                                const headerText = typeof header === 'string' || typeof header === 'number' ? header : meta.title;
                                return (
                                    <SelectItem key={column.id} value={column.id}>{headerText}</SelectItem>
                                )
                            })}
                    </SelectContent>
                </Select>
                <Input
                    placeholder={intl.formatMessage({ id: 'table.filterField' })}
                    value={params.filterValue}
                    onChange={(event) =>
                        setParams({ ...params, filterValue: event.target.value })
                    }
                    className="max-w-sm"
                />
                <div className="ml-auto flex items-center gap-2">
                    <Button onClick={() => setIsAddDialogOpen(true)}>{intl.formatMessage({ id: 'button.add' })}</Button>
                    <AddDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} onSave={() => setParams({ ...params, page: 1 })}/>
                    <Button onClick={() => handleDelete(table.getSelectedRowModel().rows.map(row => row.original))}>{intl.formatMessage({ id: 'button.delete' })}</Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            {intl.formatMessage({ id: 'table.columns' })} <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                const header = column.columnDef.header;
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {typeof header === 'string' || typeof header === 'number' ? header : column.id}
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
                    {params.page} /{" "}
                    {Math.ceil(data.total / params.size)}{"   "}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setParams({ ...params, page: params.page - 1 })}
                        disabled={params.page === 1}
                    >
                        {intl.formatMessage({ id: 'table.previous' })}

                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setParams({ ...params, page: params.page + 1 })}
                        disabled={params.page * params.size >= data.total}
                    >
                        {intl.formatMessage({ id: 'table.next' })}

                    </Button>
                </div>
            </div>
        </div>
    )
}
