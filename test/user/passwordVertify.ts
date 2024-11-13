import bcrypt from 'bcryptjs';
import { comparePassword } from '../../src/utils/encryption.js';

// 从数据库获取存储的哈希密码
const storedHashedPassword = '$2a$10$YkDFrE2YJgdvrursOxRrFOtCgLcd6fDZeKiuUMb/1Yif0c8o.hGJa';

// 用户输入的密码
const enteredPassword = 'cc121314'; // 假设这是用户登录时输入的密码

// 比较密码
const isMatch = await comparePassword(enteredPassword, storedHashedPassword);

if (isMatch) {
  console.log('密码匹配！用户登录成功');
} else {
  console.log('密码不匹配！');
}
