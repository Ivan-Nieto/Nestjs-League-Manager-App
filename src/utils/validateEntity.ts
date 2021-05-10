import { validate } from 'class-validator';

export const validateEntity = async (entity: any) =>
  validate(entity)
    .then((errors) => {
      return {
        valid: !Boolean(errors?.length),
        errors,
        message: Boolean(errors.length)
          ? Object.values(errors[0].constraints || {}).join(', ')
          : [],
      };
    })
    .catch((error) => {
      console.error(error);
      return { valid: false, errors: [], message: 'Internal' };
    });

export default validateEntity;
