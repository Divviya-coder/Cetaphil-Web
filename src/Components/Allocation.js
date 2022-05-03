import React, { useContext, useEffect } from 'react'
import { Button, Text, View, Image, TextInput, StatusBar, Pressable, TouchableOpacity, Alert } from 'react-native'
import styles from '../css/AllocationStyle'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StoreContext from '../store/StoreContext'
import { openDatabase } from 'react-native-sqlite-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo'
import Spinner from './Spinner'

function Allocation({ navigation }) {
    const { orientation, Set_parameter_creteria, parameter_creteria, common_data, Set_criterial_post, criterial_post,
        Reset_for_logout, SelectedStoreData, imageCaptured, post_criteria_data, mclData,
        brandData, brandPost, Set_Brand_Post, brand, Set_Brand, Set_Brand_Clear } = useContext(StoreContext)
    // if (brandPost[0].no_of_brands == undefined) {
    //     Set_Brand_Post([])
    // }
    console.log(brand, 'brand data')
    console.log(brandPost, 'brand post')
    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    // console.log(mclData, 'mcl Data')
    useEffect(() => {
        if (brandPost.length != 0 && brandPost[0].no_of_brands == undefined) {
            Set_Brand_Clear([])
            console.log(brandPost, 'useeffect brandpost')
        }

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM post_criteria_data',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    // console.log(temp, 'post_criteria_data')
                }
            );
        });
    }, [])

    const mclName = parameter_creteria.filter((e) => e.parameter_id == 4 && e.questions != null)
    // console.log(mclName, 'mcl name', criterial_post, 'criterial post')
    const CriteriaInsert = () => {
        let selected_store_shelf = [];
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
                                                        // console.log('position insert1')
                                                        navigation.navigate('Segmentation')
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
                                    var tot = 0;
                                    var tot5 = 0;
                                    for (let i = 0; i < Selectedresult.rows.length; ++i)
                                        selected_store_shelf.push(Selectedresult.rows.item(i));
                                    criterial_post.map((c) => {
                                        txn.executeSql(
                                            "SELECT * FROM post_criteria_data where store_id=? AND shelf_id=? AND criteria_id=?",
                                            [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
                                            (tx, postdata_results) => {
                                                if (postdata_results.rows.length > 0) {
                                                    // console.log('up')
                                                    txn.executeSql('UPDATE post_criteria_data set criteriayn=?,feedback=? where store_id=? AND shelf_id=? AND criteria_id=? ',
                                                        [c.yesorno, c.feedback, selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
                                                        (tx, result2) => {
                                                            if (result2.rowsAffected > 0) {
                                                                tot += 1;
                                                                if (criterial_post.length == tot) {
                                                                    // console.log('position update')
                                                                    navigation.navigate('Segmentation')
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
                                                                    // console.log('position insert2')
                                                                    navigation.navigate('Segmentation')
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

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE  name='brand_post_data'",
                [],
                function (tx, res) {
                    console.log(res.rows, 'first if')
                    if (res.rows.length == 0) {
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS brand_post_data(brand_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10), no_of_brands VARCHAR(100))',
                            [],
                            (tx, result1) => {
                                tx.executeSql(
                                    "SELECT * FROM selected_store_shelf",
                                    [],
                                    (tx, results) => {
                                        var temp = [];
                                        for (let i = 0; i < results.rows.length; ++i)
                                            temp.push(results.rows.item(i));
                                        console.log(temp, 'brand value')
                                        brandPost.map((x) => {
                                            console.log(x, 'x')
                                            txn.executeSql(
                                                'INSERT INTO brand_post_data (store_id ,shelf_id,brand_id,no_of_brands) VALUES (?,?,?,?)', //Query to execute as prepared statement
                                                [temp[0].store_id, temp[0].shelf_id, x.id, x.no_of_brands],  //Argument to pass for the prepared statement                  
                                                (tx, results) => {
                                                    if (results.rowsAffected > 0) {
                                                        console.log('brand post data insert1')
                                                        navigation.navigate('Segmentation')
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
                                    // var tot = 0;
                                    var tot5 = 0;
                                    for (let i = 0; i < Selectedresult.rows.length; ++i)
                                        selected_store_shelf.push(Selectedresult.rows.item(i));
                                    brandPost.map((c) => {
                                        console.log(c, 'c')
                                        console.log(selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id)
                                        txn.executeSql(
                                            "SELECT * FROM brand_post_data where store_id=? AND shelf_id=? AND brand_id=?",
                                            [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
                                            (tx, postdata_results) => {
                                                console.log(postdata_results, 'postdata_results')
                                                if (postdata_results.rows.length > 0) {
                                                    console.log('up')
                                                    txn.executeSql('UPDATE brand_post_data set no_of_brands=? where store_id=? AND shelf_id=? AND brand_id=? ',
                                                        [c.no_of_brands, selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
                                                        (tx, result2) => {
                                                            if (result2.rowsAffected > 0) {
                                                                tot5 += 1;
                                                                if (brandPost.length == tot5) {
                                                                    console.log('brand update')
                                                                    navigation.navigate('Segmentation')
                                                                }
                                                            }
                                                        }
                                                    )
                                                }
                                                else {
                                                    console.log('else else')
                                                    txn.executeSql(
                                                        'INSERT INTO brand_post_data (store_id ,shelf_id,brand_id,no_of_brands) VALUES (?,?,?,?)', //Query to execute as prepared statement
                                                        [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id, c.no_of_brands],  //Argument to pass for the prepared statement          

                                                        (tx, results) => {
                                                            console.log(results, 'results')
                                                            if (results.rowsAffected > 0) {
                                                                tot5 += 1;
                                                                if (brandPost.length == tot5) {
                                                                    console.log('brand insert2')
                                                                    navigation.navigate('Segmentation')
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
    }

    // console.log(brandData.length, brandPost.length, brand, 'length')
    const Validation = () => {
        let datalen = 0
        let datalen5 = 0
        let filteredData = parameter_creteria.filter((x) => x.parameter_id == 4 && x.questions == null).map((e) => { return e.id })
        let filteredData5 = mclData.map((e) => { return e.id })
        let CheckedData = filteredData.map((x) => {
            if (criterial_post.some((e) => e.id === x)) {
                datalen += 1;
            }
        })
        let CheckedData5 = filteredData5.map((x) => {
            if (criterial_post.some((e) => e.id === x)) {
                datalen5 += 1;
            }
        })
        return filteredData.length === datalen && filteredData5.length === datalen5 && brandData.length <= brandPost.length
            ? false : true
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
    var filterValue = (eventid) => criterial_post.find(e5 => e5.id == eventid)
    const yes = (eventid) => filterValue(eventid) ? filterValue(eventid).yesorno == 1 : null
    const no = (eventid) => filterValue(eventid) ? filterValue(eventid).yesorno == 0 : null
    // function yes(eventid) {
    //     var setStyle
    //     return setStyle = criterial_post.find(e5 => e5.id == eventid).yesorno == 1 ? styles.greenBg : styles.greenOpacity
    // }
    // function no(eventid) {
    //     var setStyle
    //     return setStyle = criterial_post.find(e5 => e5.id == eventid).yesorno == 0 ? styles.redBg : styles.redOpacity
    // }
    const e5 = parameter_creteria.filter((e) => e.parameter_id == 2)[0]
    console.log(brandData.length, 'mcldata')
    return (
        <>
            <Spinner loading={parameter_creteria.length == 0} />
            <LinearGradient colors={['#16529a', '#0c9ddc', '#007cc6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerStyle}>
                <FontAwesome5 name="arrow-left" style={styles.headerIcon} onPress={() => { navigation.goBack() }} color="white" size={22} />
                {common_data.length != 0 ?
                    <View style={orientation == "POTRAIT" ? styles.headerPotr : styles.headerLand}>

                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>{common_data[0].Allocation_header.split(" ")[0]}&nbsp;&nbsp;:&nbsp;&nbsp;</Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerAvatarPotr : styles.headerAvatarLand}>{common_data[0].Allocation_header.split(" ")[1][0]}</Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>&nbsp;&nbsp;{common_data[0].Allocation_header.split(" ")[1]}&nbsp;&nbsp; </Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>+&nbsp;&nbsp;{common_data[0].Allocation_header.split(" ")[3]}</Text>

                        {/* - {SelectedStoreData} */}
                    </View>
                    : null}
                <Image
                    style={styles.headerImage}
                    source={require('../images/headerLogo.png')}
                />
                <Entypo name="log-out" style={styles.headerLogout} onPress={() => { Logout() }} color="#a2d401" size={29} />
            </LinearGradient>

            {
                parameter_creteria.length != 0 ?

                    <LinearGradient colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']} style={styles.bgStyle}>
                        {/* <StatusBar
                    backgroundColor='#004987' /> */}
                        <View style={styles.secondBg}>
                            <View style={styles.brandStyle}>

                                {
                                    parameter_creteria.filter((e) => e.parameter_id == 2).map((e) => (
                                        <View style={styles.singleView}>
                                            <Text style={orientation == "POTRAIT" ? styles.boxInstructionStylePotr : styles.boxInstructionStyleLand}>{e5.criteria_name}</Text>
                                            <Text style={styles.textBox}>{e5.questions}</Text>
                                            <View style={styles.viewStyle}>
                                                <Text style={orientation == "POTRAIT" ? styles.positionTextPotr : styles.positionTextLand}>{e5.criteria_desc}</Text>
                                            </View>
                                            {/* <Image
                                            style={orientation == "POTRAIT" ? styles.positionImagePotr : styles.positionImageLand}
                                            source={{ uri: e.criteria_image }}
                                        /> */}
                                            <View style={styles.buttonStyle}>
                                                <Pressable style={({ pressed }) => [styles.buttonText,
                                                pressed ? styles.greenBg : yes(e5.id) ? styles.greenBg : styles.greenOpacity
                                                ]} onPress={() => {
                                                    yes(e5.id)
                                                    Set_criterial_post(e5.id, 'yesorno', 1, null, 1)
                                                }}>
                                                    <Text style={yes(e5.id) ? styles.selectedStore : styles.normalStore}>
                                                        {common_data[0].yes}
                                                    </Text>
                                                </Pressable>
                                                <Pressable style={({ pressed }) => [styles.buttonText,
                                                pressed ? styles.redBg : no(e5.id) ? styles.redBg : styles.redOpacity
                                                ]} onPress={() => {
                                                    no(e5.id)
                                                    Set_criterial_post(e5.id, 'yesorno', 0, null, 0)
                                                }}>
                                                    <Text style={no(e5.id) ? styles.selectedStore : styles.normalStore}>
                                                        {common_data[0].no}
                                                    </Text>
                                                </Pressable>
                                            </View>

                                            {/* <ScrollView persistentScrollbar={true} style={styles.brand}>
                                    <Text style={orientation == "POTRAIT" ? styles.brandTitlePotr : styles.brandTitleLand}>Brand</Text>
                                    {
                                        brands.map((b) => (
                                            <View style={styles.brandView}>
                                                <Text style={styles.brandText}>{b.name}</Text>
                                                <TextInput style={styles.brandTextinput}></TextInput>
                                            </View>
                                        ))
                                    }
                                </ScrollView> */}
                                        </View>
                                    ))
                                }

                                {
                                    brandData.length != 0 ?

                                        <View style={styles.brand}>
                                            <Text style={orientation == "POTRAIT" ? styles.brandTitlePotr : styles.brandTitleLand}>Brand</Text>
                                            <ScrollView persistentScrollbar={true} style={styles.brandScroll}>
                                                {
                                                    brandData.map((b) => (
                                                        <View style={styles.brandView}>
                                                            <Text style={styles.brandText}>{b.brand_name}</Text>
                                                            <TextInput style={styles.brandTextinput} placeholder="0"
                                                                maxLength={3}
                                                                keyboardType='number-pad'
                                                                value={brandPost.filter(e5 => e5.id == b.id).length != 0 ?
                                                                    brandPost.filter(e5 => e5.id == b.id)[0].no_of_brands : ""}
                                                                onChangeText={(u) => {
                                                                    Set_Brand_Post(b.id, 'no_of_brands', u, u)
                                                                }}
                                                            ></TextInput>
                                                        </View>
                                                    ))
                                                }
                                            </ScrollView>
                                        </View>
                                        :
                                        null
                                }
                            </View>

                            {
                                mclData.length != 0 ?

                                    <View style={orientation == "POTRAIT" ? styles.mclViewPotr : styles.mclViewLand}>
                                        <Text
                                            style={orientation == "POTRAIT" ? styles.mclBoxInstructionStylePotr : styles.mclBoxInstructionStyleLand}
                                        >{common_data[0].criteria_desc}</Text>
                                        <Text
                                            style={orientation == "POTRAIT" ? styles.mclTextBoxPotr : styles.mclTextBoxLand}
                                        >{common_data[0].criteria_question}</Text>
                                        <ScrollView persistentScrollbar={true} style={{ height: '100%' }}>
                                            {
                                                mclData.map((e) => (

                                                    <View style={styles.mclButtonStyle}>
                                                        <Text style={styles.mclQuestions}>{e.mcl_questions}</Text>
                                                        {/* <TouchableOpacity
                                                            onPress={() => {

                                                                Set_criterial_post(e.id, 'yesorno', 1, null, 1)
                                                            }}

                                                            style={[styles.mclButtonTextGreen,
                                                            yes(e.id) && !no(e.id) ? styles.greenBg : styles.greenOpacity,

                                                            ]}
                                                            
                                                            activeOpacity={0.7}
                                                            ><Text
                                                            >{common_data[0].yes}</Text></TouchableOpacity> */}

                                                        <Pressable
                                                            style={({ pressed }) => [styles.mclButtonText,
                                                            pressed ? styles.greenBg : yes(e.id) ? styles.greenBg : styles.greenOpacity]}
                                                            onPress={() => {
                                                                Set_criterial_post(e.id, 'yesorno', 1, null, 1)
                                                            }}>
                                                            <Text style={yes(e.id) ? styles.selectedStore : styles.normalStore}>
                                                                {common_data[0].yes}
                                                            </Text>
                                                        </Pressable>
                                                        <Pressable style={({ pressed }) => [styles.mclButtonText,
                                                        pressed ? styles.redBg : no(e.id) ? styles.redBg : styles.redOpacity]}
                                                            onPress={() => {
                                                                Set_criterial_post(e.id, 'yesorno', 0, null, 0)
                                                            }}>
                                                            <Text style={no(e.id) ? styles.selectedStore : styles.normalStore}>
                                                                {common_data[0].no}
                                                            </Text>
                                                        </Pressable>

                                                        {/* <Text
                                                            onPress={() => {
                                                                yes(e.id),
                                                                    Set_criterial_post(e.id, 'yesorno', 1, null, 1)
                                                            }}
                                                            style={[styles.mclButtonTextGreen, yes(e.id) ? styles.greenBg : styles.greenOpacity]}>
                                                            {common_data[0].yes}
                                                        </Text>


                                                        <Text
                                                            onPress={() => {
                                                                no(e.id),
                                                                    Set_criterial_post(e.id, 'yesorno', 0, null, 0)
                                                            }}
                                                            style={[styles.mclButtonTextGreen,
                                                            no(e.id) ? styles.redBg : styles.redOpacity,

                                                            ]}>{common_data[0].no}</Text> */}


                                                    </View>

                                                ))
                                            }
                                        </ScrollView>
                                    </View>

                                    :
                                    null
                            }

                        </View>

                        <TouchableOpacity disabled={Validation()} style={orientation == "POTRAIT" ? styles.nextBtnPotrait : styles.nextBtnLandscape} activeOpacity={0.7}
                            onPress={() => { CriteriaInsert() }}
                        >
                            <LinearGradient colors={Validation() ? ['grey', 'grey'] : ['#82bc12', '#61910a']}

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

export default Allocation