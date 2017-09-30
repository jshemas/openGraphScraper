exports.mediaMapperTwitterImage = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    alt: item[3]
  };
};

exports.mediaMapperTwitterPlayer = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    stream: item[3]
  };
};

exports.mediaMapper = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    type: item[3]
  };
};

exports.mediaSorter = function (a, b) {
  if (!(a.url && b.url)) {
    return 0;
  }

  var aRes = a.url.match(/\.(\w{2,5})$/),
    aExt = (aRes && aRes[1].toLowerCase()) || null;
  var bRes = b.url.match(/\.(\w{2,5})$/),
    bExt = (bRes && bRes[1].toLowerCase()) || null;

  if (aExt === 'gif' && bExt !== 'gif') {
    return -1;
  } else if (aExt !== 'gif' && bExt === 'gif') {
    return 1;
  } else {
    return Math.max(b.width, b.height) - Math.max(a.width, a.height);
  }
};
