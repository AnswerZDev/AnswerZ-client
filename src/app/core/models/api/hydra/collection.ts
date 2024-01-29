import {Hydra} from "./hydra";
import {HydraFactory} from "./hydra.factory";
import {Item} from "./item";


export class Collection<T extends Item> extends Hydra {
    private readonly _context: string
    private readonly _id: string
    private readonly _type: string
    private readonly _totalItems: number
    private readonly _member: T[] = []

    public constructor(type: any, data: any) {
        super()
        this._context = data['@context']
        this._id = data['@id']
        this._type = data['@type']
        this._totalItems = data[this.prefix + 'totalItems']
        data.forEach((item: any) => {
            this._member.push(HydraFactory.createItem<T>(type, item))
        })
    }

    get context(): string {
        return this._context
    }

    get id(): string {
        return this._id
    }

    get type(): string {
        return this._type
    }

    get totalItems(): number {
        return this._totalItems
    }

    get member(): Item[] {
        return this._member
    }

    get first(): Item {
        return this._member[0]
    }

    get last(): Item {
        return this._member[this._member.length - 1]
    }
}
