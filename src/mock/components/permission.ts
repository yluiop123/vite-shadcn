import { http, HttpResponse } from "msw";

const zh = {
    'menu.dashboard': '仪表盘',
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
};
const en = {
    'menu.dashboard': 'Dashboard',
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
            {id: '0001', parentId:'',order: 1, path: "/chart",type: "menu",name:localeMap[locale]['menu.chart'] },
            {id: '000100', parentId:'0001',order: 0, path: "/chart/antv", type: "menu",name:localeMap[locale]['menu.chart.antv'] },
            {id: '000101', parentId:'0001',order: 1, path: "/chart/d3", type: "menu",name:localeMap[locale]['menu.chart.d3'] },
            {id: '000102', parentId:'0001',order: 2, path: "/chart/echart", type: "menu",name:localeMap[locale]['menu.chart.echart'] },
            {id: '000103', parentId:'0001',order: 3, path: "/chart/rechart", type: "menu",name:localeMap[locale]['menu.chart.rechart'] },
            {id: '0002', parentId:'',order: 2, path: "/three", type: "menu",name:localeMap[locale]['menu.three'] },
            {id: '000200', parentId:'0002',order: 0, path: "/three/babylon", type: "menu",name:localeMap[locale]['menu.three.babylon'] },
            {id: '000201', parentId:'0002',order: 1, path: "/three/three", type: "menu",name:localeMap[locale]['menu.three.three'] },
            {id: '0003', parentId:'',order: 3, path: "/map", type: "menu",name:localeMap[locale]['menu.map'] },
            {id: '000300', parentId:'0003',order: 0, path: "/map/cesium", type: "menu",name:localeMap[locale]['menu.map.cesium'] },
            {id: '000301', parentId:'0003',order: 1, path: "/map/deckgl", type: "menu",name:localeMap[locale]['menu.map.deckgl'] },
            {id: '000302', parentId:'0003',order: 2, path: "/map/l7", type: "menu",name:localeMap[locale]['menu.map.l7'] },
            {id: '000303', parentId:'0003',order: 3, path: "/map/mapbox", type: "menu",name:localeMap[locale]['menu.map.mapbox'] },
            {id: '000304', parentId:'0003',order: 4, path: "/map/openlayers", type: "menu",name:localeMap[locale]['menu.map.openlayers'] },
            {id: '0004', parentId:'',order: 4, path: "/system", type: "menu",name:localeMap[locale]['menu.system'] },
            {id: '000400', parentId:'0004',order: 0, path: "/system/user", type: "menu",name:localeMap[locale]['menu.system.user'] },
            {id: '000401', parentId:'0004',order: 1, path: "/system/role", type: "menu",name:localeMap[locale]['menu.system.role'] },
            {id: '000403', parentId:'0004',order: 3, path: "/system/permission", type: "menu",name:localeMap[locale]['menu.system.permission'] },
            {id: '000404', parentId:'0004',order: 4, path: "/system/group", type: "menu",name:localeMap[locale]['menu.system.group'] },
            //supper action permissions
            {
              id: '00040000',
              parentId: '000400',
              order: 0,
              path: "/system/user",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00040001',
              parentId: '000400',
              order: 1,
              path: "/system/user",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00040002',
              parentId: '000400',
              order: 2,
              path: "/system/user",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            },
            {
              id: '00040101',
              parentId: '000401',
              order: 0,
              path: "/system/role",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00040102',
              parentId: '000401',
              order: 1,
              path: "/system/role",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00040103',
              parentId: '000401',
              order: 2,
              path: "/system/role",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            },
            {
              id: '00040300',
              parentId: '000403',
              order: 0,
              path: "/system/group",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00040301',
              parentId: '000403',
              order: 1,
              path: "/system/group",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00040302',
              parentId: '000403',
              order: 2,
              path: "/system/group",
              action: "edit",
              type: "action",
              name:localeMap[locale]['button.edit'],
            },
            {
              id: '00040400',
              parentId: '000404',
              order: 0,
              path: "/system/permission",
              action: "add",
              type: "action",
              name:localeMap[locale]['button.add'],
            },
            {
              id: '00040401',
              parentId: '000404',
              order: 1,
              path: "/system/permission",
              action: "delete",
              type: "action",
              name:localeMap[locale]['button.delete'],
            },
            {
              id: '00040402',
              parentId: '000404',
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
  http.get<never, never>("/api/system/permissions", async ({ request }) => {
    const locale = request.headers.get("locale") || "zh";
    const dataArray = getPermissionList(locale);
    return HttpResponse.json({
      code: 200,
      data: dataArray,
    });
  }),
];
export default handlers;
