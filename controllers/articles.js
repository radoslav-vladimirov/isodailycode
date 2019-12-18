const chance = require('chance').Chance();
const axios = require('axios');

const topics = ['javascript', 'react', 'css', 'sfcc', 'other'];
const getAvailableTopics = topics =>
  topics.map(topic => require(`../data/${topic}.json`)).filter(topic => topic.articles.length);

const availableTopics = getAvailableTopics(topics);
const weights = availableTopics.map(topic => topic.probability);

const getRandomArticle = () => {
  const allAvailableArticles = chance.weighted(availableTopics, weights).articles;
  const selectedArticleIndex = chance.integer({ min: 0, max: allAvailableArticles.length - 1 });
  return allAvailableArticles[selectedArticleIndex];
};

const getArticlesToCheck = () => {
  const ARTICLES_TO_CHECK = 3;
  return new Array(ARTICLES_TO_CHECK).fill().map(getRandomArticle);
};

const getArticle = async () => {
  const articlesToCheck = getArticlesToCheck();

  try {
    const articlesChecked = await Promise.all(articlesToCheck.map(axios.head));
    const selectedArticle = articlesChecked.filter(({ status }) => status >= 200 && status < 300).pop();

    if (selectedArticle) {
      return selectedArticle.config.url;
    }

    getArticle();
  } catch (e) {
    getArticle();
  }
};

module.exports = { getArticle };
