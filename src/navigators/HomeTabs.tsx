import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { ActiveIcon, HomeIcon, HomeIconGradient, MapIcon, MapIconGradient, TransactionIcon, TransactionIconGradient, UserIcon, UserIconGradient, UsersIcon, UsersIconGradient, WalletIcon, WalletIconGradient } from '../assets/svgs';
import { Friends, Home, Map, Payment, Profile, Transactions } from '../screens';

const Tab = createBottomTabNavigator();

const commonTabOptions = {
  tabBarLabel: '',
  headerShown: false,
}

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabbar,
        tabBarIcon: ({ focused }) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = focused ? <HomeIconGradient /> : <HomeIcon /> ;
              break;
            case 'Friends':
              icon = focused ? <UsersIconGradient /> :<UsersIcon />;
              break;

            case 'Map':
              icon = focused ? <MapIconGradient /> : <MapIcon />;
              break;

            case 'Payment':
              icon = focused ? <WalletIconGradient /> : <WalletIcon />;
              break;

            case 'Transactions':
              icon = focused ? <TransactionIconGradient /> : <TransactionIcon />;
              break;

              case 'Profile':
                icon = focused ? <UserIconGradient /> : <UserIcon />;
                break;

            default:
              break;
          }
          return (
            <View style={styles.tabbarItem}>
              {icon}
              {focused && <ActiveIcon />}
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={commonTabOptions}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={commonTabOptions}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={commonTabOptions}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={commonTabOptions}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={commonTabOptions}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={commonTabOptions}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    borderTopWidth: 0,
    height: 80,
    position: 'absolute',
    elevation: 5,
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabbarItem: { 
    height: 62, 
    marginBottom: -8, 
    alignItems: 'center', 
    justifyContent: 'space-between',
  }
})