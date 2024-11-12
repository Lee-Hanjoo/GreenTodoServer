const express = require('express');
const news = express.Router();
const axios = require('axios');
const apiKey = process.env.API_KEY;


news.get('/', async function (req, res){
    const {articles, section} = req.query;

    if(articles === '') {
        articles = 'articles'
    }
    if(section === '') {
        section = 'politics'
    }

    const api = await axios.get(`https://api-v2.deepsearch.com/v1/${articles}/${section}?api_key=${apiKey}&page_size=30`);
    res.json(api.data);
})

news.get('/search', async function (req, res){
    const {articles, keyword} = req.query;
    
    if(articles === '') {
        articles = 'articles'
    }
    if(keyword === '') {
        keyword = '동물'
    }

    const api = await axios.get(`https://api-v2.deepsearch.com/v1/${articles}?keyword=${keyword}&api_key=${apiKey}&page_size=30`);
    res.json(api.data);
})

module.exports = news;