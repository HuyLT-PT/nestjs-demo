import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function AllowValues(
  property: Array<number | string | boolean>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'AllowValues',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [...property],
      options: validationOptions,
      validator: {
        validate(value: Array<string | number>, args: ValidationArguments) {
          const hasWrongValue = value.some(
            (item) => !args.constraints.includes(item),
          );
          return !hasWrongValue;
        },
        defaultMessage() {
          return `Allow values ${property.join(', ')}`;
        },
      },
    });
  };
}
