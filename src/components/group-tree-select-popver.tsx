
import axios from "@/lib/axios";
import { useUserStore } from '@/store';
import { useEffect, useState } from "react";
import { NodeApi } from "react-arborist";
import { TreeNode, TreeSelectPopover } from './tree-select';
export function GroupTreeSelectPopover(props: { onSelect: (node: NodeApi<TreeNode>[]) => void }) {
  const { onSelect } = props
  const [arrayData, setArrayData] = useState<TreeNode[]>([{id:'00',name:'00',parentId:'',level:0,order:0}]);
  const [choose, setChoose] = useState<{id:string,name:string}>({id:'00',name:'00'});
  const {userInfo}=useUserStore();
  const groupId=userInfo?.group;
  useEffect(()=>{
    axios.get('/common/groups/'+groupId).then(res=>{
      setArrayData(res.data);
      setChoose({id:res.data[0].id,name:res.data[0].name});
    })
  },[groupId])
 
  return (
    <TreeSelectPopover data={arrayData} choose={choose}
      onSelect={(node) => {
        if (node.length > 0) {
          onSelect(node);
        }
      }} />)
}
