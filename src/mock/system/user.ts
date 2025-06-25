import { http, HttpResponse } from 'msw';

const zh ={
    'user':'用户',
    'dept':'部门',
    'success':'成功',
}
const en ={
    'user':'User',
    'dept':'Dept',
    'success':'Success',
}
const localeMap: Record<string, Record<string, string>> = {
  zh,
  en,
};

const handlers = [
  http.post<never, never>('/api/system/users', async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    const dept = localeMap[locale]['dept'];
    const user = localeMap[locale]['user'];
    const body = await request.clone().json();
    const {username,page,size} = body;
    const list = Array.from({ length: 23 }, (_, i) => ({
    id: `${i+100000000}`,
    name: `${user}${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    dept: "01",
    deptName: dept+"1",
    defaultRole: "0000001",
    status: "0",
    phone: `${13800000000 + i}`,
    create: "2025-01-01 23:59:59",
    update: "2025-01-01 23:59:59",
    }))
    const filterList = list.filter((item) => item.username.startsWith(username));
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
  http.delete<{ id: string }>('/api/system/users/:id', async ({ request,params}) => {
    const locale = request.headers.get("locale") || "zh";
    const id = params.id;
    return HttpResponse.json({
        code: 200,
        data: {
          code:'S',
          message:localeMap[locale]['success'],
        }}
      )
  })
];
export default handlers;