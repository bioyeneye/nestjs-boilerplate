import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export interface IsPasswordValidData {
    MustContainSpecialCharacter: boolean;
    MustContainUpperLetter: boolean;
    MustContainLowerLetter: boolean;
    MustContainNumber: boolean;
}

const containsUpperCase = (string) => /[A-Z]/.test(string);
const containsLowerCase = (string) => /[a-z]/.test(string);
const containsNumber = (string) => /[0-9]/.test(string);
const containsSpecialCharacter = (testvalue) => /[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/.test(testvalue);

export function IsPasswordValid(property: IsPasswordValidData, validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isLongerThan",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {

                    if(!value) {
                        return false;
                    }

                    const relatedValue = args.constraints[0] as IsPasswordValidData

                    if(relatedValue.MustContainUpperLetter){
                        if(!containsUpperCase(value)) return false;
                    }

                    if(relatedValue.MustContainLowerLetter){
                        if(!containsLowerCase(value)) return false;
                    }

                    if(relatedValue.MustContainNumber){
                        if(!containsNumber(value)) return false;
                    }

                    if(relatedValue.MustContainSpecialCharacter){
                        if(!containsSpecialCharacter(value)) return false;
                    }

                    return  true// you can return a Promise<boolean> here as well, if you want to make async validation
                }
            }
        });
   };
}

import {ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
 
@ValidatorConstraint({ name: "passwordValidation", async: false })
export class PasswordValidation implements ValidatorConstraintInterface {
 
    validate(value: string, args: ValidationArguments) {
        
        if(!value) {
            return false;
        }

        const relatedValue = args.constraints[0] as IsPasswordValidData

        if(relatedValue.MustContainUpperLetter){
            if(!containsUpperCase(value)) return false;
        }

        if(relatedValue.MustContainLowerLetter){
            if(!containsLowerCase(value)) return false;
        }

        if(relatedValue.MustContainNumber){
            if(!containsNumber(value)) return false;
        }

        if(relatedValue.MustContainSpecialCharacter){
            if(!containsSpecialCharacter(value)) return false;
        }

        return  true
    }
 
    defaultMessage(args: ValidationArguments) {
        const value = args.value;
        if(!value) {
            return "";
        }

        const relatedValue = args.constraints[0] as IsPasswordValidData

        if(relatedValue.MustContainUpperLetter){
            if(!containsUpperCase(value)) return "upper";
        }

        if(relatedValue.MustContainLowerLetter){
            if(!containsLowerCase(value)) return "lower";
        }

        if(relatedValue.MustContainNumber){
            if(!containsNumber(value)) return "number";
        }

        if(relatedValue.MustContainSpecialCharacter){
            if(!containsSpecialCharacter(value)) return "special";
        }

        return "The Text ($value) is too short or too long!";
    }
 
}