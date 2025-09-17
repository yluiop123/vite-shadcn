import { http, HttpResponse } from "msw";

const zh = {
  user: "用户",
  group: "组织",
  success: "成功",
  "00": "全部",
  "0001": "人事部",
  "0002": "后勤部",
  "0003": "研发部",
  "000301": "研发1部",
  "000302": "研发2部",
  "000303": "研发3部",
};
const en = {
  user: "User",
  group: "Group",
  success: "Success",
  "00": "All",
  "0001": "Human Resources Department",
  "0002": "IT Department",
  "0003": "Development Department",
  "000301": "Development 1 Department",
  "000302": "Development 2 Department",
  "000303": "Development 3 Department",
};
const localeMap: Record<string, Record<string, string>> = {
  zh,
  en,
};
function getGroupList(locale: string) {
    const dataArray = [
      {
        id: "0001",
        name: localeMap[locale]["0001"],
        parentId: "00",
        depth: 1,
        order: 0,
        status: "1",
        create: "2023-01-01",
      },
      {
        id: "0002",
        name: localeMap[locale]["0002"],
        parentId: "00",
        depth: 1,
        order: 1,
        status: "1",
        create: "2023-01-01",
      },
      {
        id: "0003",
        name: localeMap[locale]["0003"],
        parentId: "00",
        depth: 1,
        order: 2,
        status: "1",
        create: "2023-01-01",
      },
      {
        id: "000301",
        name: localeMap[locale]["000301"],
        parentId: "0003",
        depth: 2,
        order: 0,
        status: "1",
        create: "2023-01-01",
      },
      {
        id: "000302",
        name: localeMap[locale]["000302"],
        parentId: "0003",
        depth: 2,
        order: 1,
        status: "1",
        create: "2023-01-01",
      },
      {
        id: "000303",
        name: localeMap[locale]["000303"],
        parentId: "0003",
        depth: 2,
        order: 2,
        status: "1",
        create: "2023-01-01",
      },
    ];
  return dataArray;
}
const handlers = [
  http.post<never, never>("/api/system/groups", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    const body = await request.clone().json();
    const {
      id,
      name,
      status
    } = body;
    const dataArray = getGroupList(locale);
    const filterList = dataArray.filter((item) => {
      if (id && !item.name.startsWith(name)) {
        return false;
      }
      if (name && !item.name.startsWith(name)) {
        return false;
      }
      if (status!=='all' && item.status !== status) {
        return false;
      }
      return true;
    });
    return HttpResponse.json({
      code: 200,
      data: filterList,
    });
  }),
  http.delete<{ id: string }, never>(
    "/api/system/groups",
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
  http.post<never, never>("/api/system/groups/add", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.post<never, never>("/api/system/groups/edit", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.get<{ id: string }>(
    "/api/system/groups/detail/:id",
    async ({ request, params }) => {
      const locale = request.headers.get("locale") || "zh";
      const id = params.id;
      const list = getGroupList(locale);
      const role = list.find((item) => item.id === id);
      return HttpResponse.json({
        code: 200,
        data: role,
      });
    }
  ),
];
export default handlers;
