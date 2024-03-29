import React from 'react';
import { Modal, View, ModalProps } from "react-native"

interface CustomModalProps extends ModalProps {
    visible?: boolean;
}

const CustomModal = ({ visible, children }: CustomModalProps) => {
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal visible={visible} animationType="fade" transparent={true} >
                    {children}
                </Modal>
            </View>
        </>
    )
}

export default CustomModal