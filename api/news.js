const express = require('express');
const news = express.Router();
const axios = require('axios');

news.get('/', async function (req, res){
    const {articles, section} = req.query;

    const api = await axios.get(`https://api-v2.deepsearch.com/v1/${articles}/${section}?api_key=02a270a26cfa43a4bb423a2c138880fc&page_size=30`);
    res.json(api.data);
})

news.get('/search', async function (req, res){
    const {articles, keyword} = req.query;

    const api = await axios.get(`https://api-v2.deepsearch.com/v1/${articles}?keyword=${keyword}&api_key=02a270a26cfa43a4bb423a2c138880fc&page_size=30`);
    res.json(api.data);
})

module.exports = news;