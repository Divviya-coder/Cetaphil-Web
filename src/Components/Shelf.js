import React, { useEffect, useState, useContext } from 'react'
import { Button, Text, View, TextInput, Dimensions, Platform, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../css/ShelfStyle'
import StoreContext from "../store/StoreContext";
import LinearGradient from 'react-native-linear-gradient'
import { Card, Paragraph, Title } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
import MainHeader from './MainHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Spinner from './Spinner';
import NetInfo from "@react-native-community/netinfo";
import RNFS from 'react-native-fs'
import RNFetchBlob from 'react-native-fetch-blob'
import axios from 'axios';

const data = [{ id: 1, name: "Main Shelf Face Only" },
{ id: 2, name: "Main Shelf Body Only" },
{ id: 3, name: "Main Shelf Face + Body Total Skin" },
{ id: 4, name: "Main Shelf Face + Body + Baby(Wall)" },
{ id: 5, name: "Main Shelf Baby Only" }]


function Shelf({ navigation }) {
    const { orientation, changeOrientation, shelfMain, shelfSecondary, ChangeShelfMain, post_criteria_data,
        selectedShelfid, shelf_commands, Set_Logined, Logined, ChangeShelfSecondary, Set_post_criteria_data,
        SelectedStoreData, common_data, selectedShelf, SetSelectedShelf, Set_post_data1, post_data1,
        Set_shelf_commands, ChangeSampleImage, parameter_creteria, Set_criterial_post, criterial_post,
        changeCriterialPost, ChangeImageUpload, Set_shelf_completed, ChangeImageCaptured, shelf_completed,
        Reset_for_logout, imageCaptured, shelfLength, SetShelfLength, Set_Brand_Post,
        brandPost, Set_Brand, brand, Set_Brand_Clear, ChangeMclData, changeBrandData, mclData, Shelf_Submit_Reset, Set_Refresh, refresh, StateReset_Forshelf } = useContext(StoreContext)
    const [networkStatus, setNetworkStatus] = useState()
    const [shelfId, setShelfId] = useState()
    const [spinners, setSpinners] = useState(false)
    // console.log(Shelf_Submit_Reset, 'shelf submit')
    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    console.log(post_criteria_data, 'brand', post_data1, 'brand post')
    useEffect(() => {
        db.transaction((tx) => {
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
            tx.executeSql(
                'SELECT * FROM post_criteria_data',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'criteria data usueffect')
                    Set_post_criteria_data(temp);
                }
            );
            tx.executeSql(
                'SELECT * FROM shelf_sample_images',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    ChangeSampleImage(temp)
                }
            );
            tx.executeSql(
                'SELECT * FROM post_data1',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'post data')
                    Set_post_data1(temp);
                }
            );

        });

        changeOrientation()


    }, [])
    // console.log(brand, brandPost)
    NetInfo.fetch().then(state => {
        setNetworkStatus(state.isConnected)
    })
    const numberOfData = orientation == "POTRAIT" ? 5 : 5
    const listKey = orientation == "POTRAIT" ? "_" : "#"
    // console.log(post_data1.length != 0 ? post_data1.filter(x => x.store_id == SelectedStoreData.id).length : null, 'post data')
    const checkshelf = (shelf_id) => {
        // console.log(post_criteria_data.length, post_criteria_data, post_criteria_data.some((x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id))
        if (post_criteria_data.length != 0) {
            return post_criteria_data.some((x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id) && (post_criteria_data.filter((x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id)).length >= parameter_creteria.length + mclData.length
            //.length === parameter_creteria.length

        } else {
            return false
        }
    }
    const partialcheck = (shelf_id) => {
        if (post_criteria_data.length != 0) {
            return post_criteria_data.some((x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id)
        } else {
            return false
        }
    }

    const checkdisable = (shelf_id) => {
        return shelf_completed.some((x) => x.shelf_id == shelf_id && x.store_id == SelectedStoreData.id)
    }
    console.log(partialcheck, selectedShelfid)
    const GradientBtn = ({ name, id }) => (
        <LinearGradient colors={checkdisable(id) ? ['#94c612', '#75a100'] : selectedShelfid == id ? ['#0296d7', '#1876b5'] :
            // checkshelf(id) ? ['yellow', 'yellow'] :
            partialcheck(id) ? ['yellow', 'yellow'] :
                ['white', 'white']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={orientation == "POTRAIT" ? styles.gradientPotr : styles.gradientLand}
        >
            <Text style={[checkdisable(id) ? styles.selectedShelf :
                // checkshelf(id) ? styles.normalShelf :
                partialcheck(id) ? styles.normalShelf :
                    selectedShelfid == id ? styles.selectedShelf : styles.normalShelf]}>{name}</Text>
        </LinearGradient>
    )
    const storeShelfData = (item) => {

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM mcl_list',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'temp store');
                    console.log(temp.filter((e) => e.store_id == SelectedStoreData.id && e.shelf_id == item.id), 'temp filter')
                    ChangeMclData(temp.filter((e) => e.store_id == SelectedStoreData.id && e.shelf_id == item.id))
                }
            );
            tx.executeSql(
                'SELECT * FROM brand_list',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'temp store');
                    changeBrandData(temp.filter((e) => e.store_id == SelectedStoreData.id && e.shelf_id == item.id))
                    // console.log(temp.filter((e) => e.store_id == id), 'brand data')
                }
            );
            tx.executeSql(
                'SELECT * FROM post_criteria_data',
                [],
                (tx, results) => {
                    // console.log(results)
                    var temp = [];
                    // console.log('shelf data')
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    Set_post_criteria_data(temp);
                    tx.executeSql(
                        'SELECT * FROM post_data1',
                        [],
                        (tx, results2) => {
                            var temp2 = [];

                            for (let i = 0; i < results2.rows.length; ++i)
                                temp2.push(results2.rows.item(i));
                            // console.log(temp, 'post data')
                            Set_post_data1(temp2);
                            let filtered_postdata1 = temp2.filter(e => e.shelf_id == item.id && e.store_id == SelectedStoreData.id)
                            // console.log(
                            //     temp2,
                            //     'before if')
                            // console.log(brand, 'brand db')
                            if (filtered_postdata1.length != 0) {
                                // console.log('if')
                                let sampleImag = [];
                                let ImageData = filtered_postdata1.map((e) => {
                                    return {
                                        'uri': e.imageuri,
                                        'data': e.imagedata,
                                        'type': e.imagetype,
                                        'fileSize': e.fileSize
                                    }
                                })
                                console.log(ImageData)
                                for (let i = 0; i < 4 - filtered_postdata1.length; ++i) {
                                    sampleImag.push({ id: i, type: "image" })
                                }
                                // console.log([...sampleImag, ...ImageData])
                                ChangeImageUpload([...ImageData, ...sampleImag])
                                ChangeImageCaptured([...ImageData, ...sampleImag])
                                changeCriterialPost(
                                    post_criteria_data.filter(e5 => e5.shelf_id == item.id && e5.store_id == SelectedStoreData.id).map((e) => {
                                        return {
                                            "feedback": e.feedback,
                                            "id": e.criteria_id,
                                            "yesorno": e.criteriayn
                                        }
                                    })
                                )
                                Set_Brand_Clear(brand.filter(e5 => e5.shelf_id == item.id && e5.store_id == SelectedStoreData.id).map((e) => {
                                    return {
                                        "id": e.brand_id,
                                        "no_of_brands": e.no_of_brands
                                    }
                                }))
                            }
                            else {
                                ChangeImageUpload([{ id: 1, type: "image" },
                                { id: 2, type: "image" },
                                { id: 3, type: "image" },
                                { id: 4, type: "image" }
                                ])
                                changeCriterialPost([])
                                ChangeImageCaptured([])
                                Set_Brand_Clear([])
                                // SetSelectedShelf(item.shelf_name, item.id)
                                // setShelfId(item.id)

                            }

                            SetSelectedShelf(item.shelf_name, item.id)
                            setShelfId(item.id)
                        });

                }
            );

        })

    }
    const pictureFolder = RNFetchBlob.fs.dirs.SDCardDir + `/${SelectedStoreData.label}/`;
    function onChangeShelf(item) {
        if (selectedShelfid != item.id && selectedShelfid != null && !checkshelf(selectedShelfid) &&
            !partialcheck(selectedShelfid) && imageCaptured.length != 0) {
            Alert.alert(
                "Would you like to change the current shelf ?",
                "Please note that if you change the current shelf, your shelf details will be deleted.",
                [
                    {
                        text: "NO",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "YES", onPress: () => {
                            RNFS.unlink(pictureFolder)
                                .then((res) => {
                                    console.log(res, 'directory created')
                                })
                                .catch(err => {
                                    console.log('remove error', err);
                                    // reject(err);
                                });
                            db.transaction((tx) => {
                                tx.executeSql('DELETE FROM post_data1  where store_id=? AND shelf_id=?',
                                    [SelectedStoreData.id, selectedShelfid],
                                    (tx, postdelete) => {
                                        if (postdelete.rowsAffected > 0) {
                                            tx.executeSql('DELETE FROM post_criteria_data  where store_id=? AND shelf_id=?',
                                                [SelectedStoreData.id, selectedShelfid],
                                                (tx, postdelete2) => {
                                                    // console.log(postdelete2, 'postdelete2')
                                                    StateReset_Forshelf()
                                                });
                                            tx.executeSql('DELETE FROM brand_post_data  where store_id=? AND shelf_id=?',
                                                [SelectedStoreData.id, selectedShelfid],
                                                (tx, postdelete2) => {
                                                    // console.log(postdelete2, 'postdelete2')
                                                    StateReset_Forshelf()
                                                });
                                        }

                                    });

                            });
                            SetSelectedShelf(item.shelf_name, item.id)
                            setShelfId(item.id)
                            storeShelfData(item)
                        }
                    }
                ]
            );
        }
        else if (selectedShelfid != item.id) {
            SetSelectedShelf(item.shelf_name, item.id)
            setShelfId(item.id)
            storeShelfData(item)
        }

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
    // console.log(post_data1, 'criteria data')
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

    const saveandnext = () => {
        // console.log('resulsaveandnextts')
        // const pictureFolder = RNFetchBlob.fs.dirs.SDCardDir + `/${SelectedStoreData.label}/`;
        // console.log(pictureFolder, 'picture folder')
        // RNFetchBlob.fs.mkdir(pictureFolder).then(() => {
        //     console.log('DIRECTORY CREATED');
        // }).catch((e) => { alert("Directory Creating Error : " + e.message); });
        db.transaction(function (txn) {

            txn.executeSql(
                "SELECT * FROM selected_store_shelf",
                [],
                (tx, results) => {
                    // console.log(results, 'results')
                    if (results.rows.length > 0) {
                        txn.executeSql('UPDATE selected_store_shelf set shelf_id=?, shelf_cmd =? ',
                            [selectedShelfid, shelf_commands[selectedShelfid]],
                            (tx, result2) => {
                                if (result2.rowsAffected > 0) {
                                    navigation.navigate('Photos')
                                }
                            }
                        )
                    } else {
                        txn.executeSql(
                            'INSERT INTO selected_store_shelf (shelf_id,shelf_cmd) VALUES (?,?)', //Query to execute as prepared statement
                            [selectedShelfid, shelf_commands[selectedShelfid]],  //Argument to pass for the prepared statement                  
                            (tx, results) => {
                                if (results.rowsAffected > 0) {
                                    navigation.navigate('Photos')
                                }
                            } //Callback function to handle the result
                        );
                    }
                }
            );
        });
    }
    // NetInfo.fetch().then(isConnected => {
    //     console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    // });
    // function handleFirstConnectivityChange(isConnected) {
    //     console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
    //     NetInfo.removeEventListener(
    //         'connectionChange',
    //         handleFirstConnectivityChange
    //     );
    // }
    // NetInfo.addEventListener(
    //     'connectionChange',
    //     handleFirstConnectivityChange
    // );
    console.log(SelectedStoreData.id, 'post data')
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
                                        console.log(Postfeedback, 'PostFeedback ')
                                        console.log(PostYN, 'PostYN ')
                                        console.log(PostCriteriaId, 'PostCriteriaId ')
                                        console.log(PostImg, 'PostImg ')
                                        console.log(PostshelfId, 'PostshelfId post')
                                        console.log(PostShelffeedback, 'PostShelffeedback')
                                        // console.log(shelf_commands, 'shelf commands')
                                        console.log(PostImg, 'UserDeatails')
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
                                        console.log('data inserted successfully in the database', data)
                                        axios.post('http://sddigitalcommunication.com/demo/shopology/api-v1.php', data)
                                            .then((res) => {
                                                let response = res.data;
                                                console.log(response, 'response');
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
                                                            })
                                                        })
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
                                                                                [SelectedStoreData.id],  //Argument to pass for the prepared statement                  
                                                                                (tx, results) => {
                                                                                    if (results.rowsAffected > 0) {
                                                                                        // navigation.navigate('Shelf')
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
                                                                                    [SelectedStoreData.id],
                                                                                    (tx, result2) => {
                                                                                        // if (result2.rowsAffected > 0) {
                                                                                        //     // navigation.navigate('Shelf')
                                                                                        // }
                                                                                    }
                                                                                )
                                                                            } else {
                                                                                txn.executeSql(
                                                                                    'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
                                                                                    [SelectedStoreData.id],  //Argument to pass for the prepared statement                  
                                                                                    (tx, results) => {
                                                                                        // if (results.rowsAffected > 0) {
                                                                                        //     navigation.navigate('Shelf')
                                                                                        // }
                                                                                    } //Callback function to handle the result
                                                                                );
                                                                            }
                                                                        }
                                                                    );

                                                                }
                                                            }
                                                        )
                                                        let keyvalue = Object.keys(response.completed_shelf)
                                                        keyvalue.map((x) => {
                                                            let colcount = 0;
                                                            rowcount += 1;
                                                            let rowdata = response.completed_shelf[x]
                                                            rowdata.map((s) => {
                                                                colcount += 1;
                                                                txn.executeSql(
                                                                    'INSERT INTO shelf_completed (store_id,shelf_id) VALUES (?,?)',
                                                                    [x, s],

                                                                )
                                                            })

                                                        })
                                                    })
                                                    db.transaction(function (txn) {
                                                        tx.executeSql(
                                                            'SELECT * FROM completed_store',
                                                            [],
                                                            (tx, results) => {
                                                                var temp = [];
                                                                for (let i = 0; i < results.rows.length; ++i)
                                                                    temp.push(results.rows.item(i));
                                                                Set_CompletedStores(temp)
                                                            }
                                                        );
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
                                                                        StateReset_Forshelf()
                                                                        navigation.navigate('StoreScreen')
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
                                            .catch((e) => console.log(e, 'error'))
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
    console.log(imageCaptured.length == 0,
        criterial_post.length == 0,
        selectedShelfid != null,
        post_criteria_data.length == 0, selectedShelfid, selectedShelfid == null, post_criteria_data.length == 0)
    return (
        <>
            <Spinner loading={shelfMain.length == 0 || spinners} />
            <LinearGradient colors={['#16529a', '#0c9ddc', '#007cc6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerStyle}>
                {imageCaptured.length == 0 && criterial_post.length == 0 && selectedShelfid != null && post_criteria_data.length == 0
                    ||
                    selectedShelfid == null && post_criteria_data.length == 0
                    ?
                    <FontAwesome5 name="arrow-left"
                        // disabled={selectedShelfid != null}
                        style={styles.headerIcon}
                        onPress={() => { navigation.goBack() }} color="white" size={22} />
                    :
                    null
                }

                {imageCaptured.length == 0 && criterial_post.length == 0 && selectedShelfid != null && post_criteria_data.length == 0
                    ||
                    selectedShelfid == null && post_criteria_data.length == 0
                    ?
                    <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>{common_data.length != 0 ? common_data[0].shelf_header : null} - {SelectedStoreData.label}</Text>
                    :
                    <Text style={orientation == "POTRAIT" ? styles.hideHeaderTextPotr : styles.hideHeaderTextLand}>{common_data.length != 0 ? common_data[0].shelf_header : null} - {SelectedStoreData.label}

                        {/* - {SelectedStoreData} */}
                    </Text>
                }
                <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                />
                <Entypo name="log-out" style={styles.headerLogout} onPress={() => { Logout() }} color="#a2d401" size={29} />
            </LinearGradient>
            {
                shelfMain.length != 0 ?
                    <LinearGradient colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} style={styles.bgStyle}>
                        <StatusBar
                            backgroundColor='#004987' />
                        <ScrollView >

                            <View style={styles.submitRow}>

                                <Text style={styles.boxInstructionStyle}>
                                    {common_data.length != 0 ? common_data[0].shelf_instructions : null}
                                </Text>
                                <TouchableOpacity
                                    disabled={post_criteria_data.length == 0 && imageCaptured == 0}
                                    style={orientation == "POTRAIT" ? styles.nextBtnPotraitSubmit : styles.nextBtnLandscapeSubmit} activeOpacity={0.7}
                                    onPress={() => { Uploaddata('submit') }}
                                >
                                    <LinearGradient
                                        colors={
                                            post_criteria_data.length == 0 && imageCaptured == 0 ?
                                                ['grey', 'grey']
                                                : ['#82bc12', '#61910a']
                                        }

                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }} style={orientation == "POTRAIT" ? styles.nextBtnPotraitSubmit : styles.nextBtnLandscapeSubmit} >
                                        <Text style={styles.nextText} >{common_data.length != 0 ? common_data[0].Submit : null}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>


                            {
                                shelfMain.length != 0 ?


                                    <View style={orientation == "POTRAIT" ? styles.storesPotr : styles.storesLand}>
                                        <Text style={styles.storeTitle}><FontAwesome5 size={20} name="boxes" color="#0cb2dc" />&nbsp; &nbsp;
                                            {shelfMain.length != 0 ? shelfMain[0].shelf_type_name : null}
                                        </Text>
                                        <View style={styles.secondBg}>
                                            {
                                                shelfMain
                                                    //data
                                                    .map((item) => (
                                                        <View style={styles.container}>
                                                            <TouchableOpacity activeOpacity={0.7}
                                                                disabled={checkdisable(item.id)}
                                                                style={orientation == "POTRAIT" ? [styles.wrapperPotr,
                                                                checkshelf(item.id) ? styles.alreadySelectedBorder : selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder] :
                                                                    [styles.wrapperLand,
                                                                    checkshelf(item.id) ? styles.alreadySelectedBorder :
                                                                        selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder]}
                                                                onPress={() => { onChangeShelf(item) }}>
                                                                <GradientBtn name={item.shelf_name} id={item.id} />
                                                            </TouchableOpacity>

                                                            {/* <Text style={orientation == "POTRAIT" ? styles.storeTextPotrait : styles.storeTextLandscape}>{item.name}</Text> */}
                                                            <TextInput style={orientation == "POTRAIT" ? styles.shelfTextinputPotrait : styles.shelfTextinputLandscape}
                                                                placeholder="FREE COMMENTS ( Max 256 Chars )"
                                                                maxLength={256}
                                                                editable={!checkdisable(item.id)}
                                                                multiline
                                                                numberOfLines={orientation == "POTRAIT" ? 2 : 2}
                                                                value={shelf_commands.id == (item.id).length != 0 ?
                                                                    shelf_commands.shelf_cmd : null}
                                                                onChangeText={(u) => {
                                                                    Set_shelf_commands(item.id, u)

                                                                }}
                                                            // multiline={true}
                                                            // numberOfLines={2}
                                                            // maxLines={3}
                                                            />
                                                        </View>
                                                    ))
                                            }
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            {
                                shelfSecondary.length != 0 ?


                                    <View style={orientation == "POTRAIT" ? styles.storesPotr : styles.storesLand}>
                                        <Text style={styles.storeTitle}><FontAwesome5 size={20} name="boxes" color="#0cb2dc" />&nbsp; &nbsp;{shelfSecondary.length != 0 ? shelfSecondary[0].shelf_type_name : null}</Text>
                                        <View style={styles.secondBg}>
                                            {
                                                shelfSecondary.map((item) => (
                                                    <View style={styles.container}>
                                                        <TouchableOpacity activeOpacity={0.7}
                                                            disabled={checkdisable(item.id)}
                                                            style={orientation == "POTRAIT" ? [styles.wrapperPotr,
                                                            checkshelf(item.id) ? styles.alreadySelectedBorder : selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder] :
                                                                [styles.wrapperLand,
                                                                checkshelf(item.id) ? styles.alreadySelectedBorder :
                                                                    selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder]}
                                                            onPress={() => { onChangeShelf(item) }}>
                                                            <GradientBtn name={item.shelf_name} id={item.id} />
                                                        </TouchableOpacity>
                                                        {/* <Text style={orientation == "POTRAIT" ? styles.storeTextPotrait : styles.storeTextLandscape}>{item.name}</Text> */}
                                                        <TextInput style={orientation == "POTRAIT" ? styles.shelfTextinputPotrait : styles.shelfTextinputLandscape}
                                                            placeholder="FREE COMMENTS ( Max 256 Chars )"
                                                            maxLength={256}
                                                            editable={!checkdisable(item.id)}
                                                            multiline
                                                            // maxFontSizeMultiplier={2}
                                                            numberOfLines={orientation == "POTRAIT" ? 2 : 2}

                                                            value={shelf_commands.id == (item.id).length != 0 ?
                                                                shelf_commands.shelf_cmd : null}
                                                            onChangeText={(u) => Set_shelf_commands(item.id, u)}
                                                        // multiline={true}
                                                        // numberOfLines={2}
                                                        />
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    </View>
                                    :
                                    null
                            }

                        </ScrollView>
                        <TouchableOpacity disabled={selectedShelfid == null} style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} activeOpacity={0.7}
                            onPress={() => { saveandnext() }}
                        >
                            <LinearGradient colors={selectedShelfid != null ? ['#82bc12', '#61910a'] : ['grey', 'grey']}

                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }} style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} >

                                <Text style={styles.nextText} >{common_data.length != 0 ? common_data[0].Next : null}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>
                    :
                    null
            }
        </>
    )
}

export default Shelf