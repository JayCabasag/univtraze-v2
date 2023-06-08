import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {
	StyleSheet,
	StatusBar,
	Text,
	View,
	ImageBackground,
	Image,
	Modal,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { PRODUCTION_SERVER } from "../services/configs";
import { DEFAULT_ERROR_MESSAGE, MedicalConditions } from "../utils/app_constants";
import { Select, SelectItem } from '@ui-kitten/components'

const ReportEmergency = ({ navigation }) => {
	const [selectedIndex, setSelectedIndex] = useState([]);
	const selectedMedicalConditionsValue = selectedIndex.map((index) => MedicalConditions[index - 1]).join(", ")
	const [textArea, onChangeTextArea] = React.useState("");
	const [allRooms, setAllRooms] = useState([]);
	const [selectedRoomIndex, setSelectedRoomIndex] = useState(0)
	const selectedRoomValue = allRooms?.[selectedRoomIndex - 1]?.room_number ?? 'Select Room'

	const [token, setToken] = useState('')
	const [currentUserId, setCurrentUserId] = useState(null)


	//Loading modal Variables
	const [showLoadingModal, setShowLoadingModal] = useState(false)
	const [loadingModalMessage, setLoadingModalMessage] = useState('Please wait...')

	useEffect(() => {
		getValueFor("x-token");
	}, []);

	async function getValueFor(key) {
		let token = await SecureStore.getItemAsync(key);
		if (token) {
			setToken(token);
			decodeJwt(token);
			getAllRooms(token)
		} else {
			alert("Invalid token, please re-login to continue.");
			navigation.navigate('Login')
		}
	}

	const getAllRooms = async (token) => {
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		}
		await axios.get(`${PRODUCTION_SERVER}/rooms/allRooms`, config)
			.then((response) => {
				const success = response.data.success;
				if (success === 0) {
					return setAllRooms([])
				}

				if (success === 1) {
					return setAllRooms(response?.data?.data ?? [])
				}
			}).catch((error) => {
				alert(DEFAULT_ERROR_MESSAGE)
			})
	}

	const decodeJwt = (currentToken) => {
		var decodedToken = jwtDecode(currentToken);

		setCurrentUserId(decodedToken.result.id);

		if (decodedToken.result.type === null) {
			navigation.navigate("SignUpUserType");
			return;
		}
	}

	// variables for user inputs

	const [patientName, setPatientName] = useState('')
	const [roomNumber, setRoomNumber] = useState(0)

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	//End of user input variables

	const submitEmergencyReport = async () => {

		const currentPatientName = patientName;
		const currentMedicalCondition = selectedMedicalConditionsValue;
		const currentConditionDescription = textArea;
		const currentRoomNumber = selectedRoomValue;

		setLoading(true)

		if (currentPatientName === '') {
			setLoading(false)
			setError(true)
			setErrorMessage('Please provide the patient name')

			setTimeout(() => {
				setError(false)
				setErrorMessage('')
				setSuccess(false)
				setLoading(false)
			}, 3000)

			return
		}

		if (currentMedicalCondition.length === 0) {
			setLoading(false)
			setError(true)
			setErrorMessage('Please select medical condition')

			setTimeout(() => {
				setError(false)
				setErrorMessage('')
				setSuccess(false)
				setLoading(false)
			}, 3000)

			return
		}

		if (currentConditionDescription === '') {
			setLoading(false)
			setError(true)
			setErrorMessage('Please patients condition description')

			setTimeout(() => {
				setError(false)
				setErrorMessage('')
				setSuccess(false)
				setLoading(false)
			}, 3000)

			return
		}

		if (currentConditionDescription.length > 250) {
			setLoading(false)
			setError(true)
			setErrorMessage('Description should not exceeds more than 250 characters')

			setTimeout(() => {
				setError(false)
				setErrorMessage('')
				setSuccess(false)
				setLoading(false)
			}, 3000)

			return
		}

		if (selectedRoomValue === 'Select Room') {
			setLoading(false)
			setError(true)
			setErrorMessage('Please provide a valid room number')

			setTimeout(() => {
				setError(false)
				setErrorMessage('')
				setSuccess(false)
				setLoading(false)
			}, 3000)

			return
		}

		setShowLoadingModal(true)
		setLoadingModalMessage('Please wait ...')

		var data = {
			reported_by: currentUserId,
			patient_name: currentPatientName,
			medical_condition: currentMedicalCondition,
			description: currentConditionDescription,
			room_number: currentRoomNumber
		}

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}

		setLoading(true)

		await axios.post(`${PRODUCTION_SERVER}/covid_cases/addEmergencyReport`, data, {
			headers: headers
		})
			.then((response) => {
				if (response.data.success === 0 && response.data.message === 'Invalid token') {
					navigation.navigate('Login')
					return
				}

				if (response.data.success === 0) {
					setLoadingModalMessage('Please wait...')
					setShowLoadingModal(false)
					setSuccess(false)
					setError(true)
					setErrorMessage("Failed reporting emergency. Please try again")
					return
				}

				setLoadingModalMessage('Please wait...')
				setShowLoadingModal(false)

				setLoading(false)
				setSuccess(true)
				setError(false)
				setErrorMessage("")
				alert('Emergency report sent successfully.')
				navigation.navigate('Dashboard')
			})

			.catch(() => {
				alert(DEFAULT_ERROR_MESSAGE)
				setLoading(false)
			})

		setError(false)
		setErrorMessage('')
		setLoading(false)

		setTimeout(() => {
			setError(false)
			setErrorMessage('')
			setSuccess(false)
			setLoading(false)
		}, 3000)

		setLoadingModalMessage('Please wait...')
		setShowLoadingModal(false)
	}

	return (
		<SafeAreaView>
			<StatusBar animated={true} backgroundColor="#E1F5E4" />
			<View style={styles.container}>
				<Modal
					animationType="fade"
					transparent={true}
					visible={showLoadingModal}
					onRequestClose={() => {
						setShowLoadingModal(!showLoadingModal);
					}}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Image
								source={require("../assets/loading_icon.gif")}
								resizeMode="contain"
								style={{ width: 100, height: 100 }}
							/>
							<Text style={styles.modalText}>{loadingModalMessage}</Text>
						</View>
					</View>
				</Modal>


				{/* Notification View */}
				<View style={styles.topContainer}>
					<View style={styles.backIcon}>
						<TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
							<ImageBackground
								source={require("../assets/back-icon.png")}
								resizeMode="contain"
								style={styles.image}
							></ImageBackground>
						</TouchableWithoutFeedback>
					</View>
				</View>
				{/*End  Notification View */}
				{/* Body Container */}
				<Text
					style={{
						height: "auto",
						fontSize: 28,
						color: "#364D39",
						fontWeight: "700",
						marginHorizontal: 40,
						padding: 10,
					}}
				>
					Emergency {"\n"}Report
				</Text>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.bodyContainer}>
						<View style={styles.formContainer}>
							<Text>Patient Name</Text>
							<TextInput
								style={styles.input}
								onChangeText={(e) => { setPatientName(e) }}
								value={patientName}
								placeholder="e.g John Doe"
							/>

							<Text style={{ marginTop: 20 }}>Medical condition</Text>
							<Select
								value={selectedMedicalConditionsValue}
								multiSelect={true}
								status="success"
								style={styles.medicalConditionDropdown}
								selectedIndex={selectedIndex}
								onSelect={(index) => setSelectedIndex(index)}
							>
								{MedicalConditions.map((value, index) => {
									return <SelectItem title={value} key={index} />
								})}
							</Select>
							<Text style={{ marginTop: 20 }}>Description</Text>

							<TextInput
								multiline={true}
								numberOfLines={4}
								onChangeText={(textArea) => onChangeTextArea(textArea)}
								value={textArea}
								style={styles.inputss}
								placeholder="Condition description..."
							/>

							<Text style={{ marginTop: 20 }}>Room Number </Text>
							<Select
								value={selectedRoomValue}
								status="success"
								style={styles.medicalConditionDropdown}
								selectedIndex={selectedRoomIndex}
								onSelect={(index) => setSelectedRoomIndex(index)}
							>
								{allRooms.map((value, index) => {
									return <SelectItem title={value.room_number} key={index} />
								})}
							</Select>
							{
								success ?
									<Text
										style={{
											paddingVertical: 10,
											color: '#28CD4199'
										}}
									>
										Reported Successfully
									</Text>
									:
									null
							}

							{
								loading ?
									<Text
										style={{
											paddingVertical: 10,
											color: '#28CD4199'
										}}
									>
										Please wait..
									</Text>
									:
									null
							}

							{
								error ?
									<Text
										style={{
											paddingVertical: 10,
											color: 'red'
										}}
									>
										{errorMessage}
									</Text>

									:

									null
							}


							<TouchableOpacity
								style={{
									width: "auto",
									height: 60,
									backgroundColor: "#28CD41",
									borderRadius: 10,
									marginTop: 10,
									alignItems: "center",
									justifyContent: "center",
								}}
								onPress={() => {
									submitEmergencyReport()
								}}
							>
								<Text
									style={{ color: "white", fontSize: 16, fontWeight: "700" }}
								>
									SUBMIT
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				{/*End of Body Container */}
			</View>
		</SafeAreaView>
	);
};
export default ReportEmergency;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E1F5E4",
		height: "100%",
	},
	topContainer: {
		zIndex: 1,
		width: "100%",
		height: "15%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 40,
	},

	backIcon: {
		height: 75,
		width: 75,
		marginTop: 20,
		marginLeft: -15,
		justifyContent: "center",
	},
	menuLogo: {
		height: "50%",
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
	},
	centeredView: {
		flex: 1,
		backgroundColor: "rgba(52, 52, 52, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		alignItems: "center",
		shadowColor: "#000",
		width: '80%',
		paddingVertical: 40,
		height: 'auto',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	image: {
		width: "90%",
		height: "90%",
	},
	bottomNavigationView: {
		backgroundColor: "#fff",
		width: "100%",
		height: "60%",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	centeredViews: {
		flex: 1,
		backgroundColor: "rgba(52, 52, 52, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	buttons: {
		width: "100%",
		height: 60,
		borderRadius: 20,
		elevation: 2,
		marginTop: 25,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#28CD41",
	},
	// body style
	bodyContainer: {
		width: "auto",
		height: "100%",
		marginBottom: 50,
		marginHorizontal: 48,
	},
	formContainer: {
		width: "auto",
		height: "90%",
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#28CD4199",
		backgroundColor: "#FFFFFF",
		padding: 10,
	},
	inputss: {
		height: 120,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#28CD4199",
		backgroundColor: "#FFFFFF",
		padding: 10,
		justifyContent: "flex-start",
		textAlignVertical: "top",
	},
	medicalConditionDropdown: {
		borderColor: "#28CD4199",
		backgroundColor: "#GGGGGG",
	}
});
