import React, { useEffect, useState, useContext } from 'react'
import StoreContext from "../store/StoreContext";


function StoreScreen() {
    const { orientation, changeOrientation, storeChain, ChangeStoreChain, SelectedStoreData,
        storeLocal, ChangeStoreLocal, storeIndi, ChangeStoreIndi, SetSelectedStoreData, Set_parameter_creteria,
        Set_common_data, common_data, ChangeShelfMain, ChangeShelfSecondary, selectedShelfid,
        StateReset_Forshelf, criterial_post, post_criteria_data, post_data1, shelf_completed,
        Set_shelf_completed, Reset_for_logout, imageCaptured, parameter_creteria,
        refresh, ChangeMclData, mclData, changeBrandData, completedStores, Set_CompletedStores } = useContext(StoreContext)

    const checkdisable = (id) => {
        return completedStores.some((x) => x.store_id == id)
    }
    const checkPartial = (id) => {
        return shelf_completed.filter((x) => x.store_id == id).length != 0
    }
    const GradientBtn = ({ name, id }) => (
        <label
        // style={SelectedStoreData.id == id ? styles.selectedStore : checkdisable(id) ? 
        //     styles.selectedStore : checkPartial(id) ? styles.selectedStore :styles.normalStore}
        >{name}</label>
    )
    // const storeData = (store_name, id) => {
    //     SetSelectedStoreData(store_name, id)
    //     db.transaction(function (txn) {
    //         txn.executeSql(
    //             'SELECT * FROM shelf_details',
    //             [],
    //             (tx, results) => {
    //                 var temp = [];
    //                 for (let i = 0; i < results.rows.length; ++i)
    //                     temp.push(results.rows.item(i));
    //                 ChangeShelfMain(temp.filter((e) => e.shelf_type == "1" && e.store_id == id))
    //                 ChangeShelfSecondary(temp.filter((e) => e.shelf_type == "2" && e.store_id == id))
    //             }
    //         );
    //         txn.executeSql(
    //             "SELECT name FROM sqlite_master WHERE  name='selected_store_shelf'",
    //             [],
    //             function (tx, res) {
    //                 if (res.rows.length == 0) {
    //                     txn.executeSql(
    //                         'CREATE TABLE IF NOT EXISTS selected_store_shelf(selected_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50))',
    //                         [],
    //                         (tx, result1) => {
    //                             txn.executeSql(
    //                                 'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
    //                                 [id],  //Argument to pass for the prepared statement                  
    //                                 (tx, results) => {
    //                                     if (results.rowsAffected > 0) {
    //                                         navigation.navigate('Shelf')
    //                                     }
    //                                 } //Callback function to handle the result
    //                             );
    //                         });
    //                 } else {
    //                     txn.executeSql(
    //                         "SELECT * FROM selected_store_shelf",
    //                         [],
    //                         (tx, results) => {
    //                             if (results.rows.length > 0) {
    //                                 var selected_id = 1
    //                                 txn.executeSql('UPDATE selected_store_shelf set store_id=? ',
    //                                     [id],
    //                                     (tx, result2) => {
    //                                         if (result2.rowsAffected > 0) {
    //                                             navigation.navigate('Shelf')
    //                                         }
    //                                     }
    //                                 )
    //                             } else {
    //                                 txn.executeSql(
    //                                     'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
    //                                     [id],  //Argument to pass for the prepared statement                  
    //                                     (tx, results) => {
    //                                         if (results.rowsAffected > 0) {
    //                                             navigation.navigate('Shelf')
    //                                         }
    //                                     } //Callback function to handle the result
    //                                 );
    //                             }
    //                         }
    //                     );

    //                 }
    //             }
    //         )
    //     });
    // }
    // const InsertStore = (store_name, id) => {
    //     if (SelectedStoreData.id == id) {
    //         storeData(store_name, id)
    //     }
    //     else {
    //         StateReset_Forshelf()
    //         storeData(store_name, id)
    //     }
    // }
    const unique = [...new Set(post_data1.map(item => item.shelf_id))];

    // function deleteTables() {
    //     var db = openDatabase({ name: 'CetaphilDatabase.db' });
    //     db.transaction((tx) => {
    //         tx.executeSql('DELETE FROM store_details', []);
    //         tx.executeSql('DELETE FROM shelf_sample_images', []);
    //         tx.executeSql('DELETE FROM shelf_details', []);
    //         tx.executeSql('DELETE FROM common_data', []);
    //         tx.executeSql('DELETE FROM s5_parameters', []);
    //         tx.executeSql('DELETE FROM parameter_creteria', []);
    //         tx.executeSql('DELETE FROM user_details', []);
    //         tx.executeSql('DELETE FROM selected_store_shelf', []);
    //         tx.executeSql('DELETE FROM post_data1', []);
    //         tx.executeSql('DELETE FROM post_criteria_data', []);
    //         tx.executeSql('DELETE FROM shelf_completed', []);
    //         tx.executeSql('DELETE FROM mcl_list', []);
    //         tx.executeSql('DELETE FROM brand_list', []);
    //         tx.executeSql('DELETE FROM brand_post_data', []);
    //         tx.executeSql('DELETE FROM completed_store', []);
    //     });
    //     Reset_for_logout()
    //     // ChangeStoreChain([])
    //     // ChangeStoreLocal([])
    //     // ChangeStoreIndi([])
    //     navigation.navigate('PostLogin')
    // }
    // function Logout() {

    //     Alert.alert(
    //         "Do you want to logout?",
    //         imageCaptured.length != 0 || criterial_post.length != 0 || post_criteria_data.length != 0 ?
    //             "Please note that if you logout, your store and shelf details will be deleted." :
    //             "",
    //         [
    //             {
    //                 text: "NO",
    //                 onPress: () => console.log("Cancel Pressed"),
    //                 style: "cancel"
    //             },
    //             {
    //                 text: "YES", onPress: () => {
    //                     deleteTables()
    //                 }
    //             }
    //         ]
    //     );


    // }

    return (
        <>


            {/* <FontAwesome5 name="arrow-left" style={styles.headerIcon} onPress={() => { navigation.goBack() }} color="white" size={22} /> */}

            {common_data.length != 0 ? common_data[0].store_header : null}
            {/* - {SelectedStoreData} */}

            {/* <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                /> */}
            <label
            // onClick={() => { Logout() }}
            >Logout</label>

            <>
                <div>
                    {common_data.length != 0 ? common_data[0].store_instructions : null}


                    {
                        storeChain.length != 0 ?
                            <div>
                                Shopping Store&nbsp; &nbsp;{storeChain.length != 0 ? storeChain[0].store_type_name : null}
                                {/* <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeChain}
                                    renderItem={({ item }) => ( */}
                                {
                                    storeChain.map((item) => (
                                        <label
                                            disabled={checkdisable(item.id)}
                                            onClick={() => {
                                                alert("store onclick")
                                                // InsertStore(item.store_name, item.id)
                                            }}
                                        >
                                            <GradientBtn name={item.store_name} id={item.id} />
                                        </label>
                                    ))
                                }

                                {/* )
                                    }
                                /> */}
                            </div>

                            :
                            null
                    }
                    {
                        storeLocal.length != 0 ?
                            <div>
                                Store Alt&nbsp; &nbsp;{storeLocal.length != 0 ? storeLocal[0].store_type_name : null}
                                {/* <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeLocal}
                                    renderItem={({ item }) => ( */}
                                {
                                    storeLocal.map((item) => (
                                        <label
                                            disabled={checkdisable(item.id)}
                                            onPress={() => {
                                                alert('store onclick')
                                                // InsertStore(item.store_name, item.id)
                                            }}
                                        >
                                            <GradientBtn name={item.store_name} id={item.id} />
                                        </label>
                                    ))
                                }

                                {/* )}
                                /> */}
                            </div>
                            :
                            null
                    }

                    {
                        storeIndi.length != 0 ?
                            <div>
                                Store&nbsp; &nbsp;{storeIndi.length != 0 ? storeIndi[0].store_type_name : null}
                                {/* <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeIndi}
                                    renderItem={({ item }) => ( */}
                                {
                                    storeIndi.map((item) => (
                                        <label
                                            disabled={checkdisable(item.id)}
                                            onClick={() => {
                                                alert('store onclick')
                                                // InsertStore(item.store_name, item.id)
                                            }} >
                                            <GradientBtn name={item.store_name} id={item.id} />
                                        </label>
                                    ))
                                }

                                {/* )}
                                /> */}
                            </div>
                            :
                            null
                    }
                </div>

                {/* </View> */}
            </ >
        </>
    )
}

export default StoreScreen