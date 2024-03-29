import { createStackNavigator } from '@react-navigation/stack';
import { ConnectAccounts, Login, OnBoarding1, OnBoarding2, SignUp, SignUpStatus } from '../screens';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const AuthStack = () => {
  const { isNew } = useSelector((state: any) => state.auth)
  const stackOptions = {headerShown: false};
  return (
    <Stack.Navigator initialRouteName={isNew ? 'OnBoarding1': 'Login'}>
      <Stack.Screen name="OnBoarding1" component={OnBoarding1} options={stackOptions} />
      <Stack.Screen name="OnBoarding2" component={OnBoarding2} options={stackOptions} />
      <Stack.Screen name="Login" component={Login} options={stackOptions} />
      <Stack.Screen name="SignUpStatus" component={SignUpStatus} options={stackOptions} />
      <Stack.Screen name="SignUp" component={SignUp} options={stackOptions} />
      <Stack.Screen name="ConnectAccounts" component={ConnectAccounts} options={stackOptions} />
    </Stack.Navigator>
  );
}