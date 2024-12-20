const express = require('express');
const news = express.Router();
const axios = require('axios');
require("dotenv").config();
// 환경이 안만들어졌기 때문에, env를 쓰고싶으면 dotenv 사용해야함.
const apiKey = process.env.API_KEY;

news.get('/', async function (req, res){
    const {articles, section} = req.query;

    const api = await axios.get(`https://api-v2.deepsearch.com/v1/${articles}/${section}?api_key=${apiKey}&page_size=30`);
    res.json(api.data);
})

news.get('/search', async function (req, res){
    const {articles, keyword} = req.query;

    const api = await axios.get(`https://api-v2.deepsearch.com/v1/${articles}?keyword=${keyword}&api_key=${apiKey}&page_size=30`);
    res.json(api.data);
})

module.exports = news;