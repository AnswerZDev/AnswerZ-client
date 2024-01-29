import { Item } from "./hydra/item";

export class Flashcard extends Item {
    constructor(data: any) {
        super(data);

        this._question = data.question;
        this._answer = data.answer;
    }

    private _question: string | undefined;
    
    public get question(): string | undefined {
        return this._question;
    }

    private _answer: string | undefined;

    public get answer(): string | undefined {
        return this._answer;
    }
}