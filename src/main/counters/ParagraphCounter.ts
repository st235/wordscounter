import ICounter from './ICounter';

export default class ParagraphCounter implements ICounter {

    type: string = "paragraph";

    count(text: string): number {
        return this._removeEmptyElements(text.trim().split(/\r?\n|\r/)).length;
    }

    _removeEmptyElements(array: string[]): string[] {
        const index = array.findIndex(item => item.trim() === '');
        if (index === -1) {
            return array;
        }
        array.splice(index, 1);
        return this._removeEmptyElements(array);
      }

}
