'use strict';

var utils = require('../../lib/utils');
var expect = require('expect.js');

describe('utils', function () {
  describe('endsWith', function () {
    it('should ends with', function (done) {
      var endsWith = utils.endsWith('test', '.jpg');
      expect(endsWith).to.eql(false);
      done();
    });
    it('should not ends with', function (done) {
      var endsWith = utils.endsWith('test.jpg', '.jpg');
      expect(endsWith).to.eql(true);
      done();
    });
  });

  describe('validate', function () {
    it('should be valid', function (done) {
      var validate = utils.validate('www.test.com', 2000);
      expect(validate.returnInputUrl).to.eql('http://www.test.com');
      expect(validate.returnInputTimeout).to.eql(2000);
      done();
    });
    it('should also be valid', function (done) {
      var validate = utils.validate('http://www.test.com', 2000);
      expect(validate.returnInputUrl).to.eql('http://www.test.com');
      expect(validate.returnInputTimeout).to.eql(2000);
      done();
    });
    it('should be not valid', function (done) {
      var validate = utils.validate('http://www.test.com', 'asda');
      expect(validate.returnInputUrl).to.eql('http://www.test.com');
      expect(validate.returnInputTimeout).to.eql(2000);
      done();
    });
    it('should be not valid', function (done) {
      var validate = utils.validate('', 2000);
      expect(validate.returnInputUrl).to.eql(null);
      expect(validate.returnInputTimeout).to.eql(2000);
      done();
    });
  });
});
