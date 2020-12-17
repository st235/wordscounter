import { window, ExtensionContext } from 'vscode';
import ExtensionController from './main/ExtensionController';

export function activate(context: ExtensionContext) {
	const controller = new ExtensionController();
	context.subscriptions.push(controller);
}

export function deactivate() {
	// empty on purpose
}
