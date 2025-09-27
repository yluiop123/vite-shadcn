import { http, HttpResponse } from "msw";

const zh = {
    'menu.dashboard': '仪表盘',
    'menu.component': '组件',
    'menu.component.general': '通用组件',
    'menu.component.form': '表单组件',
    'menu.component.table': '表格组件',
    'menu.component.custom': '自定义组件',
    'menu.chart': '图表',
    'menu.chart.antv': 'Antv图表',
    'menu.chart.d3': 'D3图表',
    'menu.chart.echart': 'Echart图表',
    'menu.chart.rechart': 'Rechart图表',
    'menu.three': '三维',
    'menu.three.babylon': 'Babylon图表',
    'menu.three.three': 'Three图表',
    'menu.map': '地图',
    'menu.map.cesium': 'Cesium地图',
    'menu.map.deckgl': 'Deckgl地图',
    'menu.map.l7': 'L7地图',
    'menu.map.mapbox': 'Mapbox地图',
    'menu.map.openlayers': 'Openlayers地图',
    'menu.system': '系统管理',
    'menu.system.user': '用户管理',
    'menu.system.role': '角色管理',
    'menu.system.menu': '菜单管理',
    'menu.system.permission': '权限管理',
    'menu.system.group': '组织管理',
    'button.add':'新增',
    'button.edit':'编辑',
    'button.delete':'删除',
    success: "成功",
};
const en = {
    'menu.dashboard': 'Dashboard',
    'menu.component': 'Component',
    'menu.component.general': 'General',
    'menu.component.form': 'Form',
    'menu.component.table': 'Table',
    'menu.component.custom': 'Custom',
    'menu.chart': 'Chart',
    'menu.chart.antv': 'Antv',
    'menu.chart.d3': 'D3',
    'menu.chart.echart': 'Echart',
    'menu.chart.rechart': 'Rechart',
    'menu.three': 'Three',
    'menu.three.babylon': 'Babylon',
    'menu.three.three': 'Three',
    'menu.map': 'Map',
    'menu.map.cesium': 'Cesium',
    'menu.map.deckgl': 'Deckgl',
    'menu.map.l7': 'L7',
    'menu.map.mapbox': 'Mapbox',
    'menu.map.openlayers': 'Openlayers',
    'menu.system': 'System',
    'menu.system.user': 'User',
    'menu.system.role': 'Role',
    'menu.system.menu': 'Menu',
    'menu.system.permission': 'Permission',
    'menu.system.group': 'Group',
    'button.add':'Add',
    'button.edit':'Edit',
    'button.delete':'Delete',
    success: "Success",
};
const localeMap: Record<string, Record<string, string>> = {
  zh,
  en,
};
type Permission = {
  name: string
  id: string
  path: string
  type: string
  action?: string
  status?: "0" | "1"
  create?: string,
  parentId?: string
  order: number
}
function getPermissionList(locale: string) {
    const dataArray: Permission[] = [
            //supper menu permissions
            {id: '0000', parentId:'',order: 0, path: "/dashboard",type: "menu",name:localeMap[locale]['menu.dashboard'] },
            {id: '0001', parentId:'',order: 1, path: "/component", type: "menu",name:localeMap[locale]['menu.component'] },
            {id: '000100', parentId:'0001',order: 0, path: "/component/general", type: "menu",name:localeMap[locale]['menu.component.general'] },
            {id: '000101', parentId:'0001',order: 1, path: "/component/form", type: "menu",name:localeMap[locale]['menu.component.form'] },
            {id: '000102', parentId:'0001',order: 2, path: "/component/table", type: "menu",name:localeMap[locale]['menu.component.table'] },
            {id: '000103', parentId:'0001',order: 3, path: "/component/custom", type: "menu",name:localeMap[locale]['menu.component.custom'] },
            {id: '0002', parentId:'',order: 2, path: "/chart",type: "menu",name:localeMap[locale]['menu.chart'] },
            {id: '000200', parentId:'0002',order: 0, path: "/chart/antv", type: "menu",name:localeMap[locale]['menu.chart.antv'] },
            {id: '000201', parentId:'0002',order: 1, path: "/chart/d3", type: "menu",name:localeMap[locale]['menu.chart.d3'] },
            {id: '000202', parentId:'0002',order: 2, path: "/chart/echart", type: "menu",name:localeMap[locale]['menu.chart.echart'] },
            {id: '000203', parentId:'0002',order: 3, path: "/chart/rechart", type: "menu",name:localeMap[locale]['menu.chart.rechart'] },
            {id: '0003', parentId:'',order: 3, path: "/three", type: "menu",name:localeMap[locale]['menu.three'] },
            {id: '000300', parentId:'0003',order: 0, path: "/three/babylon", type: "menu",name:localeMap[locale]['menu.three.babylon'] },
            {id: '000301', parentId:'0003',order: 1, path: "/three/three", type: "menu",name:localeMap[locale]['menu.three.three'] },
            {id: '0004', parentId:'',order: 4, path: "/map", type: "menu",name:localeMap[locale]['menu.map'] },
            {id: '000400', parentId:'0004',order: 0, path: "/map/cesium", type: "menu",name:localeMap[locale]['menu.map.cesium'] },
            {id: '000401', parentId:'0004',order: 1, path: "/map/deckgl", type: "menu",name:localeMap[locale]['menu.map.deckgl'] },
            {id: '000402', parentId:'0004',order: 2, path: "/map/l7", type: "menu",name:localeMap[locale]['menu.map.l7'] },
            {id: '000403', parentId:'0004',order: 3, path: "/map/mapbox", type: "menu",name:localeMap[locale]['menu.map.mapbox'] },
            {id: '000404', parentId:'0004',order: 4, path: "/map/openlayers", type: "menu",name:localeMap[locale]['menu.map.openlayers'] },
            {id: '0005', parentId:'',order: 5, path: "/system", type: "menu",name:localeMap[locale]['menu.system'] },
            {id: '000500', parentId:'0005',order: 0, path: "/system/user", type: "menu",name:localeMap[locale]['menu.system.user'] },
            {id: '000501', parentId:'0005',order: 1, path: "/system/role", type: "menu",name:localeMap[locale]['menu.system.role'] },
            {id: '000503', parentId:'0005',order: 3, path: "/system/permission", type: "menu",name:localeMap[locale]['menu.system.permission'] },
            {id: '000504', parentId:'0005',order: 4, path: "/system/group", type: "menu",name:localeMap[locale]['menu.system.group'] },
            //supper action permissions
            {
              id: '00050000',
              parentId: '000500',
              order: 0,
              path: "/system/user",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00050002',
              parentId: '000500',
              order: 1,
              path: "/system/user",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00050003',
              parentId: '000500',
              order: 2,
              path: "/system/user",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            },
            {
              id: '00050101',
              parentId: '000501',
              order: 0,
              path: "/system/role",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00050102',
              parentId: '000501',
              order: 1,
              path: "/system/role",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00050103',
              parentId: '000501',
              order: 2,
              path: "/system/role",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            },
            {
              id: '00050300',
              parentId: '000503',
              order: 0,
              path: "/system/group",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00050301',
              parentId: '000503',
              order: 1,
              path: "/system/group",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00050302',
              parentId: '000503',
              order: 2,
              path: "/system/group",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            },
            {
              id: '00050400',
              parentId: '000504',
              order: 0,
              path: "/system/permission",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00050401',
              parentId: '000504',
              order: 1,
              path: "/system/permission",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00050402',
              parentId: '000504',
              order: 2,
              path: "/system/permission",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            }
      ];
      dataArray.forEach((item) => {
        item.status = '1';
        item.create = '2023-01-01 00:00:00';
      });
  return dataArray;
}
const handlers = [
  http.post<never, never>("/api/system/permissions", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
     const body = await request.clone().json();
    const {
      id,
      name,
      status
    } = body;
    const dataArray = getPermissionList(locale);
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
    "/api/system/permissions",
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
  http.get<{ id: string }>(
    "/api/system/permissions/detail/:id",
    async ({ request, params }) => {
      const locale = request.headers.get("locale") || "zh";
      const id = params.id;
      const list = getPermissionList(locale);
      const role = list.find((item) => item.id === id);
      return HttpResponse.json({
        code: 200,
        data: role,
      });
    }
  ),  
  http.post<never, never>("/api/system/permissions/addChild", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.post<never, never>("/api/system/permissions/addBrother", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),  
  http.post<never, never>("/api/system/permissions/edit", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
  http.post<never, never>("/api/system/permissions/move", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    return HttpResponse.json({
      code: 200,
      message: localeMap[locale]["success"],
    });
  }),
];

export default handlers;
