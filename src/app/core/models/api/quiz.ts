import {Item} from "./hydra/item";
import {Question} from "./question";

export class Quiz extends Item {
    constructor(data: any) {
        super(data);

        this._title = data.title;
        this._description = data.description;
        this._visibility = data.visibility;
        this._category = data.category;
        this._max_players = data.maxPlayers;
        this._image = data.image;
        this._list_of_questions = data.questions ?
        data.questions.map((question: any) => {
            return new Question(question);
        })
    :
        undefined;
    }

    private _title: string | undefined;

    public get title(): string | undefined {
        return this._title;
    }

    public set title(value: string | undefined) {
        this._title = value;
    }

    private _image: string | undefined;

    public get image(): string | undefined {
        return this._image;
    }

    public set image(value: string | undefined) {
        this._image = value;
    }

    private _category: string | undefined;

    public get category(): string | undefined {
        return this._category;
    }

    public set category(value: string | undefined) {
        this._category = value;
    }

    private _visibility: string | undefined;

    public get visibility(): string | undefined {
        return this._visibility;
    }

    public set visibility(value: string | undefined) {
        this._visibility = value;
    }

    private _description: string | undefined;

    public get description(): string | undefined {
        return this._description;
    }

    public set description(value: string | undefined) {
        this._description = value;
    }

    private _max_players: number | undefined;

    public get max_players(): number | undefined {
        return this._max_players;
    }

    public set max_players(value: number | undefined) {
        this._max_players = value;
    }

    private _list_of_questions: Question[] | undefined;

    public get list_of_questions(): Question[] | undefined {
        return this._list_of_questions;
    }

    public set list_of_questions(value: Question[] | undefined) {
        this._list_of_questions = value;
    }
}
