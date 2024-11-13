

const sessionConfig = {
  secret: process.env.SESSION_SECRET_KEY, // 用于加密 session ID
  resave: false, // 不会在每次请求时重新保存 session
  saveUninitialized: false, // 如果 session 没有被修改，就不保存
  cookie: {
    httpOnly: true, // 防止客户端 JavaScript 访问 Cookie
    secure: process.env.NODE_ENV === 'production', // 在生产环境下使用 Secure Cookie
    maxAge: 60 * 60 * 1000,  // Cookie 过期时间（1 天）
  },
}
export default sessionConfig;