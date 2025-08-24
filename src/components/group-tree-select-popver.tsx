
import axios from "@/lib/axios";
import { useUserStore } from '@/store';
import { useEffect, useState } from "react";
import { TreeNode, TreeSelectPopover } from './tree-select';
export function GroupTreeSelectPopover( props: {onChange:(node:TreeNode[])=>void}) {
  const [arrayData, setArrayData] = useState<TreeNode[]>([{id:'',name:'...',parentId:'',level:0,order:0}]);
  const {userInfo}=useUserStore();
  const {onChange}=props;
  const groupId=userInfo?.group;
  const [choose, setChoose] = useState<TreeNode>(arrayData[0]);
  useEffect(()=>{
    axios.get('/common/groups/'+groupId).then(res=>{
      setArrayData(res.data.data);
      setChoose(res.data.data[0]);
    })
  },[])
 
  return (
    <TreeSelectPopover onChange={onChange} data={arrayData} choose={choose} setChoose={setChoose} />)
}
