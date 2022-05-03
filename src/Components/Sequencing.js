import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, View, Image, TextInput, StatusBar, Pressable, TouchableOpacity, Alert } from 'react-native'
import styles from '../css/SequencingStyle'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StoreContext from '../store/StoreContext'
import { openDatabase } from 'react-native-sqlite-storage';
import Entypo from 'react-native-vector-icons/Entypo'
import Spinner from './Spinner';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

function Sequencing({ navigation }) {
    const { orientation, Set_parameter_creteria, parameter_creteria, StateReset_Forshelf,
        shelf_commands, Set_shelf_completed, common_data, Reset_for_logout,
        Set_criterial_post, criterial_post, SelectedStoreData, Set_post_criteria_data,
        Set_post_data1, imageCaptured, post_criteria_data, post_data1, Set_Refresh, refresh, Set_Brand, brand } = useContext(StoreContext)



    console.log(common_data[0].Choose_Next_Shelf, 'line 21')

    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    const [Res, setRes] = useState([]);
    const [Spinners, setSpinners] = useState(false);
    const [Sheltids, setSheltids] = useState([]);
    const [PostFeedback, setFeedback] = useState(null);
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM brand_post_data',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        console.log(results.rows.item(i), temp, 'console brand')
                        temp.push(results.rows.item(i));
                    }
                    Set_Brand(temp);
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
                'SELECT * FROM post_data1',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'post_data1')
                }
            );
        });
    }, [])
    const data = [{ id: 1, name: "Store A" },
    { id: 2, name: "Store A" }]
    const DataRefresh = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM post_criteria_data',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));

                    Set_post_criteria_data(temp);
                }
            );
            tx.executeSql(
                'SELECT * FROM post_data1',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    Set_post_data1(temp);
                }
            );
            tx.executeSql(
                'SELECT * FROM brand_post_data',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    Set_Brand(temp);
                }
            );

        })
    }

    NetInfo.fetch().then(state => {
        // console.log(state.isConnected, 'network status')
    })
    // console.log(post_data1.filter(x => x.store_id == SelectedStoreData.id).length == 4,
    //     post_data1.filter(x => x.store_id == SelectedStoreData.id).length,
    //     'next shelf')
    const unique = [...new Set(post_data1.map(item => item.shelf_id))];
    console.log(unique.length, 'unique data')
    const SequencingInsert = (method) => {


        let selected_store_shelf = [];
        var tot = 0;
        db.transaction(function (txn) {
            //txn.executeSql('DROP TABLE IF EXISTS selected_store_shelf', []);
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE  name='post_criteria_data'",
                [],
                function (tx, res) {
                    if (res.rows.length == 0) {
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS post_criteria_data(post_criteria_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),criteria_id INT(10),criteriayn VARCHAR(10),feedback VARCHAR(100))',
                            [],
                            (tx, result1) => {
                                tx.executeSql(
                                    "SELECT * FROM selected_store_shelf",
                                    [],
                                    (tx, results) => {
                                        var temp = [];
                                        for (let i = 0; i < results.rows.length; ++i)
                                            temp.push(results.rows.item(i));
                                        criterial_post.map((x) => {
                                            txn.executeSql(
                                                'INSERT INTO post_criteria_data (store_id ,shelf_id,criteria_id,criteriayn,feedback) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
                                                [temp[0].store_id, temp[0].shelf_id, x.id, x.yesorno, x.feedback],  //Argument to pass for the prepared statement                  
                                                (tx, results) => {
                                                    if (results.rowsAffected > 0) {
                                                        tot += 1;
                                                        if (method === 'submit') {
                                                            Uploaddata()
                                                        }
                                                        else {
                                                            // console.log(post_data1.filter(x => x.store_id == SelectedStoreData.id).length == 4,
                                                            //     post_data1.filter(x => x.store_id == SelectedStoreData.id).length,
                                                            //     'next shelf')
                                                            const unique = [...new Set(post_data1.map(item => item.shelf_id))];
                                                            // console.log(unique.length, 'unique data')
                                                            if (unique.length >= 2 && SelectedStoreData.id != '') {
                                                                Alert.alert(
                                                                    "Alert",
                                                                    "Please note that you can select a maximum of 3 shelves only",
                                                                    [
                                                                        {
                                                                            text: "Okay", onPress: () => {
                                                                                // console.log('minimum shelf')

                                                                            }
                                                                        }
                                                                    ]
                                                                )
                                                            }
                                                            else {
                                                                DataRefresh();
                                                                tx.executeSql('UPDATE selected_store_shelf set shelf_id=?,shelf_cmd=? where store_id=?', [null, null, SelectedStoreData.id]);
                                                                StateReset_Forshelf()
                                                                navigation.navigate('Shelf')
                                                            }
                                                        }
                                                    }
                                                } //Callback function to handle the result
                                            );
                                        })
                                    }
                                );
                            });
                    } else {
                        let selected_store_shelf = [];
                        txn.executeSql("SELECT * FROM selected_store_shelf",
                            [],
                            (tx, Selectedresult) => {
                                if (Selectedresult.rows.length > 0) {
                                    for (let i = 0; i < Selectedresult.rows.length; ++i)
                                        selected_store_shelf.push(Selectedresult.rows.item(i));
                                    criterial_post.map((c) => {
                                        txn.executeSql(
                                            "SELECT * FROM post_criteria_data where store_id=? AND shelf_id=? AND criteria_id=?",
                                            [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
                                            (tx, postdata_results) => {
                                                if (postdata_results.rows.length > 0) {

                                                    txn.executeSql('UPDATE post_criteria_data set criteriayn=?,feedback=? where store_id=? AND shelf_id=? AND criteria_id=? ',
                                                        [c.yesorno, c.feedback, selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
                                                        (tx, result2) => {

                                                            if (result2.rowsAffected > 0) {
                                                                tot += 1;
                                                                if (criterial_post.length == tot) {
                                                                    if (method === 'submit') {
                                                                        Uploaddata()
                                                                    } else {
                                                                        // console.log(post_data1.filter(x => x.store_id == SelectedStoreData.id).length == 4,
                                                                        //     post_data1.filter(x => x.store_id == SelectedStoreData.id).length,
                                                                        //     'next shelf')
                                                                        const unique = [...new Set(post_data1.map(item => item.shelf_id))];
                                                                        // console.log(unique.length, 'unique data')
                                                                        if (unique.length >= 2 && SelectedStoreData.id != '') {
                                                                            Alert.alert(
                                                                                "Alert",
                                                                                "Please note that you can select a maximum of 3 shelves only",
                                                                                [
                                                                                    {
                                                                                        text: "Okay", onPress: () => {
                                                                                            console.log('minimum shelf')

                                                                                        }
                                                                                    }
                                                                                ]
                                                                            )
                                                                        }
                                                                        else {
                                                                            DataRefresh();
                                                                            tx.executeSql('UPDATE selected_store_shelf set shelf_id=?,shelf_cmd=? where store_id=?', [null, null, SelectedStoreData.id]);
                                                                            StateReset_Forshelf()
                                                                            navigation.navigate('Shelf')
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    )
                                                } else {
                                                    txn.executeSql(
                                                        'INSERT INTO post_criteria_data (store_id ,shelf_id,criteria_id,criteriayn,feedback) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
                                                        [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id, c.yesorno, c.feedback],  //Argument to pass for the prepared statement                  
                                                        (tx, results) => {
                                                            if (results.rowsAffected > 0) {
                                                                tot += 1;
                                                                if (criterial_post.length == tot) {
                                                                    if (method === 'submit') {

                                                                        Uploaddata()
                                                                    }
                                                                    else {
                                                                        // console.log(post_data1.filter(x => x.store_id == SelectedStoreData.id).length == 4,
                                                                        //     post_data1.filter(x => x.store_id == SelectedStoreData.id).length,
                                                                        //     'next shelf')
                                                                        const unique = [...new Set(post_data1.map(item => item.shelf_id))];
                                                                        // console.log(unique.length, 'unique data')
                                                                        if (unique.length >= 2 && SelectedStoreData.id != '') {
                                                                            Alert.alert(
                                                                                "Alert",
                                                                                "Please note that you can select a maximum of 3 shelves only",
                                                                                [
                                                                                    {
                                                                                        text: "Okay", onPress: () => {
                                                                                            console.log('minimum shelf')

                                                                                        }
                                                                                    }
                                                                                ]
                                                                            )
                                                                        }
                                                                        else {
                                                                            DataRefresh();
                                                                            tx.executeSql('UPDATE selected_store_shelf set shelf_id=?,shelf_cmd=? where store_id=?', [null, null, SelectedStoreData.id]);
                                                                            StateReset_Forshelf()
                                                                            navigation.navigate('Shelf')
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } //Callback function to handle the result
                                                    );

                                                }
                                            }
                                        );
                                    })
                                }
                            }
                        )

                    }
                }
            )
        });
        // setSpinners(true)
        // setTimeout(() => {
        //     setSpinners(false)
        //     navigation.navigate('StoreScreen')
        // }, 7000)


    }
    // console.log(Spinners, 'sequencing spinner')
    const Uploaddata = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Alert.alert(
                    "Are you sure to submit?",
                    "",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "Submit", onPress: () => {
                                setSpinners(true)
                                var ct_feedback = [];
                                var Postfeedback = {};
                                var PostYN = {};
                                var PostCriteriaId = {};
                                var PostImg = {};
                                var PostShelffeedback = {};
                                var PostshelfId = {};
                                var PostNoOfBrands = {};
                                var PostBrandId = {};
                                let UserDeatails = {};

                                console.log('www')
                                db.transaction((tx) => {
                                    tx.executeSql(
                                        'SELECT DISTINCT shelf_id FROM post_criteria_data;',
                                        [],
                                        (tx, results) => {
                                            var shelfid = {};
                                            var temp = [];
                                            console.log('www')
                                            for (let i = 0; i < results.rows.length; ++i) {
                                                temp.push(results.rows.item(i));
                                                // feedback.push(results.rows.item(i).feedback); 
                                                PostshelfId = { ...PostshelfId, [i]: results.rows.item(i).shelf_id };
                                            }
                                            temp.map((x, c) => {
                                                tx.executeSql(
                                                    'SELECT shelf_id,criteria_id,feedback,criteriayn FROM post_criteria_data WHERE shelf_id=?',
                                                    [x.shelf_id],
                                                    (tx, results) => {
                                                        var feedtemp = [];
                                                        var yntemp = [];
                                                        var idtemp = [];
                                                        for (let i = 0; i <
                                                            results.rows.length; ++i) {
                                                            yntemp = { ...yntemp, [results.rows.item(i).criteria_id]: results.rows.item(i).criteriayn };
                                                            feedtemp = { ...feedtemp, [results.rows.item(i).criteria_id]: results.rows.item(i).feedback };
                                                            idtemp = { ...idtemp, [i]: results.rows.item(i).criteria_id }
                                                        }
                                                        Postfeedback = { ...Postfeedback, [x.shelf_id]: feedtemp }
                                                        PostYN = { ...PostYN, [x.shelf_id]: yntemp }
                                                        PostCriteriaId = { ...PostCriteriaId, [x.shelf_id]: idtemp }

                                                    }
                                                );
                                                tx.executeSql(
                                                    'SELECT shelf_id, brand_id,no_of_brands FROM brand_post_data WHERE shelf_id=?',
                                                    [x.shelf_id],
                                                    (tx, results) => {
                                                        var brandvaluestemp = [];
                                                        var brandidtemp = [];
                                                        for (let i = 0; i <
                                                            results.rows.length; ++i) {
                                                            brandvaluestemp = { ...brandvaluestemp, [results.rows.item(i).brand_id]: results.rows.item(i).no_of_brands };
                                                            brandidtemp = { ...brandidtemp, [i]: results.rows.item(i).brand_id }
                                                        }
                                                        PostNoOfBrands = { ...PostNoOfBrands, [x.shelf_id]: brandvaluestemp }
                                                        PostBrandId = { ...PostBrandId, [x.shelf_id]: brandidtemp }

                                                    }
                                                );
                                                tx.executeSql(
                                                    'SELECT shelf_cmd,shelf_id,imagedata,imagetype,fileSize FROM post_data1 WHERE shelf_id=?',
                                                    [x.shelf_id],
                                                    (tx, imsresults) => {
                                                        var imgtemp = {};
                                                        for (let i = 0; i < imsresults.rows.length; ++i) {
                                                            imgtemp = { ...imgtemp, [i]: imsresults.rows.item(i).imagedata };
                                                        }
                                                        PostImg = { ...PostImg, [x.shelf_id]: imgtemp };
                                                        // console.log(PostImg, 'post img')
                                                    }
                                                );
                                                tx.executeSql(
                                                    'SELECT * FROM user_details;',
                                                    [],
                                                    (tx, userdetails) => {
                                                        for (let i = 0; i < userdetails.rows.length; ++i) {
                                                            UserDeatails = userdetails.rows.item(0).id
                                                        }

                                                    }
                                                );
                                                tx.executeSql(
                                                    'SELECT DISTINCT shelf_cmd FROM post_data1;',
                                                    [],
                                                    (tx, shelffeed) => {
                                                        var Shelffeedback = [];
                                                        for (let i = 0; i < shelffeed.rows.length; ++i) {
                                                            Shelffeedback = { ...Shelffeedback, [i]: shelffeed.rows.item(i).shelf_cmd == null ? "" : shelffeed.rows.item(i).shelf_cmd };
                                                        }
                                                        PostShelffeedback = { ...PostShelffeedback, [c]: Shelffeedback[c] == undefined ? null : Shelffeedback[c] }
                                                        if (temp.length == c + 1) {
                                                            post();
                                                        }

                                                    }
                                                );





                                            })



                                        });
                                    function post() {
                                        // console.log(Postfeedback, 'PostFeedback ')
                                        // console.log(PostYN, 'PostYN ')
                                        // console.log(PostCriteriaId, 'PostCriteriaId ')
                                        // console.log(PostImg, 'PostImg ')
                                        // console.log(PostshelfId, 'PostshelfId post')
                                        // console.log(PostShelffeedback, 'PostShelffeedback')
                                        // console.log(shelf_commands, 'shelf commands')
                                        // console.log(PostImg, 'UserDeatails')
                                        console.log(PostNoOfBrands, 'no of brands')
                                        console.log(PostBrandId, 'brand id')

                                        const data = new FormData();
                                        data.append("accesskey", 90336);
                                        data.append("store_id", SelectedStoreData.id);
                                        data.append("store", 1);
                                        data.append("emp_id", UserDeatails);
                                        data.append("shelf_id", JSON.stringify(PostshelfId));//
                                        data.append("feedback", JSON.stringify(PostShelffeedback));
                                        data.append("capture_image", JSON.stringify(PostImg)); //
                                        data.append("criteria", JSON.stringify(PostCriteriaId)); //
                                        data.append("ct_feedback", JSON.stringify(Postfeedback)); //
                                        data.append("criteria", JSON.stringify(PostCriteriaId)); //
                                        // data.append("ct_feedback", JSON.stringify(Postfeedback)); //
                                        data.append("brand_list", JSON.stringify(PostBrandId)); //
                                        data.append("brand_value", JSON.stringify(PostNoOfBrands)); //
                                        data.append("c_status", JSON.stringify(PostYN));//                                        
                                        // console.log(data, 'data')
                                        axios
                                            .post('http://sddigitalcommunication.com/demo/shopology/api-v1.php', data)
                                            .then((res) => {
                                                let response = res.data;
                                                console.log(response.completed_store_only);
                                                if (response.message === 'success') {
                                                    db.transaction(function (txn) {
                                                        let rowcount = 0;
                                                        let completeddata = [];
                                                        txn.executeSql('DELETE FROM selected_store_shelf', []);
                                                        txn.executeSql('DELETE FROM post_data1', []);
                                                        txn.executeSql('DELETE FROM post_criteria_data', []);
                                                        txn.executeSql('DELETE FROM shelf_completed', []);
                                                        txn.executeSql('DELETE FROM brand_post_data', []);
                                                        db.transaction(function (txn) {

                                                            response.completed_store_only.map((x) => {
                                                                console.log(x[0], 'row data')
                                                                // let rowdata = response.data.completed_store_only[x]

                                                                // rowdata.map((s) => {
                                                                console.log(x[0], 'x[0]')
                                                                txn.executeSql(
                                                                    'INSERT INTO completed_store (store_id) VALUES (?)',
                                                                    [x[0]],
                                                                    (tx, results) => {
                                                                        console.log(results, 'results')
                                                                        if (results.rowsAffected > 0) {
                                                                            console.log("completed_store inserted successfully")
                                                                        }
                                                                    }
                                                                )
                                                                // })

                                                            })
                                                        })
                                                        let keyvalue = Object.keys(response.completed_shelf)
                                                        // Reset_for_logout();
                                                        keyvalue.map((x) => {
                                                            let colcount = 0;
                                                            rowcount += 1;
                                                            let rowdata = response.completed_shelf[x]
                                                            rowdata.map((s) => {
                                                                colcount += 1;
                                                                txn.executeSql(
                                                                    'INSERT INTO shelf_completed (store_id,shelf_id) VALUES (?,?)',
                                                                    [x, s],
                                                                    // (tx, completedresults) => {
                                                                    //     completeddata = [...completeddata, { 'store_id': x, 'shelf_id': s }]
                                                                    //     if (completedresults.rowsAffected > 0) {
                                                                    //         if (rowcount == keyvalue.length && colcount == rowdata.length) {
                                                                    //             Set_shelf_completed(completeddata);
                                                                    //             console.log(completeddata, "completeddata successfully")

                                                                    //         }
                                                                    //     }
                                                                    // }
                                                                )
                                                            })

                                                        })



                                                    })

                                                    setTimeout(() => {
                                                        Alert.alert(
                                                            "",
                                                            "Submitted successfully",
                                                            [
                                                                {
                                                                    text: "Ok", onPress: () => {
                                                                        setSpinners(false)
                                                                        Set_Refresh(refresh + 1)
                                                                        navigation.navigate('StoreScreen')
                                                                        Reset_for_logout()
                                                                        console.log("submitted data")
                                                                    }
                                                                }
                                                            ]
                                                        )
                                                    },
                                                        500
                                                    );

                                                }

                                            })
                                    }



                                }

                                )
                            }
                        }
                    ]
                )

                    ;
            }
            else {
                Alert.alert(
                    "Please check the internet connection"
                );
            }
        });
    }
    // const test1 = () => {
    //     let count = 0;
    //     let response = { "completed_shelf": { "1": ["2", "1",], "2": ["6", "7", "8"] }, "error": false, "message": "success" }
    //     if (response.message === 'success') {
    //         Alert.alert(
    //             "Submitted successfully",
    //             "",
    //             [

    //                 {
    //                     text: "Okay", onPress: () => {
    //                         db.transaction(function (txn) {
    //                             let rowcount = 0;
    //                             let completeddata = [];
    //                             let keyvalue = Object.keys(response.completed_shelf)
    //                             keyvalue.map((x) => {
    //                                 let colcount = 0;
    //                                 rowcount += 1;
    //                                 let rowdata = response.completed_shelf[x]
    //                                 rowdata.map((s) => {
    //                                     colcount += 1;
    //                                     completeddata = [...completeddata, { 'store_id': x, 'shelf_id': s }]
    //                                     if (completedresults.rowsAffected > 0) {

    //                                         if (rowcount == keyvalue.length && colcount == rowdata.length) {
    //                                             console.log(rowcount == keyvalue.length && colcount == rowdata.length, 'rowcount == keyvalue.length && colcount == rowdata.length')
    //                                             Set_shelf_completed(completeddata);
    //                                             console.log(completeddata, "completeddata successfully")

    //                                         }
    //                                     }


    //                                 })

    //                             })

    //                         })

    //                     }
    //                 }
    //             ]
    //         );


    //     }

    // }
    const Validation = () => {
        let datalen = 0
        let filteredData = parameter_creteria.filter((x) => x.parameter_id == 6).map((e) => { return e.id })
        let CheckedData = filteredData.map((x) => {
            if (criterial_post.some((e) => e.id === x)) {
                datalen += 1;
            }
        })
        return filteredData.length === datalen ? false : true
    }

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
    console.log(post_criteria_data, 'post criteria data 6666')
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
    const yes = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 1 : null
    const no = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 0 : null
    const na = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 2 : null
    // console.log(post_data1.length, 'post data')
    return (
        <>
            <Spinner loading={parameter_creteria.length == 0 || Spinners} />
            <LinearGradient colors={['#16529a', '#0c9ddc', '#007cc6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerStyle}>
                <FontAwesome5 name="arrow-left" style={styles.headerIcon} onPress={() => { navigation.goBack() }} color="white" size={22} />
                {common_data.length != 0 ?
                    <View style={orientation == "POTRAIT" ? styles.headerPotr : styles.headerLand}>

                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>{common_data[0].Sequencing_header.split(" ")[0]}&nbsp;&nbsp;:&nbsp;&nbsp;</Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerAvatarPotr : styles.headerAvatarLand}>{common_data[0].Sequencing_header.split(" ")[1][0]}</Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>&nbsp;&nbsp;{common_data[0].Sequencing_header.split(" ")[1]} </Text>

                        {/* - {SelectedStoreData} */}
                    </View>
                    : null}
                <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                />
                <Entypo name="log-out" style={styles.headerLogout} onPress={() => { Logout() }} color="#a2d401" size={29} />
            </LinearGradient>

            <LinearGradient colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']} style={styles.bgStyle}>
                <StatusBar
                    backgroundColor='#004987' />
                <View style={styles.secondBg}>
                    {
                        parameter_creteria.filter((e) => e.parameter_id == 6).map((e) => (
                            <View style={styles.singleView}>
                                <Text style={orientation == "POTRAIT" ? styles.boxInstructionStylePotr : styles.boxInstructionStyleLand}>{e.criteria_name}</Text>
                                <Text style={styles.textBox}>{e.questions}</Text>
                                <View style={styles.viewStyle}>
                                    <Text style={orientation == "POTRAIT" ? styles.positionTextPotr : styles.positionTextLand}>{e.criteria_desc}</Text>
                                </View>
                                {/* <Image
                                    style={orientation == "POTRAIT" ? styles.positionImagePotr : styles.positionImageLand}
                                    source={{ uri: e.criteria_image }}
                                /> */}
                                <View style={styles.buttonStyle}>
                                    <Pressable style={({ pressed }) => [styles.buttonText,
                                    pressed ? styles.greenBg : yes(e.id) ? styles.greenBg : styles.greenOpacity
                                    ]} onPress={() => {
                                        yes(e.id)
                                        Set_criterial_post(e.id, 'yesorno', 1, null, 1)
                                    }}>
                                        <Text style={yes(e.id) ? styles.selectedStore : styles.normalStore}>
                                            {common_data[0].yes}
                                        </Text>
                                    </Pressable>
                                    <Pressable style={({ pressed }) => [styles.buttonText,
                                    pressed ? styles.redBg : no(e.id) ? styles.redBg : styles.redOpacity
                                    ]} onPress={() => {
                                        no(e.id)
                                        Set_criterial_post(e.id, 'yesorno', 0, null, 0)
                                    }}>
                                        <Text style={no(e.id) ? styles.selectedStore : styles.normalStore}>
                                            {common_data[0].no}
                                        </Text>
                                    </Pressable>
                                    <Pressable style={({ pressed }) => [styles.buttonText,
                                    pressed ? [styles.redBg, { backgroundColor: 'orange' }] : na(e.id) ? [styles.redBg, { backgroundColor: 'orange' }] : [styles.redOpacity, { borderColor: 'orange' }]
                                    ]} onPress={() => {
                                        na(e.id)
                                        Set_criterial_post(e.id, 'yesorno', 2, null, 2)
                                    }}>
                                        <Text style={na(e.id) ? styles.selectedStore : styles.normalStore}>
                                            N/A
                                        </Text>
                                    </Pressable>
                                </View>
                                <TextInput style={styles.shelfTextinput}
                                    placeholder="Open Feedback ( Max 256 Chars )"
                                    multiline={true}
                                    maxLength={256}
                                    numberOfLines={9}
                                    value={criterial_post.filter(e5 => e5.id == e.id).length != 0 ?
                                        criterial_post.filter(e5 => e5.id == e.id)[0].feedback : ""}
                                    onChangeText={(u) => Set_criterial_post(e.id, 'feedback', null, u, u)}
                                />

                            </View>
                        ))
                    }
                </View>



                <TouchableOpacity style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} activeOpacity={0.7}
                    onPress={() => { SequencingInsert('shelf') }}
                >
                    <LinearGradient disabled={Validation()} colors={Validation() ? ['grey', 'grey'] : ['#82bc12', '#61910a']}

                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} >

                        <Text style={styles.nextText} >{common_data.length != 0 ? common_data[0].Choose_Next_Shelf : null}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity disabled={Validation()} style={orientation == "POTRAIT" ? styles.nextBtnPotraitSubmit : styles.nextBtnLandscapeSubmit} activeOpacity={0.7}
                    onPress={() => { SequencingInsert('submit') }}
                >
                    <LinearGradient colors={Validation() ? ['grey', 'grey'] : ['#82bc12', '#61910a']}

                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} style={orientation == "POTRAIT" ? styles.nextBtnPotraitSubmit : styles.nextBtnLandscapeSubmit} >

                        <Text style={styles.nextText} >{common_data.length != 0 ? common_data[0].Submit : null}</Text>
                    </LinearGradient>
                </TouchableOpacity>


            </LinearGradient>
        </>
    )
}

export default Sequencing