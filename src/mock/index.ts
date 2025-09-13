import { setupWorker } from "msw/browser";
import groupHandlers from "./components/group";
import loginUserHandlers from "./login/user";
import systemGroupHandlers from "./system/group";
import systemPermissionHandlers from "./system/permission";
import systemRoleHandlers from "./system/role";
import systemUserHandlers from "./system/user";
const mockHandlers = [
  ...loginUserHandlers,
  ...groupHandlers,
  ...systemUserHandlers,
  ...systemRoleHandlers,
  ...systemGroupHandlers,
  ...systemPermissionHandlers
];

export default async function initMSW() {
  const worker = setupWorker(...mockHandlers);
  // 注销旧 SW
  // const registrations = await navigator.serviceWorker.getRegistrations();
  // for (const reg of registrations) {
  //   await reg.unregister();
  // }

  // 启动 MSW
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js?ts=${Date.now()}`,
      options: { updateViaCache: "none" },
    },
    onUnhandledRequest: "bypass", // 未匹配请求会直接绕过 MSW 处理
  });
  return worker;
}
