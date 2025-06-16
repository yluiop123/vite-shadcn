import Mock from "mockjs";
export default function () {
  Mock.mock(new RegExp("/api/user/userInfo"), () => {
    return Mock.mock({
      user: "super",
      email: "yluiop123@qq.com",
      name: "YL",
      role: ["super", "admin", "user"],
      menus: [{path:"/dashboard",
            role:"super"
        },{path:"/dashboard",
            role:"user"
        },{path:"/chart/*",
            role:"super"
        },{path:"/chart/*",
            role:"user"
        }, {path:"/map/*",
            role:"super"
        }, {path:"/map/*",
            role:"super"
        }, {path:"/tree/*",
            role:"super"
        }, {path:"/tree/*",
            role:"user"
        }, {path:"/system/*",
            roleL:"super"
        }, {path:"/system/*",
            role:"admin"
        }],
      permissions:[{permission:"/dashboard:read",
            role:["super","user"]
        }, {permission:"/chart/*:read",
            roleList:["super","user"]
        }, {permission:"/map/*",
            roleList:["super","user"]
        }, {permission:"/tree/*",
            roleList:["super","user"]
        }, {permission:"/system/*",
            roleList:["super","admin"]
        }]
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
