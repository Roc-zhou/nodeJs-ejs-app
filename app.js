const Koa = require('koa')
const app = new Koa()
const path = require('path')
const render = require('koa-ejs')
const static = require('koa-static')
const Router = require('koa-router')
const router = new Router();
const bodyParser = require('koa-bodyparser')
// const passport = require('koa-passport')
const mongoose = require('mongoose');
const session = require('koa-session')
const flash = require('koa-flash')

// connect MongoDB
mongoose.connect(require('./config/index').dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('MongoDB connect Success')).catch(err => console.log(err))

// load template
render(app, {
  root: path.join(__dirname, '/views'),
  layout: 'index', // default layout
  viewExt: 'ejs',
  cache: false,
  debug: false
})
// static
app.use(static(
  path.join(__dirname, './assets')
))





app.use(bodyParser())


app.keys = ['zhou'];
app.use(session(require('./config').sessionConfig, app))
app.use(flash({
  defaultValue: { success_msg: '' }
}))

// public
app.use(async (ctx, next) => {
  ctx.state = {
    errors: '',
    success_msg: /* ctx.flash.success_msg */ ''
  }

  await next();
});


app
  // .use(passport.initialize())
  // .use(passport.session())
  .use(require('./routers/index').routes())
  .use(router.allowedMethods())


app.listen(3000, () => console.log('Server run 3000'))