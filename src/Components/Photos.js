import React, { useContext, useEffect, useState } from 'react'
// import styles from '../css/PhotosStyle'
// import Spinner from './Spinner';
import moment from 'moment';

function Photos({ navigation }) {
    const { orientation, changeOrientation, common_data, ChangeSampleImage, sampleImage, imageUpload,
        ChangeImageUpload, Set_s5_parameters, imageCaptured, ChangeImageCaptured, Reset_for_logout,
        SelectedStoreData, post_criteria_data, criterial_post, shelf_commands, selectedShelf, selectedShelfid } = useContext(StoreContext)
    console.log(selectedShelf, 'selected shelf')
    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    const AppFolder = 'store';
    const DirectoryPath = `/storage/emulated/0/${AppFolder}`
    useEffect(() => {

        RNFS.mkdir(DirectoryPath)
            .then((result) => {
                console.log('result', result)
            })
            .catch((err) => {
                console.warn('err', err)
            })
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM s5_parameters',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    Set_s5_parameters(temp)
                }
            );
            tx.executeSql(
                'SELECT * FROM selected_store_shelf',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'selected shelf');
                    // Set_common_data(temp)
                }
            );
        });
    }, [])
    // console.log(imageUpload, 'imageUpload')

    const pictureFolder = RNFetchBlob.fs.dirs.SDCardDir + `/${SelectedStoreData.label}/`;
    console.log(pictureFolder, 'picture folder')
    const dirHome = `${RNFS.PicturesDirectoryPath}`
    const dirPicutures = `${dirHome}/${SelectedStoreData.label}`;
    // console.log(dirPicutures, 'dir pictures')
    const selectFile = async () => {

        const options = {
            quality: 0.5,
            maxWidth: 400,
            maxHeight: 400,
            storageOptions: {
                skipBackup: true,
                privateDirectory: true,
                path: DirectoryPath,

            },
            // storageOptions: {
            //     skipBackup: true,
            //     // path: `${SelectedStoreData.label}`
            //     // path: `file:///storage/emulated/0/${SelectedStoreData.label}`
            //     path: 'images'
            // },
        };

        ImagePicker.launchCamera(options, (response) => {
            // console.log(response)
            //console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled photo picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // console.log(response.uri, 'uri')
                console.log(dirPicutures, 'dirpictures', pictureFolder, 'picturefolder')
                // if (RNFS.exists(pictureFolder)) {
                //     const newFilepath = `${pictureFolder}/${SelectedStoreData.label}_${selectedShelfid}_${imageCaptured.length + 1}_${moment().format('YY-MM-DD')}.jpg`;
                //     RNFS.copyFile(response.uri, newFilepath)
                //         .then((file) => {
                //             console.log('FILE MOVED', response.uri, newFilepath, file);
                //             // resolve(true);
                //         })
                //         .catch(error => {
                //             console.log('moveFile error', error);
                //             // reject(error);
                //         });
                // }
                // else {
                RNFS.mkdir(pictureFolder)
                    .then((res) => {

                        console.log(res, 'directory created')
                        const newFilepath = `${pictureFolder}/${SelectedStoreData.label}_${selectedShelfid}_ ${(imageCaptured.length) + 1}_ ${moment().format('YY-MM-DD')}.jpg`;
                        RNFS.copyFile(response.uri, newFilepath)
                            .then((file) => {
                                console.log('FILE MOVED', response.uri, newFilepath, file);
                                // resolve(true);
                            })
                            .catch(error => {
                                console.log('moveFile error', error);
                                // reject(error);
                            });
                    })
                    .catch(err => {
                        console.log('mkdir error', err);
                        // reject(err);
                    });
                // }

                // console.log(response, 'response')
                // const dirs = RNFetchBlob.fs.dirs;

                // // var folderPath = dirs.SDCardDir + `/${SelectedStoreData.label}/`;
                // var fullPath = pictureFolder + response.uri.substring(response.uri.lastIndexOf('/') + 1);
                // console.log(response.uri.substring(response.uri.lastIndexOf('/') + 1), 'response uri')
                // RNFetchBlob.fs.mkdir(pictureFolder).then((res) => {
                //     console.log('res', res);
                // });

                // RNFetchBlob.fs.writeFile(fullPath, response.data, 'base64').then((res) => {
                //     console.log('file saved :', res);
                // });
                // RNFetchBlob.fs.exists(pictureFolder).then((exists) => {
                //     console.log(exists, 'exist check')
                //     if (exists) {
                // RNFetchBlob.fs.isDir(pictureFolder).then((isDir) => {
                //     if (isDir) {

                //         RNFetchBlob.fs.mv(response.uri, pictureFolder).then(() => {
                //             console.log('Image Moved');
                //         }).catch((e) => { console.log("FAILED:= " + e.message) });
                //     }
                // }).catch((e) => { console.log("Checking Directory Error : " + e.message); });
                // }
                // else {
                //     console.log('not exist')
                // }
                // });

                // setImageUpload(response)
                // console.log(response.length, (response.uri))
                // data.pop()
                imageUpload.pop()
                // imageUpload.shift()
                if (imageCaptured.length == 4) {
                    imageCaptured.shift()
                }
                // let data = [{ ...response }, ...imageUpload]
                let data = [{ ...response }, ...imageUpload]
                // data.push(response)
                // console.log(data, 'data ImageUpload')
                ChangeImageUpload(data)
                let data5 = [...imageCaptured]
                data5.push(response)
                ChangeImageCaptured(data5)
                // let data = [...imageUpload]
                // data.splice(data.indexOf(item), 0, response);
                // setImageUpload(data)
            }
        });
    }
    const removeImage = (item) => Alert.alert(
        "",
        "Are you sure to delete this image?",
        [
            {
                text: "NO",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "YES", onPress: () => {
                    let data = [...imageUpload]
                    data.splice(imageUpload.indexOf(item), 1)
                    console.log(data)
                    // data.splice(imageUpload.indexOf(item), 0, { type: "image" });
                    data.push({ type: "image" })
                    ChangeImageUpload(data)
                    let data5 = [...imageCaptured]
                    data5.splice(imageCaptured.indexOf(item), 1)
                    ChangeImageCaptured(data5)
                }
            }
        ]
    );
    const InsertImage = (id) => {
        let selected_store_shelf = [];
        var count = 0;
        let filteredimage = imageUpload.filter((x) => x.type != 'image');
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE  name='post_data1'",
                [],
                function (tx, res) {
                    // console.log(res)
                    if (res.rows.length == 0) {
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS post_data1 (post_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50),imagedata TEXT, imagetype VARCHAR(50),imageuri TEXT ,fileSize VARCHAR(50))',
                            [],
                            (tx, result1) => {
                                tx.executeSql(
                                    "SELECT * FROM selected_store_shelf",
                                    [],
                                    (tx, results) => {
                                        var temp = [];
                                        for (let i = 0; i < results.rows.length; ++i)
                                            temp.push(results.rows.item(i));
                                        filteredimage.map((x) => {
                                            txn.executeSql(
                                                'INSERT INTO post_data1 (store_id ,shelf_id,shelf_cmd,imagedata,imagetype,imageuri,fileSize) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
                                                [temp[0].store_id, temp[0].shelf_id, temp[0].shelf_cmd, x.data, x.type, x.uri, x.fileSize],  //Argument to pass for the prepared statement                  
                                                (tx, results) => {
                                                    count += 1;
                                                    if (results.rowsAffected > 0) {
                                                        if (filteredimage.length == count) {
                                                            // console.log('image  insert 1')
                                                            navigation.navigate('Pasas')
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
                                    txn.executeSql(
                                        "SELECT * FROM post_data1 where store_id=? AND shelf_id=?",
                                        [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id],
                                        (tx, postdata_results) => {
                                            if (postdata_results.rows.length > 0) {
                                                // console.log(postdata_results)
                                                txn.executeSql('DELETE FROM post_data1  where store_id=? AND shelf_id=?',
                                                    [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id],
                                                    (tx, result2) => {
                                                        if (result2.rowsAffected > 0) {
                                                            filteredimage.map((x) => {
                                                                txn.executeSql(
                                                                    'INSERT INTO post_data1 (store_id ,shelf_id,shelf_cmd,imagedata,imagetype,imageuri,fileSize) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
                                                                    [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, selected_store_shelf[0].shelf_cmd, x.data, x.type, x.uri, x.fileSize],  //Argument to pass for the prepared statement                  
                                                                    (tx, results) => {
                                                                        count += 1;
                                                                        if (results.rowsAffected > 0) {
                                                                            if (filteredimage.length == count) {
                                                                                // console.log('image delete in')
                                                                                navigation.navigate('Pasas')
                                                                            }
                                                                        }
                                                                    } //Callback function to handle the result
                                                                );
                                                            })

                                                        }
                                                    }
                                                )

                                            } else {
                                                filteredimage.map((x) => {
                                                    txn.executeSql(
                                                        'INSERT INTO post_data1 (store_id ,shelf_id,shelf_cmd,imagedata,imagetype,imageuri,fileSize) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
                                                        [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, selected_store_shelf[0].shelf_cmd, x.data, x.type, x.uri, x.fileSize],  //Argument to pass for the prepared statement                  
                                                        (tx, results) => {
                                                            count += 1;
                                                            if (results.rowsAffected > 0) {
                                                                if (filteredimage.length == count) {
                                                                    // console.log('image insert3')
                                                                    navigation.navigate('Pasas')
                                                                }

                                                            }
                                                        } //Callback function to handle the result
                                                    );
                                                })
                                            }
                                        }
                                    );
                                }
                            }
                        )

                    }
                }
            )
        });
    }
    // console.log(imageCaptured[0], 'image Captured')
    // const reversedData = imageUpload.reverse();
    // console.log(reversedData)
    // NetInfo.fetch().then(state => {
    //     console.log("Connection type", state.type);
    //     state.isConnected ? Alert.alert("You are in Online.") : Alert.alert("You are in offline.")
    // });

    // const unsubscribe = NetInfo.addEventListener(state => {
    //     console.log("Connection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    // });

    // // Unsubscribe
    // unsubscribe();
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
    // console.log(shelf_commands, 'shelf commands')
    return (
        <>
            <Spinner loading={sampleImage.length == 0} />
            <LinearGradient colors={['#16529a', '#0c9ddc', '#007cc6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerStyle}>
                <FontAwesome5 name="arrow-left" style={styles.headerIcon} onPress={() => { navigation.goBack() }} color="white" size={22} />
                <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>{common_data.length != 0 ? common_data[0].smapleimage_header : null}
                    {/* - {SelectedStoreData} */}
                </Text>
                <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                />
                <Entypo name="log-out" style={styles.headerLogout} onPress={() => { Logout() }} color="#a2d401" size={29} />
            </LinearGradient>

            {
                sampleImage.length != 0 ?
                    <LinearGradient colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.bgStyle}>
                        <StatusBar
                            backgroundColor='#004987' />


                        <ScrollView>
                            <Text style={styles.boxInstructionStyle}>{common_data.length != 0 ? common_data[0].image_instructions : null}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: '1%' }}>{common_data.length != 0 ? common_data[0].Capture_Image : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: '1%' }}>{common_data.length != 0 ? common_data[0].Example_Image : null}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <FlatList

                                    data={imageUpload}
                                    numColumns={2}
                                    renderItem={({ item, i }) => (
                                        item.type == "image" ?
                                            <Image
                                                style={{
                                                    marginRight: '1%',
                                                    marginBottom: '2%',
                                                    marginTop: '2%',
                                                    marginLeft: '3%',
                                                    width: '45%',
                                                    height: 200
                                                }}

                                                source={require('../images/camera-.png')}
                                            />
                                            :
                                            <TouchableOpacity style={{
                                                marginRight: '1%',
                                                marginBottom: '2%',
                                                marginTop: '2%',
                                                marginLeft: '3%',
                                                width: '45%',
                                                height: 200,

                                            }}
                                                onPress={() => removeImage(item)}
                                            // onLongPress={() => removeImage(item)}
                                            >
                                                <Image
                                                    style={{
                                                        // marginRight: '1%',
                                                        // marginBottom: '4%',
                                                        // marginTop: '4%',
                                                        // marginLeft: '3%',
                                                        // width: '45%',
                                                        height: 200
                                                    }}
                                                    // source={{ uri: common_data[0].s5_girl_image }}
                                                    source={{ uri: item.uri }}
                                                />
                                            </TouchableOpacity>

                                    )}
                                // inverted
                                />

                                <Divider></Divider>
                                <FlatList
                                    data={sampleImage}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        // <Text>{item.image_name}</Text>
                                        <Image
                                            style={{ marginRight: '1%', marginBottom: '2%', marginTop: '2%', width: '45%', marginLeft: '3%', height: 200 }}
                                            source={{ uri: item.image_value }}
                                        //source={require('../images/sample.png')}
                                        />
                                    )} />
                            </View>
                        </ScrollView>



                        <TouchableOpacity style={orientation == "POTRAIT" ? styles.nextBtnPotraitSubmit : styles.nextBtnLandscapeSubmit} activeOpacity={0.7}
                            onPress={selectFile}
                        >
                            <LinearGradient colors={['#82bc12', '#35775e']}

                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }} style={orientation == "POTRAIT" ? styles.nextBtnPotraitSubmit : styles.nextBtnLandscapeSubmit} >
                                <FontAwesome5 name='camera' size={20} color="white" />
                                <Text style={styles.nextText} >&nbsp;&nbsp;Camera</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={imageCaptured.length == 0} style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} activeOpacity={0.7}
                            onPress={() => { InsertImage() }}
                        >
                            <LinearGradient colors={imageCaptured.length != 0 ? ['#82bc12', '#61910a'] : ['grey', 'grey']}

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

export default Photos;