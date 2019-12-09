const chance = require('chance').Chance()

const js = require('../data/javascript.json')
const react = require('../data/react.json')
const css = require('../data/css.json')
const sfcc = require('../data/sfcc.json')
const other = require('../data/other.json')

const availableTopics = [css, js, other, react, sfcc].filter(topic => topic.articles.length)
const weights = availableTopics.map(topic=> topic.probability)

module.exports = {
    "getArticle": () => {
        const allAvailableArticles = chance.weighted(availableTopics, weights).articles
        const selectedArticleIndex = chance.integer({ min: 0, max: allAvailableArticles.length })
        return allAvailableArticles[selectedArticleIndex]
    }
}