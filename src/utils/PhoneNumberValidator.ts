import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(phone: number) {
    if (!phone || typeof phone !== 'number') return false;

    return phone.toString().length === 10;
  }

  defaultMessage() {
    return 'Invalid phone number';
  }
}

export const PhoneNumber = () => Validate(PhoneNumberValidator);

export default PhoneNumber;
