'use strict';

// Framework imports.
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require("chai-as-promised"));

// Test specific imports.
const proc = require('child_process');
const spawnPromise = require('../../helpers/spawnCommandPromise');

describe("spawnCommandPromise helper", () => {

  let spawnSpy;

  beforeEach((done) => {
    // Spy on child_process.spawn().
    spawnSpy = sinon.spy(proc, 'spawn');
    spawnPromise('ls', ['-al'], { cwd: '/' }).then(done, done);
  });

  afterEach(() => {
    spawnSpy.restore();
  });

  it("passes required process through to child_process.spawn", () => {
    sinon.assert.calledWith(proc.spawn, 'ls');
  });

  it("passes arguments through to child_process.spawn", () => {
    const expectedArgs = ['-al'];
    sinon.assert.calledWith(proc.spawn, sinon.match.any, expectedArgs);
  });

  it('passes options through to child_process.spawn', () => {
    const expectedOpts = { cwd: '/' };
    sinon.assert.calledWith(proc.spawn, sinon.match.any, sinon.match.any, expectedOpts);
  });


  it('gets rejected with an invalid command', () => {
    return expect(spawnPromise('dkjflksdjs')).to.be.rejected;
  });


  it('gets rejected if no command is passed in', () => {
    return expect(spawnPromise()).to.be.rejected;
  });

});
