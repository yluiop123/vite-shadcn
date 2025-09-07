import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
    ExpandedState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
    getExpandedRowModel
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal,ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import React, { HTMLProps, useEffect, useState } from 'react';
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
function buildTree(data: Group[]): Group[] {
  const map = new Map<string, Group>();
  const roots: Group[] = [];

  // 初始化 map
  for (const item of data) {
    map.set(item.id, { ...item, subRows: [] });
  }

  // 构建树结构
  for (const item of data) {
    const node = map.get(item.id)!;
    if (item.parentId && map.has(item.parentId)) {
      const parent = map.get(item.parentId)!;
      parent.subRows!.push(node);
    } else {
      roots.push(node);
    }
  }

  // 递归排序函数
  function sortByOrder(nodes: Group[]) {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach((node) => {
      if (node.subRows && node.subRows.length > 0) {
        sortByOrder(node.subRows);
      }
    });
  }

  // 排序根节点
  sortByOrder(roots);
  return roots;
}

type Group = {
    name: string
    id: string
    status: "0" | "1"
    remark: string
    create: string,
    parentId?: string
    order: number
    subRows?: Group[]
}
import { Checkbox } from "@/components/ui/checkbox"

type IndeterminateCheckboxProps = {
  indeterminate?: boolean
  checked?: boolean
  className?: string
  onCheckedChange?: (checked: boolean | "indeterminate") => void
}

export function IndeterminateCheckbox({
  indeterminate,
  checked,
  className = "",
  onCheckedChange,
  ...rest
}: IndeterminateCheckboxProps) {
  // 合并 checked 状态
  const mergedChecked: boolean | "indeterminate" =
    indeterminate && !checked ? "indeterminate" : !!checked

  return (
    <Checkbox
      className={className + " cursor-pointer"}
      checked={mergedChecked}
      onCheckedChange={onCheckedChange}
      {...rest}
    />
  )
}
// function IndeterminateCheckbox({
//   indeterminate,
//   className = '',
//   ...rest
// }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
//   const ref = React.useRef<HTMLInputElement>(null!)

//   React.useEffect(() => {
//     if (typeof indeterminate === 'boolean') {
//       ref.current.indeterminate = !rest.checked && indeterminate
//     }
//   }, [ref, indeterminate])

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className={className + ' cursor-pointer'}
//       {...rest}
//     />
//   )
// }

const columns: ColumnDef<Group>[] = [
    {
        accessorKey: 'name',
        header: ({ table }) => (  
                      <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onCheckedChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{' '}
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
              className="inline-flex items-center justify-center w-6 h-6 cursor-pointer"
            >
              {table.getIsAllRowsExpanded() ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>{' '}
            Name
          </>          
            // <Checkbox
            //     checked={
            //         table.getIsAllPageRowsSelected() ||
            //         (table.getIsSomePageRowsSelected() && "indeterminate")
            //     }
            //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            //     aria-label="Select all"
            // />
        ),
        cell: ({ row,getValue }) => (
           <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onCheckedChange: row.getToggleSelectedHandler(),
                }}
              />{' '}
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                  }}
                  className="inline-flex items-center justify-center w-6 h-6 cursor-pointer"
                >
                  {row.getIsExpanded() ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              ) : (
                ''
              )}{' '}
              {getValue<boolean>()}
            </div>
          </div>
            // <Checkbox
            //     checked={row.getIsSelected()}
            //     onCheckedChange={(value) => row.toggleSelected(!!value)}
            //     aria-label="Select row"
            // />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <StatusSwitch
            initial={row.getValue("status") as string}
            onChange={(val) => {
                // handleStatusChange({id: row.original.id,status:val } as User);
            }}/>
        ),
    },
    {
        accessorKey: "order",
         header: "Order",
        cell: ({ row }) => <div className="lowercase">{row.getValue("order")}</div>,
    },
    {
        accessorKey: "create",
        header: "create",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("create")}</div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

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
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]

export default function Group() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [expanded, setExpanded] = React.useState<ExpandedState>({})
        const [data, setData] = useState<{
            list: Group[]
            total: number
        }>({
            list: [],
            total: 0,
        });
    function fetchData() {
        axios.post("/system/groups").then(res => {
            const treeData = buildTree(res.data.data);
            console.log(treeData);
            setData({list: treeData, total: res.data.data.length});
        })
    }
    useEffect(() => {
        fetchData();
    }, [])
    const table = useReactTable({
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
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
        getExpandedRowModel: getExpandedRowModel(),
        state: {
            expanded,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    return (
        <div className="w-full">
            <div className="flex items-center py-4">

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
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
