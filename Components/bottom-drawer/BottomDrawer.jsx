import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	Modal,
	TouchableOpacity,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useUser } from '../../contexts/user/UserContext'
import { DEFAULT_PROFILE_PHOTO } from "../../utils/app_constants";
import BottomDrawerQrModal from "./BottomDrawerQrModal";

const BottomDrawer = ({ open, toggleBottomNavigationView, props , navigation }) => {

const [openQrModal, setOpenQrModal] = useState(false)
const [qrModalPayload, setQrModalPayload] = useState({})
const user = useUser()
const { id, type } = user
const fullname = `${props?.['first_name'] ?? ''} ${props?.['last_name'] ?? ''}`

const toast = useToast()

const viewQrCode = () => {
	if (!id) return
	if (!type) return
	let rawData = {id, type, name: fullname}
	setQrModalPayload(rawData)
	setOpenQrModal(true)
	return
}

async function clear(key, value) {
	await SecureStore.deleteItemAsync(key, value);
}

const logout = async () => {							
	await clear('x-token')
	toast.show("Logged out successfully...", {
		type: "normal",
		placement: "bottom",
		duration: 2000,
		offset: 30,
		animationType: "slide-in",
	});
	navigation.navigate('Login')
}

return (
    <BottomSheet
		visible={open}
		onBackButtonPress={toggleBottomNavigationView}
		onBackdropPress={toggleBottomNavigationView}
	>
			<BottomDrawerQrModal
			  openQrModal={openQrModal}
			  setOpenQrModal={setOpenQrModal}
			  payload={qrModalPayload}
			/>
			<View style={styles.bottomNavigationView}>
				<View style={{ width: "100%", height: "100%" }}>
					<View
						style={styles.profileContainer}
					>
									<View
										style={{
											shadowColor: "black",
											display: 'flex',
											alignItems: 'center',
											justifyContent: "center",
										}}
									>
										<Image
											source={{uri : props?.['profile_photo'] ?? DEFAULT_PROFILE_PHOTO }}
											resizeMode="cover"
											style={{
												width: 50,
												height: 50,
												borderRadius: 100,
												borderColor: "#EEEEEE",
												borderWidth: 2,
												shadowColor: "black",
											}}
										/>
									</View>
									<View style={{ width: "75%", padding: 10 }}>
										<Text numberOfLines={1} style={{ fontSize: 22, fontWeight: "bold" }}>
											{fullname}
										</Text>
										<TouchableOpacity
											style={{
												width: 120,
												height: "auto",
												borderWidth: 2,
												borderColor: "#28CD41",
												borderRadius: 50,
												padding: 5,
												justifyContent: "center",
												alignItems: "center",
												marginTop: 5,
											}}
											onPress={viewQrCode}
										>
											<Text style={{ color: "#28CD41", fontWeight: "bold" }}>
												{" "}
												View QR Code
											</Text>
										</TouchableOpacity>
									</View>
								</View>

								<View
									style={styles.menuListContainer}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Dashboard')
										}}
										style={{
											width: "100%",
											height: 54,
											backgroundColor: "#28CD41",
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={require('../../assets/menuhome_icon.png')}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text style={{ color: "white" }}>Dashboard</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											toggleBottomNavigationView();
											
											navigation.navigate("SignUpVaccination", {type: type})
											
										}}
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={require('../../assets/updateinfo_icon.png')}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Update Vaccine information</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => {
											toggleBottomNavigationView();
											navigation.navigate('TemperatureHistory', {id, type })
										}}
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={require("../../assets/temp_history.png")}
											resizeMode="contain"
											style={{
												width: 17,
												height: 20,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Temperature History</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => {
											toggleBottomNavigationView();
											navigation.navigate('AccountSettings', {id, type})
										}}
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={require('../../assets/accountsetting_icon.png')}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Account settings</Text>
									</TouchableOpacity>
									
									<TouchableOpacity
										onPress={() => {
											toggleBottomNavigationView();
											navigation.navigate('RoomVisited', {id, type })
										}}
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={require("../../assets/room_enter.png")}
											resizeMode="contain"
											style={{
												width: 17,
												height: 20,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Room Visited</Text>
									</TouchableOpacity>
									
									<View
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<TouchableOpacity
											onPress={() => logout()}
											style={{flexDirection: "row", width: '100%'}}
										>
										
											<Image
												source={require('../../assets/logout_icon.png')}
												resizeMode="contain"
												style={{
													width: 15,
													height: 15,
													marginStart: 20,
													marginEnd: 20,
												}}
											/>
											<Text>Logout</Text>
										</TouchableOpacity>
									</View>
									
								</View>
							</View>
						</View>
					</BottomSheet>
  )
}

export default BottomDrawer;

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
	profileContainer: {
		width: "100%",
		height: 'auto',
		justifyContent: "center",
		padding: 15,
		flexDirection: "row",
		marginTop: 10,
	},
	menuListContainer: {
		width: "80%",
		height: "65%",
		alignItems: "center",
		justifyContent: "space-evenly",
		alignSelf: "center",
	},
	menuLogo: {
		height: "50%",
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
	},
	notifLogo: {
		height: "50%",
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "90%",
		height: "90%",
	},
	bottomNavigationView: {
		backgroundColor: "#fff",
		width: "100%",
		height: "70%",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	centeredViews: {
		flex: 1,
		backgroundColor: "rgba(52, 52, 52, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		width: 350,
		height: 420,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
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
});
