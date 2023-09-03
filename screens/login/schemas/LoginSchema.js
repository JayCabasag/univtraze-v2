import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      'Password must contain at least one letter, one number, and one special character'
    ),
});
