import { StyleSheet, Text, View, Button,ImageBackground,TouchableOpacity, Image, Dimensions} from 'react-native'
import { RadioButton } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'react-native';
import { useUserDispatch } from '../contexts/user/UserContext';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const SignUpUserType = ({ navigation: { navigate } }) => {
  const [isChecked, setIsChecked] = useState('Student')

  const SubmitUserType = async () => {
    if(isChecked === 'Student'){
      return navigate('SignUp', { type: "student" })
    }

    if(isChecked === 'Employee'){
      return navigate('SignUp', {type: "employee"})
    }

    navigate('SignUp', {type: "visitor"})

  }

  return (
    <SafeAreaView style={styles.root}>
    <StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
    <KeyboardAvoidingView style={styles.mainView} behavior='height'>
        <View style={styles.topContainer}>
        <Image source={require('../assets/amico.png')} resizeMode="contain" style={styles.SignUpUserTypeLogo} />
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.botContainTxt1}>Welcome to {'\n'}UnivTraze</Text>
            <Text style={styles.botContainSubtxt}>Before we continue, we are happy {'\n'}to know you more</Text>
            <Text style={styles.radioTtl}>Please select below</Text>
            <View style={styles.radioButtonOption}>
                <RadioButton
                value="Student"
                status={ isChecked === 'Student' ? 'checked' : 'unchecked' }
                onPress={() => setIsChecked('Student')}
                />
                <Text style={styles.radioLabel}>Student</Text>
            </View>
            <View style={styles.radioButtonOption}>
                <RadioButton
                    value="Employee"
                    status={ isChecked === 'Employee' ? 'checked' : 'unchecked' }
                    onPress={() => setIsChecked('Employee')}
                    />
                    <Text style={styles.radioLabel}>Employee</Text>
            </View>   

            <View style={styles.radioButtonOption}>
                <RadioButton 
                    value="Visitor"
                    status={ isChecked === 'Visitor' ? 'checked' : 'unchecked' }
                    onPress={() => setIsChecked('Visitor')}
                    />
                    <Text style={styles.radioLabel}>Visitor</Text>
            </View> 
            <TouchableOpacity
                onPress={SubmitUserType}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
</SafeAreaView>
  )
}

export default SignUpUserType;

const styles = StyleSheet.create({
    root: {
        height: '100%',
        backgroundColor: "#E1F5E4",
        width: '100%'
    },
    mainView:{
        width: windowWidth,
        height:windowHeight,
        backgroundColor: "#E1F5E4",
        alignItems:'center'
    },
    topContainer:{
        marginTop: 10,
        width:"100%",
        height:"35%",
        justifyContent:'center',
        alignItems:'center',
    },
    bodyContainer: {
        paddingHorizontal: 25,
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },
    SignUpUserTypeLogo:{
        width: 200,
        height: 200,
    },
    botContainTxt1:{
        width: '100%',
        fontSize: 34,
        lineHeight: 50,
        fontWeight:'bold'
    },
    botContainSubtxt:{
        marginTop:10,
        fontSize:16,
        lineHeight: 25,
        width: '100%'
    },
    radioBox:{
        width:"100%",
        height:"100%",   
    },
    radioTtl:{
        fontSize:18,
        width: windowWidth,
        marginTop:10,
        fontWeight:'700'
    },
    radioLabel:{
            fontSize:16
    }, 
    radioButtonOption: {
        flexDirection:'row',
        alignItems:'center',
        width: windowWidth
    },
    button: {
        backgroundColor: '#28CD41',
        padding: 10,
        width: "100%",
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop: 15,
        paddingVertical: 18
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffff'
    }

})