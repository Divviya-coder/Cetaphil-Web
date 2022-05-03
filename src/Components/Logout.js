import React, { useContext } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import StoreContext from '../store/StoreContext';



function LogoutFunction() {
    // const { Set_Logined, Set_criterial_post,
    //     Set_parameter_creteria,
    //     Set_shelf_commands,
    //     ChangeUser,
    //     LoginOnChange,
    //     changeOrientation,
    //     ChangeStoreChain,
    //     ChangeStoreLocal,
    //     ChangeStoreIndi,
    //     ChangeShelfMain,
    //     ChangeShelfSecondary,
    //     Set_common_data,
    //     Set_s5_parameters,
    //     SetSelectedStoreData,
    //     SetSelectedShelf,
    //     ChangeSampleImage,
    //     ChangeImageUpload } = useContext(StoreContext)
    var db = openDatabase({ name: 'CetaphilDatabase.db' });
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM store_details', []);
        tx.executeSql('DELETE FROM shelf_sample_images', []);
        tx.executeSql('DELETE FROM shelf_details', []);
        tx.executeSql('DELETE FROM common_data', []);
        tx.executeSql('DELETE FROM s5_parameters', []);
        tx.executeSql('DELETE FROM parameter_creteria', []);
        tx.executeSql('DELETE FROM user_details', []);
    });
    // Set_criterial_post([]),
    //     Set_parameter_creteria([]),
    //     Set_shelf_commands({ "1": "" }),
    //     ChangeUser(),
    //     LoginOnChange({ username: '', password: '' }),
    //     ChangeStoreChain([]),
    //     ChangeStoreLocal([]),
    //     ChangeStoreIndi([]),
    //     ChangeShelfMain([]),
    //     ChangeShelfSecondary([]),
    //     Set_common_data([{ 'shelf_instructions': '', 's5_logo_image': '', 's5_girl_image': '' }]),
    //     Set_s5_parameters([]),
    //     SetSelectedStoreData({ id: '' }),
    //     SetSelectedShelf(''),
    //     ChangeSampleImage([]),
    //     ChangeImageUpload([{ id: 1, type: "image" },
    //     { id: 2, type: "image" },
    //     { id: 3, type: "image" },
    //     { id: 4, type: "image" }
    //     ])
    // Set_Logined(false)
    // console.log('logout')
}

export default LogoutFunction