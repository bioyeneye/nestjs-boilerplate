import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

export class UtilService{
    EnumToArray(enumVariable: any): string[] {
        return Object.keys(enumVariable).map(k => enumVariable[k]);
    }

    static GenerateUUID() : string{
        return uuidv4();
    }

    /**
     * convert entity to dto class instance
     * @param {{new(entity: E, options: any): T}} model
     * @param {E[] | E} entity
     * @param options
     * @returns {T[] | T}
     */
    public static toDto<T, E>(model: new (entity: E, options?: any) => T, entity: E, options?: any): T;
    public static toDto<T, E>(model: new (entity: E, options?: any) => T, entity: E[], options?: any): T[];
    public static toDto<T, E>(model: new (entity: E, options?: any) => T, entity: E | E[], options?: any): T | T[] {
        if (_.isArray(entity)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return entity.map((u) => new model(u, options));
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return new model(entity, options);
    }
}