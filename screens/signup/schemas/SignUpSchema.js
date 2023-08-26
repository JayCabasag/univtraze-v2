import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    'Password must contain at least one letter, one number, and one special character'
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAndConditions: Yup.boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),
  });
  