import * as React from 'react';
import { ToastProvider } from 'react-native-toast-notifications'
import Home from './screens/Home';
import Login from './screens/login/Login';
import SignUp from './screens/signup/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpUserType from './screens/SignUpUserType';
import QrScanner from './screens/QrScanner';
import ReportCovidCase from './screens/ReportCovidCase'
import ReportEmergency from './screens/ReportEmergency'
import DailyAsessment from './screens/DailyAsessment';
import RoomVisited from './screens/RoomVisited';
import TemperatureHistory from './screens/TemperatureHistory';
import SignUpCredentialsDocuments from './screens/SignUpCredentialsDocuments';
import SignUpVaccination from './screens/SignUpVaccination';
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword';
import TermsAndConditions from './screens/TermsAndConditions';
import AccountSettings from './screens/AccountSettings';
import UpdatePassword from './screens/UpdatePassword';
import UpdatePersonalInfo from './screens/UpdatePersonalInfo';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './utils/theme/theme.json';
import { UserProvider } from './contexts/user/UserContext';
import { UserProfile } from './screens/user-profile/UserProfile';
import Dashboard from './screens/dashboard/Dashboard';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} >
      <ToastProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen options={{ headerShown: false }} name="SignUpCredentialsDocuments" component={SignUpCredentialsDocuments} />
              <Stack.Screen options={{ headerShown: false }} name="RoomVisited" component={RoomVisited} />
              <Stack.Screen options={{ headerShown: false }} name="DailyAsessment" component={DailyAsessment} />
              <Stack.Screen options={{ headerShown: false }} name="ReportEmergency" component={ReportEmergency} />
              <Stack.Screen options={{ headerShown: false }} name="ReportCovidCase" component={ReportCovidCase} />
              <Stack.Screen options={{ headerShown: false }} name="QrScanner" component={QrScanner} />
              <Stack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfile} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpUserType" component={SignUpUserType} />
              <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
              <Stack.Screen options={{ headerShown: false }} name="SignUpVaccination" component={SignUpVaccination} />
              <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
              <Stack.Screen options={{ headerShown: false }} name="TemperatureHistory" component={TemperatureHistory} />
              <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
              <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
              <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
              <Stack.Screen options={{ headerShown: false }} name="TermsAndCondition" component={TermsAndConditions} />
              <Stack.Screen options={{ headerShown: false }} name="AccountSettings" component={AccountSettings} />
              <Stack.Screen options={{ headerShown: false }} name="UpdatePassword" component={UpdatePassword} />
              <Stack.Screen options={{ headerShown: false }} name="UpdatePersonalInfo" component={UpdatePersonalInfo} />
            </Stack.Navigator>
          </NavigationContainer>
      </ToastProvider>
    </ApplicationProvider>
    </UserProvider>
  );
}

