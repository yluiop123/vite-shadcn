import { http, HttpResponse } from 'msw';

const zh ={
    'user':'用户',
    'dept':'部门',
}
const en ={
    'user':'User',
    'dept':'Dept',
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
    name: `${user}${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    dept: "01",
    deptName: dept+"1",
    defaultRole: "0000001",
    status: "0",
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
    })
];
export default handlers;