import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Image,
	StatusBar
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { useFormik } from "formik";
import { ProfileValidationSchema } from "./schemas/SignUpProfileSchema";
import { format } from "date-fns";

export const SignUpUserProfile = ({ navigation, route }) => {

	const [showDatePicker, setShowDatePicker] = useState(false)
	const today = new Date();

	const formik = useFormik({
		initialValues: {
		  type: route.params.type,
		  firstName: '',
		  middleName: '',
		  lastName: '',
		  suffix: '',
		  gender: '',
          address: '',
		  dateOfBirth: today
		},
		validationSchema: ProfileValidationSchema,
		onSubmit: values => {
		  
		},
	});

	const handleInputTextChange = (type, name) => {
		formik.setFieldValue(name, type)
	}

	const handleInputTextBlur = (name) => {
		formik.setFieldTouched(name)
	}

	const hasFirstNameError = !!formik.errors.firstName && formik.touched.firstName
	const hasMiddleNameError = !!formik.errors.middleName && formik.touched.middleName
	const hasLastnameError = !!formik.errors.lastName && formik.touched.lastName
	const hasGenderError = !!formik.errors.gender && formik.touched.gender
	const hasAddressError = !!formik.errors.address && formik.touched.address
	const hasDateOfBirthError = !!formik.errors.dateOfBirth && formik.touched.dateOfBirth

	return (
		<SafeAreaView>
			<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
			<KeyboardAvoidingView
				style={{ backgroundColor: "#E1F5E4", height: "100%" }}
			>
				<View style={styles.header}>
					<Image
						source={require("../../assets/reg_identifier.png")}
						resizeMode="contain"
						style={{ width: "80%", height: "80%" }}
					/>
				</View>

				<ScrollView>
					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>First name</Text>
						<TextInput
							placeholder="First name"
							value={formik.values.firstName}
							onChangeText={(text) => handleInputTextChange(text, 'firstName')}
							onBlur={() => handleInputTextBlur('firstName')}
							style={hasFirstNameError ? styles.errorInput : styles.input}
						/>
						{hasFirstNameError && <Text style={styles.errorLabel}>*{formik.errors.firstName}</Text>}
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Middle name </Text>
						<TextInput
							placeholder="Middle name"
							value={formik.values.middleName}
							onChangeText={(text) => handleInputTextChange(text, 'middleName')}
							onBlur={() => handleInputTextBlur('middleName')}
							style={hasMiddleNameError ? styles.errorInput : styles.input}
						/>
						{hasMiddleNameError && <Text style={styles.errorLabel}>*{formik.errors.middleName}</Text>}
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Last name</Text>
						<TextInput
							placeholder="Last name"
							value={formik.values.lastName}
							onChangeText={(text) => handleInputTextChange(text, 'lastName')}
							onBlur={() => handleInputTextBlur('lastName')}
							style={hasLastnameError ? styles.errorInput : styles.input}
						/>
						{hasLastnameError && <Text style={styles.errorLabel}>*{formik.errors.lastName}</Text>}
					</View>

					<View
						style={{ width: "100%", borderRadius: 15, alignItems: 'center' }}
					>
						<View style={{ width: "80%", flexDirection: "row" }}>
							<View style={{ width: "50%" }}>
								<Text style={styles.label}>Suffix </Text>
								<TextInput
									placeholder="Suffix"
									value={formik.values.suffix}
									onChangeText={(text) => handleInputTextChange(text, 'suffix')}
									onBlur={() => handleInputTextBlur('suffix')}		
									style={styles.suffixInput}
								/>
							</View>

							<View style={{ width: "50%", borderRadius: 15 }}>
								<Text style={styles.label}>Gender </Text>
								<View style={formik.errors.gender ? styles.genderPickerError : styles.genderPicker}>
									<Picker
										style={{
											width: "100%",
											height: 48.5,
											color: "#4d7861",
											borderColor: "#28CD41",
											backgroundColor: 'white',
										}}
										itemStyle={{
											borderWidth: 2,
											borderColor: "#28CD41",
										}}
										selectedValue={formik.values.gender}
										onValueChange={value => {
											handleInputTextChange(value, 'gender')
											handleInputTextBlur('gender')
										}}
										mode="dialog">
										<Picker.Item label="Rather not say" value="Rather not say" />
										<Picker.Item label="Male" value="Male" />
										<Picker.Item label="Female" value="Female" />
									</Picker>
								</View>
							</View>
						</View>

					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Address</Text>
						<TextInput
							placeholder="Address"
							value={formik.values.address}
							onChangeText={(text) => handleInputTextChange(text, 'address')}
							onBlur={() => handleInputTextBlur('address')}
							style={hasLastnameError ? styles.errorInput : styles.input}
						/>
						{hasAddressError && <Text style={styles.errorLabel}>*{formik.errors.address}</Text>}
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Date of birth</Text>
						<View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
							<TextInput
								placeholder="Date of birth"
								type="date"
								key={format(formik.values.dateOfBirth, 'MM-dd-yyyy')}
								value={format(formik.values.dateOfBirth, 'MM-dd-yyyy')}
								style={hasDateOfBirthError ? styles.dobInputError : styles.dobInput}
								editable={false}
							/>
							<AntDesign name="calendar" size={37} color="#28CD41" style={{ marginRight: 5 }} onPress={() => setShowDatePicker(true)} />
						</View>
					    {hasDateOfBirthError && <Text style={styles.errorLabel}>*{formik.errors.dateOfBirth}</Text>}
					</View>

					{showDatePicker  &&
						<DateTimePicker
							value={formik.values.dateOfBirth}
							mode={"date"}
							is24Hour={true}
							onChange={(_, date) => {
								setShowDatePicker(false)
								handleInputTextChange(date, 'dateOfBirth')
								handleInputTextBlur('dateOfBirth')
							 }
							}
						/>
					}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginBottom: 20,
							marginTop: 30
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.goBack();
							}}
							style={styles.backbutton}
						>
							<Image
								source={require("../../assets/back-icon.png")}
								style={{ width: 60, height: 60 }}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={formik.handleSubmit}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};


export default SignUpUserProfile;

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "20%",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},
	body: {
		width: "100%",
		height: "100%",
		borderColor: "gray",
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		width: "80%",
		textAlign: "left",
	},
	errorLabel: {
		width: "80%",
		textAlign: "left",
		color: "red",
		marginBottom: 12
	},
	errorMessage: {
		alignSelf: "center",
		width: "80%",
		textAlign: "left",
		color: "red",
	},
	backbutton: {
		paddingTop: 10,

		marginLeft: 40,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
	},
	input: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 0,
		marginRight: 0,
		width: "80%",
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
		width: "80%",
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
	suffixInput: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 0,
		marginRight: 0,
		width: "95%",
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
	genderPicker: {
		borderWidth: 1,
		borderRadius: 10,
		overflow: 'hidden',
		marginTop: 5,
		borderColor: "#28CD41",
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	genderPickerError: {
		borderWidth: 1,
		borderRadius: 10,
		overflow: 'hidden',
		marginTop: 5,
		borderColor: "red",
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	courseInput: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 0,
		marginRight: 0,
		width: "95%",
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
	yearAndSectionInput: {
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
	dobInput: {
		margin: 5,
		width: "70%",
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
	dobInputError: {
		margin: 5,
		width: "70%",
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
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		borderRadius: 10,
		marginTop: 5,
		paddingVertical: 18,
		width: 122,
		height: 60,
		marginLeft: "auto",
		marginRight: 41,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		textTransform: "uppercase",
	},
	datePickerStyle: {
		width: "80%",
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "white",
		borderColor: "#28CD41",
		justifyContent: "center",
	},
});
