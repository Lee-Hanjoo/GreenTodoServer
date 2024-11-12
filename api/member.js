const express = require('express');
const member = express.Router()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../firebase');
// crypto

let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
let REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

// Access Token
function generateAccessToken(user) {
 return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Refresh Token
function generateRefreshToken(user) {
 const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
 refreshTokens.push(refreshToken);
 return refreshToken;
}

// 로그인 요청
member.get('/', (req, res) => {
  res.send(crypto.randomBytes(64).toString('hex'))
})

member.post('/login', async (req, res) => {
 
 const {username,password} = req.body;
 const user = { name: username };
 let accessToken,refreshToken;

  try{
    const userRef = db.collection('member').where('username', '==', username);
    const mem = await userRef.get();

    if(!mem.empty){
      accessToken = generateAccessToken(user);
      refreshToken = generateRefreshToken(user);
      res.json({ accessToken, refreshToken });
    }else{
      return res.status(404).json({ message: '회원가입하시고 다시 로그인 하세요.' });
    }
  }catch(error){
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
 
});

member.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
   if (err) return res.sendStatus(403);
   const accessToken = generateAccessToken({ name: user.name });
   res.json({ accessToken });
  });
});

member.post('/logout', (req, res) => {
  const refreshToken = req.body.accessToken;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.sendStatus(204).send('success');
});


module.exports = member;
