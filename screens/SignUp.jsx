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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Dimensions } from 'react-native';
import { PRODUCTION_SERVER } from "../services/configs";
import Loading from "../Components/loading/Loading";
import Succes from "../Components/success/Succes";
import { UserTypes } from "../utils/app_constants";

const TypeOption = ({ label, isActive, onPress }) => (
	<TouchableOpacity
	  style={isActive ? styles.typeOptionActive : styles.typeOption}
	  onPress={onPress}
	>
	  <Text style={isActive ? styles.typeTextActive : styles.typeText}>{label}</Text>
	</TouchableOpacity>
  );

const SignUp = ({ navigation }) => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [provider, setProvider] = useState("email/password");
	const [selectedType, setSelectedType] = useState(UserTypes.STUDENT)

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [agreeWithTermsAndCondition, setAgreeWithTermsAndCondition] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [shoot, setShoot] = useState(false);

	const [showLoadingModal, setShowLoadingModal] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState('Please wait...')

	async function save(key, value) {
		await SecureStore.setItemAsync(key, value);
	}

	const validateUserInput = async () => {
		if (!agreeWithTermsAndCondition) {
			setError(true);
			setErrorMessage("Please agree with our app terms and conditions");
			return
		}
		if (email === "") {
			setError(true);
			setErrorMessage("Please input your email address");
		} else {
			let re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (re.test(email)) {
				if (password === "") {
					setError(true);
					setErrorMessage("Please input password");
				} else if (password.length < 7) {
					setError(true);
					setErrorMessage("Password field Minimum of 8 characters");
				} else if (password !== confirmPassword) {
					setError(true);
					setErrorMessage("Confirm password did not match!");
				} else {
					//Data checking with api

					setShowLoadingModal(true)

					const data = {
						provider: provider,
						email: email,
						password: password,
					};

					setLoadingMessage('Please wait while creating your acccount...')

					await axios
						.post(`${PRODUCTION_SERVER}/user/signup`, data)
						.then((response) => {
							const success = response.data.success;
							if (success === 0) {
								setLoadingMessage('Please wait...')
								setShowLoadingModal(false)
								setError(true);
								setErrorMessage(response.data.message);
							} else {
								setLoadingMessage('Please wait...')
								setShowLoadingModal(false)
								setError(false);
							}
						})
						.catch((error) => {
							setError(true);
							setErrorMessage("Failed creating account, please check your connection...");
						});

					setLoadingMessage('Please wait...')
					setShowLoadingModal(false)

				}
			} else {
				setError(true);
				setErrorMessage("Invalid email address");
			}
		}
	};

	useEffect(() => {
		//Time out to fire the cannon
		setTimeout(() => {
			setShoot(true);
		}, 1000);
	}, []);


	const handleLoginUser = async (email, password) => {
		setShowLoadingModal(true)
		setLoadingMessage('Logging in, please wait!...')

		const data = {
			email: email,
			password: password,
		};
		await axios
			.post(`${PRODUCTION_SERVER}/user/login`, data)
			.then((response) => {
				const success = response.data.success;

				if (success === 0) {
					setError(true);
					setErrorMessage(response.data.data);
					setLoadingMessage('Login failed')
					setShowLoadingModal(false)

				} else {
					setError(false);
					save("x-token", response.data.token);
					setLoadingMessage('Login successful')
					setShowLoadingModal(false)
					evaluateToken(response.data.token);
				}
			});

	}

	const evaluateToken = async (currentToken) => {
		var decodedToken = jwtDecode(currentToken);

		if (decodedToken.result.type === null || decodedToken.result.type === '') {
			return navigation.navigate("SignUpUserType");
		}

		navigation.navigate("Dashboard");
	}

	const viewTermsAndConditions = async () => {
		navigation.navigate('TermsAndCondition')
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

					<View style={styles.type}>
					<TypeOption
					  label="Student"
					  isActive={selectedType === UserTypes.STUDENT}
					  onPress={() => setSelectedType(UserTypes.STUDENT)}
					/>
					<TypeOption
					  label="Employee"
					  isActive={selectedType === UserTypes.EMPLOYEE}
					  onPress={() => setSelectedType(UserTypes.EMPLOYEE)}
					/>
					<TypeOption
					  label="Visitor"
					  isActive={selectedType === UserTypes.VISITOR}
					  onPress={() => setSelectedType(UserTypes.VISITOR)}
					/>
					</View>

					<Text style={styles.label}>Email</Text>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Email Address"
							defaultValue={email}
							onChangeText={(text) => setEmail(text)}
							style={styles.input}
						/>
					</View>
					<Text style={styles.label}>Password</Text>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Password"
							defaultValue={password}
							onChangeText={(text) => setPassword(text)}
							style={styles.input}
							secureTextEntry
						/>
					</View>

					<Text style={styles.label}>Confirm Password</Text>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Confirm Password"
							defaultValue={confirmPassword}
							onChangeText={(text) => setConfirmPassword(text)}
							style={styles.input}
							secureTextEntry
						/>
					</View>

					{error ? (
						<Text style={styles.errorMessage}>*{errorMessage}</Text>
					) : (
						<Text style={styles.errorMessage}></Text>
					)}
					<View style={{ display: 'flex', flexDirection: 'row' }}>
						<Checkbox
							value={agreeWithTermsAndCondition}
							onValueChange={() => { setAgreeWithTermsAndCondition(!agreeWithTermsAndCondition) }}
							style={{ marginRight: 5 }}
						/>
						<Text style={{ color: '#4d7861' }} onPress={() => { viewTermsAndConditions() }}>Agree with our Terms and conditions</Text>
					</View>

					<TouchableOpacity
						onPress={() => validateUserInput()}
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
	inputView: { 
		backgroundColor: 'white',
		marginVertical: 5, 
		overflow:'hidden', 
		borderRadius: 1, 
		borderWidth: .1,
		width: '100%'
	},
	input: {
		height: 50,
		borderColor: "#7a42f4",
		paddingHorizontal: 15,
		borderWidth: 0.1,
		fontSize: 16,
		color: "#4d7861",
		overflow: 'hidden'
	},
	inputContainer: {
		width: '100%',
		paddingHorizontal: 35
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
		marginLeft: 41,
		color: "red",
		paddingVertical: 7.5,
	},
});
