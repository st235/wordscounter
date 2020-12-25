import {
    ConfigurationChangeEvent,
    Disposable, 
    TextEditorSelectionChangeEvent,
    TextDocumentChangeEvent,

    window,
    workspace,
    StatusBarItem,
    StatusBarAlignment
} from "vscode";

import PrettyPrinter from './PrettyPrinter';
import ConfigurationHelper from './ConfigurationHelper';
import CounterFactory from "./counters/CounterFactory";

export default class ExtensionController {

    _disposable: Disposable;
    _counterFactory: CounterFactory;
    _configuration: ConfigurationHelper;

    _statusBarItem: StatusBarItem;

    _printer?: PrettyPrinter;

    constructor() {
        let compositeDisposable: Disposable[] = [];

        window.onDidChangeTextEditorSelection(this._onDidChangeTextEditorSelection, this, compositeDisposable);
        window.onDidChangeActiveTextEditor(this._onDidChangeActiveTextEditor, this, compositeDisposable);
        workspace.onDidChangeTextDocument(this._onDidChangeTextDocument, this, compositeDisposable);
        workspace.onDidChangeConfiguration(this._onDidChangeConfiguration, this, compositeDisposable);

        this._disposable = Disposable.from.apply(Disposable, compositeDisposable);
        this._counterFactory = new CounterFactory();
        this._configuration = new ConfigurationHelper();
        this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right);

        this._reload();
        this._updateText();
    }

    _onDidChangeTextEditorSelection(selectionEvent: TextEditorSelectionChangeEvent) {
        this._updateText();
    }

    _onDidChangeActiveTextEditor(event: any) {
        this._updateText();
    }

    _onDidChangeTextDocument(event: TextDocumentChangeEvent) {
        this._updateText();
    }

    _onDidChangeConfiguration(event: ConfigurationChangeEvent) {
        this._reload();
        this._updateText();
    }

    _reload() {
        const type = this._configuration.loadType();
        this._printer = new PrettyPrinter(this._counterFactory.create(type));
    }

    _updateText() {
        if (!window.activeTextEditor) {
            this._statusBarItem.hide();
            return;
        }

        const editor = window.activeTextEditor;
        const prettyText = this._printer?.prepareText(editor);

        this._statusBarItem.text = prettyText ?? "";

        this._statusBarItem.show();
    }

    dispose() {
        this._statusBarItem.dispose();
        this._disposable.dispose();
    }

}

