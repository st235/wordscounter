import {
    TextEditor
} from "vscode";


import ICounter from './counters/ICounter';

export default class PrettyPrinter {

    _counter: ICounter;

    constructor(counter: ICounter) {
        this._counter = counter;
    }

    prepareText(editor: TextEditor): string {
        const document = editor.document;
        const selections = editor.selections;
        const content = document.getText();

        const hasMultipleSelections = selections.length > 1 || (selections.length === 1 && !editor.selection.isEmpty);

        var basicText = this._formBaseText(this._counter?.type, this._counter?.count(content));

        if (hasMultipleSelections) {
            let accumulativeCount = 0;

            selections.forEach(selection => {
                const subContent = document.getText(selection.with());
                accumulativeCount += this._counter?.count(subContent) || 0;
            });

            basicText = this._formAdditionalSelectionInfo(basicText, accumulativeCount);
        }

        return basicText;
    }

    _capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    _formBaseText(type: string, count: number): string {
        return `${this._capitalize(type)} count: ${count}`;
    }

    _formAdditionalSelectionInfo(basePrefix: string, count: number) {
        return `${basePrefix} (${count} selected)`;
    }

}