import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from '../css/headerStyle'

function MainHeader({ navigation }) {
    return (
        <View style={styles.headerStyle}>
            <Text onPress={() => { navigation.goBack() }}>icons</Text>
            <Text style={styles.headerText}>Choose Your Shelf & Category</Text>
            <Image
                style={styles.headerImage}
                source={require('../images/headerLogo.png')}
            />
        </View>
    )
}

export default MainHeader