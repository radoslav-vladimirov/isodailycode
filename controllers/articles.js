const chance = require('chance').Chance()
const axios = require('axios')

const js = require('../data/javascript.json')
const react = require('../data/react.json')
const css = require('../data/css.json')
const sfcc = require('../data/sfcc.json')
const other = require('../data/other.json')

const availableTopics = [css, js, other, react, sfcc].filter(topic => topic.articles.length)
const weights = availableTopics.map(topic=> topic.probability)

const randomArticle = async () => {
    const allAvailableArticles = chance.weighted(availableTopics, weights).articles
    const selectedArticleIndex = chance.integer({ min: 0, max: (allAvailableArticles.length-1) })
    const selectedArticle = allAvailableArticles[selectedArticleIndex]

    try {
        const { status } = await axios.head(selectedArticle)
        if(status >= 200 && status < 300) {
            return selectedArticle
        } else {
            return randomArticle()
        }
    } catch (e) {
        return randomArticle()
    }
}

module.exports = {
    "getArticle": randomArticle
}