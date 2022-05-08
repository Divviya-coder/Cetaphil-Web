import React, { useEffect, useState, useContext } from 'react'
import StoreContext from "../store/StoreContext";
import { useNavigate } from 'react-router-dom';
import logout from "../images/headerLogo.png"
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from './Logout'
import { Card } from '@mui/material';

function StoreScreen() {
    const { orientation, changeOrientation, storeChain, ChangeStoreChain, SelectedStoreData,
        storeLocal, ChangeStoreLocal, storeIndi, ChangeStoreIndi, SetSelectedStoreData, Set_parameter_creteria,
        Set_common_data, common_data, ChangeShelfMain, ChangeShelfSecondary, selectedShelfid,
        StateReset_Forshelf, criterial_post, post_criteria_data, post_data1, shelf_completed,
        Set_shelf_completed, Reset_for_logout, imageCaptured, parameter_creteria,
        refresh, ChangeMclData, mclData, changeBrandData, completedStores, Set_CompletedStores, shelfData,
        openCreate, handleClose } = useContext(StoreContext)
    let navigate = useNavigate();
    let userData = sessionStorage.getItem("username");
    console.log(userData, 'user detail')


    const [color, setColor] = useState(false)

    const checkdisable = (id) => {
        return completedStores.some((x) => x.store_id == id)
    }
    const checkPartial = (id) => {
        return shelf_completed.filter((x) => x.store_id == id).length != 0
    }
    const GradientBtn = ({ name, id }) => (
      <div>
        {/* <div className='col-md-8 col-lg-8 col-xl-12 col-xll-12 col-sm-12'>
         */}
        <div className="store_cards">
          <label
            className={
              SelectedStoreData.id == id
                ? "selected border border-primary"
                : checkdisable(id)
                ? "disabled border border-primary"
                : checkPartial(id)
                ? "datas border border-primary"
                : "default border border-primary"
            }
          >
            {name}
          </label>
        </div>
      </div>
    );
    const storeData = (store_name, id) => {
        SetSelectedStoreData(store_name, id)
        navigate('/Shelf')
        // db.transaction(function (txn) {

        //             ChangeShelfMain(shelfData.filter((e) => e.shelf_type == "1" && e.store_id == id))
        //             ChangeShelfSecondary(shelfData.filter((e) => e.shelf_type == "2" && e.store_id == id))

        //     txn.executeSql(
        //         "SELECT name FROM sqlite_master WHERE  name='selected_store_shelf'",
        //         [],
        //         function (tx, res) {
        //             if (res.rows.length == 0) {
        //                 txn.executeSql(
        //                     'CREATE TABLE IF NOT EXISTS selected_store_shelf(selected_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),shelf_cmd VARCHAR(50))',
        //                     [],
        //                     (tx, result1) => {
        //                         txn.executeSql(
        //                             'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
        //                             [id],  //Argument to pass for the prepared statement                  
        //                             (tx, results) => {
        //                                 if (results.rowsAffected > 0) {
        //                                     navigation.navigate('Shelf')
        //                                 }
        //                             } //Callback function to handle the result
        //                         );
        //                     });
        //             } else {
        //                 txn.executeSql(
        //                     "SELECT * FROM selected_store_shelf",
        //                     [],
        //                     (tx, results) => {
        //                         if (results.rows.length > 0) {
        //                             var selected_id = 1
        //                             txn.executeSql('UPDATE selected_store_shelf set store_id=? ',
        //                                 [id],
        //                                 (tx, result2) => {
        //                                     if (result2.rowsAffected > 0) {
        //                                         navigation.navigate('Shelf')
        //                                     }
        //                                 }
        //                             )
        //                         } else {
        //                             txn.executeSql(
        //                                 'INSERT INTO selected_store_shelf (store_id) VALUES (?)', //Query to execute as prepared statement
        //                                 [id],  //Argument to pass for the prepared statement                  
        //                                 (tx, results) => {
        //                                     if (results.rowsAffected > 0) {
        //                                         navigation.navigate('Shelf')
        //                                     }
        //                                 } //Callback function to handle the result
        //                             );
        //                         }
        //                     }
        //                 );

        //             }
        //         }
        //     )
        // });
    }
    const InsertStore = (store_name, id) => {
        ChangeShelfMain(shelfData.filter(x => x.store_id == id && x.shelf_type == "1"))
        ChangeShelfSecondary(shelfData.filter(x => x.stored_id == id && x.shelf_type == "2"))
        if (SelectedStoreData.id == id) {
            storeData(store_name, id)
            navigate('/Shelf')
        }
        else {
            StateReset_Forshelf()
            storeData(store_name, id)
            navigate('/Shelf')
        }
    }
    const unique = [...new Set(post_data1.map(item => item.shelf_id))];






    return (
      <>
        <Logout
          imageCaptured={imageCaptured}
          criterial_post={criterial_post}
          post_criteria_data={post_criteria_data}
          Reset_for_logout={Reset_for_logout}
          handleClose={handleClose}
          openCreate={openCreate}
        />
        {/* <FontAwesome5 name="arrow-left" style={styles.headerIcon} 
            onPress={() => { navigation.goBack() }} color="white" size={22} /> */}
        <div
          style={{
            background: "linear-gradient(#16529a,#0c9ddc,#007cc6)",
          }}
          className="bg-primary d-flex align-items-center justify-content-between border border-primary"
        >
          {" "}
          <div className="logo_title">
            {common_data.length != 0 ? common_data[0].store_header : null}
          </div>
          {/* - {SelectedStoreData} */}
          <div>
            <img className="logo_image" src={logout} />
            <label
            // onClick={() => { Logout() }}
            >
              <LogoutIcon
                color="success"
                className="logout_icon"
                onClick={() => {
                  handleClose(true);
                  //  Logout(imageCaptured, criterial_post, post_criteria_data, Reset_for_logout, handleClose, openCreate)
                }}
              />
            </label>
          </div>
        </div>
        <div className="m-3">
          <div>
            <Card className="bg-light p-3 mt-3">
              {common_data.length != 0
                ? common_data[0].store_instructions
                : null}
            </Card>

            <Card className="mt-4">
              {storeChain.length != 0 ? (
                <div className="bg-light">
                  Shopping Store&nbsp; &nbsp;
                  {storeChain.length != 0
                    ? storeChain[0].store_type_name
                    : null}
                  <br />
                  <br />
                  {/* <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeChain}
                                    renderItem={({ item }) => ( */}
                  {storeChain.map((item) => (
                    <label
                      disabled={checkdisable(item.id)}
                      onClick={() => {
                        InsertStore(item.store_name, item.id);
                      }}
                    >
                      <GradientBtn name={item.store_name} id={item.id} />
                    </label>
                  ))}
                </div>
              ) : null}
            </Card>

            <Card className="mt-4">
              {storeLocal.length != 0 ? (
                <div className="bg-light">
                  Store Alt&nbsp; &nbsp;
                  {storeLocal.length != 0
                    ? storeLocal[0].store_type_name
                    : null}
                  {/* <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeLocal}
                                    renderItem={({ item }) => ( */}
                  {storeLocal.map((item) => (
                    <label
                      disabled={checkdisable(item.id)}
                      onPress={() => {
                        InsertStore(item.store_name, item.id);
                      }}
                    >
                      <GradientBtn name={item.store_name} id={item.id} />
                    </label>
                  ))}
                  {/* )}
                                /> */}
                </div>
              ) : null}
            </Card>

            <Card className="mt-4">
              {storeIndi.length != 0 ? (
                <div className="bg-light">
                  Store&nbsp; &nbsp;
                  {storeIndi.length != 0 ? storeIndi[0].store_type_name : null}
                  {/* <FlatList
                                    key={listKey}
                                    numColumns={numberOfData}
                                    data={storeIndi}
                                    renderItem={({ item }) => ( */}
                  {storeIndi.map((item) => (
                    <label
                      disabled={checkdisable(item.id)}
                      onClick={() => {
                        InsertStore(item.store_name, item.id);
                      }}
                    >
                      <GradientBtn name={item.store_name} id={item.id} />
                    </label>
                  ))}
                  {/* )}
                                /> */}
                </div>
              ) : null}
            </Card>
          </div>

          {/* </View> */}
        </div>
      </>
    );
}

export default StoreScreen