import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	TouchableWithoutFeedback,
	StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "react-native-chart-kit";
import moment from "moment";
import Menu from "../Components/bottom-drawer/BottomDrawer";
import Notifications from "../Components/notifications/Notifications";
import { SafeAreaView } from "react-native-safe-area-context";
import { genericGetRequest } from '../services/genericGetRequest'
import { useUser } from '../contexts/user/UserContext'
import BottomDrawer from "../Components/bottom-drawer/BottomDrawer";

const Dashboard = ({ navigation, route }) => {
	const { id, type, token } = useUser()
	const [userProfile, setUserProfile] = useState(null)
	const fullname = `${userProfile?.['first_name'] ?? ''} ${userProfile?.['last_name'] ?? ''}`
	const [population, setPopulation] = useState(0)
	const [cases, setCases] = useState(0)

	useEffect(() => {
	  const getUserProfile = async () => {
		if (!id) return
		if (!token) return
		await genericGetRequest(`/users/${id}`, token)
		.then((response) => {
			setUserProfile(response.profile)
		})
		.catch((error) => {
	     console.log(error)
		})
		return
	  }
	  getUserProfile()
	  return () => {}
	}, [id, token])

	const [openBottomDrawer, setOpenBottomDrawer] = useState(false)

	const [visible, setVisible] = useState(false);
	const [notifVisible, setNotifVisible] = useState(false);
	const [recovered, setRecovered] = useState(0)
	const [activeCases, setActiveCases] = useState(0)
	const [deaths, setDeaths] = useState(0)

	// useEffect(() => {
	// 	const GetCovidUpdate = () => {
	// 		axios
	// 			.get("https://disease.sh/v3/covid-19/countries/PH?strict=true")
	// 			.then((response) => {
	// 				setPopulation(response.data.population);
	// 				setActiveCases(response.data.active);
	// 				setCases(response.data.cases);
	// 				setRecovered(response.data.recovered);
	// 				setDeaths(response.data.deaths);
	// 			});
	// 	};
	// 	GetCovidUpdate();
	// }, []);

	const toggleBottomNavigationView = () => {
		//Toggling the visibility state of the bottom sheet
		setOpenBottomDrawer(!openBottomDrawer)
	};

	console.log(visible)

	const toggleNotifNavigationView = () => {
		//Toggling the visibility state of the bottom sheet
		getTotalActiveNotifications(token)
		setNotifVisible(!notifVisible);
	};

	// Return
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
				<BottomDrawer
					open={openBottomDrawer} 
					toggleBottomNavigationView={toggleBottomNavigationView}
					props={userProfile}
					navigation={navigation}
				/>
				{/* Notification View */}
				<View style={styles.topContainer}>
					<View style={styles.menuLogo}>
						<TouchableWithoutFeedback onPress={toggleBottomNavigationView}>
							<ImageBackground
								source={require('../assets/notifmenu_icon.png')}
								resizeMode="contain"
								style={styles.image}
							></ImageBackground>
						</TouchableWithoutFeedback>
					</View>

					<View style={styles.notifLogo}>
						<TouchableWithoutFeedback onPress={toggleNotifNavigationView}>
							<ImageBackground
								source={require('../assets/notification_icon.png')}
								resizeMode="contain"
								style={{ width: "70%", height: "70%" }}
							>
								{/* {notificationCounts === 0 ? null : (
									<Text
										style={{
											backgroundColor: "red",
											width: 20,
											borderRadius: 100,
											textAlign: "center",
											color: "white",
											shadowColor: "#3F3D3D",
											borderWidth: 1,
											borderColor: "white",
											elevation: 20,
										}}
										onPress={toggleNotifNavigationView}
									>
										{notificationCounts}
									</Text>
								)} */}
							</ImageBackground>
						</TouchableWithoutFeedback>
					</View>
					{/*end of bottom navigation for user settings  */}

					{/* start of botton sheet for notification */}


					{/* <Notifications notifVisible={notifVisible} toggleNotifNavigationView={toggleNotifNavigationView} props={{ userId, token, notificationLists }} navigation={navigation} /> */}

				</View>
				{/*End  Notification View */}
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.bodyContainer}>
						<View style={styles.topTextContainer}>
							<Text style={styles.wlcmTextName} numberOfLines={1}>Welcome back, {fullname}</Text>
							<Text style={styles.wlcmTextAsking}>
								What do you want {"\n"}to do?
							</Text>
						</View>

						<View style={styles.scrllBtnsContainer}>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								style={styles.scrllViewContainer}
							>
								<TouchableOpacity
									style={styles.btnScnQr}
									onPress={() => {
										navigation.navigate("QrScanner", { type, id, token: token });
									}}
								>
									<ImageBackground
										source={require('../assets/scan_qr_icon.png')}
										resizeMode="contain"
										style={styles.btnimage}
									></ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.btnRepCovidTest}
									onPress={() => {
										navigation.navigate("ReportCovidCase", { id, type });
									}}
								>
									<ImageBackground
										source={require("../assets/report_communicable_disease_icon.png")}
										resizeMode="contain"
										style={styles.btnimage}
									></ImageBackground>
								</TouchableOpacity>

								<TouchableOpacity
									style={styles.btnRepEmergency}
									onPress={() => {
										navigation.navigate("ReportEmergency", { id, type });
									}}
								>
									<ImageBackground
										source={require("../assets/report_emergency_icon.png")}
										resizeMode="contain"
										style={styles.btnimage}
									></ImageBackground>
								</TouchableOpacity>
							</ScrollView>
						</View>

						<View>
							<Text
								numberOfLines={1}
								style={{ fontSize: 22, fontWeight: "bold", marginStart: 35 }}
							>
								Communicable Disease Reports
							</Text>
							<Text style={{ fontSize: 16, marginStart: 40, marginTop: 20 }}>
								University
							</Text>
						</View>
						<View style={styles.casesContainer}>
							<ImageBackground
								source={require('../assets/confirmed_case_icon.png')}
								resizeMode="stretch"
								style={styles.confirmCasesCard}
							>
								<Text style={{ fontSize: 10 }}>Confirmed</Text>
								{/* <Text
									style={{ fontSize: 22, fontWeight: "bold", color: "#28CD41" }}
								>
									{
										reportedCommunicableDiseaseOnGoing && reportedCommunicableDiseaseOnGoing ?
											reportedCommunicableDiseaseOnGoing.length
											:
											0
									}
								</Text> */}
							</ImageBackground>

							<ImageBackground
								source={require('../assets/confirmed_case_icon.png')}
								resizeMode="stretch"
								style={styles.confirmCasesCard}
							>
								<Text style={{ fontSize: 10 }}>Recovered</Text>
								{/* <Text
									style={{ fontSize: 22, fontWeight: "bold", color: "#28CD41" }}
								>
									{
										reportedCommunicableDiseaseResolved && reportedCommunicableDiseaseResolved ?
											reportedCommunicableDiseaseResolved.length
											:
											0
									}
								</Text> */}
							</ImageBackground>
						</View>

						<View style={styles.localCasesContainer}>
							<View
								style={{
									width: "90%",
									padding: 10,
									backgroundColor: "white",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: 15,
									shadowColor: "black",
									elevation: 20,
									marginTop: 20,
								}}
							>
								<View style={{ flexDirection: "row", width: "100%" }}>
									<Text
										style={{
											marginLeft: 25,
											marginRight: "auto",
											paddingVertical: 10,
											fontWeight: "bold",
											fontSize: 18,
										}}
									>
										Philippines Update
									</Text>
									<Text
										style={{
											marginRight: 25,
											marginLeft: "auto",
											paddingVertical: 10,
											fontSize: 12,
										}}
									>
										As of {moment().format("MMM Do")}
									</Text>
								</View>
								<PieChart
									data={[
										{
											name: "Population",
											population: population,
											color: "#28CD41",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
										{
											name: "Cases",
											population: cases,
											color: "#F00",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
										{
											name: "Active cases",
											population: activeCases,
											color: "rgb(255, 165, 0)",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
										{
											name: "Recovered",
											population: recovered,
											color: "#FFFF00",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},

										{
											name: "Deaths",
											population: deaths,
											color: "rgb(0, 0, 255)",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
									]}
									width={Dimensions.get("screen").width - 100}
									height={150}
									chartConfig={{
										backgroundColor: "#1cc910",
										backgroundGradientFrom: "#eff3ff",
										backgroundGradientTo: "#efefef",
										decimalPlaces: 2,
										color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
										style: {
											borderRadius: 16,
										},
									}}
									style={{
										marginVertical: 8,
										borderRadius: 16,
									}}
									accessor="population"
									backgroundColor="transparent"
									paddingLeft="2"
									absolute //for the absolute number remove if you want percentage
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};
export default Dashboard;
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E1F5E4",
	},
	topContainer: {
		zIndex: 1,
		width: "100%",
		height: "15%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	menuLogo: {
		height: "50%",
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
	},
	notifLogo: {
		height: "40%",
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
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		width: 350,
		height: 474,
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
	bodyContainer: {
		zIndex: -1,
		width: "100%",
		height: 1000,
		marginBottom: 50,
	},
	topTextContainer: {
		width: "100%",
		height: "auto",
		paddingStart: 43,
		justifyContent: "center",
	},
	wlcmTextName: {
		fontSize: 16,
	},
	wlcmTextAsking: {
		fontSize: 28,
		fontWeight: "bold",
	},
	scrllBtnsContainer: {
		width: "100%",
		height: "25%",
		flexDirection: "row",
		marginTop: 15,
	},
	btnScnQr: {
		width: 180,
		height: "100%",

		marginStart: 15,
	},
	btnRepCovidTest: {
		width: 180,
		height: "100%",
	},
	btnRepEmergency: {
		width: 180,
		height: "100%",
	},
	btnimage: {
		width: "100%",
		height: "100%",
	},
	casesContainer: {
		width: "100%",
		height: "auto",
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-evenly",
		backgroundColor: "transparent",
	},
	confirmCasesCard: {
		width: 155,
		height: 86,
		borderRadius: 20,
		shadowColor: "black",
		paddingLeft: 20,
		paddingTop: 10,
	},
	localCasesContainer: {
		width: "100%",
		height: "auto",
		alignItems: "center",
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
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		width: 350,
		height: 474,
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
});
