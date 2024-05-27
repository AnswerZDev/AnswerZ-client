import { Flashcard } from "./flashcard";
import {Item} from "./hydra/item";

export class Cardset extends Item {
    constructor(data: any) {
        super(data);

        this._name = data.name;
        this._description = data.description;
        this._visibility = data.visibility;
        this._category = data.category;
        this._numberOfGoodAnswer = data.numberOfGoodAnswer;
        this._createdAt = data.createdAt;
        this._image = data.image;
        this._flashcards = data.flashcards;
    }

    private _author: User | undefined;

    private _name: string | undefined;

    public get name(): string | undefined {
        return this._name;
    }

    private _description: string | undefined;

    public get description(): string | undefined {
        return this._description;
    }

    private _visibility: string | undefined;

    public get visibility(): string | undefined {
        return this._visibility;
    }

    private _category: string | undefined;

    public get category(): string | undefined {
        return this._category;
    }

    private _numberOfGoodAnswer: number | undefined;

    public get numberOfGoodAnswer(): number | undefined {
        return this._numberOfGoodAnswer;
    }

    private _createdAt: Date | undefined;

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }

    public _image: string | undefined;

    public get image(): string | undefined {
        return this._image;
    }

    private _flashcards: Flashcard[] | undefined;

    public get flashcards(): Flashcard[] | undefined {
        return this._flashcards;
    }

    //private _accessControls: AccessControl[] | undefined;
}