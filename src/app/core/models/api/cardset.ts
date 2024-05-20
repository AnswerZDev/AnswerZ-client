import { Flashcard } from "./flashcard";
import {Item} from "./hydra/item";
import { User } from "./user";

export class Cardset extends Item {
    constructor(data: any) {
        super(data)

        this._name = data.name;
        this._description = data.description;
        this._author = data.author !== undefined ? new User(data.author) : undefined;

        this._visibility = data.visibility;
        this._numberOfGoodAnswer = data.numberOfGoodAnswer;
        this._createdAt = data.createdAt;
        this._category = data.category;


        if (data.flashcards !== undefined) {
            data.flashcards.forEach( (element: Flashcard) => {
                this._flashcards.push(element);
            });
        }
    }

    private _name: string | undefined;

    private _description: string | undefined;

    private _author: User | undefined;

    private _visibility: string | undefined;

    private _numberOfGoodAnswer: number | undefined;

    private _createdAt: Date | undefined;

    private _flashcards: Flashcard[] = [];

    private _category: string | undefined;


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


    public get flashcards(): Flashcard[] | undefined {
      return this._flashcards;
    }

    public get category(): string | undefined {
      return this._category;
    }

}