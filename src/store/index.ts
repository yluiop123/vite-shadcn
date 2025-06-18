import { create } from "zustand";
type Permission = {
  path: string;
  role: string;
  type: string;
  action: string;
};
type UserInfo = {
  user: string;
  email: string;
  dept: string;
  deptName: string;
  name: string;
  defaultRole: string;
  role: string[];
  rolePermissions: Permission[];
  userPermissions: Permission[];
  currentPermission: Permission[];
  currentRole: string;
  currentMenuPermission: string[];
};

type GlobalInfo = {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
};
const useUserStore = create<GlobalInfo>()((set) => ({
  userInfo: {
    user: "",
    email: "",
    dept: "",
    deptName: "",
    name: "",
    defaultRole: "",
    role: [],
    rolePermissions: [],
    userPermissions: [],
    currentPermission: [],
    currentRole: "",
    currentMenuPermission: [],
  },
  setUserInfo: (userInfo) => {
    const currentPermission = [
      ...userInfo.userPermissions,
      ...userInfo.rolePermissions.filter(
        (item) => item.role == userInfo.currentRole
      ),
    ];
    const currentMenuPermission = currentPermission.
    filter((item) => item.type == 'menu').
    map((item) => item.path);
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        ...userInfo,
        currentRole: userInfo.defaultRole,
        currentPermission,
        currentMenuPermission
      },
    }))
  }
}));

export { useUserStore };

