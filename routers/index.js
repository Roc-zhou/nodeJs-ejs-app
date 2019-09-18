const Router = require('koa-router')
const router = new Router()

const user = require('./user')


router.get('/', async (ctx, next) => {
  await ctx.render('home')
})

router.use(user.routes(), user.allowedMethods()); // prefix '/user' 


module.exports = router