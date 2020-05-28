const utils = require('../../lib/utils');

describe('utils', function () {
  describe('endsWith', function () {
    it('should ends with', function () {
      const endsWith = utils.endsWith('test', '.jpg');
      expect(endsWith).to.eql(false);
    });
    it('should not ends with', function () {
      const endsWith = utils.endsWith('test.jpg', '.jpg');
      expect(endsWith).to.eql(true);
    });
  });

  describe('validate', function () {
    it('should be valid', function () {
      const validate = utils.validate('www.test.com', 2000);
      expect(validate.returnInputUrl).to.eql('http://www.test.com');
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('should also be valid', function () {
      const validate = utils.validate('http://www.test.com', 2000);
      expect(validate.returnInputUrl).to.eql('http://www.test.com');
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('should be not valid', function () {
      const validate = utils.validate('http://www.test.com', 'asda');
      expect(validate.returnInputUrl).to.eql('http://www.test.com');
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('should be not valid', function () {
      const validate = utils.validate('', 2000);
      expect(validate.returnInputUrl).to.eql(null);
      expect(validate.returnInputTimeout).to.eql(2000);
    });
  });
});
