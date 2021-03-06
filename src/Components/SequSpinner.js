import React from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'
import styles from '../css/SpinnerStyle'

function SequSpinner({ loading }) {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            style={{ zIndex: 11000000 }}
            onRequestClose={() => { }}>
            <View style={styles.sequModalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={loading} color="#f0f1f2" size={90} />
                </View>
            </View>
        </Modal>
    )
}

export default SequSpinner