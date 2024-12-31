import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsEnumOf(
    property: Array<number | string | boolean>,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsEnumOf',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [...property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return args.constraints.includes(value);
          },
          defaultMessage() {
            return `Allow values ${property.join(', ')}`;
          },
        },
      });
    };
  }
  