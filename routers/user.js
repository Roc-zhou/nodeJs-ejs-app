const Router = require('koa-router')
const router = new Router(); //{ prefix: '/users'}
const { hashCheck, checkPwd } = require('../utils/crypt')
const { dealDate: $dealDate } = require('../utils/methods')


// user model
const User = require('../models/User');

router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  // check
  if (!email || !password) {
    return await ctx.render('login', {
      errors: '请填写完整！'
    })
  }

  // user exist ?
  const userOnly = await User.findOne({ email: email })
  if (!userOnly) {
    return await ctx.render('login', {
      errors: '账号不存在！'
    })
  } else {
    // password correct ?
    const checkPas = await checkPwd(password, userOnly.password)
    if (checkPas) {
      return await ctx.render('main')
    }
    return await ctx.render('login', {
      errors: '密码不正确'
    })
  }
})


router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})

router.post('/register', async (ctx, next) => {
  const { name, email, password, password2 } = ctx.request.body

  // check
  const errorText = () => {
    return !name ? '请输入名称！'
      : name.length > 10 ? '名称过长！'
        : !email ? '请输入邮箱！'
          : !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) ? '请输入正确的邮箱地址！'
            : !password ? '请输入密码！'
              // : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(password) ? '密码6-20个字符，必须同时包含大、小写字母及数字，不可包含特殊字符。'
              : !password2 ? '请输入确认密码！'
                : password !== password2 ? '密码不一致'
                  : ''
  }
  if (errorText()) {
    return await ctx.render('register', {
      errors: errorText(),
      name,
      email,
      password,
      password2
    });
  }

  // email is the only ?
  const userOnly = await User.findOne({ email: email })
  if (userOnly) {
    return await ctx.render('register', {
      errors: 'Email already exists',
      name,
      email,
      password,
      password2
    });
  } else {
    const newUser = new User({
      name,
      email,
      password: await hashCheck(password)
    })
    try {
      await newUser.save()
      // ctx.flash.success_msg = '注册成功！请登录'
      console.log(`${email} 注册成功！！！！`);
      return ctx.redirect('/login');
    } catch (e) {
      console.log(e)
    }
  }


})


module.exports = router