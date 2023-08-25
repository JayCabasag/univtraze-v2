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
import { StackActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import { useFormik } from "formik";
import { ProfileValidationSchema } from "./schemas/SignUpProfileSchema";

export const SignUpUserProfile = ({ navigation, route }) => {

	const formik = useFormik({
		initialValues: {
		  type: '',
		  firstName: '',
		  middleName: '',
		  lastName: '',
		  suffix: '',
		  gender: '',
          address: '',
		  dateOfBirth: ''
		},
		validationSchema: ProfileValidationSchema,
		onSubmit: values => {
		  alert(JSON.stringify(values, null, 2));
		},
	  });
	  
	const nextScreen = async () => {
	
	}

	const handleInputTextChange = (value, name) => {
		// formik.setFieldValue(name, value)
		console.log(value, name)
	}

	const hasFirstNameError = !!formik.errors.firstName

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
							onBlur={formik.handleBlur}
							style={hasFirstNameError ? styles.errorInput : styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Middle name </Text>
						<TextInput
							placeholder="Middle name"
							value={formik.values.lastName}
							onChangeText={(text) => handleInputTextChange(text, 'lastName')}
							onBlur={formik.handleBlur}
							style={hasFirstNameError ? styles.errorInput : styles.input}
						/>
					</View>

					{/* <View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Last name</Text>
						<TextInput
							placeholder="Last name"
							defaultValue={""}
							onChangeText={(text) => {
								setLastName(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", borderRadius: 15, alignItems: 'center' }}
					>
						<View style={{ width: "80%", flexDirection: "row" }}>
							<View style={{ width: "50%" }}>
								<Text style={styles.label}>Suffix </Text>
								<TextInput
									placeholder="Suffix"
									defaultValue={""}
									onChangeText={(text) => {
										setSuffix(text);
									}}
									style={styles.suffixInput}
								/>
							</View>

							<View style={{ width: "50%" }}>
								<Text style={styles.label}>Gender </Text>
								<Picker
									style={{
										width: "100%",
										height: 50, color: "#4d7861"
									}}
									selectedValue={gender}
									onValueChange={value => setGender(value)}
									mode="dialog">
									<Picker.Item label="Rather not say" value="Rather not say" />
									<Picker.Item label="Male" value="Male" />
									<Picker.Item label="Female" value="Female" />
								</Picker>
							</View>
						</View>

					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Address</Text>
						<TextInput
							placeholder="Address"
							defaultValue={""}
							onChangeText={(text) => {
								setAddress(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Date of birth</Text>

						<View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
							<TextInput
								placeholder="Date of birth"
								defaultValue={moment(dateOfBirth).format("yyyy-MM-DD")}
								style={styles.dobInput}
								editable={false}
							/>
							<AntDesign name="calendar" size={37} color="#28CD41" style={{ marginRight: 5 }} onPress={() => setShowDatePicker(true)} />
						</View>

					</View>

					{
						showDatePicker === true ?
							<DateTimePicker
								value={dateOfBirth}
								mode={"date"}
								is24Hour={true}
								onChange={(event, date) => {
									setShowDatePicker(false)
									setDateOfBirth(new Date(date))
								}
								}
							/>
							:
							null
					}

					<View
						style={{ width: "100%", borderRadius: 15, alignItems: 'center' }}
					>
						<View style={{ width: "80%", flexDirection: "row" }}>
							<View style={{ width: "50%" }}>
								<Text style={styles.label}>Department</Text>
								<TextInput
									placeholder="Department"
									defaultValue={""}
									onChangeText={(text) => {
										setDepartment(text);
									}}
									style={styles.courseInput}
								/>
							</View>

							<View style={{ width: "50%" }}>
								<Text style={styles.label}>Position </Text>
								<TextInput
									placeholder="Position"
									defaultValue={""}
									onChangeText={(text) => {
										setPosition(text);
									}}
									style={styles.yearAndSectionInput}
								/>
							</View>
						</View>

					</View>

					{
						error ?
							<Text style={styles.errorMessage}>*{errorMessage}</Text>
							:
							<Text style={styles.errorMessage}></Text>
					}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginBottom: 20,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.goBack();
							}}
							style={styles.backbutton}
						>
							<Image
								source={require("../assets/back-icon.png")}
								style={{ width: 60, height: 60 }}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								nextScreen();
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>
					</View> */}

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
	genderInput: {
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
