import Mock from "mockjs";
export default function () {
  Mock.mock(new RegExp("/api/user/userInfo"), () => {
    return Mock.mock({
      user: "admin",
      email: "yluiop123@email.com",
      name: "YL",
      role: ["admin"],
    });
  });

  // 登录
  Mock.mock(new RegExp("/api/user/login"), (params) => {
    const { username, password } = JSON.parse(params.body);
    if (username !== "admin") {
      return {
        code: 200,
        data: {
          status: "error",
          field: "username",
          msg: "用户名错误",
        },
      };
    }
    if (password !== "admin") {
      return {
        code: 200,
        message: "",
        data: {
          status: "error",
          field: "password",
          msg: "密码错误",
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
  });
}
