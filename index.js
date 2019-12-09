const Koa = require('koa')
const app = new Koa()

const main = ctx => {
    const { getArticle } = require('./controllers/articles.js')
    ctx.response.redirect(getArticle())
}

app.use(main)
app.listen(process.env.PORT || 8080)
