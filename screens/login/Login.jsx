import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEFAULT_ERROR_MESSAGE, UserTypes } from '../../utils/app_constants';
import Loading from '../../Components/loading/Loading';
import TypeSelect from '../../Components/type/TypeSelect';
import { genericPostRequest } from '../../services/genericPostRequest';
import { useUserDispatch } from '../../contexts/user/UserContext';
import { useFormik } from 'formik';
import { LoginSchema } from './schemas/LoginSchema';
import { Alert } from 'react-native';

const Login = ({ navigation }) => {
  const userDispatch = useUserDispatch();

  const formik = useFormik({
    initialValues: {
      type: UserTypes.STUDENT,
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
        type: values.type,
      };
      setShowLoadingModal(true);
      await genericPostRequest('/auth/signin', data)
        .then((response) => {
          const data = response;
          const user = data['user'];
          userDispatch({
            type: 'update',
            payload: {
              id: user.sub,
              type: user.type,
              email: user.email,
              token: data['access_token'],
              verified: user.verified,
              status: 'authenticated',
            },
          });
          redirect(user.verified);
        })
        .catch((error) => {
          setShowLoadingModal(false);
          if (error.response.status === 409 || error.response.status === 401) {
            Alert.alert('Invalid Credentials', 'Make sure your email and password is correct', [
              { text: 'OK' },
            ]);
            userDispatch({ type: 'reset' });
            return;
          }

          Alert.alert('Internal server error', 'Contact admin if issue persits', [{ text: 'OK' }]);
        })
        .finally(() => {
          setShowLoadingModal(false);
        });
    },
  });

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Logging in please wait...');

  const redirect = (verified) => {
    if (!verified) {
      return navigation.navigate('UserProfile');
    }
    navigation.navigate('Dashboard');
  };

  const handleInputTextChange = (type, name) => {
    formik.setFieldValue(name, type);
  };

  const handleInputTextBlur = (name) => {
    formik.setFieldTouched(name);
  };

  const hasEmailError = !!formik.errors.email && formik.touched.email;
  const hasPasswordError = !!formik.errors.password && formik.touched.password;

  return (
    <SafeAreaView style={styles.root}>
      <Loading
        open={showLoadingModal}
        onClose={() => setShowLoadingModal(!showLoadingModal)}
        message={loadingMessage}
      />
      <StatusBar animated={true} backgroundColor="#E1F5E4" barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/login_image.png')} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Log in</Text>
          <TypeSelect
            type={formik.values.type}
            onSelectType={(type) => handleInputTextChange(type, 'type')}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email Address"
            value={formik.values.email}
            onChangeText={(text) => handleInputTextChange(text, 'email')}
            onBlur={() => handleInputTextBlur('email')}
            style={hasEmailError ? styles.errorInput : styles.input}
          />
          {hasEmailError && <Text style={styles.errorLabel}>*{formik.errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={formik.values.password}
            onChangeText={(text) => handleInputTextChange(text, 'password')}
            onBlur={() => handleInputTextBlur('password')}
            style={hasPasswordError ? styles.errorInput : styles.input}
            secureTextEntry
          />
          {hasPasswordError && <Text style={styles.errorLabel}>*{formik.errors.password}</Text>}

          <Text
            style={styles.forgotPassword}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
            Forgot Password?
          </Text>

          <TouchableOpacity
            disabled={formik.isSubmitting}
            onPress={formik.handleSubmit}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#E1F5E4',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    width: 200,
    height: 200,
    resizeMode: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 10,
    paddingHorizontal: 25,
    width: '100%',
  },
  label: {
    color: '#4d7861',
  },
  errorLabel: {
    color: 'red',
    marginBottom: 12,
  },

  input: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    height: 50,
    borderColor: '#28CD41',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 1,
    fontSize: 16,
    color: '#4d7861',
    backgroundColor: '#ffff',
  },
  errorInput: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    height: 50,
    borderColor: 'red',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 1,
    fontSize: 16,
    color: '#4d7861',
    backgroundColor: '#ffff',
  },
  button: {
    backgroundColor: '#28CD41',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#364D39',
    fontSize: 30,
    lineHeight: 30,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  errorMessage: {
    textAlign: 'left',
    color: 'red',
    paddingVertical: 7.5,
  },
  forgotPassword: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#4d7861',
    marginVertical: 10,
    marginRight: 10,
  },
  orText: {
    color: '#4d7861',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 7.5,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  googleImage: {
    width: 50,
    height: 50,
  },

  facebookImage: {
    width: 36,
    height: 36,
    marginTop: 4,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
