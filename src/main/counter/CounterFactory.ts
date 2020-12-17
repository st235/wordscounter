import ICounter from './ICounter';

import WordsCounter from './WordsCounter';
import CharacterCounter from './CharacterCounter';

export default class CounterFactory {

    create(type: string): ICounter {
        switch (type) {
            case 'character': return new CharacterCounter();
            case 'word': return new WordsCounter();
            default: return new WordsCounter();
        }
    }

}