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
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from 'react';
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

export default function Group() {
  const { formatMessage } = useIntl();
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
      ),
      cell: ({ row, getValue }) => (
        <div
          style={{
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
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: formatMessage({ id: "page.system.group.header.status" }),
      cell: ({ row }) => (
        <StatusSwitch
          initial={row.getValue("status") as string}
          onChange={(val) => {
            handleStatusChange({id: row.original.id,status:val } as Group);
          }} />
      ),
    },
    {
      accessorKey: "order",
      header: formatMessage({ id: "page.system.group.header.Order" }),
      cell: ({ row }) => <div className="lowercase">{row.getValue("order")}</div>,
    },
    {
      accessorKey: "create",
      header: formatMessage({ id: "page.system.group.header.createTime" }),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("create")}</div>
      ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const role = row.original as Group;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{formatMessage({ id: 'table.actions' })}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(role)}>{formatMessage({ id: 'button.edit' })}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete([role])}>{formatMessage({ id: 'button.delete' })}</DropdownMenuItem>
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
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  type TableParams = {
      page: number
      size: number
      id?: string
      name?: string
      status?: string
  }
  const [params, setParams] = useState({
      page: 1,
      size: 10,
      id: '',
      name: '',
      status: 'all'
  } as TableParams);
  const [data, setData] = useState<{
    list: Group[]
    total: number
  }>({
    list: [],
    total: 0,
  });

  useEffect(() => {
    function fetchData(params: TableParams) {
    axios.post("/system/groups",params).then(res => {
      const treeData = buildTree(res.data.data);
      setData({ list: treeData, total: res.data.data.length });
    }
  )}
    fetchData(params);
  }, [params])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [id, setId] = useState('' as string);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  function handleEdit(row: Group) {
      setId(row.id);
      setIsEditDialogOpen(true);
  }
  function handleDelete(rows: string[]) {
      if (rows.length === 0) {
          return;
      }
      axios.delete("/system/roles", {
          data: rows
      }).then(res => {
          setParams({ ...params, page: 1 });
          toast.success(res.data.message);
      })

  }
  function handleStatusChange(row: Group) {
    axios.post("/system/groups/edit",
        {...row}).then(res => {
        toast.success(res.data.message);
    })
  }
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
      <EditDialog id={id} setOpen={setIsEditDialogOpen} open={isEditDialogOpen} 
      onSave={() => setParams({ ...params, page: 1 })} />
      <div className="flex items-center py-3 gap-4">
          <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap" htmlFor="groupName">{formatMessage({ id: 'page.system.group.header.name' })}</Label>
              <Input id="groupName" type="text" placeholder="" value={params.name} onChange={(e) => setParams({ ...params, name: e.target.value })} />
          </div>
          <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap" htmlFor="roleId">{formatMessage({ id: 'page.system.group.header.id' })}</Label>
              <Input id="groupId" type="text" placeholder="" value={params.id} onChange={(e) => setParams({ ...params, id: e.target.value })} />
          </div>
          
          <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">{formatMessage({ id: 'page.system.group.header.status' })}</Label>
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
                                  <SelectItem key={value} value={key}>{formatMessage({ id: `dict.status.${value}` })}</SelectItem>
                              )
                          })}
                  </SelectContent>
              </Select>
          </div>
          <div className="ml-auto flex items-center gap-2">
              <Button onClick={() => setIsAddDialogOpen(true)}>{formatMessage({ id: 'button.add' })}</Button>
              <AddDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} onSave={() => setParams({ ...params, page: 1 })}/>
              <Button onClick={() => handleDelete(table.getSelectedRowModel().flatRows.map((row) => row.original.id))}>{formatMessage({ id: 'button.delete' })}</Button>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                          {formatMessage({ id: 'table.columns' })} <ChevronDown />
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
