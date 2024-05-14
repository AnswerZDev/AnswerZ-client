import { Flashcard } from "./flashcard";
import {Item} from "./hydra/item";
import { User } from "./user";

export class FlashcardSet extends Item {
    constructor(data: any) {
        super(data)

        this._name = data.name;
        this._description = data.description;
        this._author = data.author !== undefined ? new User(data.author) : undefined;
        this._visibility = data.visibility;
        this._numberOfGoodAnswer = data.numberOfGoodAnswer;
        this._createdAt = data.createdAt;
        
        // data.flashcards !== undefined ? 
        //     data.flashcards.map(
        //         (flashcard: any) => this._flashcards.push(
        //             new Flashcard(flashcard)
        //         )
        //     )
        // : undefined;
    }

    private _name: string | undefined;

    private _description: string | undefined;

    private _author: User | undefined;

    private _visibility: string | undefined;

    private _numberOfGoodAnswer: number | undefined;

    private _createdAt: Date | undefined;

    private _flashcards: Flashcard | undefined;


    public get name(): string | undefined {
      return this._name;
    }

    public get description(): string | undefined {
      return this._description;
    }


    public get author(): User | undefined {
      return this._author;
    }


    public get visibility(): string | undefined {
      return this._visibility;
    }


    public get numberOfGoodAnswer(): number | undefined {
      return this._numberOfGoodAnswer;
    }


    public get createdAt(): Date | undefined {
      return this._createdAt;
    }


    public get flashcards(): Flashcard | undefined {
      return this._flashcards;
    }

}
