import { MockMethod, Recordable } from "vite-plugin-mock";
import en from "./user-en";
import zh from "./user-zh";
const localeMap: Record<string, Record<string, string>> = {
  zh,
  en,
};
export default [
  {
    url: "/api/user/userInfo",
    method: "get",
    response: (opt: {
      url: Recordable;
      body: Recordable;
      query: Recordable;
      headers: Recordable;
    }) => {
      debugger;
      console.log(opt.headers);
      const locale = opt.headers["locale"] || "zh";
      return {
        code: 200,
        data: {
          username: "super",
          email: "yluiop123@qq.com",
          dept: "01",
          deptName: localeMap[locale]["deptName"],
          name: "YL",
          defaultRole: "super",
          roles: [
            { role: "super", name: localeMap[locale]["super"] },
            { role: "admin", name: localeMap[locale]["admin"] },
            { role: "user", name: localeMap[locale]["user"] },
          ],
          rolePermissions: [
            //supper menu permissions
            { path: "/dashboard", role: "super", type: "menu" },
            { path: "/chart", role: "super", type: "menu" },
            { path: "/chart/antv", role: "super", type: "menu" },
            { path: "/chart/d3", role: "super", type: "menu" },
            { path: "/chart/echart", role: "super", type: "menu" },
            { path: "/chart/rechart", role: "super", type: "menu" },
            { path: "/three", role: "super", type: "menu" },
            { path: "/three/babylon", role: "super", type: "menu" },
            { path: "/three/three", role: "super", type: "menu" },
            { path: "/map", role: "super", type: "menu" },
            { path: "/map/cesium", role: "super", type: "menu" },
            { path: "/map/deckgl", role: "super", type: "menu" },
            { path: "/map/l7", role: "super", type: "menu" },
            { path: "/map/mapbox", role: "super", type: "menu" },
            { path: "/map/openlayers", role: "super", type: "menu" },
            { path: "/system", role: "super", type: "menu" },
            { path: "/system/role", role: "super", type: "menu" },
            { path: "/system/menu", role: "super", type: "menu" },
            { path: "/system/dept", role: "super", type: "menu" },
            //supper action permissions
            {
              path: "/system/role",
              role: "super",
              action: "add",
              type: "action",
            },
            {
              path: "/system/role",
              role: "super",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/role",
              role: "super",
              action: "edit",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "super",
              action: "add",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "super",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "super",
              action: "edit",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "super",
              action: "add",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "super",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "super",
              action: "edit",
              type: "action",
            },
            //admin menu permissions
            { path: "/dashboard", role: "admin", type: "menu" },
            { path: "/system", role: "admin", type: "menu" },
            { path: "/system/role", role: "admin", type: "menu" },
            { path: "/system/menu", role: "admin", type: "menu" },
            { path: "/system/dept", role: "admin", type: "menu" },
            //admin action permissions
            {
              path: "/system/role",
              role: "admin",
              action: "add",
              type: "action",
            },
            {
              path: "/system/role",
              role: "admin",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/role",
              role: "admin",
              action: "edit",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "admin",
              action: "add",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "admin",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "admin",
              action: "edit",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "admin",
              action: "add",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "admin",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "admin",
              action: "edit",
              type: "action",
            },
            //user menu permissions
            {
              path: "/system/role",
              role: "admin",
              action: "add",
              type: "action",
            },
            {
              path: "/system/role",
              role: "admin",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/role",
              role: "admin",
              action: "edit",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "admin",
              action: "add",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "admin",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/menu",
              role: "admin",
              action: "edit",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "admin",
              action: "add",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "admin",
              action: "delete",
              type: "action",
            },
            {
              path: "/system/dept",
              role: "admin",
              action: "edit",
              type: "action",
            },
            //admin action permissions
            { path: "/dashboard", role: "user", type: "menu" },
            { path: "/chart", role: "user", type: "menu" },
            { path: "/chart/antv", role: "user", type: "menu" },
            { path: "/chart/d3", role: "user", type: "menu" },
            { path: "/chart/echart", role: "user", type: "menu" },
            { path: "/chart/rechart", role: "user", type: "menu" },
            { path: "/three", role: "user", type: "menu" },
            { path: "/three/babylon", role: "user", type: "menu" },
            { path: "/three/three", role: "user", type: "menu" },
            { path: "/map", role: "user", type: "menu" },
            { path: "/map/cesium", role: "user", type: "menu" },
            { path: "/map/deckgl", role: "user", type: "menu" },
            { path: "/map/l7", role: "user", type: "menu" },
            { path: "/map/mapbox", role: "user", type: "menu" },
            { path: "/map/openlayers", role: "user", type: "menu" },
          ],
          userPermissions: [
            //user menu permissions
            { path: "/dashboard", role: "user", type: "menu" },
          ],
        },
      };
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    response: (opt: {
      url: Recordable;
      body: Recordable;
      query: Recordable;
      headers: Recordable;
    }) => {
      const locale = opt.headers["locale"] || "zh";
      const { username, password } = opt.body;
      if (username !== "super") {
        return {
          code: 200,
          data: {
            status: "error",
            field: "username",
            msg: localeMap[locale]["username.error"],
          },
        };
      }
      if (password !== "super") {
        return {
          code: 200,
          message: "",
          data: {
            status: "error",
            field: "password",
            msg: localeMap[locale]["password.error"],
          },
        };
      }
      return {
        code: 200,
        data: {
          token: "jifnadsnfkajjk",
          status: "ok",
        },
      };
    },
  },
] as MockMethod[];

