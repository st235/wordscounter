import ICounter from './ICounter';

import WordsCounter from './WordsCounter';

export default class CounterFactory {

    create(type: string): ICounter {
        switch (type) {
            case 'words': return new WordsCounter();
            default: return new WordsCounter();
        }
    }

}