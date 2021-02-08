/* eslint-disable import/no-unresolved */
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const { describe, it } = require('mocha');
const { extractStateNameFromUri } = require('../../extension');

// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  describe('extractStateNameFromUri(uri)', () => {
    it('should parse correct long state name', () => {
      const stateName = 'MyLongStateName';
      const uri = '/some/folder/here/my-long-state-name.actions.ts';
      assert.strictEqual(extractStateNameFromUri(uri), stateName);
    });
  });
});
