import React, { useEffect, useState, useContext } from 'react'
// import styles from '../css/ShelfStyle'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StoreContext from '../store/StoreContext';


function Shelf({ navigation }) {
    const { orientation, changeOrientation, shelfMain, shelfSecondary, ChangeShelfMain, post_criteria_data,
        selectedShelfid, shelf_commands, Set_Logined, Logined, ChangeShelfSecondary, Set_post_criteria_data,
        SelectedStoreData, common_data, selectedShelf, SetSelectedShelf, Set_post_data1, post_data1,
        Set_shelf_commands, ChangeSampleImage, parameter_creteria, Set_criterial_post, criterial_post,
        changeCriterialPost, ChangeImageUpload, Set_shelf_completed, ChangeImageCaptured, shelf_completed,
        Reset_for_logout, imageCaptured, shelfLength, SetShelfLength, Set_Brand_Post,
        brandPost, Set_Brand, brand, Set_Brand_Clear, ChangeMclData, changeBrandData, mclData,
        Shelf_Submit_Reset, Set_Refresh, refresh, StateReset_Forshelf, overallMclData, overallBrandData, shelfData } = useContext(StoreContext)
    const [networkStatus, setNetworkStatus] = useState()
    const [shelfId, setShelfId] = useState()
    let navigate = useNavigate();

    useEffect(() => {
        console.log(SelectedStoreData.id, 'shelf data')
        // db.transaction((tx) => {
        //     tx.executeSql(
        //         'SELECT * FROM brand_post_data',
        //         [],
        //         (tx, results) => {
        //             var temp = [];
        //             for (let i = 0; i < results.rows.length; ++i)
        //                 temp.push(results.rows.item(i));
        //             Set_Brand(temp);
        //         }
        //     );
        //     tx.executeSql(
        //         'SELECT * FROM post_criteria_data',
        //         [],
        //         (tx, results) => {
        //             var temp = [];
        //             for (let i = 0; i < results.rows.length; ++i)
        //                 temp.push(results.rows.item(i));
        //             // console.log(temp, 'criteria data usueffect')
        //             Set_post_criteria_data(temp);
        //         }
        //     );
        //     tx.executeSql(
        //         'SELECT * FROM post_data1',
        //         [],
        //         (tx, results) => {
        //             var temp = [];
        //             for (let i = 0; i < results.rows.length; ++i)
        //                 temp.push(results.rows.item(i));
        //             // console.log(temp, 'post data')
        //             Set_post_data1(temp);
        //         }
        //     );

        // });
    }, [])
    // console.log(brand, brandPost)

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
        <label
            // className={checkdisable(id) ? ['#94c612', '#75a100'] : selectedShelfid == id ? ['#0296d7', '#1876b5'] :
            //     partialcheck(id) ? ['yellow', 'yellow'] :
            //         ['white', 'white']}
            //     start={{ x: 0, y: 0 }}
            //     end={{ x: 1, y: 1 }}
            className='gradientLand'
        >
            <label
            // className={[checkdisable(id) ? styles.selectedShelf :
            //     partialcheck(id) ? styles.normalShelf :
            //         selectedShelfid == id ? styles.selectedShelf : styles.normalShelf]}
            >{name}</label>
        </label>
    )
    const storeShelfData = (item) => {



        ChangeMclData(overallMclData.filter((e) => e.store_id == SelectedStoreData.id && e.shelf_id == item.id))

        changeBrandData(overallBrandData.filter((e) => e.store_id == SelectedStoreData.id && e.shelf_id == item.id))

        //     tx.executeSql(
        //         'SELECT * FROM post_criteria_data',
        //         [],
        //         (tx, results) => {
        //             // console.log(results)
        //             var temp = [];
        //             // console.log('shelf data')
        //             for (let i = 0; i < results.rows.length; ++i)
        //                 temp.push(results.rows.item(i));
        //             Set_post_criteria_data(temp);
        //             tx.executeSql(
        //                 'SELECT * FROM post_data1',
        //                 [],
        //                 (tx, results2) => {
        //                     var temp2 = [];

        //                     for (let i = 0; i < results2.rows.length; ++i)
        //                         temp2.push(results2.rows.item(i));
        //                     // console.log(temp, 'post data')
        //                     Set_post_data1(temp2);
        //                     let filtered_postdata1 = temp2.filter(e => e.shelf_id == item.id && e.store_id == SelectedStoreData.id)
        //                     // console.log(
        //                     //     temp2,
        //                     //     'before if')
        //                     // console.log(brand, 'brand db')
        //                     if (filtered_postdata1.length != 0) {
        //                         // console.log('if')
        //                         let sampleImag = [];
        //                         let ImageData = filtered_postdata1.map((e) => {
        //                             return {
        //                                 'uri': e.imageuri,
        //                                 'data': e.imagedata,
        //                                 'type': e.imagetype,
        //                                 'fileSize': e.fileSize
        //                             }
        //                         })
        //                         console.log(ImageData)
        //                         for (let i = 0; i < 4 - filtered_postdata1.length; ++i) {
        //                             sampleImag.push({ id: i, type: "image" })
        //                         }
        //                         // console.log([...sampleImag, ...ImageData])
        //                         ChangeImageUpload([...ImageData, ...sampleImag])
        //                         ChangeImageCaptured([...ImageData, ...sampleImag])
        //                         changeCriterialPost(
        //                             post_criteria_data.filter(e5 => e5.shelf_id == item.id && e5.store_id == SelectedStoreData.id).map((e) => {
        //                                 return {
        //                                     "feedback": e.feedback,
        //                                     "id": e.criteria_id,
        //                                     "yesorno": e.criteriayn
        //                                 }
        //                             })
        //                         )
        //                         Set_Brand_Clear(brand.filter(e5 => e5.shelf_id == item.id && e5.store_id == SelectedStoreData.id).map((e) => {
        //                             return {
        //                                 "id": e.brand_id,
        //                                 "no_of_brands": e.no_of_brands
        //                             }
        //                         }))
        //                     }
        //                     else {
        //                         ChangeImageUpload([{ id: 1, type: "image" },
        //                         { id: 2, type: "image" },
        //                         { id: 3, type: "image" },
        //                         { id: 4, type: "image" }
        //                         ])
        //                         changeCriterialPost([])
        //                         ChangeImageCaptured([])
        //                         Set_Brand_Clear([])
        //                         // SetSelectedShelf(item.shelf_name, item.id)
        //                         // setShelfId(item.id)

        //                     }

        //                     SetSelectedShelf(item.shelf_name, item.id)
        //                     setShelfId(item.id)
        //                 });

        //         }
        //     );

        // })

    }

    function onChangeShelf(item) {
        if (selectedShelfid != item.id && selectedShelfid != null && !checkshelf(selectedShelfid) &&
            !partialcheck(selectedShelfid) && imageCaptured.length != 0) {
            // Alert.alert(
            //     "Would you like to change the current shelf ?",
            //     "Please note that if you change the current shelf, your shelf details will be deleted.",
            //     [
            //         {
            //             text: "NO",
            //             onPress: () => console.log("Cancel Pressed"),
            //             style: "cancel"
            //         },
            //         {
            //             text: "YES", onPress: () => {

            //                 db.transaction((tx) => {
            //                     tx.executeSql('DELETE FROM post_data1  where store_id=? AND shelf_id=?',
            //                         [SelectedStoreData.id, selectedShelfid],
            //                         (tx, postdelete) => {
            //                             if (postdelete.rowsAffected > 0) {
            //                                 tx.executeSql('DELETE FROM post_criteria_data  where store_id=? AND shelf_id=?',
            //                                     [SelectedStoreData.id, selectedShelfid],
            //                                     (tx, postdelete2) => {
            //                                         // console.log(postdelete2, 'postdelete2')
            //                                         StateReset_Forshelf()
            //                                     });
            //                                 tx.executeSql('DELETE FROM brand_post_data  where store_id=? AND shelf_id=?',
            //                                     [SelectedStoreData.id, selectedShelfid],
            //                                     (tx, postdelete2) => {
            //                                         // console.log(postdelete2, 'postdelete2')
            //                                         StateReset_Forshelf()
            //                                     });
            //                             }

            //                         });

            //                 });
            //                 SetSelectedShelf(item.shelf_name, item.id)
            //                 setShelfId(item.id)
            //                 storeShelfData(item)
            //             }
            //         }
            //     ]
            // );
        }
        else if (selectedShelfid != item.id) {
            SetSelectedShelf(item.shelf_name, item.id)
            setShelfId(item.id)
            storeShelfData(item)
        }

    }

    function deleteTables() {

        Reset_for_logout()
        // navigate.push('Login')
    }
    // console.log(post_data1, 'criteria data')
    function Logout() {

        // Alert.alert(
        //     "Do you want to logout?",
        //     imageCaptured.length != 0 || criterial_post.length != 0 || post_criteria_data.length != 0 ?
        //         "Please note that if you logout, your store and shelf details will be deleted." :
        //         "",
        //     [
        //         {
        //             text: "NO",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel"
        //         },
        //         {
        //             text: "YES", onPress: () => {
        //                 deleteTables()
        //             }
        //         }
        //     ]
        // );


    }

    const saveandnext = () => {
        navigate('/photos')
        // db.transaction(function (txn) {

        //     txn.executeSql(
        //         "SELECT * FROM selected_store_shelf",
        //         [],
        //         (tx, results) => {
        //             // console.log(results, 'results')
        //             if (results.rows.length > 0) {
        //                 txn.executeSql('UPDATE selected_store_shelf set shelf_id=?, shelf_cmd =? ',
        //                     [selectedShelfid, shelf_commands[selectedShelfid]],
        //                     (tx, result2) => {
        //                         if (result2.rowsAffected > 0) {
        //                             navigation.navigate('Photos')
        //                         }
        //                     }
        //                 )
        //             } else {
        //                 txn.executeSql(
        //                     'INSERT INTO selected_store_shelf (shelf_id,shelf_cmd) VALUES (?,?)', //Query to execute as prepared statement
        //                     [selectedShelfid, shelf_commands[selectedShelfid]],  //Argument to pass for the prepared statement                  
        //                     (tx, results) => {
        //                         if (results.rowsAffected > 0) {
        //                             navigation.navigate('Photos')
        //                         }
        //                     } //Callback function to handle the result
        //                 );
        //             }
        //         }
        //     );
        // });
    }


    const Uploaddata = () => {
        // Alert.alert(
        //     "Are you sure to submit?",
        //     "",
        //     [
        //         {
        //             text: "Cancel",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel"
        //         },
        //         {
        //             text: "Submit", onPress: () => {
        //                 setSpinners(true)
        //                 var ct_feedback = [];
        //                 var Postfeedback = {};
        //                 var PostYN = {};
        //                 var PostCriteriaId = {};
        //                 var PostImg = {};
        //                 var PostShelffeedback = {};
        //                 var PostshelfId = {};
        //                 var PostNoOfBrands = {};
        //                 var PostBrandId = {};
        //                 let UserDeatails = {};

        //                 console.log('www')
        //                 db.transaction((tx) => {
        //                     tx.executeSql(
        //                         'SELECT DISTINCT shelf_id FROM post_criteria_data;',
        //                         [],
        //                         (tx, results) => {
        //                             var shelfid = {};
        //                             var temp = [];
        //                             console.log('www')
        //                             for (let i = 0; i < results.rows.length; ++i) {
        //                                 temp.push(results.rows.item(i));
        //                                 // feedback.push(results.rows.item(i).feedback); 
        //                                 PostshelfId = { ...PostshelfId, [i]: results.rows.item(i).shelf_id };
        //                             }
        //                             temp.map((x, c) => {
        //                                 tx.executeSql(
        //                                     'SELECT shelf_id,criteria_id,feedback,criteriayn FROM post_criteria_data WHERE shelf_id=?',
        //                                     [x.shelf_id],
        //                                     (tx, results) => {
        //                                         var feedtemp = [];
        //                                         var yntemp = [];
        //                                         var idtemp = [];
        //                                         for (let i = 0; i <
        //                                             results.rows.length; ++i) {
        //                                             yntemp = { ...yntemp, [results.rows.item(i).criteria_id]: results.rows.item(i).criteriayn };
        //                                             feedtemp = { ...feedtemp, [results.rows.item(i).criteria_id]: results.rows.item(i).feedback };
        //                                             idtemp = { ...idtemp, [i]: results.rows.item(i).criteria_id }
        //                                         }
        //                                         Postfeedback = { ...Postfeedback, [x.shelf_id]: feedtemp }
        //                                         PostYN = { ...PostYN, [x.shelf_id]: yntemp }
        //                                         PostCriteriaId = { ...PostCriteriaId, [x.shelf_id]: idtemp }

        //                                     }
        //                                 );
        //                                 tx.executeSql(
        //                                     'SELECT shelf_id, brand_id,no_of_brands FROM brand_post_data WHERE shelf_id=?',
        //                                     [x.shelf_id],
        //                                     (tx, results) => {
        //                                         var brandvaluestemp = [];
        //                                         var brandidtemp = [];
        //                                         for (let i = 0; i <
        //                                             results.rows.length; ++i) {
        //                                             brandvaluestemp = { ...brandvaluestemp, [results.rows.item(i).brand_id]: results.rows.item(i).no_of_brands };
        //                                             brandidtemp = { ...brandidtemp, [i]: results.rows.item(i).brand_id }
        //                                         }
        //                                         PostNoOfBrands = { ...PostNoOfBrands, [x.shelf_id]: brandvaluestemp }
        //                                         PostBrandId = { ...PostBrandId, [x.shelf_id]: brandidtemp }

        //                                     }
        //                                 );
        //                                 tx.executeSql(
        //                                     'SELECT shelf_cmd,shelf_id,imagedata,imagetype,fileSize FROM post_data1 WHERE shelf_id=?',
        //                                     [x.shelf_id],
        //                                     (tx, imsresults) => {
        //                                         var imgtemp = {};
        //                                         for (let i = 0; i < imsresults.rows.length; ++i) {
        //                                             imgtemp = { ...imgtemp, [i]: imsresults.rows.item(i).imagedata };
        //                                         }
        //                                         PostImg = { ...PostImg, [x.shelf_id]: imgtemp };
        //                                         // console.log(PostImg, 'post img')
        //                                     }
        //                                 );
        //                                 tx.executeSql(
        //                                     'SELECT * FROM user_details;',
        //                                     [],
        //                                     (tx, userdetails) => {
        //                                         for (let i = 0; i < userdetails.rows.length; ++i) {
        //                                             UserDeatails = userdetails.rows.item(0).id
        //                                         }

        //                                     }
        //                                 );
        //                                 tx.executeSql(
        //                                     'SELECT DISTINCT shelf_cmd FROM post_data1;',
        //                                     [],
        //                                     (tx, shelffeed) => {
        //                                         var Shelffeedback = [];
        //                                         for (let i = 0; i < shelffeed.rows.length; ++i) {
        //                                             Shelffeedback = { ...Shelffeedback, [i]: shelffeed.rows.item(i).shelf_cmd == null ? "" : shelffeed.rows.item(i).shelf_cmd };
        //                                         }
        //                                         PostShelffeedback = { ...PostShelffeedback, [c]: Shelffeedback[c] == undefined ? null : Shelffeedback[c] }
        //                                         if (temp.length == c + 1) {
        //                                             post();
        //                                         }

        //                                     }
        //                                 );





        //                             })



        //                         });
        //                     function post() {
        //                         console.log(Postfeedback, 'PostFeedback ')
        //                         console.log(PostYN, 'PostYN ')
        //                         console.log(PostCriteriaId, 'PostCriteriaId ')
        //                         console.log(PostImg, 'PostImg ')
        //                         console.log(PostshelfId, 'PostshelfId post')
        //                         console.log(PostShelffeedback, 'PostShelffeedback')
        //                         // console.log(shelf_commands, 'shelf commands')
        //                         console.log(PostImg, 'UserDeatails')
        //                         console.log(PostNoOfBrands, 'no of brands')
        //                         console.log(PostBrandId, 'brand id')
        //                         const data = new FormData();
        //                         data.append("accesskey", 90336);
        //                         data.append("store_id", SelectedStoreData.id);
        //                         data.append("store", 1);
        //                         data.append("emp_id", UserDeatails);
        //                         data.append("shelf_id", JSON.stringify(PostshelfId));//
        //                         data.append("feedback", JSON.stringify(PostShelffeedback));
        //                         data.append("capture_image", JSON.stringify(PostImg)); //
        //                         data.append("criteria", JSON.stringify(PostCriteriaId)); //
        //                         data.append("ct_feedback", JSON.stringify(Postfeedback)); //
        //                         data.append("criteria", JSON.stringify(PostCriteriaId)); //
        //                         // data.append("ct_feedback", JSON.stringify(Postfeedback)); //
        //                         data.append("brand_list", JSON.stringify(PostBrandId)); //
        //                         data.append("brand_value", JSON.stringify(PostNoOfBrands)); //
        //                         data.append("c_status", JSON.stringify(PostYN));//  
        //                         console.log('data inserted successfully in the database', data)
        //                         axios.post('http://sddigitalcommunication.com/demo/shopology/api-v1.php', data)
        //                             .then((res) => {
        //                                 let response = res.data;
        //                                 console.log(response, 'response');
        //                                 if (response.message === 'success') {
        //                                     db.transaction(function (txn) {
        //                                         let rowcount = 0;
        //                                         let completeddata = [];
        //                                         txn.executeSql('DELETE FROM selected_store_shelf', []);
        //                                         txn.executeSql('DELETE FROM post_data1', []);
        //                                         txn.executeSql('DELETE FROM post_criteria_data', []);
        //                                         txn.executeSql('DELETE FROM shelf_completed', []);
        //                                         txn.executeSql('DELETE FROM brand_post_data', []);
        //                                         db.transaction(function (txn) {
        //                                             response.completed_store_only.map((x) => {
        //                                                 txn.executeSql(
        //                                                     'INSERT INTO completed_store (store_id) VALUES (?)',
        //                                                     [x[0]],
        //                                                     (tx, results) => {
        //                                                         console.log(results, 'results')
        //                                                         if (results.rowsAffected > 0) {
        //                                                             console.log("completed_store inserted successfully")
        //                                                         }
        //                                                     }
        //                                                 )
        //                                             })
        //                                         })
        //                                         txn.executeSql(
        //                                             "SELECT name FROM sqlite_master WHERE  name='selected_store_shelf'",
        //                                             [],
        //                                             function (tx, res) {
        //                                                 if (res.rows.length == 0) {
        //                                                     txn.executeSql(
        //                                                         'CREATE TABLE IF NOT EXISTS selected_store_shelf(selected_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50))',
        //                                                         [],
        //                                                         (tx, result1) => {
        //                                                             txn.executeSql(
        //                                                                 'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
        //                                                                 [SelectedStoreData.id],  //Argument to pass for the prepared statement                  
        //                                                                 (tx, results) => {
        //                                                                     if (results.rowsAffected > 0) {
        //                                                                         // navigation.navigate('Shelf')
        //                                                                     }
        //                                                                 } //Callback function to handle the result
        //                                                             );
        //                                                         });
        //                                                 } else {
        //                                                     txn.executeSql(
        //                                                         "SELECT * FROM selected_store_shelf",
        //                                                         [],
        //                                                         (tx, results) => {
        //                                                             if (results.rows.length > 0) {
        //                                                                 var selected_id = 1
        //                                                                 txn.executeSql('UPDATE selected_store_shelf set store_id=? ',
        //                                                                     [SelectedStoreData.id],
        //                                                                     (tx, result2) => {
        //                                                                         // if (result2.rowsAffected > 0) {
        //                                                                         //     // navigation.navigate('Shelf')
        //                                                                         // }
        //                                                                     }
        //                                                                 )
        //                                                             } else {
        //                                                                 txn.executeSql(
        //                                                                     'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
        //                                                                     [SelectedStoreData.id],  //Argument to pass for the prepared statement                  
        //                                                                     (tx, results) => {
        //                                                                         // if (results.rowsAffected > 0) {
        //                                                                         //     navigation.navigate('Shelf')
        //                                                                         // }
        //                                                                     } //Callback function to handle the result
        //                                                                 );
        //                                                             }
        //                                                         }
        //                                                     );

        //                                                 }
        //                                             }
        //                                         )
        //                                         let keyvalue = Object.keys(response.completed_shelf)
        //                                         keyvalue.map((x) => {
        //                                             let colcount = 0;
        //                                             rowcount += 1;
        //                                             let rowdata = response.completed_shelf[x]
        //                                             rowdata.map((s) => {
        //                                                 colcount += 1;
        //                                                 txn.executeSql(
        //                                                     'INSERT INTO shelf_completed (store_id,shelf_id) VALUES (?,?)',
        //                                                     [x, s],

        //                                                 )
        //                                             })

        //                                         })
        //                                     })
        //                                     db.transaction(function (txn) {
        //                                         tx.executeSql(
        //                                             'SELECT * FROM completed_store',
        //                                             [],
        //                                             (tx, results) => {
        //                                                 var temp = [];
        //                                                 for (let i = 0; i < results.rows.length; ++i)
        //                                                     temp.push(results.rows.item(i));
        //                                                 Set_CompletedStores(temp)
        //                                             }
        //                                         );
        //                                     })
        //                                     setTimeout(() => {
        //                                         Alert.alert(
        //                                             "",
        //                                             "Submitted successfully",
        //                                             [
        //                                                 {
        //                                                     text: "Ok", onPress: () => {
        //                                                         setSpinners(false)
        //                                                         Set_Refresh(refresh + 1)
        //                                                         StateReset_Forshelf()
        //                                                         navigation.navigate('StoreScreen')
        //                                                         console.log("submitted data")
        //                                                     }
        //                                                 }
        //                                             ]
        //                                         )
        //                                     },
        //                                         500
        //                                     );

        //                                 }

        //                             })
        //                             .catch((e) => console.log(e, 'error'))
        //                     }



        //                 }

        //                 )
        //             }
        //         }
        //     ]
        // );
    }
    return (
        <>
            {/* <Spinner loading={shelfMain.length == 0 || spinners} /> */}
            <div
                // colors={['#16529a', '#0c9ddc', '#007cc6']}
                //     start={{ x: 0, y: 0 }}
                //     end={{ x: 1, y: 1 }}
                className='headerStyle'>
                {/* {imageCaptured.length == 0 && criterial_post.length == 0 && selectedShelfid != null && post_criteria_data.length == 0
                    ||
                    selectedShelfid == null && post_criteria_data.length == 0
                    ?
                    <label
                        className='headerIcon'
                    // onClick={() => { navigate.goBack() }} 
                    >Go Back</label>
                    :
                    null
                } */}

                {imageCaptured.length == 0 && criterial_post.length == 0 && selectedShelfid != null && post_criteria_data.length == 0
                    ||
                    selectedShelfid == null && post_criteria_data.length == 0
                    ?
                    <label className='headerTextLand'>{common_data.length != 0 ? common_data[0].shelf_header : null} - {SelectedStoreData.label}</label>
                    :
                    <label className='hideHeaderTextLand'>{common_data.length != 0 ? common_data[0].shelf_header : null} - {SelectedStoreData.label}

                        {/* - {SelectedStoreData} */}
                    </label>
                }
                {/* <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                /> */}
                <label className='headerLogout' onClick={() => { Logout() }} >Logout</label>
            </div>
            {
                shelfMain.length != 0 ?
                    <div
                        // colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']}
                        //     start={{ x: 0, y: 0 }}
                        //     end={{ x: 1, y: 1 }} 
                        className='bgStyle'
                    >

                        <div>

                            <div className='submitRow'>

                                <label className='boxInstructionStyle'>
                                    {common_data.length != 0 ? common_data[0].shelf_instructions : null}
                                </label>
                                <label
                                    disabled={post_criteria_data.length == 0 && imageCaptured == 0}
                                    className='nextBtnLandscapeSubmit'
                                    onClick={() => { Uploaddata('submit') }}
                                >
                                    <div
                                        // colors={
                                        //     post_criteria_data.length == 0 && imageCaptured == 0 ?
                                        //         ['grey', 'grey']
                                        //         : ['#82bc12', '#61910a']
                                        // }

                                        // start={{ x: 0, y: 0 }}
                                        // end={{ x: 1, y: 1 }} 
                                        className='nextBtnLandscapeSubmit' >
                                        <label className='nextText' >{common_data.length != 0 ? common_data[0].Submit : null}</label>
                                    </div>
                                </label>
                            </div>


                            {
                                shelfData.filter(x => x.store_id == SelectedStoreData.id).length != 0 ?


                                    <div className='storesLand'>
                                        <label className='storeTitle'>
                                            <label>boxes</label>&nbsp;&nbsp; &nbsp;
                                            {shelfMain.length != 0 ? shelfMain[0].shelf_type_name : null}
                                        </label>
                                        <div className='secondBg'>
                                            {
                                                shelfMain
                                                    //data
                                                    .map((item) => (
                                                        <div className='container'>
                                                            <label
                                                                disabled={checkdisable(item.id)}
                                                                // className={orientation == "POTRAIT" ? [styles.wrapperPotr,
                                                                // checkshelf(item.id) ? styles.alreadySelectedBorder : selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder] :
                                                                //     [styles.wrapperLand,
                                                                //     checkshelf(item.id) ? styles.alreadySelectedBorder :
                                                                //         selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder]}
                                                                onClick={() => { onChangeShelf(item) }}>
                                                                <GradientBtn name={item.shelf_name} id={item.id} />
                                                            </label>

                                                            {/* <Text style={orientation == "POTRAIT" ? styles.storeTextPotrait : styles.storeTextLandscape}>{item.name}</Text> */}
                                                            <input type="textInput"
                                                                className='shelfTextinputLandscape'
                                                                placeholder="FREE COMMENTS ( Max 256 Chars )"
                                                                // maxLength={256}
                                                                // editable={!checkdisable(item.id)}
                                                                multiline
                                                                numberOfLines={orientation == "POTRAIT" ? 2 : 2}
                                                                value={shelf_commands.id == (item.id).length != 0 ?
                                                                    shelf_commands.shelf_cmd : null}
                                                                onChange={(u) => {
                                                                    Set_shelf_commands(item.id, u.target.id)

                                                                }}
                                                            // multiline={true}
                                                            // numberOfLines={2}
                                                            // maxLines={3}
                                                            />
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                shelfSecondary.length != 0 ?


                                    <div className='storesLand'>
                                        <label className='storeTitle'>
                                            <label >Boxes</label>&nbsp;&nbsp; &nbsp;{shelfSecondary.length != 0 ? shelfSecondary[0].shelf_type_name : null}</label>
                                        <div className='secondBg'>
                                            {
                                                shelfSecondary.map((item) => (
                                                    <div className='container'>
                                                        <label
                                                            disabled={checkdisable(item.id)}
                                                            // className={orientation == "POTRAIT" ? [styles.wrapperPotr,
                                                            // checkshelf(item.id) ? styles.alreadySelectedBorder : selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder] :
                                                            //     [styles.wrapperLand,
                                                            //     checkshelf(item.id) ? styles.alreadySelectedBorder :
                                                            //         selectedShelfid == item.id ? styles.selectedBorder : styles.normalBorder]}
                                                            onClick={() => { onChangeShelf(item) }}>
                                                            <GradientBtn name={item.shelf_name} id={item.id} />
                                                        </label>
                                                        {/* <Text style={orientation == "POTRAIT" ? styles.storeTextPotrait : styles.storeTextLandscape}>{item.name}</Text> */}
                                                        <input type="textInput" className='shelfTextinputLandscape'
                                                            placeholder="FREE COMMENTS ( Max 256 Chars )"
                                                            // maxLength={256}
                                                            // editable={!checkdisable(item.id)}
                                                            multiline
                                                            // maxFontSizeMultiplier={2}
                                                            // numberOfLines={orientation == "POTRAIT" ? 2 : 2}

                                                            value={shelf_commands.id == (item.id).length != 0 ?
                                                                shelf_commands.shelf_cmd : null}
                                                            onChange={(u) => Set_shelf_commands(item.id, u)}
                                                        // multiline={true}
                                                        // numberOfLines={2}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    null
                            }

                        </div>
                        <label
                            // disabled={selectedShelfid == null} 
                            className='nextBtnLandscape'
                            onClick={() => { saveandnext() }}
                        >
                            <label
                                // colors={selectedShelfid != null ? ['#82bc12', '#61910a'] : ['grey', 'grey']}

                                //     start={{ x: 0, y: 0 }}
                                //     end={{ x: 1, y: 1 }} 
                                className='nextBtnLandscape' >

                                <label className='nextText' >{common_data.length != 0 ? common_data[0].Next : null}</label>
                            </label>
                        </label>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default Shelf