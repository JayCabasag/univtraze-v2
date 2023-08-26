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
import { useUserDispatch } from "../../contexts/user/UserContext";
import { genericPostRequest } from "../../services/genericPostRequest";
import { DEFAULT_ERROR_MESSAGE, UserTypes } from "../../utils/app_constants";
import { useFormik } from "formik";
import { SignUpSchema } from "./schemas/SignUpSchema";

const SignUp = ({ navigation, route }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [selectedType, setSelectedType] = useState(route.params.type)
	const userDispatch = useUserDispatch()

	const formik = useFormik({
		initialValues: {
			type: UserTypes.STUDENT,
			email: '',
			password: ''
		},
		validationSchema: SignUpSchema,
		onSubmit: () => {
			
		}
	})

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [agreeWithTermsAndCondition, setAgreeWithTermsAndCondition] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [showLoadingModal, setShowLoadingModal] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState('Please wait...')



	const signUpNow = async () => {
		if (!agreeWithTermsAndCondition) {
		  setError(true);
		  setErrorMessage("Please agree with our app terms and conditions");
		  return;
		}
	  
		if (email === "") {
		  setError(true);
		  setErrorMessage("Please input your email address");
		  return;
		}
	  
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  
		if (!emailRegex.test(email)) {
		  setError(true);
		  setErrorMessage("Invalid email address");
		  return;
		}
	  
		if (password === "") {
		  setError(true);
		  setErrorMessage("Please input password");
		  return;
		}
	  
		if (password.length < 8) {
		  setError(true);
		  setErrorMessage("Password field requires a minimum of 8 characters");
		  return;
		}
	  
		if (password !== confirmPassword) {
		  setError(true);
		  setErrorMessage("Confirm password did not match!");
		  return;
		}
	  
		setShowLoadingModal(true);
		setLoadingMessage('Please wait while creating your account...');
	  
		const data = {
		  email: email,
		  password: password,
		  type: selectedType
		};

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
			setLoadingMessage('Logging in...');
			redirect(user.verified)
		})
		.catch((error) => {
			setShowLoadingModal(false);
			if (error.response.status === 409) {
				alert('User already exists')
				userDispatch({ type: 'reset' })
				return 
			}
			if (error.response.status === 401) {
				alert('Invalid creadentials')
				userDispatch({ type: 'reset' })
				return 
			}
			console.log(error)
			alert(DEFAULT_ERROR_MESSAGE);
		})
		.finally(() => {
			setShowLoadingModal(false);
			setError(false)
		    setLoadingMessage('');
		})
	  
	}

	const redirect = (verified) => {
		if (!verified) {
			const typeToRoute = {
			  [UserTypes.STUDENT]: "SignUpUserCredentialsStudent",
			  [UserTypes.EMPLOYEE]: "SignUpUserCredentialsEmployee",
			  [UserTypes.VISITOR]: "SignUpUserCredentialsVisitor",
			};
			  
			const route = typeToRoute[selectedType];
			if (route) {
			  return navigation.navigate(route, { type: selectedType });
			}
		}
		navigation.navigate("Dashboard");
	}

	return (
		<SafeAreaView style={styles.root}>
			<Loading
			  open={showLoadingModal} 
			  onClose={() => setShowLoadingModal(!showLoadingModal)}
			  message={loadingMessage}
			/>
			<Succes open={showSuccessModal} onContinue={() => handleLoginUser(email, confirmPassword)} />
			<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
			<KeyboardAvoidingView style={styles.container} behavior='height'>
				<View style={styles.inputContainer}>
					<Text style={styles.header}>Sign Up</Text>
					<TypeSelect
					  type={formik.values.type}
					  onChangeType={() => console.log('Hello')}
					/>
					<Text style={styles.label}>Email</Text>
						<TextInput
							placeholder="Email Address"
							defaultValue={email}
							onChangeText={(text) => setEmail(text)}
							style={styles.input}
						/>
					<Text style={styles.label}>Password</Text>
						<TextInput
							placeholder="Password"
							defaultValue={password}
							onChangeText={(text) => setPassword(text)}
							style={styles.input}
							secureTextEntry
						/>

					<Text style={styles.label}>Confirm Password</Text>
						<TextInput
							placeholder="Confirm Password"
							defaultValue={confirmPassword}
							onChangeText={(text) => setConfirmPassword(text)}
							style={styles.input}
							secureTextEntry
						/>

					{error && <Text style={styles.errorMessage}>*{errorMessage}</Text>}
					<View style={{ display: 'flex', flexDirection: 'row', marginVertical: 15 }}>
						<Checkbox
							value={agreeWithTermsAndCondition}
							onValueChange={() => setAgreeWithTermsAndCondition(!agreeWithTermsAndCondition)}
							style={{ marginHorizontal: 10 }}
						/>
						<Text style={{ color: '#4d7861' }} onPress={() => navigation.navigate('TermsAndCondition')}>Agree with our Terms and conditions</Text>
					</View>

					<TouchableOpacity
						onPress={signUpNow}
						style={styles.button}
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
	button: {
		borderRadius: 20,
		elevation: 2,
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
