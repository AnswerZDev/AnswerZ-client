import {Item} from "./hydra/item";

export class Question extends Item {
   
    private _description: string | undefined;

    private _duration : string | undefined;

    private _points: number | undefined;

    private _question_type: string | undefined;

    private _choices: string[] | undefined;


    
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
