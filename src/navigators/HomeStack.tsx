import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import EditProfile from '../screens/EditProfile';
import { HomeTabs } from './HomeTabs';
import { DepositACHMoney } from '../screens/DepositACHMoney';
import { DepositMoneyDetail } from '../screens/DepositMoneyDetail';
import { Processing } from '../screens/Processing';
import { DepositError } from '../screens/DepositError';
import { DepositSuccess } from '../screens/DepositSuccess';
import { ExchangeRate } from '../screens/ExchangeRate';
import { Home, Profile } from '../screens';
import { SacnQrCode } from '../screens/ScanQrCode';
import BusinessTransaction from '../components/BusinessTransaction';

const Stack = createStackNavigator();

export const HomeStack = () => {
  const stackOptions = { headerShown: false };

  const { user } = useSelector((state: any) => state.auth)
  
  return (
    user.userRole === 'BUSINESS' ?
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={stackOptions} />
        <Stack.Screen name="Profile" component={Profile} options={stackOptions} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={stackOptions} />
        <Stack.Screen name="BusinessTransaction" component={BusinessTransaction} options={stackOptions} />
      </Stack.Navigator>
      : <Stack.Navigator initialRouteName={user.country && user.email && user.name ? "HomeTabs" : "EditProfile"}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={stackOptions} />
        <Stack.Screen name="DepositACHMoney" component={DepositACHMoney} options={stackOptions} />
        <Stack.Screen name="DepositMoneyDetail" component={DepositMoneyDetail} options={stackOptions} />
        <Stack.Screen name="Processing" component={Processing} options={stackOptions} />
        <Stack.Screen name="DepositError" component={DepositError} options={stackOptions} />
        <Stack.Screen name="DepositSuccess" component={DepositSuccess} options={stackOptions} />
        <Stack.Screen name="ExchangeRate" component={ExchangeRate} options={stackOptions} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={stackOptions} />
        <Stack.Screen name="SacnQrCode" component={SacnQrCode} options={stackOptions} />
      </Stack.Navigator>
  );
}