
import axios from "@/lib/axios";
import { useUserStore } from '@/store';
import { useEffect, useState } from "react";
import { TreeNode, TreeSelectPopover } from './tree-select';
export function GroupTreeSelectPopover( props: {defaultValue?:string,onChange:(node:TreeNode[])=>void}) {
  const [arrayData, setArrayData] = useState<TreeNode[]>([]);
  const {userInfo}=useUserStore();
  const {onChange,defaultValue}=props;
  const groupId=userInfo?.group;
  const [choose, setChoose] = useState<TreeNode>({ } as TreeNode);
  useEffect(()=>{
    axios.get('/common/groups/'+groupId).then(res=>{
      setArrayData(res.data.data);
      const arrayData:TreeNode[] = res.data.data;
      const defaultChoose = arrayData.find((item) => item.id === defaultValue)||res.data.data[0];
      setChoose(defaultChoose);
    })
  },[groupId,defaultValue])
 
  return (
    arrayData.length>0&&<TreeSelectPopover onChange={onChange} data={arrayData} choose={choose} setChoose={setChoose} />)
}
