import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

// eslint-disable-next-line no-undef
suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	// eslint-disable-next-line no-undef
	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
