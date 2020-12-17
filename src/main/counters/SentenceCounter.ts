import ICounter from './ICounter';

export default class SentenceCounter implements ICounter {

    type: string = "sentence";

    count(text: string): number {
        return text.split(".").length;
    }

}
