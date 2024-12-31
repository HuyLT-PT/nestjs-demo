import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UnprocessableEntity } from '../exceptions';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import moment from 'moment';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isNumeric =
      ['string', 'number'].includes(typeof value) &&
      !isNaN(parseFloat(value)) &&
      isFinite(value);

    if (!isNumeric) {
      throw new UnprocessableEntity(
        'Validation failed (numeric string is expected)',
      );
    }

    return parseInt(value, 10);
  }
}

@ValidatorConstraint({ name: 'IsUniqueId', async: false })
export class ValidateUniqueId implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^[a-zA-Z\d]{6,20}$/;

    return IsValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must consist of lowercase letters, uppercase letters, and numbers, from 6 to 20 characters.`;
  }
}

@ValidatorConstraint({ name: 'IsInviteCode', async: false })
export class ValidateInviteCode implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^(?=.*[a-zA-Z\d])[a-zA-Z\d]{10}$/;
    return IsValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be exactly 10 characters long, consisting of letters (both lowercase and uppercase) and numbers.`;
  }
}

@ValidatorConstraint({ name: 'IsPassword', async: false })
export class validatePassword implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsPassword =
      /^(?=.*[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{10,50}$/;
    return IsPassword.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be 10 - 50 characters, latin Letters, numbers or special characters.`;
  }
}

export function IsDateCustom(format: string): Function {
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      name: 'IsDateCustom',
      target: object.constructor,
      propertyName,
      validator: {
        validate(date: string, args: ValidationArguments): boolean {
          const parsedDate = moment(date, format, true);
          return parsedDate.isValid();
        },

        defaultMessage(args: ValidationArguments): string {
          return `${propertyName} Date is not valid with type ${format}`;
        },
      },
    });
  };
}
@ValidatorConstraint({ name: 'IsKanji', async: false })
export class ValidateNameKanji implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^[一-龯]{1,50}$/;
    return IsValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be kanji, from 1 to 20 characters..`;
  }
}

@ValidatorConstraint({ name: 'IsKatakana', async: false })
export class ValidateNameKatakana implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^[\u30A0-\u30FFー　 _]+$/;
    return IsValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be katakana`;
  }
}

@ValidatorConstraint({ name: 'ISOString', async: false })
export class CustomISOString implements ValidatorConstraintInterface {
  validate(dateTimeString: string, args: ValidationArguments) {
    try {
      const ISOStringRegex = new RegExp(
        '^\\d\\d\\d\\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9].[0-9][0-9][0-9])Z$',
      );

      const isIOSString = ISOStringRegex.test(dateTimeString);
      const date = new Date(dateTimeString).toISOString();

      return isIOSString && date === dateTimeString;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be ISOString `;
  }
}

@ValidatorConstraint({ name: 'validateDateFormat', async: false })
export class ValidateDateFormat implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    if (!date) return false;

    const isValid = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (!isValid.test(date)) {
      return false;
    }

    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in the format YYYY-MM-DD and must be a valid date.`;
  }
}

@ValidatorConstraint({ name: 'validateTimeFormat', async: false })
export class ValidateTimeFormat implements ValidatorConstraintInterface {
  validate(time: string, args: ValidationArguments) {
    if (!time) return false;

    const isValid = /^([01]\d|2[0-3]):([0-5]\d)$/;

    return isValid.test(time);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in the format HH:mm.`;
  }
}

@ValidatorConstraint({ name: 'IsUsername', async: false })
export class ValidateUsername implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^[^#@]{3,50}$/;
    const IsNewValid = /^[^#@]{1,50}$/;
    return IsNewValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be 3 - 50 characters, not included  # or @.`;
  }
}

@ValidatorConstraint({ name: 'IsMessageDonatePost', async: false })
export class ValidateMessageDonatePost implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^.{0,100}$/;
    return IsValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} has a maximum length of 100 characters`;
  }
}
@ValidatorConstraint({ name: 'IsMessageDonateModel', async: false })
export class ValidateMessageDonateModel
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments) {
    const data = text?.replace(/\s+/g, '');

    const IsValid = /^.{0,45}$/;
    return IsValid.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} has a maximum length of 45 characters`;
  }
}

@ValidatorConstraint({ name: 'IsValidPhoneNumber', async: false })
export class ValidatePhoneNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const IsValid = /^\+?\d+$/;
    return IsValid.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not valid.`;
  }
}
