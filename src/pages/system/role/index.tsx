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
import { Label } from "@/components/ui/label";
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
import { statusEnum } from "@/lib/dict";
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
export default function Role() {
    const intl = useIntl();
    type TableParams = {
        page: number
        size: number
        role?: string
        name?: string
        status?: string
        orderField?: string
        orderValue?: "asc" | "desc"
    }
  
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        role: '',
        name: '',
        status: 'all'
    } as TableParams);

    useEffect(() => {
        function fetchData(params: TableParams) {
            axios.post("/system/roles", params).then(res => {
                setData(res.data.data);
            })
        }
        fetchData(params); // 初次加载
    }, [params]);
    const [data, setData] = useState<{
        list: Role[]
        total: number
    }>({
        list: [],
        total: 0,
    })
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [id, setId] = useState('' as string);


    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    function handleEdit(row: Role) {
        setId(row.id);
        setIsEditDialogOpen(true);
    }
    function handleDelete(rows: Role[]) {
        if (rows.length === 0) {
            return;
        }
        axios.delete("/system/roles", {
            data: rows.map(item => item.id)
        }).then(res => {
            setParams({ ...params, page: 1 });
            toast.success(res.data.message);
        })

    }
    function handleStatusChange(row: Role) {
        axios.post("/system/roles/edit",
            {...row}).then(res => {
            toast.success(res.data.message);
        })
    }
    type Role = {
        id: string
        name: string
        role: string
        status: "0" | "1"
        create: string
        update: string
    }
    const columns: ColumnDef<Role>[] = [
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
                title: intl.formatMessage({ id: 'page.system.role.header.name' }),
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
                        {intl.formatMessage({ id: 'page.system.role.header.name' })}
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div >{row.getValue("name")}</div>,
        },
        {
            accessorKey: "role",
            header: intl.formatMessage({ id: 'page.system.role.header.role' }),
            cell: ({ row }) => (
                <div >{row.getValue("role")}</div>
            ),
        },
        {
            accessorKey: "create",
            header: intl.formatMessage({ id: 'page.system.role.header.createTime' }),
            cell: ({ row }) => (
                <div >{row.getValue("create")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: intl.formatMessage({ id: 'page.system.role.header.status' }),
            cell: ({ row }) =>
                <StatusSwitch
                initial={row.getValue("status") as string}
                onChange={(val) => {
                    handleStatusChange({id: row.original.id,status:val } as Role);
                }}/>
            ,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const role = row.original as Role;
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
                            <DropdownMenuItem onClick={() => handleEdit(role)}>{intl.formatMessage({ id: 'button.edit' })}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete([role])}>{intl.formatMessage({ id: 'button.delete' })}</DropdownMenuItem>
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
                <div className="flex items-center gap-4">
                    <Label className="whitespace-nowrap" htmlFor="roleName">{intl.formatMessage({ id: 'page.system.role.header.name' })}</Label>
                    <Input id="roleName" type="text" placeholder="" value={params.name} onChange={(e) => setParams({ ...params, name: e.target.value })} />
                </div>
                <div className="flex items-center gap-4">
                    <Label className="whitespace-nowrap" htmlFor="roleId">{intl.formatMessage({ id: 'page.system.role.header.role' })}</Label>
                    <Input id="roleId" type="text" placeholder="" value={params.role} onChange={(e) => setParams({ ...params, role: e.target.value })} />
                </div>                
                
                <div className="flex items-center gap-2">
                    <Label className="whitespace-nowrap">{intl.formatMessage({ id: 'page.system.role.header.status' })}</Label>
                    <Select 
                        onValueChange={(value) =>
                            setParams({ ...params, status: value })
                        } defaultValue={params.status}>
                        <SelectTrigger className="flex items-center">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from(statusEnum).map(([key, value]) => {
                                    return (
                                        <SelectItem key={value} value={key}>{intl.formatMessage({ id: `dict.status.${value}` })}</SelectItem>
                                    )
                                })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button onClick={() => setIsAddDialogOpen(true)}>{intl.formatMessage({ id: 'button.add' })}</Button>
                    <AddDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} onSave={() => setParams({ ...params, page: 1 })}/>
                    <Button onClick={() => handleDelete(table.getSelectedRowModel().rows.map(row => row.original))}>{intl.formatMessage({ id: 'button.delete' })}</Button>
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
