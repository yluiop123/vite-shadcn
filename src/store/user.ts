import axios from "@/lib/axios";
import { create } from "zustand";
type Permission = {
  path: string;
  role: string;
  type: string;
  action: string;
};
type UserInfo = {
  username?: string;
  email?: string;
  group?: string;
  groupName?: string;
  name?: string;
  roles?: {
    role: string;
    name: string;
  }[];
  rolePermissions?: Permission[];
  userPermissions?: Permission[];
  currentPermission?: Permission[];
  currentRole?: string;
  currentMenuPermission?: string[];
};

type GlobalInfo = {
  token: string | null;
  userInfo: UserInfo | null;
  login: (token: string) => void;
  fetchUser: () => Promise<UserInfo | null>;
  logout: () => void;
  updateUserInfo: (userInfo: UserInfo) => void;
};
const useUserStore = create<GlobalInfo>()((set, get) => ({
  token: localStorage.getItem('token'),
  userInfo: null,
  login: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  fetchUser: async () => {
    const token = get().token;
    if (!token) {
      get().logout();
      return null;
    }
    try {
    // 模拟获取用户信息
    const res = await axios.get("/user/userInfo");
    if (res.data.data) {
      const userInfo: UserInfo = res.data.data;
      userInfo.currentRole = "all";
      const currentPermission = [
        ...(userInfo.userPermissions||[]),
        ...(userInfo.rolePermissions||[]).filter(
          (item) => 'all'==userInfo.currentRole || item.role == userInfo.currentRole
        ),
      ];
      const currentMenuPermission = currentPermission
        .filter((item) => item.type == "menu")
        .map((item) => item.path);
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          ...userInfo,
          currentPermission,
          currentMenuPermission,
        },
      }));
      return userInfo;
    } else {
      // token 失效等错误
      get().logout();
      return null;
    }
    } catch (error) {
      console.error(error);
      get().logout();
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, userInfo: null });
  },
  updateUserInfo: (userInfoState) => {
    const userInfo = get().userInfo;
    if (!userInfo) return; // 保护，防止 null

    const newUserInfo = {
      ...userInfo,
      ...userInfoState,
    };

    const currentPermission = [
      ...(newUserInfo.userPermissions||[]),
      ...(newUserInfo.rolePermissions||[]).filter(
        (item) => 'all'==newUserInfo.currentRole || item.role === newUserInfo.currentRole
      ),
    ];

    const currentMenuPermission = currentPermission
      .filter((item) => item.type === 'menu')
      .map((item) => item.path);

    set({
      userInfo: {
        ...newUserInfo,
        currentPermission,
        currentMenuPermission,
      },
    })
  },
}));

export default useUserStore;
