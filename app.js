const Koa = require('koa')
const app = new Koa()
const path = require('path')
const render = require('koa-ejs')
const static = require('koa-static')
const Router = require('koa-router')
const router = new Router();



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


app
  .use(user.routes())
  .use(router.allowedMethods());



app.listen(3000,() => console.log('Server run 3000'))