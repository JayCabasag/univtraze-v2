import * as React from 'react';
import { ToastProvider } from 'react-native-toast-notifications'
import HomeScreen from './Components/HomeScreen';
import Login from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Components/SignUp';
import { AuthProvider } from './AuthContext/AuthContext';
import Dashboard from './Components/Dashboard';
import SignUpUserType from './Components/SignUpUserType';
import SignUpUserCredentialsStudent from './Components/SignUpUserCredentialsStudent';
import QrScanner from './Components/QrScanner';
import ReportCovidCase from './Components/ReportCovidCase'
import ReportEmergency from './Components/ReportEmergency'
import SignUpUserCredentialsEmployee from './Components/SignUpUserCredentialsEmployee';
import SignUpUserCredentialsVisitor from './Components/SignUpUserCredentialsVisitor';
import DailyAsessment from './Components/DailyAsessment';
import RoomVisited from './Components/RoomVisited';
import TemperatureHistory from './Components/TemperatureHistory';
import SignUpCredentialsDocuments from './Components/SignUpCredentialsDocuments';
import SignUpVaccination from './Components/SignUpVaccination';
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword';
import TermsAndConditions from './Components/TermsAndConditions';
import AccountSettings from './Components/AccountSettings';
import UpdatePassword from './Components/UpdatePassword';
import UpdatePersonalInfo from './Components/UpdatePersonalInfo';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './utils/theme/theme.json';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} >
      <ToastProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen options={{ headerShown: false }} name="SignUpCredentialsDocuments" component={SignUpCredentialsDocuments} />
              <Stack.Screen options={{ headerShown: false }} name="RoomVisited" component={RoomVisited} />
              <Stack.Screen options={{ headerShown: false }} name="DailyAsessment" component={DailyAsessment} />
              <Stack.Screen options={{ headerShown: false }} name="ReportEmergency" component={ReportEmergency} />
              <Stack.Screen options={{ headerShown: false }} name="ReportCovidCase" component={ReportCovidCase} />
              <Stack.Screen options={{ headerShown: false }} name="QrScanner" component={QrScanner} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpUserCredentialsStudent" component={SignUpUserCredentialsStudent} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpUserCredentialsEmployee" component={SignUpUserCredentialsEmployee} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpUserCredentialsVisitor" component={SignUpUserCredentialsVisitor} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpUserType" component={SignUpUserType} />
              <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpVaccination" component={SignUpVaccination} />
              <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
              <Stack.Screen options={{ headerShown: false }} name="TemperatureHistory" component={TemperatureHistory} />
              <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
              <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
              <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
              <Stack.Screen options={{ headerShown: false }} name="TermsAndCondition" component={TermsAndConditions} />
              <Stack.Screen options={{ headerShown: false }} name="AccountSettings" component={AccountSettings} />
              <Stack.Screen options={{ headerShown: false }} name="UpdatePassword" component={UpdatePassword} />
              <Stack.Screen options={{ headerShown: false }} name="UpdatePersonalInfo" component={UpdatePersonalInfo} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ToastProvider>
    </ApplicationProvider>
  );
}

