import { StyleSheet, View, Platform } from "react-native"
import { Text, CustomView, Header, Button, GradientButton } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { WalletComponent } from "../components/WalletCompnent";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { GRADIENT_I } from "../assets/colors";

export const Friends = () => {

  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const { user } = useSelector((state: any) => state.auth)
 
  return (
    <ScrollView bounces={false}>
      <Header title={"payment"} hasBack={true} notShowImage={true} />
      <CustomView>
        <WalletComponent showAddbtn={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button text="Pay A Vendor" textStyle={{ color: GRADIENT_I }} style={styles.submitButton} onPress={() => navigation.navigate('SacnQrCode')}/>
          <GradientButton text="Send Money" style={{width: widthPercentageToDP('65%'), marginTop: 20}}/>
        </View>
      </CustomView>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  submitButton: {
    width: widthPercentageToDP('65%'),
    borderColor: GRADIENT_I,
    borderWidth: 1,
},
})
