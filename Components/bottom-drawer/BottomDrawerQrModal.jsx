import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Modal
} from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import base64 from "base-64"

export default function BottomDrawerQrModal({ openQrModal, setOpenQrModal, payload }) {
  const qrCodeValue = base64.encode(JSON.stringify(payload))
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={openQrModal}
        onRequestClose={() => {
            setOpenQrModal((prev) => !prev)
        }}
    >
        <Pressable
            style={styles.centeredViews}
            onPress={() => setOpenQrModal((prev) => !prev)}
        >
            <View style={styles.modalView}>
                <Text
                    style={{
                        fontSize: 28,
                        color: "#28CD41",
                        fontWeight: "bold",
                    }}
                >
                    UnivTraze
                </Text>
                <View
                    style={{
                        width: 210,
                        height: 210,
                        borderWidth: 2,
                        borderColor: "#28CD41",
                        borderRadius: 20,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <QRCode value={qrCodeValue} size={160}/>
                </View>
                <Text style={{ color: "rgba(54, 77, 57, 0.6)", textTransform: 'uppercase'}}>
                    univtraze-{payload.id}
                </Text>
                <Text style={{ fontSize: 28, marginTop: 10 }}>
                    {payload.name}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: "rgba(54, 77, 57, 0.6)",
                        textTransform: 'uppercase'
                    }}
                >
                    {payload.type}
                </Text>

                {/* Download QR */}
                {/* <Pressable
                    style={[styles.buttons]}
                    // onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "700",
                        }}
                    >
                        Download QR
                    </Text>
                </Pressable> */}
            </View>
        </Pressable>
    </Modal>
  )
}


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
		height: "25%",
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
