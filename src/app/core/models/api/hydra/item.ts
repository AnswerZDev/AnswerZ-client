import {Hydra} from "./hydra";

export abstract class Item extends Hydra {
    private readonly _id: string
    private readonly _iri: string
    private readonly _type: string

    protected constructor(data: any) {
        super()
        this._id = data['id'] ?? data['@id']
        this._iri = data['@id']
        this._type = data['@type']
    }

    get id(): string {
        return this._id
    }

    get type(): string {
        return this._type
    }

    get iri(): string {
        return this._iri
    }
}
