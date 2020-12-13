const ogs = require('open-graph-scraper-lite');

const options = {
  url: 'http://ogp.me/'
};

ogs(options)
  .then((data) => {
    const { error, result, response } = data;
    console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    console.log('result:', result); // This contains all of the Open Graph results
    console.log('response:', response); // This contains the HTML of page
  });
