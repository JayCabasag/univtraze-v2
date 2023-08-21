import React from 'react'
import ConfettiCannon from 'react-native-confetti-cannon';
import ModalSuccess from "react-native-modal";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from "react-native";

export default function Succes({ open, onContinue }) {
  return (
    <ModalSuccess isVisible={open}>
        <View style={styles.root}>
            <Text style={styles.signUpHeader}> Sign Up {'\n'}Successful</Text>
            <Text style={styles.signUpSubHeader}> Awesome, you will now being {'\n'} redirected to user profiling area</Text>
            <TouchableOpacity style={styles.buttonContinue}
                onPress={onContinue} >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
        <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut='true' />
    </ModalSuccess>
  )
}

const styles = StyleSheet.create({
   root: { 
     width: 348, 
     height: 227, 
     backgroundColor: 'white', 
     alignSelf: 'center', 
     alignItems: 'center', 
     paddingVertical: 20,
     borderRadius: 15
   },
   signUpHeader: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#29CC42'
  },
  signUpSubHeader: { 
    fontSize: 14, 
    fontWeight: '400',
    color: '#364D39', 
    lineHeight: 19.5
  },
  buttonContinue: {
    backgroundColor: "#28CD41",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 18,
    marginVertical: 15,
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
