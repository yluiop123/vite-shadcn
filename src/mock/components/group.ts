import { http, HttpResponse } from 'msw';

const zh ={
    'user':'用户',
    'group':'组织',
    'success':'成功',
    '00':'全部',
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
    '00':'All',
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
const handlers = [
  http.get<{ id: string }>('/api/common/groups/:id', async ({  request,params }) => {
    const locale = request.headers.get("locale") || "zh";
    const id = params.id;
    console.log(id);
    const dataArray = [
      { id: "00", name: localeMap[locale]['00'],parentId:"",depth:0,order:0 },
      { id: "0001", name: localeMap[locale]['0001'],parentId:"00",depth:1,order:0 },
      { id: "0002", name: localeMap[locale]['0002'],parentId:"00",depth:1,order:1 },
      { id: "0003", name: localeMap[locale]['0003'],parentId:"00",depth:1,order:2 },
      { id: "000301", name: localeMap[locale]['000301'],parentId:"0003",depth:2,order:0 },
      { id: "000302", name: localeMap[locale]['000302'],parentId:"0003",depth:2,order:1 },
      { id: "000303", name: localeMap[locale]['000303'],parentId:"0003",depth:2,order:2 },
    ]
    return HttpResponse.json({
        code: 200,
        data:dataArray
  })
  }),
];
export default handlers;