import {Item} from "./hydra/item";

export class User extends Item {
    constructor(data: any) {
        super(data)

        this._pictureProfileUrl = data['pictureProfileUrl'];
    }

    private _pictureProfileUrl: string | undefined

    get pictureProfileUrl(): string | undefined {
        return this._pictureProfileUrl
    }
}
