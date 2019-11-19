const Koa = require('koa')
const app = new Koa()

const main = ctx => {
    const urls = require('./data')
    const rand = Math.floor(Math.random()*urls.length)
    ctx.response.redirect(urls[rand])
}

app.use(main)
app.listen(process.env.PORT || 8080)
