-- public.sys_group definition

-- Drop table

-- DROP TABLE public.sys_group;

CREATE TABLE public.sys_group (
	id varchar NOT NULL, -- 组织id
	"name" varchar NULL, -- 组织名
	order_num int4 NULL, -- 序号
	status varchar NULL, -- 状态
	create_time timestamp DEFAULT now() NULL, -- 创建时间
	parent_id varchar NULL, -- 父组织id
	update_time timestamp DEFAULT now() NULL, -- 更新时间
	CONSTRAINT sys_group_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE public.sys_group IS '组织机构表';

-- Column comments

COMMENT ON COLUMN public.sys_group.id IS '组织id';
COMMENT ON COLUMN public.sys_group."name" IS '组织名';
COMMENT ON COLUMN public.sys_group.order_num IS '序号';
COMMENT ON COLUMN public.sys_group.status IS '状态';
COMMENT ON COLUMN public.sys_group.create_time IS '创建时间';
COMMENT ON COLUMN public.sys_group.parent_id IS '父组织id';
COMMENT ON COLUMN public.sys_group.update_time IS '更新时间';


-- public.sys_permission definition

-- Drop table

-- DROP TABLE public.sys_permission;

CREATE TABLE public.sys_permission (
	id varchar NULL, -- 权限id
	"name" varchar NULL, -- 权限名
	"path" varchar NULL, -- 权限路径
	"action" varchar NULL, -- 权限动作
	"type" varchar NULL, -- 权限类型
	status varchar NULL, -- 权限状态
	parent_id varchar NULL, -- 父权限id
	order_num int4 NULL, -- 序号
	create_time timestamp DEFAULT now() NULL, -- 创建时间
	update_time timestamp DEFAULT now() NULL -- 更新时间
);
COMMENT ON TABLE public.sys_permission IS '权限表';

-- Column comments

COMMENT ON COLUMN public.sys_permission.id IS '权限id';
COMMENT ON COLUMN public.sys_permission."name" IS '权限名';
COMMENT ON COLUMN public.sys_permission."path" IS '权限路径';
COMMENT ON COLUMN public.sys_permission."action" IS '权限动作';
COMMENT ON COLUMN public.sys_permission."type" IS '权限类型';
COMMENT ON COLUMN public.sys_permission.status IS '权限状态';
COMMENT ON COLUMN public.sys_permission.parent_id IS '父权限id';
COMMENT ON COLUMN public.sys_permission.order_num IS '序号';
COMMENT ON COLUMN public.sys_permission.create_time IS '创建时间';
COMMENT ON COLUMN public.sys_permission.update_time IS '更新时间';


-- public.sys_role definition

-- Drop table

-- DROP TABLE public.sys_role;

CREATE TABLE public.sys_role (
	id varchar NOT NULL, -- 角色id
	"name" varchar NULL, -- 角色名
	status varchar NULL, -- 角色状态
	create_time timestamp DEFAULT now() NULL, -- 创建时间
	update_time timestamp DEFAULT now() NULL, -- 更新时间
	CONSTRAINT sys_role_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE public.sys_role IS '角色表';

-- Column comments

COMMENT ON COLUMN public.sys_role.id IS '角色id';
COMMENT ON COLUMN public.sys_role."name" IS '角色名';
COMMENT ON COLUMN public.sys_role.status IS '角色状态';
COMMENT ON COLUMN public.sys_role.create_time IS '创建时间';
COMMENT ON COLUMN public.sys_role.update_time IS '更新时间';


-- public.sys_role_permission definition

-- Drop table

-- DROP TABLE public.sys_role_permission;

CREATE TABLE public.sys_role_permission (
	role_id varchar NOT NULL, -- 角色id
	permission_id varchar NOT NULL -- 权限id
);
COMMENT ON TABLE public.sys_role_permission IS '角色-权限关系表';

-- Column comments

COMMENT ON COLUMN public.sys_role_permission.role_id IS '角色id';
COMMENT ON COLUMN public.sys_role_permission.permission_id IS '权限id';


-- public.sys_user definition

-- Drop table

-- DROP TABLE public.sys_user;

CREATE TABLE public.sys_user (
	id varchar(255) NOT NULL, -- 用户id
	"name" varchar(255) NULL, -- 用户姓名
	username varchar(255) NOT NULL, -- 用户名
	email varchar(255) NULL, -- 用户邮箱
	group_id varchar NULL, -- 用户组织id
	phone varchar(255) NULL, -- 用户电话
	status varchar(255) NULL, -- 用户状态
	create_time timestamp DEFAULT now() NULL, -- 创建时间
	update_time timestamp DEFAULT now() NULL, -- 更新时间
	"password" varchar NULL, -- 用户密码
	CONSTRAINT sys_user_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE public.sys_user IS '用户表';

-- Column comments

COMMENT ON COLUMN public.sys_user.id IS '用户id';
COMMENT ON COLUMN public.sys_user."name" IS '用户姓名';
COMMENT ON COLUMN public.sys_user.username IS '用户名';
COMMENT ON COLUMN public.sys_user.email IS '用户邮箱';
COMMENT ON COLUMN public.sys_user.group_id IS '用户组织id';
COMMENT ON COLUMN public.sys_user.phone IS '用户电话';
COMMENT ON COLUMN public.sys_user.status IS '用户状态';
COMMENT ON COLUMN public.sys_user.create_time IS '创建时间';
COMMENT ON COLUMN public.sys_user.update_time IS '更新时间';
COMMENT ON COLUMN public.sys_user."password" IS '用户密码';


-- public.sys_user_permission definition

-- Drop table

-- DROP TABLE public.sys_user_permission;

CREATE TABLE public.sys_user_permission (
	user_id varchar NOT NULL, -- 用户id
	permission_id varchar NOT NULL -- 权限id
);
COMMENT ON TABLE public.sys_user_permission IS '用户-权限关系表';

-- Column comments

COMMENT ON COLUMN public.sys_user_permission.user_id IS '用户id';
COMMENT ON COLUMN public.sys_user_permission.permission_id IS '权限id';


-- public.sys_user_role definition

-- Drop table

-- DROP TABLE public.sys_user_role;

CREATE TABLE public.sys_user_role (
	user_id varchar NOT NULL, -- 用户id
	role_id varchar NOT NULL -- 角色id
);
COMMENT ON TABLE public.sys_user_role IS '用户-角色关系表';

-- Column comments

COMMENT ON COLUMN public.sys_user_role.user_id IS '用户id';
COMMENT ON COLUMN public.sys_user_role.role_id IS '角色id';