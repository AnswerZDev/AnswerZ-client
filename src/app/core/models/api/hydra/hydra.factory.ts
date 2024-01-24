import {Item} from "./item";
import {Collection} from "./collection";


export class HydraFactory {
    static createItem<T extends Item>(type: any, data: any): T {
        return new type(data)
    }

    static createCollection<T extends Item>(
        type: any,
        data: any
    ): Collection<T> {
        return new Collection<T>(type, data)
    }
}
