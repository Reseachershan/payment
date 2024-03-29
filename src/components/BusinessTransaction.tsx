import React from 'react'
import { ScrollView } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { CustomView, Header, Text } from '../components'

import { TransactionComponent } from './TransactionComponent'
import { WalletComponent } from './WalletCompnent'

const BusinessTransaction = ({ navigation }: any) => {
  const { user } = useSelector((state: any) => state.auth)

  return (
    <ScrollView bounces={false}>
      <Header EditButton={false} style={{ height: heightPercentageToDP("28%") }} title={user?.name} notShowImage={true} hasBack={true} />
      <CustomView>
        <WalletComponent />
        <TransactionComponent isSearchBar={true} />
      </CustomView>
    </ScrollView>
  )
}

export default BusinessTransaction;