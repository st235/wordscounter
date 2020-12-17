import ICounter from './ICounter';

export default class LineCounter implements ICounter {

    type: string = "line";

    count(text: string): number {
        return text.split(/\r\n|\r|\n/).length;
    }

}
