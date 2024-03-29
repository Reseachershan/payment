import { createStackNavigator } from '@react-navigation/stack';
import Email from '../screens/Email';
import EmailOTP from '../screens/EmailOTP';

const Stack = createStackNavigator();

export const VerificationStack = () => {
  const stackOptions = {headerShown: false};
  return (
    <Stack.Navigator>
      <Stack.Screen name="EmailVerification" component={Email} options={stackOptions} />
      <Stack.Screen name="EmailOTP" component={EmailOTP} options={stackOptions} />
    </Stack.Navigator>
  );
}