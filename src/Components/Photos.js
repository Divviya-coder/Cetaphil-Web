import React, { useContext, useEffect, useState } from 'react'
// import styles from '../css/PhotosStyle'
// import Spinner from './Spinner';
import moment from 'moment';
import StoreContext from '../store/StoreContext';
import { useNavigate } from 'react-router-dom';

function Photos({ navigation }) {
    const { orientation, changeOrientation, common_data, ChangeSampleImage, sampleImage, imageUpload,
        ChangeImageUpload, Set_s5_parameters, imageCaptured, ChangeImageCaptured, Reset_for_logout,
        SelectedStoreData, post_criteria_data, criterial_post, shelf_commands, selectedShelf, selectedShelfid } = useContext(StoreContext)
    console.log(selectedShelf, 'selected shelf')
    let navigate = useNavigate();
    useEffect(() => {
    }, [])
    // console.log(imageUpload, 'imageUpload')


    const selectFile = async () => {
        // imageUpload.pop()
        // if (imageCaptured.length == 4) {
        //     imageCaptured.shift()
        // }
        // let data = [{ ...response }, ...imageUpload]
        // ChangeImageUpload(data)
        // let data5 = [...imageCaptured]
        // data5.push(response)
        // ChangeImageCaptured(data5)


    }
    const removeImage = (item) => {
        // Alert.alert(
        //     "",
        //     "Are you sure to delete this image?",
        //     [
        //         {
        //             text: "NO",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel"
        //         },
        //         {
        //             text: "YES", onPress: () => {
        //                 let data = [...imageUpload]
        //                 data.splice(imageUpload.indexOf(item), 1)
        //                 console.log(data)
        //                 // data.splice(imageUpload.indexOf(item), 0, { type: "image" });
        //                 data.push({ type: "image" })
        //                 ChangeImageUpload(data)
        //                 let data5 = [...imageCaptured]
        //                 data5.splice(imageCaptured.indexOf(item), 1)
        //                 ChangeImageCaptured(data5)
        //             }
        //         }
        //     ]
        // );
    }
    const InsertImage = (id) => {
        navigate('/Pasas')
        var count = 0;
        let filteredimage = imageUpload.filter((x) => x.type != 'image');
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "SELECT name FROM sqlite_master WHERE  name='post_data1'",
        //         [],
        //         function (tx, res) {
        //             // console.log(res)
        //             if (res.rows.length == 0) {
        //                 txn.executeSql(
        //                     'CREATE TABLE IF NOT EXISTS post_data1 (post_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50),imagedata TEXT, imagetype VARCHAR(50),imageuri TEXT ,fileSize VARCHAR(50))',
        //                     [],
        //                     (tx, result1) => {
        //                         tx.executeSql(
        //                             "SELECT * FROM selected_store_shelf",
        //                             [],
        //                             (tx, results) => {
        //                                 var temp = [];
        //                                 for (let i = 0; i < results.rows.length; ++i)
        //                                     temp.push(results.rows.item(i));
        //                                 filteredimage.map((x) => {
        //                                     txn.executeSql(
        //                                         'INSERT INTO post_data1 (store_id ,shelf_id,shelf_cmd,imagedata,imagetype,imageuri,fileSize) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
        //                                         [temp[0].store_id, temp[0].shelf_id, temp[0].shelf_cmd, x.data, x.type, x.uri, x.fileSize],  //Argument to pass for the prepared statement                  
        //                                         (tx, results) => {
        //                                             count += 1;
        //                                             if (results.rowsAffected > 0) {
        //                                                 if (filteredimage.length == count) {
        //                                                     // console.log('image  insert 1')
        //                                                     navigation.navigate('Pasas')
        //                                                 }
        //                                             }
        //                                         } //Callback function to handle the result
        //                                     );
        //                                 })
        //                             }
        //                         );
        //                     });
        //             } else {
        //                 let selected_store_shelf = [];
        //                 txn.executeSql("SELECT * FROM selected_store_shelf",
        //                     [],
        //                     (tx, Selectedresult) => {
        //                         if (Selectedresult.rows.length > 0) {
        //                             for (let i = 0; i < Selectedresult.rows.length; ++i)
        //                                 selected_store_shelf.push(Selectedresult.rows.item(i));
        //                             txn.executeSql(
        //                                 "SELECT * FROM post_data1 where store_id=? AND shelf_id=?",
        //                                 [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id],
        //                                 (tx, postdata_results) => {
        //                                     if (postdata_results.rows.length > 0) {
        //                                         // console.log(postdata_results)
        //                                         txn.executeSql('DELETE FROM post_data1  where store_id=? AND shelf_id=?',
        //                                             [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id],
        //                                             (tx, result2) => {
        //                                                 if (result2.rowsAffected > 0) {
        //                                                     filteredimage.map((x) => {
        //                                                         txn.executeSql(
        //                                                             'INSERT INTO post_data1 (store_id ,shelf_id,shelf_cmd,imagedata,imagetype,imageuri,fileSize) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
        //                                                             [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, selected_store_shelf[0].shelf_cmd, x.data, x.type, x.uri, x.fileSize],  //Argument to pass for the prepared statement                  
        //                                                             (tx, results) => {
        //                                                                 count += 1;
        //                                                                 if (results.rowsAffected > 0) {
        //                                                                     if (filteredimage.length == count) {
        //                                                                         // console.log('image delete in')
        //                                                                         navigation.navigate('Pasas')
        //                                                                     }
        //                                                                 }
        //                                                             } //Callback function to handle the result
        //                                                         );
        //                                                     })

        //                                                 }
        //                                             }
        //                                         )

        //                                     } else {
        //                                         filteredimage.map((x) => {
        //                                             txn.executeSql(
        //                                                 'INSERT INTO post_data1 (store_id ,shelf_id,shelf_cmd,imagedata,imagetype,imageuri,fileSize) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
        //                                                 [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, selected_store_shelf[0].shelf_cmd, x.data, x.type, x.uri, x.fileSize],  //Argument to pass for the prepared statement                  
        //                                                 (tx, results) => {
        //                                                     count += 1;
        //                                                     if (results.rowsAffected > 0) {
        //                                                         if (filteredimage.length == count) {
        //                                                             // console.log('image insert3')
        //                                                             navigation.navigate('Pasas')
        //                                                         }

        //                                                     }
        //                                                 } //Callback function to handle the result
        //                                             );
        //                                         })
        //                                     }
        //                                 }
        //                             );
        //                         }
        //                     }
        //                 )

        //             }
        //         }
        //     )
        // });
    }
    function deleteTables() {
        navigate('/Login')
    }
    function Logout() {
        navigate('/Login')

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
    // console.log(shelf_commands, 'shelf commands')
    return (
        <>
            {/* <Spinner loading={sampleImage.length == 0} /> */}
            <div
                // colors={['#16529a', '#0c9ddc', '#007cc6']}
                //     start={{ x: 0, y: 0 }}
                //     end={{ x: 1, y: 1 }}
                className='headerStyle'
            >

                <label className='headerTextLand'>{common_data.length != 0 ? common_data[0].smapleimage_header : null}
                    {/* - {SelectedStoreData} */}
                </label>
                {/* <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                /> */}
                <label onClick={() => { Logout() }} >Logout</label>
            </div>

            {
                sampleImage.length != 0 ?
                    <div
                        // colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']}
                        //     start={{ x: 0, y: 0 }}
                        //     end={{ x: 1, y: 1 }}
                        className='bgStyle'>


                        <div>
                            <label className='boxInstructionStyle'>{common_data.length != 0 ? common_data[0].image_instructions : null}</label>
                            <div>
                                <label>{common_data.length != 0 ? common_data[0].Capture_Image : null}</label>
                                <label>{common_data.length != 0 ? common_data[0].Example_Image : null}</label>
                            </div>
                            <div>

                                {
                                    imageUpload.map((item) =>
                                    (
                                        item.type == "image" ?
                                            <img
                                                style={{
                                                    marginRight: '1%',
                                                    marginBottom: '2%',
                                                    marginTop: '2%',
                                                    marginLeft: '3%',
                                                    width: '45%',
                                                    height: 200
                                                }} src={require('../images/camera-.png')} />
                                            :
                                            <label style={{
                                                marginRight: '1%',
                                                marginBottom: '2%',
                                                marginTop: '2%',
                                                marginLeft: '3%',
                                                width: '45%',
                                                height: 200,

                                            }}
                                                onClick={() => removeImage(item)}
                                            // onLongPress={() => removeImage(item)}
                                            >
                                                <img
                                                    style={{
                                                        // marginRight: '1%',
                                                        // marginBottom: '4%',
                                                        // marginTop: '4%',
                                                        // marginLeft: '3%',
                                                        // width: '45%',
                                                        height: 200
                                                    }}
                                                    // source={{ uri: common_data[0].s5_girl_image }}
                                                    src={{ uri: item.uri }}
                                                />
                                            </label>

                                    )
                                    )}



                                {
                                    sampleImage.map((item) =>
                                    (
                                        // <Text>{item.image_name}</Text>
                                        <img
                                            style={{ marginRight: '1%', marginBottom: '2%', marginTop: '2%', width: '45%', marginLeft: '3%', height: 200 }}
                                            src={item.image_value}
                                        //source={require('../images/sample.png')}
                                        />
                                    )
                                    )}
                            </div>
                        </div>



                        <input type="file" className='nextBtnLandscapeSubmit'
                            onChange={selectFile}
                        ></input>


                        <label
                            disabled={imageCaptured.length == 0}
                            className='nextBtnLandscape'
                            onClick={() => { InsertImage() }}
                        >
                            <label
                                // colors={imageCaptured.length != 0 ? ['#82bc12', '#61910a'] : ['grey', 'grey']}
                                //     start={{ x: 0, y: 0 }}
                                //     end={{ x: 1, y: 1 }} 
                                className='nextBtnLandscape'>

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

export default Photos;