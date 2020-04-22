export class UtilService{
    EnumToArray(enumVariable: any): string[] {
        return Object.keys(enumVariable).map(k => enumVariable[k]);
    }
}