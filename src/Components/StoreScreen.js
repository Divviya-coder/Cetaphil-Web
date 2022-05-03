import React, { useEffect, useState, useContext } from 'react'
import { Button, Text, View, TextInput, Dimensions, Platform, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, BackHandler, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from '../css/StoreScreenStyle'
import StoreContext from "../store/StoreContext";
import { openDatabase } from 'react-native-sqlite-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Spinner from './Spinner';
import NetInfo from "@react-native-community/netinfo";
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';


const data = [{ id: 1, name: "Store A" },
{ id: 2, name: "Store A" },
{ id: 3, name: "Store A" },
{ id: 4, name: "Store A" },
{ id: 5, name: "Store A" },
{ id: 6, name: "Store A" },
{ id: 7, name: "Store A" },
{ id: 8, name: "Store A" },
{ id: 9, name: "Store A" },
{ id: 10, name: "Store A" }]
const data5 = [{ id: 1, name: "Store A" },
{ id: 2, name: "Store A" },
{ id: 3, name: "Store A" },
{ id: 4, name: "Store A" },
{ id: 5, name: "Store A" }]


function StoreScreen({ navigation }) {
    const { orientation, changeOrientation, storeChain, ChangeStoreChain, SelectedStoreData,
        storeLocal, ChangeStoreLocal, storeIndi, ChangeStoreIndi, SetSelectedStoreData, Set_parameter_creteria,
        Set_common_data, common_data, ChangeShelfMain, ChangeShelfSecondary, selectedShelfid,
        StateReset_Forshelf, criterial_post, post_criteria_data, post_data1, shelf_completed,
        Set_shelf_completed, Reset_for_logout, imageCaptured, parameter_creteria,
        refresh, ChangeMclData, mclData, changeBrandData, completedStores, Set_CompletedStores } = useContext(StoreContext)

    let currentNetwork;

    NetInfo.fetch().then(state => {
        currentNetwork = state.isConnected;
    });

    console.log(completedStores, 'completed stores es something')
    const [net, setNet] = useState(currentNetwork)

    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    // if (storeChain.length == 0 && storeLocal.length == 0 && storeIndi.length != 0) {
    //     console.log('check length')
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             'SELECT * FROM store_details',
    //             [],
    //             (tx, results) => {
    //                 var temp = [];
    //                 for (let i = 0; i < results.rows.length; ++i)
    //                     temp.push(results.rows.item(i));
    //                 console.log(temp, 'temp store');
    //                 ChangeStoreChain(temp.filter((e) => e.store_type == "1"))
    //                 ChangeStoreLocal(temp.filter((e) => e.store_type == "2"))
    //                 ChangeStoreIndi(temp.filter((e) => e.store_type == "3"))
    //             }
    //         );

    //         tx.executeSql(
    //             'SELECT * FROM parameter_creteria',
    //             [],
    //             (tx, results) => {
    //                 var temp = [];
    //                 for (let i = 0; i < results.rows.length; ++i)
    //                     temp.push(results.rows.item(i));
    //                 Set_parameter_creteria(temp)
    //             }
    //         );


    //         tx.executeSql(
    //             'SELECT * FROM shelf_completed',
    //             [],
    //             (tx, results) => {
    //                 var temp = [];
    //                 // console.log(results, results.rows.length, 'shelf data')
    //                 for (let i = 0; i < results.rows.length; ++i) {
    //                     temp.push(results.rows.item(i));
    //                     // console.log(results.rows.length, temp, 'completed data')
    //                 }
    //                 Set_shelf_completed(temp)
    //                 // console.log(temp, 'shelf_completed instore')
    //             }
    //         );

    //         tx.executeSql(
    //             'SELECT * FROM common_data',
    //             [],
    //             (tx, results) => {
    //                 // console.log(results, 'common data')
    //                 var temp = [];
    //                 for (let i = 0; i < results.rows.length; ++i)
    //                     temp.push(results.rows.item(i));
    //                 // console.log(temp, 'common data');
    //                 Set_common_data(temp)
    //             }
    //         );


    //         tx.executeSql(
    //             'SELECT * FROM completed_store',
    //             [],
    //             (tx, results) => {
    //                 var temp = [];
    //                 for (let i = 0; i < results.rows.length; ++i)
    //                     temp.push(results.rows.item(i));

    //                 console.log(temp, 'completed store');
    //                 Set_CompletedStores(temp)
    //             }
    //         );

    //     });
    // }

    useEffect(() => {
        // Reset_for_logout();
        // console.log('use effect')
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM store_details',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    console.log(temp, 'temp store');
                    ChangeStoreChain(temp.filter((e) => e.store_type == "1"))
                    ChangeStoreLocal(temp.filter((e) => e.store_type == "2"))
                    ChangeStoreIndi(temp.filter((e) => e.store_type == "3"))
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


            tx.executeSql(
                'SELECT * FROM shelf_completed',
                [],
                (tx, results) => {
                    var temp = [];
                    // console.log(results, results.rows.length, 'shelf data')
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                        // console.log(results.rows.length, temp, 'completed data')
                    }
                    Set_shelf_completed(temp)
                    // console.log(temp, 'shelf_completed instore')
                }
            );

            tx.executeSql(
                'SELECT * FROM common_data',
                [],
                (tx, results) => {
                    // console.log(results, 'common data')
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'common data');
                    Set_common_data(temp)
                }
            );


            tx.executeSql(
                'SELECT * FROM completed_store',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));

                    console.log(temp, 'completed store');
                    Set_CompletedStores(temp)
                }
            );

        });

        changeOrientation()
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
            handleBackButton(),
        );

        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {

                // Alert.alert(
                //     "You are connected to an internet now"
                // );
                // setNet(state.isConnected)
            }

        }
        );
        return () => {
            backHandler.remove();
            // unsubscribe
        };

    }, [refresh])
    // console.log(refresh, 'refresh')
    const handleBackButton = () => {
        if (navigation.isFocused()) {
            BackHandler.exitApp();
        }
    };
    const numberOfData = orientation == "POTRAIT" ? 5 : 5
    const listKey = orientation == "POTRAIT" ? "_" : "#"

    // console.log(shelf_completed, 'shelf_completed instore')
    const checkdisable = (id) => {
        return completedStores.some((x) => x.store_id == id)
        //     shelf_completed.filter((x) => x.shelf_id == 2 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 3 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 4 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 5 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 6 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 7 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 8 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 9 && x.store_id == id).length != 0 &&
        //     shelf_completed.filter((x) => x.shelf_id == 10 && x.store_id == id).length != 0
        // )
    }
    const checkPartial = (id) => {
        return shelf_completed.filter((x) => x.store_id == id).length != 0
        // && checkdisable == false
    }
    // console.log(checkdisable(1), 'shelf completed store data')

    const GradientBtn = ({ name, id }) => (
        <LinearGradient colors={SelectedStoreData.id == id ? ['#0296d7', '#1876b5'] :
            checkdisable(id) ? ['grey', 'grey'] : checkPartial(id) ? ['#35775e', '#82bc12'] :
                ['#ebf2f9', '#ebf2f9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={orientation == "POTRAIT" ? styles.gradientPotr : styles.gradientLand}
        >
            <Text style={SelectedStoreData.id == id ? styles.selectedStore :
                checkdisable(id) ? styles.selectedStore : checkPartial(id) ? styles.selectedStore :
                    styles.normalStore}>{name}</Text>
        </LinearGradient>
    )
    const storeData = (store_name, id) => {
        SetSelectedStoreData(store_name, id)
        db.transaction(function (txn) {
            //txn.executeSql('DROP TABLE IF EXISTS selected_store_shelf', []);
            txn.executeSql(
                'SELECT * FROM shelf_details',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp.filter((e) => e.shelf_type == "1" && e.store_id == id));
                    ChangeShelfMain(temp.filter((e) => e.shelf_type == "1" && e.store_id == id))
                    ChangeShelfSecondary(temp.filter((e) => e.shelf_type == "2" && e.store_id == id))
                }
            );
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE  name='selected_store_shelf'",
                [],
                function (tx, res) {
                    if (res.rows.length == 0) {
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS selected_store_shelf(selected_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50))',
                            [],
                            (tx, result1) => {
                                txn.executeSql(
                                    'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
                                    [id],  //Argument to pass for the prepared statement                  
                                    (tx, results) => {
                                        if (results.rowsAffected > 0) {
                                            navigation.navigate('Shelf')
                                        }
                                    } //Callback function to handle the result
                                );
                            });
                    } else {
                        txn.executeSql(
                            "SELECT * FROM selected_store_shelf",
                            [],
                            (tx, results) => {
                                if (results.rows.length > 0) {
                                    var selected_id = 1
                                    txn.executeSql('UPDATE selected_store_shelf set store_id=? ',
                                        [id],
                                        (tx, result2) => {
                                            if (result2.rowsAffected > 0) {
                                                navigation.navigate('Shelf')
                                            }
                                        }
                                    )
                                } else {
                                    txn.executeSql(
                                        'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
                                        [id],  //Argument to pass for the prepared statement                  
                                        (tx, results) => {
                                            if (results.rowsAffected > 0) {
                                                navigation.navigate('Shelf')
                                            }
                                        } //Callback function to handle the result
                                    );
                                }
                            }
                        );

                    }
                }
            )
        });
    }
    const InsertStore = (store_name, id) => {
        if (SelectedStoreData.id == id) {
            storeData(store_name, id)
        }
        else {
            StateReset_Forshelf()
            // var db = openDatabase({ name: 'CetaphilDatabase.db' });
            // db.transaction((tx) => {
            //     tx.executeSql('DELETE FROM post_data1', []);
            //     tx.executeSql('DELETE FROM post_criteria_data', []);
            //     tx.executeSql('DELETE FROM brand_post_data', []);
            // })
            storeData(store_name, id)
        }
    }
    const unique = [...new Set(post_data1.map(item => item.shelf_id))];
    // console.log(unique.length, 3 >= 1, 'unique data')
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
        // ChangeStoreChain([])
        // ChangeStoreLocal([])
        // ChangeStoreIndi([])
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
    console.log(storeLocal, storeIndi, storeChain, storeLocal.length)
    // console.log(storeChain.length == 0)
    return (
        <>
            <Spinner loading={storeChain.length == 0 && storeLocal.length == 0 && storeIndi.length == 0} />
            <LinearGradient colors={['#16529a', '#0c9ddc', '#007cc6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerStyle}>
                {/* <FontAwesome5 name="arrow-left" style={styles.headerIcon} onPress={() => { navigation.goBack() }} color="white" size={22} /> */}
                <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>
                    {common_data.length != 0 ? common_data[0].store_header : null}
                    {/* - {SelectedStoreData} */}
                </Text>
                <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                />
                <Entypo name="log-out" fontWeight='bold' style={styles.headerLogout} onPress={() => { Logout() }} color="#a2d401" size={29} />
            </LinearGradient>
            <LinearGradient colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} style={styles.bgStyle}>
                {/* <StatusBar
                    backgroundColor='#004987' /> */}

                <ScrollView>


                    <Text style={styles.boxInstructionStyle}>{common_data.length != 0 ? common_data[0].store_instructions : null}</Text>


                    {
                        storeChain.length != 0 ?
                            <View style={styles.stores}>
                                <Text style={styles.storeTitle}><Fontisto size={20} name="shopping-store" color="#0cb2dc" />&nbsp; &nbsp;{storeChain.length != 0 ? storeChain[0].store_type_name : null}</Text>
                                <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeChain}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            disabled={checkdisable(item.id)}
                                            onPress={() => {
                                                InsertStore(item.store_name, item.id)
                                                // 
                                            }} activeOpacity={0.7} style={orientation == "POTRAIT" ? styles.wrapperPotr : styles.wrapperLand}>
                                            <GradientBtn name={item.store_name} id={item.id} />
                                        </TouchableOpacity>
                                    )
                                    }
                                />
                            </View >

                            :
                            null
                    }
                    {
                        storeLocal.length != 0 ?
                            <View style={styles.stores}>
                                <Text style={styles.storeTitle}><FontAwesome5 size={20} name="store-alt" color="#0cb2dc" />&nbsp; &nbsp;{storeLocal.length != 0 ? storeLocal[0].store_type_name : null}</Text>
                                <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeLocal}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            disabled={checkdisable(item.id)}
                                            onPress={() => {
                                                InsertStore(item.store_name, item.id)
                                            }} activeOpacity={0.7} style={orientation == "POTRAIT" ? styles.wrapperPotr : styles.wrapperLand}>
                                            <GradientBtn name={item.store_name} id={item.id} />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            :
                            null
                    }

                    {
                        storeIndi.length != 0 ?
                            <View style={styles.stores}>
                                <Text style={styles.storeTitle}><FontAwesome5 size={20} name="store" color="#0cb2dc" />&nbsp; &nbsp;{storeIndi.length != 0 ? storeIndi[0].store_type_name : null}</Text>
                                <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeIndi}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            disabled={checkdisable(item.id)}
                                            onPress={() => {
                                                InsertStore(item.store_name, item.id)
                                            }} activeOpacity={0.7} style={orientation == "POTRAIT" ? styles.wrapperPotr : styles.wrapperLand}>
                                            <GradientBtn name={item.store_name} id={item.id} />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            :
                            null
                    }
                </ScrollView >

                {/* </View> */}
            </LinearGradient >
        </>
    )
}

export default StoreScreen