const express = require('express');
const ogs = require('open-graph-scraper');
const app = express();
const port = 3000;

// http://localhost:3000/scraper?url=http://ogp.me/
app.get('/scraper', async (req, res) => {
  if (!req.query.url) return res.send('Missing url query!');
  const options = { url: req.query.url };
  try {
    const data = await ogs(options);
    res.send(data); 
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example open-graph-scraper app listening on port ${port}`);
});
