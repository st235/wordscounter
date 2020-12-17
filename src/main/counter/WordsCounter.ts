import ICounter from './ICounter';

export default class WordsCounter implements ICounter {

    type: string = "word";

    count(text: string): number {
        return (text.match(/\S+/g)?.length || 0);
    }

}
