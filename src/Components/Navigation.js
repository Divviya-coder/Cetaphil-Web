import React, { useEffect, useContext, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  AsyncStorage,
  Image
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import StoreScreen from './StoreScreen';
import Shelf from './Shelf';
import Photos from './Photos';
import Pasas from './Pasas';
import Position from './Position';
import Allocation from './Allocation';
import Segmentation from './Segmentation';
import Adjacency from './Adjacency';
import Sequencing from './Sequencing';
import PostLogin from './PostLogin';
import LinearGradient from 'react-native-linear-gradient'
import Login from './Login'
import { createStackNavigator } from '@react-navigation/stack';
import StoreContext from "../store/StoreContext";
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

function Navigation() {
  const { Logined, Set_Logined, isOffline, changeIsOffline } = useContext(StoreContext)
  const NavStack = createStackNavigator();
  var db = openDatabase({ name: 'CetaphilDatabase.db' });

  const [networkStatus, setNetworkStatus] = useState(0)
  //useState(NetInfo.fetch().then(state => { return state.isConnected }))




  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM store_details',
        [],
        (tx, results) => {
          var temp = [];
          console.log(results, 'store_details')

          if (results.rows.length != 0) {
            Set_Logined(true)
            console.log('true', true)
          }
          else {
            Set_Logined(false)
            console.log('false', false)
          }

        }
      );

    });
    // return () => clearInterval(interval);
  }, []);
  if (networkStatus == 2) {
    Alert.alert(
      "You are back to online",
      ""
      [
      { text: "OK", onPress: () => setNetworkStatus(0) }
      ]
    );
  }

  return (
    <NavigationContainer independent={true}>
      <NavStack.Navigator initialRouteName={Logined === false ? Login : StoreScreen}>
        {Logined === false ?
          (
            <NavStack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

          )
          :
          (
            <>
            </>
          )

        }


        <NavStack.Screen
          name="StoreScreen"
          component={StoreScreen}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Shelf"
          component={Shelf}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Photos"
          component={Photos}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Pasas"
          component={Pasas}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Position"
          component={Position}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Allocation"
          component={Allocation}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Segmentation"
          component={Segmentation}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Adjacency"
          component={Adjacency}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Sequencing"
          component={Sequencing}
          options={{ headerShown: false }}
        />

        <NavStack.Screen
          name="PostLogin"
          component={PostLogin}
          options={{ headerShown: false }}
        />
        {/* <NavStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}

      </NavStack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation