## 登录注册模块的设计

1. 入口路由模块
2. 路由模块进行调用控制器层函数
3. 控制器层调用service层函数

### 注册设计思路
1. 注册收集用户的username, password, role
2. 控制器层调用service层函数进行校验匹配
3. service层调用哈希算法对密码进行加密, 并且将用户信息保存到数据库中
4. 返回模型对象
5. 在控制器层中进行return 结果
6. 在路由层进行res.send()


### 登录设计思路
1. 路由层收集用户的username, password, 传给控制器层
2. 控制器层调用service层函数进行校验
3. service层进行token的生成，密码正确返回token，密码不正确返回错误信息
4. 
