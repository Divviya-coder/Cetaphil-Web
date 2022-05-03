import React, { useState, useEffect, useContext } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  Platform,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Modal,
  BackHandler,
  Dimensions
} from 'react-native';
import axios from 'axios'
import { openDatabase } from 'react-native-sqlite-storage';
import LinearGradient from 'react-native-linear-gradient'
import styles from '../css/LoginStyle';
import StoreContext from "../store/StoreContext";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from './Spinner';


function PostLogin({ navigation }) {
  const [password, setPassword] = useState("");
  const [LoginValidation, setLoginValidation] = useState(false);
  const [UserName, setUserName] = useState("");
  const [visibility, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  var db = openDatabase({ name: 'CetaphilDatabase.db' });
  const { orientation, changeOrientation, isOffline, changeIsOffline, ChangeMclData, Set_CompletedStores, completedStores, ChangeStoreChain, ChangeStoreLocal, ChangeStoreIndi } = useContext(StoreContext)

  const stores_completed = [
    ["1"],
    ["2"]
  ]


  console.log(completedStores, 'completed stores')
  // console.log(height, 'height', width, 'width')
  useEffect(() => {

    // ChangeStoreChain([])
    // ChangeStoreLocal([])
    // ChangeStoreIndi([])
    //Get device Height
    setHeight(Dimensions.get('window').height);
    //Get device Width
    setWidth(Dimensions.get('window').width);
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE  name='store_details'  OR name='shelf_details' OR name='shelf_sample_images' OR name='common_data' OR name='s5_parameters' OR name='parameter_creteria' OR name='user_details' OR name='selected_store_shelf' OR name='post_data1' OR name='post_criteria_data' OR name='shelf_completed' OR name='mcl_list' OR name='brand_list' OR name='brand_post_data' OR name='completed_store' ",
        [],
        function (tx, res) {
          console.log('item:', res.rows);
          if (res.rows.length != 15) {
            console.log('New Tables Created');
            tx.executeSql('DROP TABLE IF EXISTS store_details', []);
            tx.executeSql('DROP TABLE IF EXISTS shelf_sample_images', []);
            tx.executeSql('DROP TABLE IF EXISTS shelf_details', []);
            tx.executeSql('DROP TABLE IF EXISTS common_data', []);
            tx.executeSql('DROP TABLE IF EXISTS s5_parameters', []);
            tx.executeSql('DROP TABLE IF EXISTS parameter_creteria', []);
            tx.executeSql('DROP TABLE IF EXISTS user_details', []);
            tx.executeSql('DROP TABLE IF EXISTS selected_store_shelf', []);
            tx.executeSql('DROP TABLE IF EXISTS post_data1', []);
            tx.executeSql('DROP TABLE IF EXISTS post_criteria_data', []);
            tx.executeSql('DROP TABLE IF EXISTS shelf_completed', []);
            tx.executeSql('DROP TABLE IF EXISTS mcl_list', []);
            tx.executeSql('DROP TABLE IF EXISTS brand_list', []);
            tx.executeSql('DROP TABLE IF EXISTS brand_post_data', []);
            tx.executeSql('DROP TABLE IF EXISTS completed_store', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS shelf_completed(store_id VARCHAR(100),shelf_id INT(100))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS completed_store(store_id INT(100))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS selected_store_shelf(selected_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(100))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS post_data1 (post_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50),imagedata TEXT, imagetype VARCHAR(50),imageuri TEXT ,fileSize VARCHAR(50))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS brand_post_data(brand_post_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),brand_id INT(10),no_of_brands VARCHAR(100))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS post_criteria_data(post_criteria_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),criteria_id INT(10),criteriayn VARCHAR(10),feedback VARCHAR(100) )',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user_details(id INT(20), user_name VARCHAR(50),language VARCHAR(50))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS store_details(id INT(4), store_type VARCHAR(5), store_name VARCHAR(200),store_loc VARCHAR(200),store_desc VARCHAR(1000),status VARCHAR(5) ,store_type_name VARCHAR(20))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS shelf_sample_images(image_name VARCHAR(20), image_value TEXT, image_des VARCHAR(300))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS shelf_details(id INT(10), shelf_type VARCHAR(20), shelf_name VARCHAR(200),shelf_desc VARCHAR(200),status VARCHAR(10),shelf_type_name VARCHAR(20),store_id INT(10)) ',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS common_data(store_instructions VARCHAR(1000),image_instructions VARCHAR(1000),shelf_instructions VARCHAR(1000),s5_instruction_name VARCHAR(200),s5_instruction_header VARCHAR(200),s5_instruction_details VARCHAR(1000),s5_logo_image TEXT,s5_girl_image TEXT, yes VARCHAR(20),no VARCHAR(20),store_header VARCHAR(70),shelf_header VARCHAR(70),smapleimage_header VARCHAR(70),pasas_header VARCHAR(70),Possition_header VARCHAR(70),Allocation_header VARCHAR(70),Segmantation_header VARCHAR(70),Adjacency_header VARCHAR(70),Availability_header VARCHAR(70),Sequencing_header VARCHAR(70),Next VARCHAR(10),Submit VARCHAR(10),Choose_Next_Shelf VARCHAR(30), Capture_Image VARCHAR(30), Example_Image VARCHAR(30), criteria_desc VARCHAR(90), criteria_question VARCHAR(90), background_image TEXT)',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS s5_parameters(id INT(10), parameter_type VARCHAR(100), parameter_desc VARCHAR(300),parameter_icon VARCHAR(200),status VARCHAR(10))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS parameter_creteria(id INT(10), parameter_id INT(500),criteria_name VARCHAR(500), criteria_desc VARCHAR(1000),criteria_image TEXT,questions VARCHAR(1000),status VARCHAR(10),creteria VARCHAR(50))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS mcl_list(id INT(10), parameter_id INT(500), mcl_questions VARCHAR(1000),store_id INT(10),shelf_id INT(10))',
              []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS brand_list(id INT(10), parameter_id INT(500), brand_name VARCHAR(1000),store_id INT(10), shelf_id INT(10))',
              []);
          }
        }
      );
    });
    changeOrientation()
    // changeIsOffline()
    // if (!isOffline) {
    //   Alert.alert(
    //     "Are you sure to change the current Shelf?",
    //     "If you change the current Shelf, your shelf details will be deleted",
    //     [
    //       {
    //         text: "NO",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       },
    //       {
    //         text: "YES", onPress: () => {
    //         }
    //       }
    //     ]
    //   );
    // }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM store_details',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          // console.log(temp, 'temp store');
          ChangeStoreChain(temp.filter((e) => e.store_type == "1"))
          ChangeStoreLocal(temp.filter((e) => e.store_type == "2"))
          ChangeStoreIndi(temp.filter((e) => e.store_type == "3"))
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM common_data',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          // console.log(temp, 'common data');
          Set_common_data(temp)
        }
      );
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleBackButton(),
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  const handleBackButton = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    }
  };

  const testquery = () => {
    db.transaction((tx) => {
      // tx.executeSql(
      //   'SELECT name FROM sqlite_master',
      //   [],);
      // tx.executeSql(
      //   'CREATE TABLE IF NOT EXISTS shelf_sample_images(image_name INT(10), image_value TEXT, image_des VARCHAR(300),image_instructions VARCHAR(1000))',
      //     [],);
      tx.executeSql(
        "SELECT * FROM store_details",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          // console.log(temp);
        }
      );
    });
  }
  const submit = () => {
    setLoading(true)
    const data = new FormData();
    data.append("accesskey", 90336);
    data.append("username", UserName);
    data.append("password", password);
    data.append("login", 1);
    axios
      .post('http://sddigitalcommunication.com/demo/shopology/api-v1.php', data)
      .then((res) => {
        let response = res.data;
        console.log(response.message)
        if (response.message === "login successfully") {

          setLoginValidation(false)
          let totSerData = 8;
          let totLoCData = 0;
          //shelf_completed data Inserting
          db.transaction(function (txn) {
            let keyvalue = Object.keys(response.data.shelf_completed)
            // console.log(keyvalue, 'key value')
            keyvalue.map((x) => {
              // console.log(response.data.shelf_completed[x], 'row data')
              let rowdata = response.data.shelf_completed[x]

              rowdata.map((s) => {
                txn.executeSql(
                  'INSERT INTO shelf_completed (store_id,shelf_id) VALUES (?,?)',
                  [x, s.shelf_id],
                  (tx, results) => {
                    if (results.rowsAffected > 0) {
                      console.log("shelf_completed inserted successfully")
                    }
                  }
                )
              })

            })
          })
          console.log(response.data.completed_store_only, 'completed store')
          db.transaction(function (txn) {

            response.data.completed_store_only.map((x) => {
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
          // db.transaction(function (txn) {
          // let keyvalue = Object.keys(response.data.completed_store_only)
          // console.log(keyvalue, 'key value')
          //   keyvalue.map((x) => {
          //     // console.log(response.data.shelf_completed[x], 'row data')
          //     let rowdata = response.data.completed_store_only[x]

          //     rowdata.map((s) => {
          //       txn.executeSql(
          //         'INSERT INTO completed_store (store_id) VALUES (?)',
          //         [x, s.shelf_id],
          //         (tx, results) => {
          //           if (results.rowsAffected > 0) {
          //             console.log("completed_store inserted successfully")
          //           }
          //         }
          //       )
          //     })

          //   })
          // })

          //User data inserting
          db.transaction(function (txn) {
            // console.log(response.data.user_details[0].id, 'response.data.user_details[0].id')
            txn.executeSql(
              'INSERT INTO user_details (id ,user_name,language) VALUES (?,?,?)', //Query to execute as prepared statement
              [
                response.data.user_details[0].id,
                response.data.user_details[0].user_name,
                response.data.user_details[0].language,
              ],  //Argument to pass for the prepared statement                  
              (tx, results) => {
                // console.log(results, 'user_details')
                if (results.rowsAffected > 0) {
                  console.log("user inserted successfully")
                }
              }
            );
          });

          //parameter_creteria data inserting
          response.data.parameter_creteria.map((x) => {
            // console.log(x, 'parameter x')
            let keyvalue = Object.keys(x)
            console.log(keyvalue, 'parameter keyvalue')
            x[keyvalue[1]].map((y) => {
              // console.log(y, 'paramaeter y')
              totSerData = totSerData + 1;
              db.transaction(function (txn) {
                txn.executeSql(
                  'INSERT INTO parameter_creteria (id , parameter_id , criteria_name,criteria_desc , criteria_image,questions,status,creteria) VALUES (?,?,?,?,?,?,?,?)', //Query to execute as prepared statement
                  [y.id, y.parameter_id, y.criteria_name, y.criteria_desc, y.criteria_image, y.questions, x.status, keyvalue[1]],  //Argument to pass for the prepared statement                  
                  (tx, results) => {
                    if (results.rowsAffected > 0) {
                      console.log("parameter_creteria all success")
                    }
                  } //Callback function to handle the result
                );
              });
            })
          })

          // mcl list
          // console.log(response.data.mcl_list, 'mcl list')
          response.data.mcl_list.map((x) => {
            // console.log(x, 'x')
            let keyvalue = Object.keys(x)
            // console.log(keyvalue, 'key value')

            totSerData = totSerData + 1;
            db.transaction(function (txn) {
              txn.executeSql(
                'INSERT INTO mcl_list (id , parameter_id , mcl_questions ,store_id, shelf_id) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
                [x.id, x.parameter_id, x.mcl_questions, x.store_id, x.shelf_id],  //Argument to pass for the prepared statement                  
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log("mcl list success fully inserted")
                  }
                } //Callback function to handle the result
              );
            });

          })

          // console.log(response.data.brand_list, 'brand list')
          response.data.brand_list.map((x) => {
            // console.log(x, 'x')
            let keyvalue = Object.keys(x)
            // console.log(keyvalue, 'key value')

            totSerData = totSerData + 1;
            db.transaction(function (txn) {
              txn.executeSql(
                'INSERT INTO brand_list (id , parameter_id , brand_name ,store_id, shelf_id) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
                [x.id, x.parameter_id, x.brand_name, x.store_id, x.shelf_id],  //Argument to pass for the prepared statement                  
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log("brand list success fully inserted")
                  }
                } //Callback function to handle the result
              );
            });

          })
          console.log(response.data.extras.Choose_Next_Shelf, 'next shelf')
          //common_data data inserting
          db.transaction(function (txn) {
            txn.executeSql(
              'INSERT INTO common_data (store_instructions,image_instructions,shelf_instructions,s5_instruction_name,s5_instruction_header,s5_instruction_details,s5_logo_image,s5_girl_image,yes,no,store_header,shelf_header,smapleimage_header,pasas_header,Possition_header,Allocation_header,Segmantation_header,Adjacency_header,Availability_header,Sequencing_header,Next,Submit,Choose_Next_Shelf, Capture_Image, Example_Image, criteria_desc, criteria_question, background_image)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              //,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              //  
              // ,s5_girl_image,yes,no,
              // store_header,shelf_header,smapleimage_header,pasas_header,
              // Possition_header,Allocation_header,Segmantation_header,Adjacency_header
              // ,Availability_header,Sequencing_header,Next,Submit,Choose_Next_Shelf, 
              // Capture_Image, Example_Image
              // ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', //Query to execute as prepared statement
              [
                response.data.store_instructions,
                response.data.image_instructions,
                response.data.shelf_instructions,
                response.data.slide5.instruction_name,
                response.data.slide5.instruction_header,
                response.data.slide5.instruction_details,
                response.data.slide5.logo_image,
                response.data.slide5.logo_image,
                response.data.yesno.yes,
                response.data.yesno.no,
                response.data.store_header,
                response.data.shelf_header,
                response.data.smapleimage_header,
                response.data.pasas_header,
                response.data.header_parameter.Position,
                response.data.header_parameter.Allocation,
                response.data.header_parameter.Segmentation,
                response.data.header_parameter.Adjacency,
                response.data.header_parameter.Availability,
                response.data.header_parameter.Sequencing,
                response.data.extras.Next,
                response.data.extras.Submit,
                response.data.extras.choose_next_shelf,
                response.data.extras.Capture_Image,
                response.data.extras.Example_Image,
                response.data.extras.criteria_desc,
                response.data.extras.criteria_question,
                response.data.slide5.background_image
              ],  //Argument to pass for the prepared statement                  
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log("common_data inserted successfully")
                }
              }
            );
          });

          //Store data inserting
          response.data.store_details.map((x) => {
            let keyvalue = Object.keys(x)
            // console.log(keyvalue)
            x[keyvalue[1]].map((y) => {
              totSerData = totSerData + 1;
              db.transaction(function (txn) {
                txn.executeSql(
                  'INSERT INTO store_details (id , store_type , store_name,store_loc ,store_desc, status,store_type_name) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
                  [y.id, y.store_type, y.store_name, y.store_loc, y.store_desc, y.status, x.store_type_name],  //Argument to pass for the prepared statement                  
                  (tx, results) => {
                    if (results.rowsAffected > 0) {
                      totLoCData = totLoCData + 1

                      console.log("store_details all success")

                    }
                  } //Callback function to handle the result
                );
              });
            })
          })


          //Shelf data inserting
          response.data.shelf_list.map((x) => {
            // console.log(x, 'x')
            totSerData = totSerData + 1;
            db.transaction(function (txn) {
              txn.executeSql(
                'INSERT INTO shelf_details (id , shelf_type , shelf_name,shelf_desc ,status, shelf_type_name, store_id) VALUES (?,?,?,?,?,?,?)', //Query to execute as prepared statement
                [x.id, x.shelf_type, x.shelf_name, x.shelf_desc, x.status, x.shelf_type_name, x.store_id],  //Argument to pass for the prepared statement                  
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log("shelf list success fully inserted")
                  }
                } //Callback function to handle the result
              );
            });

          })


          // shelf_sample_images data inserting
          response.data.shelf_sample_images.map((x) => {
            db.transaction(function (txn) {
              txn.executeSql(
                'INSERT INTO shelf_sample_images (image_name , image_value , image_des) VALUES (?,?,?)', //Query to execute as prepared statement
                [x.image_name, x.image_value, x.image_des],  //Argument to pass for the prepared statement                  
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log("shelf_sample_images inserted")
                  }
                } //Callback function to handle the result
              );
            });

          })

          // s5_parameters data inserting
          // response.data.slide5.parameters.map((x) => {
          //   db.transaction(function (txn) {
          //     txn.executeSql(
          //       'INSERT INTO s5_parameters (id , parameter_type_n , parameter_desc, parameter_icon, status) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
          //       [x.id, x.parameter_type_n, x.parameter_desc, x.parameter_icon, x.status],  //Argument to pass for the prepared statement                  
          //       (tx, results) => {
          //         if (results.rowsAffected > 0) {
          //           console.log("s5_parameters inserted")
          //         }
          //       } //Callback function to handle the result
          //     );
          //   });

          // })
          setLoading(false)
          navigation.navigate('StoreScreen');


          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM completed_store',
              [],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                console.log(temp, 'store completed')

              }
            );
          })
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
        } else if (response.message === "Invalid Username And password") {
          setLoginValidation(true)
          setLoading(false)

        }
        else if (response.message === "Theres is no Store") {

          setLoading(false)
          Alert.alert(
            "",
            "Stores not available",
            [
              {
                text: "Ok", onPress: () => {
                  console.log("there is no data in the store")
                }
              }
            ]
          )

        }

      })



  };

  // const readData = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem('id')
  //     if (userId !== null) {
  //       // setDatabase(userId)
  //       // console.log("Async")
  //       // navigation.navigate('BottomNav')
  //     }
  //   } catch (e) {
  //     console.log('Failed to fetch the data from storage .login')
  //   }
  // }
  // const saveData = async () => {
  //   try {
  //     await AsyncStorage.setItem('id', loginid)
  //     // console.log('Data successfully saved');
  //     // navigation.navigate('BottomNav')
  //   } catch (e) {
  //     console.log('Failed to save the data to the storage')
  //   }
  // }
  // const validate = (text) => {
  //   console.log(text);
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (reg.test(text) === false) {
  //     console.log("Email is Not Correct");
  //     setUserId(text)
  //      setEmailValidation(true)
  //   }
  //   else {
  //     setUserId(text)
  //     setEmailValidation(false)
  //   }
  // }
  const passwordVisibility = visibility ? <FontAwesome5 style={styles.visibilityIcon} color="white" size={25} name='eye-slash' onPress={() => { setVisibility(!visibility) }} /> :
    <FontAwesome5 style={styles.visibilityIcon} color="white" size={25} name='eye' onPress={() => { setVisibility(!visibility) }} />
  return (
    <LinearGradient colors={['#3eb1dc', '#9cdce8', '#e1f4fe']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} style={styles.container5}>
      <Spinner loading={loading} />
      <View style={styles.container}>
        <Image source={require("../images/headerLogo.png")} style={orientation == "POTRAIT" ? styles.LogoPotrait : styles.LogoLandscape}></Image>

        <Image style={orientation == "POTRAIT" ? styles.imagePotrait : styles.imageLandscape} source={require("../images/Pasas-horizontal.png")} />
        <Text style={styles.versionStyle}> V.2.1.2 </Text>
        {/* <StatusBar
          backgroundColor='#e393b5' /> */}
        {/* <StatusBar style="auto" /> */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="USER ID"
            placeholderTextColor="#ffffff"
            onChangeText={(u) => setUserName(u)}
          />
        </View>

        <View style={styles.inputView5}>
          <TextInput
            style={styles.TextInput}
            placeholder="PASSWORD"
            placeholderTextColor="#ffffff"
            // secureTextEntry={true}
            secureTextEntry={!visibility}
            onChangeText={(password) => setPassword(password)}
            onSubmitEditing={() => submit()}
          />
          {passwordVisibility}
        </View>
        <LinearGradient colors={['#82bc12', '#61910a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} style={styles.loginBtn}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => { submit() }}>
            <Text style={styles.loginText} >LOGIN</Text>
          </TouchableOpacity>
        </LinearGradient>
        {LoginValidation ? (
          <Text style={styles.alertMessage}>
            Invalid username or password!
          </Text>
        ) : <Text></Text>}

      </View>
      {/* <LinearGradient></LinearGradient> */}
      <Image source={require("../images/women1-with-logo.png")} style={orientation == "POTRAIT" ? styles.image5Potrait : styles.image5Landscape}></Image>
    </LinearGradient>
  );
}
export default PostLogin;