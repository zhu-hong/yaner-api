# Yaner项目后端

> 框架 [koa2 - npm (npmjs.com)](https://www.npmjs.com/package/koa2)
>
> 中间件 [jsonwebtoken - npm (npmjs.com)](https://www.npmjs.com/package/jsonwebtoken)
>
> 数据库 [@notionhq/client - npm (npmjs.com)](https://www.npmjs.com/package/@notionhq/client)

实现的功能

1. 路由的自动挂载，使用fs模块读取路由文件夹自动导入，省去了多个路由多次导入的操作
2. 登录验证，使用jwt加密用户信息颁发token
3. 二次封装jwt组成一套完整的用户鉴权中间件，进行用户权限控制
4. 数据拍平，从远程Notion数据库获取的json数据结构是非常复杂的，使用了ES6的reduce进行数据拍平，便于前端进行数据
5. dotenv私密数据加密
6. 使用了ES6 Map对象组建状态码词典，便于获取状态信息