import React, { useEffect, useContext } from 'react'
// import styles from '../css/PasasStyle';
import StoreContext from "../store/StoreContext";
// import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom'
function Pasas({ navigation }) {
    const { common_data, s5_parameters, Set_s5_parameters, orientation, Set_parameter_creteria,
        Reset_for_logout, SelectedStoreData, imageCaptured, post_criteria_data, criterial_post } = useContext(StoreContext)
    const navigate = useNavigate()
    useEffect(() => {

        // db.transaction((tx) => {
        //     tx.executeSql(
        //         'SELECT * FROM post_data1',
        //         [],
        //         (tx, results) => {
        //             var temp = [];
        //             for (let i = 0; i < results.rows.length; ++i)
        //                 temp.push(results.rows.item(i));
        //             // console.log(temp, 'post_data1 database');
        //             // Set_common_data(temp)
        //         }
        //     );
        //     tx.executeSql(
        //         'SELECT * FROM parameter_creteria',
        //         [],
        //         (tx, results) => {
        //             var temp = [];
        //             for (let i = 0; i < results.rows.length; ++i)
        //                 temp.push(results.rows.item(i));
        //             Set_parameter_creteria(temp)
        //         }
        //     );
        // });
    }, [])
    function deleteTables() {

        Reset_for_logout()
        navigate('/Login')
    }
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

    return (
        <>
            {/* <Spinner loading={s5_parameters.length == 0} /> */}
            <div
                // colors={['#16529a', '#0c9ddc', '#007cc6']}
                //     start={{ x: 0, y: 0 }}
                //     end={{ x: 1, y: 1 }}
                className='headerStyle'>
                <label className='headerTextLand'>{common_data.length != 0 ? common_data[0].pasas_header : null}
                    {/* - {SelectedStoreData} */}
                </label>
                <img className='logo_image' src={require('../images/headerLogo.png')} />
                <label className='headerLogout' onClick={() => { Logout() }} >Logout</label>
            </div>
            {/* {
                s5_parameters.length != 0 ? */}
            <div
                colors={['#f0f1f2', '#f0f1f2', '#f0f1f2']}
                className='bgStyle'>
                <img src={common_data[0].background_image} />
                <label className='nextBtnLandscape'
                    onClick={() => {
                        navigate('/Position')
                    }}>
                    <div
                        // colors={['#82bc12', '#61910a']}

                        //     start={{ x: 0, y: 0 }}
                        //     end={{ x: 1, y: 1 }} 
                        className='nextBtnLandscape' >
                        <label className='nextText' >{common_data[0].Next}</label>
                    </div>
                </label>
            </div>
        </>
    )
}

export default Pasas