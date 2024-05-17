import {Item} from "./hydra/item";
import {UserApi} from "../../http/user/user.api";

export class User extends Item {
    constructor(data: any) {
        super(data)
        this._pictureProfileUrl = data['profilePicture'];
        this._numberOfFlashcards = data['numberOfFlashcards'];
        this._displayName = data['displayName'];
    }

    private _pictureProfileUrl: string | undefined

    get pictureProfileUrl(): string | undefined {
        return this._pictureProfileUrl
    }

    public set pictureProfileUrl(value: string|undefined) {
        this._pictureProfileUrl = value;
    }

    private readonly _numberOfFlashcards: number

    get numberOfFlashcards(): number {
        return this._numberOfFlashcards
    }

    private readonly _displayName: string

    get displayName(): string {
        return this._displayName
    }
}
