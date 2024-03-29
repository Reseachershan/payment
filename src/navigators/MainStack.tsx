import { NavigationContainer } from "@react-navigation/native"
import { useEffect } from "react"
import SplashScreen from "react-native-splash-screen"
import { useSelector } from "react-redux"
import { AuthStack } from "./AuthStack"
import { HomeStack } from "./HomeStack"
import { VerificationStack } from "./VerificationStack"

export const MainStack = () => {
  const { token, user } = useSelector((state: any) => state.auth)

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {Boolean(token && user?.emailVerified)
        ? <HomeStack />
        : Boolean(token && !user?.emailVerified)
          ? <VerificationStack />
          : <AuthStack />
      }
    </NavigationContainer>
  )
}