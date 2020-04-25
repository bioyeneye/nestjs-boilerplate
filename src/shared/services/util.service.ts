import { v4 as uuidv4 } from 'uuid';

export class UtilService{
    EnumToArray(enumVariable: any): string[] {
        return Object.keys(enumVariable).map(k => enumVariable[k]);
    }

    static GenerateUUID() : string{
        return uuidv4();
    }
}