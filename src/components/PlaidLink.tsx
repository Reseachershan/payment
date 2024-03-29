import React, { useState } from 'react'
import { PlaidLink as Plaid, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';
import { GradientText } from './Text';
import { View } from 'react-native';
import { useGetLinkTokenQuery, useSetAccessTokenMutation } from '../store/services/api';
import { ActivityIndicator } from 'react-native';
import Snackbar from 'react-native-snackbar';

export const PlaidLink = () => {
	const [loading, setLoading] = useState(false);
	const { data } = useGetLinkTokenQuery()
	const [setAccessToken, {isLoading: isAccessTokenLoading}] = useSetAccessTokenMutation()
	
	const handleSuccess = (publicToken: string) => {
		setAccessToken({ publicToken: publicToken }).unwrap().then((res) => {

		}).catch((error) => {
			Snackbar.show({
        text: `❗️ ${JSON.stringify(error.error.message)}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
		}).finally(() => setLoading(false))
		 
	}

	if (isAccessTokenLoading || loading) {
		return <ActivityIndicator animating={true} size="large" />
	}

	return (
		<View>
			{data?.link_token ? <Plaid
				onPress={() => setLoading(true)}
				tokenConfig={{
					token: data?.link_token,
					noLoadingState: false
				}}
				onSuccess={async (success: LinkSuccess) => {
					const data = JSON.parse(JSON.stringify(success))
					handleSuccess(data?.publicToken)
				}}
				onExit={(exit: LinkExit) => {
					console.log(exit);
					setLoading(false)
				}}
			>
				<GradientText>Add New Account</GradientText>
			</Plaid> : null}
		</View>
	)
}

