import React, { useEffect, useContext } from 'react'
import { Button, Text, View, StatusBar, Image, TouchableOpacity, Alert } from 'react-native'
import styles from '../css/PasasStyle';
import { Avatar } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
import StoreContext from "../store/StoreContext";
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Spinner from './Spinner';
function Pasas({ navigation }) {
    const { common_data, s5_parameters, Set_s5_parameters, orientation, Set_parameter_creteria,
        Reset_for_logout, SelectedStoreData, imageCaptured, post_criteria_data, criterial_post } = useContext(StoreContext)
    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    useEffect(() => {

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM post_data1',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'post_data1 database');
                    // Set_common_data(temp)
                }
            );
            tx.executeSql(
                'SELECT * FROM parameter_creteria',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    Set_parameter_creteria(temp)
                }
            );
        });
    }, [])
    function deleteTables() {
        var db = openDatabase({ name: 'CetaphilDatabase.db' });
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM store_details', []);
            tx.executeSql('DELETE FROM shelf_sample_images', []);
            tx.executeSql('DELETE FROM shelf_details', []);
            tx.executeSql('DELETE FROM common_data', []);
            tx.executeSql('DELETE FROM s5_parameters', []);
            tx.executeSql('DELETE FROM parameter_creteria', []);
            tx.executeSql('DELETE FROM user_details', []);
            tx.executeSql('DELETE FROM selected_store_shelf', []);
            tx.executeSql('DELETE FROM post_data1', []);
            tx.executeSql('DELETE FROM post_criteria_data', []);
            tx.executeSql('DELETE FROM shelf_completed', []);
            tx.executeSql('DELETE FROM mcl_list', []);
            tx.executeSql('DELETE FROM brand_list', []);
            tx.executeSql('DELETE FROM brand_post_data', []);
            tx.executeSql('DELETE FROM completed_store', []);
        });
        Reset_for_logout()
        navigation.navigate('PostLogin')
    }
    function Logout() {

        Alert.alert(
            "Do you want to logout?",
            imageCaptured.length != 0 || criterial_post.length != 0 || post_criteria_data.length != 0 ?
                "Please note that if you logout, your store and shelf details will be deleted." :
                "",
            [
                {
                    text: "NO",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "YES", onPress: () => {
                        deleteTables()
                    }
                }
            ]
        );


    }
    console.log(common_data[0].s5_instruction_header)
    return (
        <>
            {/* <Spinner loading={s5_parameters.length == 0} /> */}
            <LinearGradient colors={['#16529a', '#0c9ddc', '#007cc6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerStyle}>
                <FontAwesome5 name="arrow-left" style={styles.headerIcon} onPress={() => { navigation.goBack() }} color="white" size={22} />
                <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>{common_data.length != 0 ? common_data[0].pasas_header : null}
                    {/* - {SelectedStoreData} */}
                </Text>
                <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                />
                <Entypo name="log-out" style={styles.headerLogout} onPress={() => { Logout() }} color="#a2d401" size={29} />
            </LinearGradient>

            {/* {
                s5_parameters.length != 0 ? */}

            <LinearGradient colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']} style={styles.bgStyle}>
                <StatusBar
                    backgroundColor='#004987' />
                <Image
                    style={orientation == "POTRAIT" ? styles.overallImagePotr : styles.overallImageLand}
                    source={{
                        uri: common_data[0].background_image
                    }}
                />
                {/* <View style={styles.MainCard}>
                    <View style={styles.insView}>
                        <Text style={styles.insHeader}>
                             
                            {common_data.length != 0 ? common_data[0].s5_instruction_header.split(",")[0] : null}
                        </Text>
                        <Text style={styles.insBold}>
                             
                            {common_data.length != 0 ? common_data[0].s5_instruction_header.split(",")[1] : null}
                        </Text>

                    </View>
                    <View style={styles.insView5}>
                        <Text style={styles.insHeader5}>

                            {common_data[0].s5_instruction_details.split(".").length != 0 ? common_data[0].s5_instruction_details.split(".")[0] : common_data[0].s5_instruction_details}
                        </Text>
                        <Text style={styles.insHeader5}>

                            {common_data[0].s5_instruction_details.split(". ").length == 2 || common_data[0].s5_instruction_details.split(".").length == 2 ? common_data[0].s5_instruction_details.split(". ")[1] : null}
                        </Text>
                    </View>


                    <Image
                        style={orientation == "POTRAIT" ? styles.GirlImagePotr : styles.GirlImageLand}
                        source={{
                            uri: common_data[0].s5_logo_image
                        }}
                    />



                </View>
                <View style={styles.SubCardView}>
                    {
                        s5_parameters.map((x, i) => (
                            <View style={orientation == "POTRAIT" ? { flexDirection: 'column', width: '18%', margin: '1%' } : { flexDirection: 'column', width: '18%', margin: '1%' }}>
                                <View style={orientation == "POTRAIT" ? styles.SubCardsPotr : styles.SubCardsLand}>
                                    <Text
                                        style={orientation == "POTRAIT" ? [styles.AvatarsPotr,
                                        i == 0 ? styles.positionStyle :
                                            i == 1 ? styles.allocationStyle :
                                                i == 2 ? styles.segmentationStyle :
                                                    i == 3 ? styles.adjacencyStyle :
                                                        s5_parameters.length == 6 && i == 4 ? styles.adjacencyStyle : styles.sequencingStyle] : [styles.AvatarsLand,
                                                        i == 0 ? styles.positionStyle :
                                                            i == 1 ? styles.allocationStyle :
                                                                i == 2 ? styles.segmentationStyle :
                                                                    i == 3 ? styles.adjacencyStyle :
                                                                        s5_parameters.length == 6 && i == 4 ? styles.adjacencyStyle : styles.sequencingStyle]}
                                    >

                                        {x.parameter_type.charAt(0)}
                                    </Text>
                                    <Text style={orientation == "POTRAIT" ? styles.textStylePotr : styles.textStyleLand}>{x.parameter_type}</Text>
                                </View>
                                <Text style={orientation == "POTRAIT" ? styles.textWidthPotr : styles.textWidthLand}>{x.parameter_desc}</Text>
                            </View>
                        ))
                    }
                </View>*/}
                <TouchableOpacity style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} activeOpacity={0.7}
                    onPress={() => { navigation.navigate('Position') }}
                >
                    <LinearGradient colors={['#82bc12', '#61910a']}

                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} >

                        <Text style={styles.nextText} >{common_data[0].Next}</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </LinearGradient>
            {/* :
                    null
            } */}
        </>
    )
}

export default Pasas