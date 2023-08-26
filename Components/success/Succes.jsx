import React from 'react'
import { TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {
	View,
	Text,
	Modal,
    StyleSheet
} from "react-native";

export default function Success({ open, onContinue }) {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={onContinue}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
             <Text style={styles.signUpHeader}> Sign Up Successful</Text>
             <Text style={styles.signUpSubHeader}> Awesome, you will now being redirected to user profiling area</Text>
             <TouchableOpacity style={styles.buttonContinue}
                onPress={onContinue} >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            </View>
            <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut='true' />
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
	},
  signUpHeader: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#29CC42'
  },
  signUpSubHeader: { 
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: '400',
    color: '#364D39', 
    lineHeight: 19.5
  },
  buttonContinue: {
    backgroundColor: "#28CD41",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 18,
    width: 308,
    height: 60,
  },
  buttonText: {
    color: "#FFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
},
});
