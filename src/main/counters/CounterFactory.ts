import ICounter from './ICounter';

import WordsCounter from './WordsCounter';
import CharacterCounter from './CharacterCounter';
import LineCounter from './LineCounter';
import ParagraphCounter from './ParagraphCounter';
import SentenceCounter from './SentenceCounter';

export default class CounterFactory {

    create(type: string): ICounter {
        switch (type) {
            case 'sentence': return new SentenceCounter();
            case 'paragraph': return new ParagraphCounter();
            case 'line': return new LineCounter();
            case 'character': return new CharacterCounter();
            case 'word': return new WordsCounter();
            default: return new WordsCounter();
        }
    }

}