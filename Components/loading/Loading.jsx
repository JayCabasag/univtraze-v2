import React from 'react'
import {
	Image,
	View,
	Text,
	Modal,
    StyleSheet
} from "react-native";

export default function Loading({ open, onClose, message }) {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Image
                    source={require("../../assets/loading_icon.gif")}
                    resizeMode="contain"
                    style={{ width: 100, height: 100 }}
                />
                <Text style={styles.modalText}>{message}</Text>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
	centeredView: {
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
		width: 340,
		height: 'auto',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	modalButton: {
		width: 80,
		height: 60,
		borderRadius: 20,
		elevation: 2,
		marginTop: 25,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#28CD41",
		borderWidth: 1
	}
});
