const Koa = require('koa')
const { getArticle } = require('./controllers/articles.js')

const app = new Koa()

const main = async (ctx) => {
    await getArticle().then((url) => {
        ctx.response.redirect(url)
    }).catch((e) => {
        ctx.response.redirect('https://www.isobar.com/')
    })
}

app.use(main)
app.listen(process.env.PORT || 8080)
