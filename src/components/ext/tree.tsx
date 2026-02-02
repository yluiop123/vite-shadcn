/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
    Edit,
    File,
    FilePlus,
    Folder,
    FolderOpen,
    FolderPlus,
    GripVertical,
    Trash2,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CreateHandler, DeleteHandler, MoveHandler, NodeApi, Tree, TreeApi } from "react-arborist";

export interface TreeData {
  id: string;
  name: string;
  children?: TreeData[];
  isIndeterminate?: boolean;
}

const TreeComponent = ({ initialData }: { initialData: TreeData[] }) => {
  // 关键修正：使用 data 属性，并手动管理数据状态
  const [data, setData] = useState(initialData);
  const treeRef = useRef<TreeApi<TreeData>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 当外部传入的 initialData 改变时，同步内部数据
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // 处理新建逻辑
  const handleCreate: CreateHandler<TreeData> = ({ parentId, type }) => {
    const newNode = { id: Math.random().toString(36).substring(7), name: "" };
    // 在受控模式下，这里通常配合后端 API 或全局状态管理更新
    console.log("Create node", type, "under", parentId);
    return newNode;
  };

  // 处理删除逻辑
  const handleDelete: DeleteHandler<TreeData> = ({ ids }) => {
    console.log("Delete nodes", ids);
  };

  const handleMove: MoveHandler<TreeData> = ({ dragIds, parentId, index }) => {
    console.log("Nodes moved", dragIds, "to", parentId, "at index", index);
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md border rounded-xl p-3 bg-background shadow-sm h-[600px] flex flex-col text-foreground">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <span className="text-sm font-bold px-2">结构树</span>
        <div className="flex gap-1">
          <button 
            onClick={() => treeRef.current?.createInternal()} 
            className="p-1.5 hover:bg-accent rounded border border-input transition-colors"
          >
            <FolderPlus className="h-4 w-4" />
          </button>
          <button 
            onClick={() => treeRef.current?.createLeaf()} 
            className="p-1.5 hover:bg-accent rounded border border-input transition-colors"
          >
            <FilePlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Tree<TreeData>
          ref={treeRef}
          data={data} // 关键修正：从 initialData 改为 data
          width="100%"
          height={500}
          rowHeight={40}
          onCreate={handleCreate}
          onMove={handleMove}
          onDelete={handleDelete}
          padding={15}
          indent={24}
        >
          {Node}
        </Tree>
      </div>
    </div>
  );
};

function Node({
  node,
  style,
  dragHandle,
}: {
  node: NodeApi<TreeData>;
  style: React.CSSProperties;
  dragHandle?: any;
}) {
  const isFolder = !node.isLeaf;

  const { isChecked, isIndeterminate } = useMemo(() => {
    if (!isFolder || !node.children || node.children.length === 0) {
      return { isChecked: node.isSelected, isIndeterminate: false };
    }
    const allSelected = node.children.every((child) => child.isSelected);
    const someSelected = node.children.some(
      (child) => child.isSelected || (child.data as any).isIndeterminate
    );
    const indeterminate = !allSelected && someSelected;
    (node.data as any).isIndeterminate = indeterminate;
    return { isChecked: allSelected, isIndeterminate: indeterminate };
  }, [node.isSelected, node.children, isFolder]);

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    const targetState = checked === "indeterminate" ? true : !!checked;
    const toggleRecursive = (n: NodeApi<TreeData>, state: boolean) => {
      if (state) n.select();
      else n.deselect();
      if (n.children) n.children.forEach((child) => toggleRecursive(child, state));
    };
    toggleRecursive(node, targetState);
  };

  const handleRowClick = () => {
    if (isFolder) {
      node.toggle(); 
    } else {
      if (node.isSelected) {
        node.deselect();
      } else {
        node.select();
      }
    }
  };

  return (
    <div style={style} className="group outline-none">
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1 mx-1 rounded-md transition-all cursor-pointer select-none",
          node.isSelected
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-accent text-muted-foreground hover:text-foreground"
        )}
        onClick={handleRowClick}
      >
        <div
          ref={dragHandle}
          className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity p-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4" />
        </div>

        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Checkbox
            checked={isIndeterminate ? "indeterminate" : isChecked}
            onCheckedChange={handleCheckboxChange}
            className={cn(
              "h-4 w-4 border-muted-foreground",
              (isChecked || isIndeterminate) && "border-primary bg-primary text-primary-foreground"
            )}
          />
        </div>

        <div className="shrink-0">
          {isFolder ? (
            node.isOpen ? <FolderOpen className="h-4 w-4 text-primary" /> : <Folder className="h-4 w-4 text-primary/70" />
          ) : (
            <File className="h-4 w-4 opacity-60" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {node.isEditing ? (
            <input
              autoFocus
              className="w-full bg-background border rounded px-1 outline-none ring-2 ring-primary/20 text-sm h-6 text-foreground"
              defaultValue={node.data.name}
              onBlur={(e) => node.submit(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") node.submit(e.currentTarget.value);
                if (e.key === "Escape") node.reset();
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate block text-sm">
              {node.data.name || (isFolder ? "新文件夹" : "新文件")}
            </span>
          )}
        </div>

        <div className="hidden group-hover:flex items-center gap-0.5">
          {isFolder && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                node.tree.create({ parentId: node.id, type: "leaf" });
              }}
              className="p-1 hover:bg-primary/20 rounded-sm"
            >
              <FilePlus className="h-3.5 w-3.5 text-primary" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              node.edit();
            }}
            className="p-1 hover:bg-primary/20 rounded-sm"
          >
            <Edit className="h-3.5 w-3.5 text-primary" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              node.tree.delete(node.id);
            }}
            className="p-1 hover:bg-destructive/20 rounded-sm text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TreeComponent;