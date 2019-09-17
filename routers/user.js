const Router = require('koa-router')
const router = new Router(); //{ prefix: '/users'}
const Joi = require('@hapi/joi');
// const passport = require('koa-passport')
const verify = require('../utils/validator')
const { hashCheck, checkPwd } = require('../utils/crypt')
const { dealDate: $dealDate } = require('../utils/methods')

router.get('/', async (ctx, next) => {
  await ctx.render('home')
})
router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  // 输入框不为空
  if (!email || !password) {
    return await ctx.render('login', {
      errors: '请填写完整！'
    })
  }
  // 校验数据库是否存在账号
  const dbData = await ctx.db('SELECT name FROM user WHERE email = ?', [email])
  if (dbData.length === 0) {
    return await ctx.render('login', {
      errors: '该邮箱未注册，请先注册！',
      email,
      password
    });
  }
  return await ctx.render('main')
})


router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})

router.post('/register', async (ctx, next) => {

  const { name, email, password, password2 } = ctx.request.body
  const schema = {
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).max(15).required(),
    password2: Joi.string().min(6).max(15).required()
  }

  const joiData = verify(schema, ctx.request.body)
  if (joiData.error) {
    return await ctx.render('register', {
      errors: joiData.error.details[0].message,
      name,
      email,
      password,
      password2
    });
  } else if (password !== password2) {
    return await ctx.render('register', {
      errors: '两次密码不一致，请重新输入！',
      name,
      email,
      password,
      password2
    });
  }

  // 校验邮箱是已存在
  const dbData = await ctx.db('SELECT name FROM user WHERE email = ?', [email])
  if (dbData.length !== 0) {
    return await ctx.render('register', {
      errors: '邮箱已经注册！',
      name,
      email,
      password,
      password2
    });
  } else {
    const newPassword = await hashCheck(password),
      insertUserSql = 'INSERT INTO user (name,email,password,create_time) VALUES (?,?,?,?); '
    const insertData = await ctx.db(insertUserSql, [name, email, newPassword, $dealDate(new Date())])
    if (insertData.sqlMessage) throw insertData.sqlMessage
    return ctx.redirect('/login')
  }



})


module.exports = router