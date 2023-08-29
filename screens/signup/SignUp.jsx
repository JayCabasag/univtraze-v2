import {
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	StatusBar
} from "react-native";
import Checkbox from 'expo-checkbox';
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../Components/loading/Loading";
import Succes from "../../Components/success/Succes";
import TypeSelect from "../../Components/type/TypeSelect";
import { useUser, useUserDispatch } from "../../contexts/user/UserContext";
import { genericPostRequest } from "../../services/genericPostRequest";
import { useFormik } from "formik";
import { SignUpSchema } from "./schemas/SignUpSchema";
import { UserTypes } from "../../utils/app_constants";
import { Alert } from "react-native";

const SignUp = ({ navigation, route }) => {
	const loadingMessage = "Registering please wait..."
	const userDispatch = useUserDispatch()
	const user = useUser()
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [showLoadingModal, setShowLoadingModal] = useState(false)

	const formik = useFormik({
		initialValues: {
			type: route.params.type,
			email: '',
			password: '',
			confirmPassword: '',
			termsAndConditions: false,
		},
		validationSchema: SignUpSchema,
		onSubmit: async (values) => {
			const data = {
				email: values.email,
				password: values.password,
				type: values.type
			  };
			  setShowLoadingModal(true)
			  await genericPostRequest('/auth/signup', data)
			  .then((response) => {
				  const data = response
				  const user = data['user']
				  userDispatch({ 
					  type: 'update', 
					  payload: { 
						  id: user.sub, 
						  type: user.type, 
						  email: user.email, 
						  token: data['access_token'],
						  verified: user.verified,
						  status: 'authenticated'
					  }
				  })
				  setShowSuccessModal(true)
			  })
			  .catch((error) => {
				  setShowLoadingModal(false);
				  if (error.response.status === 409) {
					  Alert.alert('User already exists', 'Please use a different email', [
						{ text: 'OK' },
					  ]);
					  userDispatch({ type: 'reset' })
					  return 
				  }
				  Alert.alert('Internal server error', 'Please contact admin if issue persits', [
					{ text: 'OK' },
				  ]);
			  })
			  .finally(() => {
				  setShowLoadingModal(false);
			  })
		}
	})

	const redirect = (verified) => {
		setShowSuccessModal(false)
		if (!verified) {
			return navigation.navigate('UserProfile', { type: formik.values.type });
		}
		return navigation.navigate("Dashboard");
	}

	const handleInputTextChange = (type, name) => {
		formik.setFieldValue(name, type)
	}

	const handleInputTextBlur = (name) => {
		formik.setFieldTouched(name)
	}

	const hasEmailError = !!formik.errors.email && formik.touched.email
	const hasPasswordError = !!formik.errors.password && formik.touched.password
	const hasConfirmPasswordError = !!formik.errors.confirmPassword && formik.touched.confirmPassword
	const hasTermsAndConditionsError = !!formik.errors.termsAndConditions && formik.touched.termsAndConditions

	return (
		<SafeAreaView style={styles.root}>
			<Loading
			  open={showLoadingModal} 
			  onClose={() => setShowLoadingModal(!showLoadingModal)}
			  message={loadingMessage}
			/>
			<Succes open={showSuccessModal} onContinue={() => redirect(user.verified)} />
			<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
			<KeyboardAvoidingView style={styles.container} behavior='height'>
				<View style={styles.inputContainer}>
					<Text style={styles.header}>Sign Up</Text>
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

					<Text style={styles.label}>Confirm Password</Text>
						<TextInput
							placeholder="Confirm Password"
							value={formik.values.confirmPassword}
							onChangeText={(text) => handleInputTextChange(text, 'confirmPassword')}
							onBlur={() => handleInputTextBlur('confirmPassword')}
							style={hasConfirmPasswordError ? styles.errorInput : styles.input}
							secureTextEntry
						/>
						{hasConfirmPasswordError && <Text style={styles.errorLabel}>*{formik.errors.confirmPassword}</Text>}

					<View style={{ display: 'flex', flexDirection: 'row', marginVertical: 15 }}>
						<Checkbox
							value={formik.values.termsAndConditions}
							onValueChange={() => handleInputTextChange(!formik.values.termsAndConditions, 'termsAndConditions')}
							style={hasTermsAndConditionsError
								? { marginLeft: 5, marginRight: 10, borderColor: 'red' }
								: { marginLeft: 5, marginRight: 10 }
							}
						/>
						<Text style={{ color: '#4d7861' }} onPress={() => navigation.navigate('TermsAndCondition')}>Agree with our Terms and conditions</Text>
					</View>
					{hasTermsAndConditionsError && <Text style={styles.errorLabel}>*{formik.errors.termsAndConditions}</Text>}

					<TouchableOpacity
						onPress={formik.handleSubmit}
						style={styles.button}
						disabled={formik.isSubmitting}
					>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	root: {
	  height: '100%',
	  backgroundColor: "#E1F5E4",
	  width: '100%'
	},
	type: { 
	  width: '100%', 
	  display: 'flex', 
	  flexDirection: 'row', 
	  alignItems: 'center', 
	  justifyContent: 'space-between',
	  marginBottom: 15,
	  overflow: 'hidden',
	  borderWidth: .1,
    },
	typeOption: {
	  backgroundColor: 'white',
	  paddingVertical: 14,
	  borderWidth: .2,
	  borderColor: '#4d7861',
	  flex: 1,
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center'
	},
	typeOptionActive: {
		backgroundColor: '#28CD41',
		borderWidth: .2,
		paddingVertical: 14,
		flex: 1,
		borderColor: '#4d7861',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	typeText: {
		fontWeight: '400',
		color: "#364D39",
		textTransform: 'capitalize'
	},
	typeTextActive: {
		fontWeight: '400',
		color: "white",
		textTransform: 'capitalize'
	},
	buttonContainer: {
		backgroundColor: "transparent",
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
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		color: "#4d7861"
	},
	image: {
		justifyContent: "center",
		width: "100%",
		height: 200,
		resizeMode: "center",
	},

	imageContainer: {
		width: "100%",
		height: "auto",
	},

	container: {
		width: '100%',
		height: '100%',
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		color: "#4d7861"
	},
	errorLabel: {
		color: "red",
		marginBottom: 12
	},
	input: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 0,
		marginRight: 0,
		width: "100%",
		height: 50,
		borderColor: "#28CD41",
		paddingHorizontal: 15,
		borderWidth: 1,
		borderRadius: 10,
		overflow: "hidden",
		paddingVertical: 1,
		fontSize: 16,
		color: "#4d7861",
		backgroundColor: "#ffff",
	},
	errorInput: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 0,
		marginRight: 0,
		width: "100%",
		height: 50,
		borderColor: "red",
		paddingHorizontal: 15,
		borderWidth: 1,
		borderRadius: 10,
		overflow: "hidden",
		paddingVertical: 1,
		fontSize: 16,
		color: "#4d7861",
		backgroundColor: "#ffff",
	},
	inputContainer: {
		width: '100%',
		paddingHorizontal: 25
	},
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		borderRadius: 10,
		width: '100%',
		marginTop: 10,
		paddingVertical: 18,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
	header: {
		fontWeight: "bold",
		textAlign: "left",
		color: "#364D39",
		fontSize: 30,
		lineHeight: 30,
		textTransform: "uppercase",
		paddingVertical: 30,
	},
	forgotPassword: {
		textAlign: "right",
		marginRight: 41,
		textDecorationLine: "underline",
		color: "#4d7861",
		paddingVertical: 7.5,
	},
	orText: {
		color: "#4d7861",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		paddingVertical: 7.5,
	},
	socialMediaContainer: {
		flexDirection: "row",
		width: '100%',
		alignSelf: "center",
		justifyContent: "center",
	},
	googleImage: {
		width: 50,
		height: 50,
		marginRight: 7,
	},

	facebookImage: {
		width: 36,
		height: 36,
		marginTop: 4,
		marginLeft: 7,
	},
	errorMessage: {
		textAlign: "left",
		color: "red",
		paddingVertical: 7.5,
	},
});
