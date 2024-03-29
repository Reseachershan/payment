import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, TextInput as DefaultTextInput, Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { BODY_TEXT, BORDER, GRADIENT_I, GREEN, LIGHT_GREY, LIGHT_GREY_III, MAIN_TEXT, RED, WHITE } from '../assets/colors';
import { WINDOW_WIDTH } from '../assets/dimensions';
import { POPPINS_REGULAR } from '../assets/fonts';
import { DownArrow, Star, Starbug, Tick, UpArrow } from '../assets/svgs';
import { Starunfill } from '../assets/svgs/Starunfill';
import { Button, GradientButton, GradientText, Text } from '../components';
import { useGetStellarTransactionQuery, useGetTransactionQuery } from '../store/services/api';
import CustomModal from './CustomModal';
import HorizontalLine from './HorizontalLine';
import { SearchInput } from './SearchInput';

export const TransactionComponent = ({ title, isSearchBar }: { title?: string, isSearchBar: boolean }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalDisputeVisible, setModalDisputeVisible] = useState(false);
	const [modalDisputeConfirmationVisible, setModalDisputeConfirmationVisible] = useState(false);
	const [isfilterModal, setIsFilterModal] = useState(false);
	const [showTransaction, setShowTransaction] = useState(true);
	const [filter, setFilter] = useState<any>({});
	const [filteredData, setFilteredData] = useState<[]>()
	const [date, setDate] = useState<any>({});
	const [searchValue, setSearchValue] = useState<string>("")
	const [typer, setTyper] = useState<boolean>(false)
	const [dateFilter, setDateFilter] = useState<boolean>(false)

	const [detailTransaction, setTransactionDetail] = useState<any>();
	const { user } = useSelector((state: any) => state.auth)
	const { data, isLoading } = useGetTransactionQuery()
	const { data: businessData, isLoading: isBusinessLoading, refetch } = useGetStellarTransactionQuery()
	const transactionsData = user.userRole === 'BUSINESS' ?  businessData :  data
	const exchangeRate = 1
	const sorteddata = useMemo(() => {
		if (searchValue) {
			return transactionsData?.transactions?.filter((data: any) => (data.title.toLowerCase().includes(searchValue.toLowerCase()) || data.business.address.toLowerCase().includes(searchValue.toLowerCase()) || data.id.toString().includes(searchValue) ))
		}
		if (Boolean(filter?.type && !Boolean(filteredData?.length))) return []
		if (filteredData?.length) return filteredData
		if (Array.isArray(transactionsData?.transactions) && Boolean(transactionsData?.transactions?.length)) {
			// @ts-ignore
			return [...transactionsData?.transactions]?.sort((a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt))
		}
		return [];
	}, [transactionsData, filteredData, searchValue])


	const applyFilter = () => {
		if (Boolean(Object.keys(date).length)) {
			const currentDate = new Date();
			const thirtyDaysAgo = new Date();
			thirtyDaysAgo?.setDate(currentDate.getDate() - date?.date);
			const filteredData = transactionsData.transactions?.filter((item: any) => {
				const itemDate = new Date(item?.createdAt * 1000);
				return itemDate >= thirtyDaysAgo && itemDate <= currentDate;
			});
			setFilteredData(filteredData)
		} else {
			const applyfilter = transactionsData?.transactions?.filter((data: any) => (data.type == filter.type))
			setFilteredData(applyfilter)
		}
		setIsFilterModal(false)
		setDateFilter(false)
		setTyper(false)
	}

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	}

	const toggleDisputModal = () => {
		setModalDisputeConfirmationVisible(true);
		setModalDisputeVisible(false);
	}

	const handleSubmitDispute = () => {
		setModalDisputeVisible(true);
		setModalVisible(false);
	}

	const handleCancel = () => {
		setFilter({})
		setDate({})
		setFilteredData([])
		setDateFilter(false)
		setTyper(false)
	}

	const handleTyperModal = (item: any, index: number) => {
		if (filter?.index === index) {
			setFilter({})
		} else {
			setFilter({ type: item.type, index: index })
			 setDate({})
		}
	}

	const handleDateModal = (item: any, index: number) => {
		if (date.index === index) {
			setDate({ })
		} else {
			setDate({ date: item.date, index: index })
			setFilter({})
		}
	}

	const DateFilter = [
		{ text: 'Last 30 Days', date: 30 },
		{ text: 'Last 60 Days', date: 60 },
		{ text: 'Last 90 Days', date: 90 },
		{ text: 'Last Year', date: 360 },
	]

	const Typer = [
		{ text: 'Debit', type: 'debited' },
		{ text: 'Credit', type: 'credited' },
		{ text: 'Deposit', type: 'deposited' },
		{ text: 'Withdrawl', type: 'withdrawl' },
	]

	const handlePercentage = (item: any) => { 
		const data = (5 / 100) * Number(item)
		return data

	}

	if (isLoading) {
		return (
			<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator animating={isLoading} size="large" />
			</View>
		)
	}
	const Record = !isSearchBar ? sorteddata?.slice(0,3) : sorteddata
	return (
		<>
			<View style={styles.Transactions}>
				{isSearchBar && <View style={styles.search}>
					<SearchInput placeholder='Search' value={searchValue} onChangeText={(text) => setSearchValue(text)} setIsFilterModal={() => setIsFilterModal(true)} />
				</View>}
				{Boolean(sorteddata?.length) && <TouchableOpacity onPress={() => setShowTransaction(!showTransaction)}>
					{title ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
						<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Transactions</Text>
						{showTransaction ? <DownArrow /> : <UpArrow />}
					</View> :
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
							<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Today</Text>
							{showTransaction ? <DownArrow /> : <UpArrow />}
						</View>
					}
				</TouchableOpacity>}
				{!Boolean(sorteddata?.length) &&
					<View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
						<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>No Transaction found</Text>
					</View>
				}

				{showTransaction && 
				Record?.map((item: any, index: number) => {
					
						return (
							<TouchableOpacity key={index} onPress={() => { setTransactionDetail(item); toggleModal() }}>
								<View style={styles.mainTransactionDiv}>
									<View style={styles.transactionSend}>
										<View style={{ backgroundColor: WHITE, padding: 7, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
											<Image source={{ uri: item?.business?.logo }} style={{ width: 26, height: 26 }} resizeMode="cover" />
										</View>
										<View>
											<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{item.title}</Text>
											<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{item?.business?.address}</Text>
										</View>
										<View>
										</View>
									</View>
									<View>
										<View style={{ display: 'flex', justifyContent: 'center' }}>
											<Text variant='subheading' style={{ fontSize: 10, color: BODY_TEXT, textAlign: 'right' }}>ID#{item.id}</Text>
											<Text variant='heading' style={{ fontSize: 16, color: item.type == 'debit' ? RED : GREEN, textAlign: 'right' }}>{item.type == "debit" ? '-$' + (user?.userRole === 'BUSINESS' ? item?.original_amo : item?.amount) : '$' + (user?.userRole === 'BUSINESS' ? item?.original_amo : item?.amount)}</Text>
										</View>
									</View>
								</View>
								{index != data?.length - 1 && <HorizontalLine />}
							</TouchableOpacity>
						)
					})
				}
			</View>
			{/* Transaction modal */}
			<CustomModal visible={modalVisible}>
				<Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} onPress={toggleModal}>
					<View>
						<View style={styles.modal}>
							<View style={styles.modalTitle}>
								<View style={{ width: 40, height: 40 }}>
									<Starbug />
								</View>
								<View>
									<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{detailTransaction?.title}</Text>
									<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{detailTransaction?.business?.address}</Text>
								</View>
							</View>
							<View style={styles.star}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{detailTransaction?.business?.ratings}</Text>
								<View style={{ flexDirection: 'row', gap: 1 }}>
									{/* {LoopComponent(4)} */}

									<Star />
									<Star />
									<Star />
									<Star />
									<Starunfill />
								</View>
								<Text variant='subheading' style={{ fontSize: 12, color: MAIN_TEXT }}>({detailTransaction?.business?.reviews})</Text>
							</View>
							<Image source={{ uri: detailTransaction?.business?.image }} style={{ height: 119, width: 280, marginTop: 20, borderRadius: 12 }} />
							<View style={styles.history}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Transaction Id:</Text>
								<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>ID#{detailTransaction?.id}</Text>
							</View>
							<View style={styles.history}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Date & Time:</Text>
								<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{moment(detailTransaction?.createdAt).format('h:mm A - MMM D, YYYY')}</Text>
							</View>
							<View style={styles.history}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Local Currency:</Text>
								<Text variant='subheading' style={{ fontSize: 16, color: BODY_TEXT }}>{detailTransaction?.currency?.unit}{ user.userRole === 'BUSINESS'  ? detailTransaction?.original_amo : detailTransaction?.localAmount}</Text>
							</View>
							{ user.userRole !== 'BUSINESS' && <View style={styles.history}>
								<Text variant='subheading' style={{ fontSize: 10, color: MAIN_TEXT }}>Exchange Rate:</Text>
								<Text variant='subheading' style={{ fontSize: 10, color: BODY_TEXT }}>{exchangeRate}x</Text>
							</View>}
							{user.userRole !== 'BUSINESS' && <View style={styles.history}>
								<Text variant='subheading' style={{ fontSize: 10, color: MAIN_TEXT }}>5% Transaction Fee:</Text>
								<Text variant='subheading' style={{ fontSize: 10, color: BODY_TEXT }}>{detailTransaction?.currency?.unit}{handlePercentage(detailTransaction?.original_amo)?.toFixed(2)}</Text>
							</View>}

							<View style={styles.history}>
								<GradientText variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{user.userRole === 'BUSINESS' ? 'You Received:' : 'You Paid:'}</GradientText>
								<Text variant='heading' style={{ fontSize: 16, color: BODY_TEXT }}>{detailTransaction?.currency?.unit}{ user.userRole === 'BUSINESS'  ? detailTransaction?.original_amo : detailTransaction?.localAmount}</Text>
							</View>
							<GradientButton onPress={() => handleSubmitDispute()} style={{ width: 180, marginTop: 46, marginBottom: 10 }} text="Submit A Dispute" />
						</View>
					</View>
				</Pressable>
			</CustomModal>
			{/* Transaction Dispute modal */}
			<CustomModal visible={modalDisputeVisible}>
				<Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }}>
					<View>
						<View style={{ ...styles.modal, minHeight: 480, overflow: 'hidden' }}>
							<View style={{ ...styles.modalTitle, position: 'absolute', top: 10 }}>
								<View>
									<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Transaction Dispute</Text>
								</View>
							</View>

							<View style={{ ...styles.history, position: 'absolute', top: 50 }}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Transaction Id:</Text>
								<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>ID#123152434</Text>
							</View>
							<View style={{ backgroundColor: WHITE, position: 'absolute', bottom: 0, top: 108, left: 0, right: 0, minHeight: 300, padding: 30, borderRadius: 12 }}>
								<View style={{ ...styles.textInput }}>
									<DefaultTextInput multiline={true} placeholder='Insert dispute details here...' />
								</View>
							</View>
							<View style={{ ...styles.buttonContainer, position: 'absolute', bottom: 40, }}>
								<Button onPress={() => setModalDisputeVisible(false)} style={styles.addButton} textStyle={{ color: GRADIENT_I }} text='Cancel' />
								<GradientButton onPress={() => toggleDisputModal()} style={styles.button} text="Submit" />
							</View>
							{/* <GradientButton style={{width:180, marginTop:46, marginBottom:10}} text="Submit A Dispute" /> */}
						</View>
					</View>
				</Pressable>
			</CustomModal>
			{/* dispute modal */}
			<CustomModal visible={modalDisputeConfirmationVisible}>
				<Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }}>
					<View>
						<View style={{ ...styles.modal, minHeight: 330, overflow: 'hidden' }}>
							<View style={{ ...styles.modalTitle, position: 'absolute', top: 15, }}>
								<View>
									<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Dispute Submitted</Text>
								</View>
							</View>

							<View style={{ justifyContent: 'center', alignItems: 'center', padding: 30 }}>
								<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT, marginTop: -30, textAlign: 'center' }}>Your dispute has been successfully submitted.</Text>
								<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT, marginTop: 20, textAlign: 'center' }}>We will respond in 24 to 48 hours upon investigation of the matter.</Text>
								<Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT, marginTop: 20, textAlign: 'center' }}>A support ticket has been opened and emailed to you.</Text>
							</View>

							<View style={{ ...styles.buttonContainer, position: 'absolute', bottom: 30 }}>
								<GradientButton onPress={() => { setModalDisputeConfirmationVisible(false) }} style={styles.button} text="Return Home" />
							</View>
						</View>
					</View>
				</Pressable>
			</CustomModal>
			{/* filter options modal */}
			<CustomModal visible={isfilterModal}>
				<Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} onPress={() => setIsFilterModal(!isfilterModal)}>
						<View style={{ ...styles.modal, height: 150, width: 150 }}>
							<View style={{ position: 'absolute'}}>
								<TouchableOpacity style={styles.filterOption} onPress={() => {setTyper(true); setIsFilterModal(false)}}>
									<Text variant='subheading' hitSlop={{top:25, bottom:25, right:25, left:25}} style={{ fontSize: 18, color: MAIN_TEXT, textAlign: 'center' }}>Typer Filter</Text>
								</TouchableOpacity>
								 
								<TouchableOpacity hitSlop={{top:25, bottom:25, right:25, left:25}} style={{...styles.filterOption, marginTop: 30 }} onPress={() => {setDateFilter(true); setIsFilterModal(false)}}>
									<Text variant='subheading' style={{ fontSize: 18, color: MAIN_TEXT, textAlign: 'center' }}>Date Filter</Text>
								</TouchableOpacity>
							</View>
						</View>
				</Pressable>
			</CustomModal>
			{/* typer modal */}
			<CustomModal visible={typer}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} >
					<View>
						<View style={{ ...styles.modal, minHeight: 370, overflow: 'hidden', }}>
							<View style={{ ...styles.modalTitle, position: 'absolute', top: 15, }}>
								<View>
									<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Filter Modal</Text>
								</View>
							</View>

							<View style={{ ...styles.typerFilter }}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT, marginBottom: 20 }}>Filter Typer</Text>
								{Typer.map((item: any, index: number) => {
										return (
											<TouchableOpacity key={index} onPress={() => handleTyperModal(item, index)}>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<Text variant='subheading' style={{ fontSize: 12, color: MAIN_TEXT }}>{item.text}</Text>
													{filter.index == index && <Tick />}
												</View>
												{index != Typer.length - 1 && <View
													style={{
														borderBottomColor: LIGHT_GREY_III,
														borderBottomWidth: 1,
														marginVertical: 10,
														marginTop: 10
													}}
												/>}
											</TouchableOpacity>
										)
									})
								}
							</View>

							<View style={{ ...styles.buttonContainer, position: 'absolute', bottom: 20 }}>
								<Button onPress={() => handleCancel()} style={styles.signupButton} textStyle={{ color: GRADIENT_I }} text='Cancel' />
								<GradientButton onPress={() => applyFilter()} style={styles.button} text="Apply" />
							</View>
						</View>
					</View>
				</View>
			</CustomModal>
			{/* date modal */}
			<CustomModal visible={dateFilter}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} >
					<View>
						<View style={{ ...styles.modal, minHeight: 370, overflow: 'hidden', }}>
							<View style={{ ...styles.modalTitle, position: 'absolute', top: 15, }}>
								<View>
									<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Filter Modal</Text>
								</View>
							</View>
							<View style={styles.typerFilter}>
								<Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT, marginBottom: 30 }}>Date Typer</Text>
								{DateFilter.map((item: any, index: number) => {
										return (
											<TouchableOpacity key={index} onPress={() => handleDateModal(item, index)}>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<Text variant='subheading' style={{ fontSize: 12, color: MAIN_TEXT }}>{item.text}</Text>
													{date?.index == index && <Tick />}
												</View>
												{index != Typer.length - 1 && <View
													style={{
														borderBottomColor: LIGHT_GREY_III,
														borderBottomWidth: 1,
														marginVertical: 10,
														marginTop: 10
													}}
												/>}
											</TouchableOpacity>
										)
									})
								}
							</View>

							<View style={{ ...styles.buttonContainer, position: 'absolute', bottom: 20 }}>
								<Button onPress={() => handleCancel()} style={styles.signupButton} textStyle={{ color: GRADIENT_I }} text='Cancel' />
								<GradientButton onPress={() => applyFilter()} style={styles.button} text="Apply" />
							</View>
						</View>
					</View>
				</View>
			</CustomModal>


		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttons: {
		padding: 5,
		marginTop: 5,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	balance: {
		width: widthPercentageToDP('82.5%'),
		position: 'absolute',
		alignSelf: 'center',
		marginTop: -60,
		borderRadius: 12,
		padding: 15,
		height: 180
	},
	headerLogo: {
		resizeMode: 'contain',
	},
	yourBalance: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	MemberId: {
		marginTop: heightPercentageToDP("5%"),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		width: 129,
	},
	textStyle: {
		color: '#A933DF'
	},
	search: {
		width: widthPercentageToDP('82.5%'),
		marginTop: 20,
		marginBottom: 20
	},
	actions: {
		marginTop: 85,
		flex: 1,
		height: 110,
		padding: 5,
		backgroundColor: WHITE,
		borderRadius: 12,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainTransactionDiv: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
	},
	Transactions: {
		width: widthPercentageToDP('82.5%'),
		marginTop: 30,
	},
	transactionSend: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10
	},
	btnDefault: {
	},
	buttonContainer: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20
	},
	modalTitle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
		marginTop: 10
	},
	modal: {
		backgroundColor: LIGHT_GREY,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		borderRadius: 10,
		alignSelf: 'center',
		width: widthPercentageToDP('82.5%'),
		elevation: 3,
	},
	star: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15
	},
	history: {
		marginTop: 23,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: WINDOW_WIDTH - 130,
		marginHorizontal: 35
	},
	textInput: {
		borderRadius: 12,
		backgroundColor: WHITE,
		borderColor: BORDER,
		borderWidth: 1,
		fontFamily: POPPINS_REGULAR,
		fontSize: 14,
		color: MAIN_TEXT,
		minHeight: 200,
		paddingLeft: 10,
		paddingRight: 10
	},
	typerFilter: {
		paddingLeft: 20,
		paddingRight: 20,
		width: widthPercentageToDP('82.5%'),
		marginTop: 0
	},
	viewStyle: {
		flex: 1,
		marginTop: -heightPercentageToDP('4.5%'),
		borderTopLeftRadius: 34,
		borderTopRightRadius: 34,
		backgroundColor: LIGHT_GREY,
		paddingHorizontal: widthPercentageToDP('9%'),
		minHeight: heightPercentageToDP('80%')
	},
	signupButton: {
		width: widthPercentageToDP('33%'),
		borderColor: GRADIENT_I,
		borderWidth: 1,
	},
	addButton: {
		width: widthPercentageToDP('33%'),
		borderColor: GRADIENT_I,
		borderWidth: 1,
	},
	filterOption: {
		justifyContent:'center',
		alignItems:'center',
		marginTop: 10,
	}
})
