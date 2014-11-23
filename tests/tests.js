var assert = require("assert");
var Game = require('../src/js/app.js');
describe('game', function () {
    describe('nbClicks', function () {
        it('should return 0 when the value is not present', function () {
            assert.equal(0, Game.instance.nbClicks);
        })
    })
});