var expect = require('chai').expect;

describe('sum', function() {
    it('adds 1 + 2 to equal 3', function() {
        var sum = require('../app/scripts/sum.js');
        expect(sum(1, 2)).to.be.equal(3);
    });
});
