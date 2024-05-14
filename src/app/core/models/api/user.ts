import {Item} from "./hydra/item";

export class User extends Item {
    constructor(data: any) {
        super(data)
        this._pictureProfileUrl = data['profilePicture'];
        this._numberOfFlashcards = data['numberOfFlashcards'];
    }

    private readonly _pictureProfileUrl: string | undefined

    get pictureProfileUrl(): string | undefined {
        return this._pictureProfileUrl
    }

    private readonly _numberOfFlashcards: number

    get numberOfFlashcards(): number {
        return this._numberOfFlashcards
    }
}
