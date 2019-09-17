const Koa = require('koa')
const app = new Koa()
const path = require('path')
const render = require('koa-ejs')
const static = require('koa-static')
const Router = require('koa-router')
const router = new Router();
const bodyParser = require('koa-bodyparser')
// const passport = require('koa-passport')
const db = require('./db')

db && (app.context.db = db)

// 加载模板引擎
render(app, {
  root: path.join(__dirname, '/views'),
  layout: 'index', // default layout
  viewExt: 'ejs',
  cache: false,
  debug: false
})
// 静态资源
app.use(static(
  path.join(__dirname, './assets')
))

// router
const user = require('./routers/user')

// public
app.use(async (ctx, next) => {
  ctx.state = {
    errors: '',
    success_msg: ''
  }
  await next();
});


app
  // .use(passport.initialize())
  // .use(passport.session())
  .use(bodyParser())
  .use(user.routes())
  .use(router.allowedMethods());



app.listen(3000, () => console.log('Server run 3000'))