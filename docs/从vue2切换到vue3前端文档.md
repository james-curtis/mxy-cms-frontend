## 如何切换到 Vue3 前端

- 第一步：执行执行脚本 `Vue3升级脚本_mysql.sql`。

> 这个 sql 脚本做了什么？
>
> - 1、把原来的表名 sys_permission 改为 sys_permission_v2
> - 2、插入了新的 sys_permission 数据
>
> 因为 vue3 和 vue2 的菜单路由配置不一样，所以当前是通过切换表来实现 vue3 和 vue2 的切换。

- 第二步：登录进系统，给 admin 角色分配所有的菜单
- 第三步：退出登录即可
