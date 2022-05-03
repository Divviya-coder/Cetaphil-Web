import React from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'
import styles from '../css/SpinnerStyle'

function Spinner({ loading }) {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            style={{ zIndex: 1100 }}
            onRequestClose={() => { }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={loading} color="#f0f1f2" size={90} />
                </View>
            </View>
        </Modal>
    )
}

export default Spinner