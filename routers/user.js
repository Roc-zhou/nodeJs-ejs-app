const Router = require('koa-router')
const router = new Router(); //{ prefix: '/users'}

router.get('/',async (ctx,next) => {
  await ctx.render('home')
})
router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})


module.exports = router