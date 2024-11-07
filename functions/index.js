const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');

const app = express();

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/',
  },
};

const nuxt = new Nuxt(config);

async function handleRequest(req, res) {
  try {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    const result = await nuxt.renderRoute('/');
    res.send(result.html);
  } catch (error) {
    console.error('Error rendering route:', error);
    res.status(500).send('Internal Server Error');
  }
}

app.get('*', handleRequest);
exports.nuxtApp = functions.https.onRequest(app);
