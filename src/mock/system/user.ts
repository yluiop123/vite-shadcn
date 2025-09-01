import { http, HttpResponse } from "msw";

const zh = {
  user: "用户",
  group: "组织",
  success: "操作成功",
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
type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  group: string;
  groupName: string;
  status: "0" | "1";
  create: string;
  update: string;
  phone: string;
};
function getUserList(locale: string) {
  const user = localeMap[locale]["user"];
  const dataArray = [
    {
      id: "0001",
      name: localeMap[locale]["0001"],
      parentId: "00",
      depth: 1,
      order: 0,
    },
    {
      id: "0002",
      name: localeMap[locale]["0002"],
      parentId: "00",
      depth: 1,
      order: 1,
    },
    {
      id: "0003",
      name: localeMap[locale]["0003"],
      parentId: "00",
      depth: 1,
      order: 2,
    },
    {
      id: "000301",
      name: localeMap[locale]["000301"],
      parentId: "0003",
      depth: 2,
      order: 0,
    },
    {
      id: "000302",
      name: localeMap[locale]["000302"],
      parentId: "0003",
      depth: 2,
      order: 1,
    },
    {
      id: "000303",
      name: localeMap[locale]["000303"],
      parentId: "0003",
      depth: 2,
      order: 2,
    },
  ];
  const list = Array.from({ length: 23 }, (_, i) => {
    const userId = i.toString().padStart(3, "0");
    return {
      id: `${i + 100000000}`,
      name: `${user}${userId}`,
      username: `user${userId}`,
      email: `user${userId}@example.com`,
      group: dataArray[i % 6].id,
      groupName: dataArray[i % 6].name,
      status: "1",
      phone: `${13800000000 + i}`,
      create: "2025-01-01 23:59:59",
      update: "2025-01-01 23:59:59",
    };
  }) as User[];
  return list;
}
const handlers = [
  http.post<never, never>("/api/system/users", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";

    const body = await request.clone().json();
    const {
      filterField,
      filterValue,
      group,
      page,
      size,
      orderField,
      orderValue,
    } = body;
    const list = getUserList(locale);
    const filterList = list.filter(
      (item) =>
        item[filterField as keyof User].startsWith(filterValue) &&
        item.group.startsWith(group)
    );
    if (orderField) {
      filterList.sort((a, b) => {
        if (orderValue === "asc") {
          return a[orderField as keyof User] > b[orderField as keyof User]
            ? 1
            : -1;
        }
        return a[orderField as keyof User] < b[orderField as keyof User]
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
    "/api/system/users",
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
  http.post<never, never>("/api/system/users/add", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.post<never, never>("/api/system/users/edit", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.post<never, never>(
    "/api/system/users/reset/:id",
    async ({ request }) => {
      const locale = request.headers.get("locale") || "zh";
      return HttpResponse.json({
        code: 200,
        message: localeMap[locale]["success"],
      });
    }
  ),
  http.get<{ id: string }>(
    "/api/system/users/detail/:id",
    async ({ request, params }) => {
      const locale = request.headers.get("locale") || "zh";
      const id = params.id;
      const list = getUserList(locale);
      const user = list.find((item) => item.id === id);
      return HttpResponse.json({
        code: 200,
        data: user,
      });
    }
  ),
];

export default handlers;
