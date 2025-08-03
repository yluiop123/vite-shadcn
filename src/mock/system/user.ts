import { http, HttpResponse } from 'msw';

const zh ={
    'user':'用户',
    'group':'组织',
    'success':'成功',
    '0001':'人事部',
    '0002':'后勤部',
    '0003':'研发部',
    '000301':'研发1部',
    '000302':'研发2部',
    '000303':'研发3部',

}
const en ={
    'user':'User',
    'group':'Group',
    'success':'Success',
    '0001':'Human Resources Department',
    '0002':'IT Department',
    '0003':'Development Department',
    '000301':'Development 1 Department',
    '000302':'Development 2 Department',
    '000303':'Development 3 Department',
}
const localeMap: Record<string, Record<string, string>> = {
  zh,
  en,
};
type User = {
    id: string
    name: string
    username: string
    email: string
    group: string
    groupName: string
    defaultRole: string
    status: "0" | "1"
    create: string
    update: string
    phone: string
}
const handlers = [
  http.post<never, never>('/api/system/users', async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    const user = localeMap[locale]['user'];
    const body = await request.clone().json();
    const {filterField,filterValue,group,page,size} = body;
    const dataArray = [
      { id: "0001", name: localeMap[locale]['0001'],parentId:"00",depth:1,order:0 },
      { id: "0002", name: localeMap[locale]['0002'],parentId:"00",depth:1,order:1 },
      { id: "0003", name: localeMap[locale]['0003'],parentId:"00",depth:1,order:2 },
      { id: "000301", name: localeMap[locale]['000301'],parentId:"0003",depth:2,order:0 },
      { id: "000302", name: localeMap[locale]['000302'],parentId:"0003",depth:2,order:1 },
      { id: "000303", name: "研发3部",parentId:"0003",depth:2,order:2 },
    ]
    const list   = Array.from({ length: 23 }, (_, i) => ({
    id: `${i+100000000}`,
    name: `${user}${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    group: dataArray[i%6].id,
    groupName: dataArray[i%6].name,
    defaultRole: "0000001",
    status: "0",
    phone: `${13800000000 + i}`,
    create: "2025-01-01 23:59:59",
    update: "2025-01-01 23:59:59",
    })) as User[];
    const filterList = list.filter((item) => 
      item[filterField as keyof User].startsWith(filterValue)&&
      item.group.startsWith(group));
    const start = (page-1)*size;
    const result = filterList.slice(start,start+size);
    return HttpResponse.json({
        code: 200,
        data: {
          list:result,
          total:filterList.length,
        }}
      )
  }),
  http.delete<{ id: string },never>('/api/system/users', async ({ request,params}) => {
    const locale = request.headers.get("locale") || "zh";
    const ids = await request.clone().json();
    console.log(ids);
    return HttpResponse.json({
          code:200,
          message:localeMap[locale]['success']
        }
      )
  })
];
export default handlers;