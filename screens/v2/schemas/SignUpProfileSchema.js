import * as Yup from 'yup';

export const ProfileValidationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z\s]+$/, 'First Name must contain only letters'),
    middleName: Yup.string(),
    lastName: Yup.string().required('Last Name is required'),
    suffix: Yup.string(),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 12)), 'You must be at least 12 years old'),
  });
  