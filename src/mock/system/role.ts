import { http, HttpResponse } from "msw";

const zh ={
    'super':'超级管理员',
    'admin':'管理员',
    'user':'普通用户',
     success: "操作成功",
}
const en ={
    'super':'Super',
    'admin':'Admin',
    'user':'User',
    success: "Success",
}
const localeMap: Record<string, Record<string, string>> = {
  zh,
  en,
};
type Role = {
  id: string;
  name: string;
  role: string;
  status: "0" | "1";
  create: string;
  update: string;
};
function getRoleList(locale: string) {
  const role = localeMap[locale];
  const list = [{
      id: `0001`,
      name: `${role.super}`,
      role: `super`,
      status: "1",    
      create: "2025-01-01 23:59:59",
      update: "2025-01-01 23:59:59",
    },{
      id: `0002`,
      name: `${role.admin}`,
      role: `admin`,
      status: "1",    
      create: "2025-01-01 23:59:59",
      update: "2025-01-01 23:59:59",
    },{
      id: `0003`,
      name: `${role.user}`,
      role: `user`,
      status: "1",    
      create: "2025-01-01 23:59:59",
      update: "2025-01-01 23:59:59",
    }] as Role[];
  return list;
}
const handlers = [
  http.post<never, never>("/api/system/roles", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    const body = await request.clone().json();
    const {
      role,
      name,
      status,
      page,
      size,
      orderField,
      orderValue,
    } = body;
    const list = getRoleList(locale);
    let filterList = list;
    if (role) {
      filterList = filterList.filter((item) => item.role.startsWith(role));
    }
    if (name) {
      filterList = filterList.filter((item) => item.name.startsWith(name));
    }
    if (status&&status!=='all') {
      filterList = filterList.filter((item) => item.status === status);
    }
    if (orderField) {
      list.sort((a, b) => {
        if (orderValue === "asc") {
          return a[orderField as keyof Role] > b[orderField as keyof Role]
            ? 1
            : -1;
        }
        return a[orderField as keyof Role] < b[orderField as keyof Role]
          ? 1
          : -1;
      });
    }
    const start = (page - 1) * size;
    const result = filterList.slice(start, start + size);
    return HttpResponse.json({
      code: 200,
      data: {
        list: result,
        total: filterList.length,
      },
    });
  }),
  http.delete<{ id: string }, never>(
    "/api/system/roles",
    async ({ request }) => {
      const locale = request.headers.get("locale") || "zh";
      const ids = await request.clone().json();
      console.log(ids);
      return HttpResponse.json({
        code: 200,
        message: localeMap[locale]["success"],
      });
    }
  ),
  http.post<never, never>("/api/system/roles/add", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.post<never, never>("/api/system/roles/edit", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.get<{ id: string }>(
    "/api/system/roles/detail/:id",
    async ({ request, params }) => {
      const locale = request.headers.get("locale") || "zh";
      const id = params.id;
      const list = getRoleList(locale);
      const role = list.find((item) => item.id === id);
      return HttpResponse.json({
        code: 200,
        data: role,
      });
    }
  ),
];

export default handlers;
