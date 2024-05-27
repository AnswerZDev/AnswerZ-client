import {Item} from "./hydra/item";

export class Question extends Item {
   
    private _description: string | undefined;

    private _duration : string | undefined;

    private _points: number | undefined;

    private _question_type: string | undefined;

    private _choices: string[] | undefined;


    constructor(data: any) {
        super(data)

        this._description = data.description;
        this._duration = data.duration;
        this._points = data.points;
        this._question_type = data.question_type;
        this._choices = data.choices;
    }
    
    public get description(): string | undefined {
        return this._description;
    }

    public get duration(): string | undefined {
        return this._duration;
    }

    public get points(): number | undefined {
        return this._points;
    }

    public get question_type(): string | undefined {
        return this._question_type;
    }

    public get choices(): string[] | undefined {
        return this._choices;
    }
}
