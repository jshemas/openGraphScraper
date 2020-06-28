const ogs = require('open-graph-scraper');

const options = {
  url: 'http://ogp.me/',
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
  }
};

ogs(options)
  .then((data) => {
    const { error, result, response } = data;
    console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    console.log('result:', result); // This contains all of the Open Graph results
    console.log('response:', response); // This contains the HTML of page
  });
