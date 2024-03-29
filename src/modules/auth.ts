import appleAuth, { appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert, Platform } from "react-native";
import { APPLE_AUTH_CLIENT_ID, APPLE_AUTH_REDIRECT_URL, IOS_GOOGLE_AUTH_API, WEB_GOOGLE_AUTH_API } from "../../config";


export const authenticateWithApple = async () => {
  try {
    if (Platform.OS === "android") {
      const rawNonce = (Math.random() + 1).toString(36).substring(7);
      const state = (Math.random() + 1).toString(36).substring(7);

      appleAuthAndroid.configure({
        clientId: APPLE_AUTH_CLIENT_ID,
        redirectUri: APPLE_AUTH_REDIRECT_URL,
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });

      const appleAuthRequestResponse = await appleAuthAndroid.signIn();
      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      
      return {code: appleAuthRequestResponse?.code};
    }

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      return { authorizationCode: appleAuthRequestResponse?.authorizationCode };
    }
  } catch (e: any) {
    console.log("Apple login has error: ", e);
    Alert.alert('Error in Apple Authentication', e[0]);
  }
}

export const authenticationWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId: WEB_GOOGLE_AUTH_API,
      offlineAccess: false,
      forceCodeForRefreshToken: true,
      iosClientId: IOS_GOOGLE_AUTH_API,
      googleServicePlistPath: 'credentials',
      profileImageSize: 120,
    });
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    console.log('hasPlayServices...', hasPlayServices);
    
    if (!hasPlayServices) {
      Alert.alert('Google Play Services are Disabled')
      return;
    }
    const userInfo = await GoogleSignin.signIn();
    const googleTokens = await GoogleSignin.getTokens();
    console.log('googleTokens', googleTokens);
    console.log('userInfo', userInfo);
    return {code: googleTokens?.idToken};
  } catch (error:any) {
    console.log('error in authenticationWithGoogle...', error);
  }
}
