import {
    ConfigurationChangeEvent,
    Disposable, 
    TextDocument,
    TextEditorSelectionChangeEvent,
    TextDocumentChangeEvent,

    window,
    workspace,
    StatusBarItem,
    StatusBarAlignment,
    Selection,
    TextEditor
} from "vscode";

import ICounter from "./counters/ICounter";
import ConfigurationHelper from './ConfigurationHelper';
import CounterFactory from "./counters/CounterFactory";

export default class ExtensionController {

    _disposable: Disposable;
    _counterFactory: CounterFactory;
    _configuration: ConfigurationHelper;

    _statusBarItem: StatusBarItem;

    _counter?: ICounter;

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
        this._counter = this._counterFactory.create(type);
    }

    _updateText() {
        if (!window.activeTextEditor) {
            this._statusBarItem.hide();
            return;
        }

        const editor = window.activeTextEditor;
        const document = editor.document;
        const selections = editor.selections;

        this._statusBarItem.text = this._prepareText(document, selections, editor.selection.isEmpty);

        this._statusBarItem.show();
    }

    _prepareText(document: TextDocument, selections: Selection[], isSimple: Boolean): string {
        const content = document.getText();

        let basis = `${this._counter?.type} count: ${this._counter?.count(content)}`;

        if (selections.length > 1 || (selections.length === 1 && !isSimple)) {
            let accumulativeCount = 0;

            selections.forEach(selection => {
                const subContent = document.getText(selection.with());
                accumulativeCount += this._counter?.count(subContent) || 0;
            });

            basis += " ";
            basis += `(selected: ${accumulativeCount})`;
        }

        return basis;
    }

    dispose() {
        this._statusBarItem.dispose();
        this._disposable.dispose();
    }

}

