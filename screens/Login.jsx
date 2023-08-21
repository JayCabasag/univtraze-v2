import {
	KeyboardAvoidingView,
	Image,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	StatusBar
} from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTION_SERVER } from "../services/configs";
import { DEFAULT_ERROR_MESSAGE } from "../utils/app_constants";
import Loading from "../Components/loading/Loading";

const Login = ({ navigation }) => {
	const image = {
		uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Flogin_image.png?alt=media&token=ebb53e48-2bc0-485d-8456-fe8a31683061",
	};

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	//Variables for loading

	const [showLoadingModal, setShowLoadingModal] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState("Please wait...")


	async function save(key, value) {
		await SecureStore.setItemAsync(key, value);
	}

	const loginNow = async () => {

		setShowLoadingModal(true)
		setLoadingMessage('Validating your credentials...please wait')
		if (emailInput === "") {
			setError(true);
			setErrorMessage("Please input your email address");
		} else {
			let re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (re.test(emailInput)) {
				if (passwordInput === "") {
					setError(true);
					setErrorMessage("Please input password");
				} else if (passwordInput.length < 7) {
					setError(true);
					setErrorMessage("Password field Minimum of 8 characters");
				} else {
					const data = {
						email: emailInput,
						password: passwordInput,
					};
					await axios
						.post(`${PRODUCTION_SERVER}/user/login`, data)
						.then((response) => {
							const success = response.data.success;
							if (success === 0) {
								setError(true);
								setErrorMessage(response.data.data);
							} else {
								setLoadingMessage('Loggin in...')
								setError(false);
								save("x-token", response.data.token);
								setEmailInput("");
								setPasswordInput("");
								evaluateToken(response.data.token);
							}
						}).catch(() => {
							alert(DEFAULT_ERROR_MESSAGE)
						}).finally(() => {
							setShowLoadingModal(false)
						})
				}
			} else {
				setError(true);
				setErrorMessage("Invalid email address");
			}
		}
		setShowLoadingModal(false)
		setLoadingMessage('Please wait')
	};

	const evaluateToken = (currentToken) => {
		var decodedToken = jwtDecode(currentToken);
		if (decodedToken.result.type === null || decodedToken.result.type === '') {
			return navigation.navigate("SignUpUserType");
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
			<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
			<KeyboardAvoidingView style={styles.container} behavior="height">
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={image} />
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.loginText}>Log in</Text>
					<Text style={styles.label}>Email</Text>
					<View style={styles.inputView}>
					  <TextInput
						placeholder="Email Address"
						defaultValue={emailInput}
						onChangeText={(text) => {
							setEmailInput(text);
						}}
						style={styles.input}
					  />
					</View>

					<Text style={styles.label}>Password</Text>
					<View style={styles.inputView}>
					  <TextInput
						placeholder="Password"
						defaultValue={passwordInput}
						onChangeText={(text) => {
							setPasswordInput(text);
						}}
						style={styles.input}
						secureTextEntry
					  />
					</View>

					{error ? (
						<Text style={styles.errorMessage}>*{errorMessage}</Text>
					) : (
						<Text style={styles.errorMessage}></Text>
					)}

					<Text style={styles.forgotPassword} onPress={() => {
						navigation.navigate('ForgotPassword')
					}}>Forgot Password?</Text>

                    <TouchableOpacity onPress={() => loginNow()} style={styles.button}>
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
		backgroundColor: "#E1F5E4", 
		height: '100%',
		width: '100%', 
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center',
	},
	image: {
		justifyContent: "center",
		width: 200,
		height: 200,
		resizeMode: "center"
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 'auto'
	},
	imageContainer: {
	    display: 'flex',
		flexDirection: 'column',
		height: 200,
		width: '100%',
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		marginTop: 10,
		paddingHorizontal: 35,
		width: '100%'
	},
	label: {
		color: "#4d7861",
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
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		borderRadius: 10,
		marginTop: 5,
		paddingVertical: 18,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
	loginText: {
		fontWeight: "bold",
		textAlign: "left",
		color: "#364D39",
		fontSize: 30,
		lineHeight: 30,
		textTransform: "uppercase",
		marginBottom: 20
	},
	errorMessage: {
		textAlign: "left",
		color: "red",
		paddingVertical: 7.5,
	},
	forgotPassword: {
		textAlign: "right",
		textDecorationLine: "underline",
		color: "#4d7861",
		marginBottom: 10,
		marginRight: 10
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
		width: "100%",
		justifyContent: "center",
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
	}
});
