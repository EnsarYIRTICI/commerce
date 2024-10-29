import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNumberStringOrNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    console.log(object);

    registerDecorator({
      name: 'isNumberStringOrNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !isNaN(Number(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a number or numeric string`;
        },
      },
    });
  };
}
