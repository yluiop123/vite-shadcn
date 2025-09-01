import { setupWorker } from 'msw/browser';
import groupHandlers from './components/group';
import loginUserHandlers from './login/user';
import systemRoleHandlers from './system/role';
import systemUserHandlers from './system/user';
const mockHandlers = [
    ...loginUserHandlers,
    ...groupHandlers,
    ...systemUserHandlers,
    ...systemRoleHandlers,
]

let worker: ReturnType<typeof setupWorker> | null = null;

export default async function initMSW() {
  if (!worker) {
    worker = setupWorker(...mockHandlers);
  }

  // 注销旧 SW
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const reg of registrations) {
    await reg.unregister();
  }

  // 启动 MSW
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'warn', // 未匹配请求会在 console 警告
  });
  return worker;
}