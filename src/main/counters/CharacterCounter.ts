import ICounter from './ICounter';

export default class CharacterCounter implements ICounter {

    type: string = "character";

    count(text: string): number {
        return text.length;
    }

}
