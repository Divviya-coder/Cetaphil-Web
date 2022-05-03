import React, { useContext, useEffect } from 'react'
import { Button, Text, View, Image, TextInput, StatusBar, TouchableOpacity, Pressable, Alert } from 'react-native'
import styles from '../css/SegmentationStyle'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StoreContext from '../store/StoreContext'
import { openDatabase } from 'react-native-sqlite-storage';
import Entypo from 'react-native-vector-icons/Entypo'
import Spinner from './Spinner'

function Segmentation({ navigation }) {
    const { orientation, Set_parameter_creteria, parameter_creteria, common_data, Set_criterial_post, criterial_post,
        Reset_for_logout, SelectedStoreData, imageCaptured, post_criteria_data } = useContext(StoreContext)
    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    useEffect(() => {
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
            tx.executeSql(
                'SELECT * FROM brand_post_data',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    console.log(temp, 'brand_data')
                }
            );
        });
    }, [])
    const data = [{ id: 1, name: "Store A" },
    { id: 2, name: "Store A" }]
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
                                                        navigation.navigate('Adjacency')
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
                                                                    navigation.navigate('Adjacency')
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
                                                                    navigation.navigate('Adjacency')
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
    const Validation = () => {
        let datalen = 0
        let filteredData = parameter_creteria.filter((x) => x.parameter_id == 3).map((e) => { return e.id })
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

                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>{common_data[0].Segmantation_header.split(" ")[0]}&nbsp;&nbsp;:&nbsp;&nbsp;</Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerAvatarPotr : styles.headerAvatarLand}>{common_data[0].Segmantation_header.split(" ")[1][0]}</Text>
                        <Text style={orientation == "POTRAIT" ? styles.headerTextPotr : styles.headerTextLand}>&nbsp;&nbsp;{common_data[0].Segmantation_header.split(" ")[1]} </Text>


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
                        <StatusBar
                            backgroundColor='#004987' />
                        <View style={styles.secondBg}>
                            {
                                parameter_creteria.filter((e) => e.parameter_id == 3).map((e) => (
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
                                        </View>
                                        <TextInput style={styles.shelfTextinput}
                                            placeholder="Open Feedback ( Max 256 Chars )"
                                            multiline={true}
                                            maxLength={256}
                                            numberOfLines={9}
                                            // multiline={true}
                                            value={criterial_post.filter(e5 => e5.id == e.id).length != 0 ?
                                                criterial_post.filter(e5 => e5.id == e.id)[0].feedback : ""}
                                            // numberOfLines={3}
                                            onChangeText={(u) => Set_criterial_post(e.id, 'feedback', null, u, u)}
                                        />

                                    </View>
                                ))
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

export default Segmentation