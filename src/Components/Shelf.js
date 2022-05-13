import React, { useEffect, useState, useContext } from "react";
// import styles from '../css/ShelfStyle'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StoreContext from "../store/StoreContext";
import logout from "../images/headerLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "./Logout";
import { Button, Card, TextField } from "@mui/material";
import BentoIcon from "@mui/icons-material/Bento";

function Shelf({ navigation }) {
  const {
    orientation,
    changeOrientation,
    shelfMain,
    shelfSecondary,
    ChangeShelfMain,
    post_criteria_data,
    selectedShelfid,
    shelf_commands,
    Set_Logined,
    Logined,
    ChangeShelfSecondary,
    Set_post_criteria_data,
    SelectedStoreData,
    common_data,
    selectedShelf,
    SetSelectedShelf,
    Set_post_data1,
    post_data1,
    Set_shelf_commands,
    ChangeSampleImage,
    parameter_creteria,
    Set_criterial_post,
    criterial_post,
    changeCriterialPost,
    ChangeImageUpload,
    Set_shelf_completed,
    ChangeImageCaptured,
    shelf_completed,
    Reset_for_logout,
    imageCaptured,
    shelfLength,
    SetShelfLength,
    Set_Brand_Post,
    brandPost,
    Set_Brand,
    brand,
    Set_Brand_Clear,
    ChangeMclData,
    changeBrandData,
    mclData,
    Shelf_Submit_Reset,
    Set_Refresh,
    refresh,
    StateReset_Forshelf,
    overallMclData,
    overallBrandData,
    shelfData,
    handleClose,
    openCreate,
  } = useContext(StoreContext);
  const [networkStatus, setNetworkStatus] = useState();
  const [shelfId, setShelfId] = useState();
  let navigate = useNavigate();
  let store_id = sessionStorage.getItem("StoreId");
  console.log(store_id, "store id");

  if (shelfMain.length == 0 && shelfData.length != 0) {

    let store_id = sessionStorage.getItem("StoreId");
    ChangeShelfMain(
      shelfData.filter((x) => x.store_id == store_id && x.shelf_type == "1")
    );
    ChangeShelfSecondary(
      shelfData.filter((x) => x.store_id == store_id && x.shelf_type == "2")
    );
  }
  useEffect(() => {
    let ShelfId = sessionStorage.getItem('ShelfId')

    if (shelfId == undefined && ShelfId != null) {
      setShelfId(ShelfId)
    }


  }, []);

  // console.log(brand, brandPost)

  const checkshelf = (shelf_id) => {
    // console.log(post_criteria_data.length, post_criteria_data, post_criteria_data.some((x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id))
    if (post_criteria_data.length != 0) {
      return (
        post_criteria_data.some(
          (x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id
        ) &&
        post_criteria_data.filter(
          (x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id
        ).length >=
        parameter_creteria.length + mclData.length
      );
      //.length === parameter_creteria.length
    } else {
      return false;
    }
  };
  const partialcheck = (shelf_id) => {
    if (post_criteria_data.length != 0) {
      return post_criteria_data.some(
        (x) => x.shelf_id === shelf_id && x.store_id === SelectedStoreData.id
      );
    } else {
      return false;
    }
  };

  const checkdisable = (shelf_id) => {
    return shelf_completed.some(
      (x) => x.shelf_id == shelf_id && x.store_id == SelectedStoreData.id
    );
  };
  console.log(partialcheck, selectedShelfid);
  const GradientBtn = ({ name, id }) => (
    <div>
      <Button
        style={{ width: "100%" }}

        disabled={checkdisable(id)}
        onClick={() => {
          onChangeShelf(name, id);
          Set_shelf_commands("")
        }}
        className={["col-md-8 col-lg-8 col-xl-12 col-xll-12 col-sm-12 ",
          checkdisable(id)
            ? "disabled border border-primary text-black"
            : partialcheck(id)
              ? "datas border border-primary text-black"
              : selectedShelfid == id
                ? "selected border border-primary text-white"
                : "default border border-secondary text-black",
        ]}
      >
        {name}
      </Button>
    </div>
  );
  // console.log(overallBrandData, 'overall branddata')
  const storeShelfData = (name, id) => {
    ChangeMclData(
      overallMclData.filter(
        (e) => e.store_id == SelectedStoreData.id && e.shelf_id == id
      )
    );

    changeBrandData(
      overallBrandData.filter(
        (e) => e.store_id == SelectedStoreData.id && e.shelf_id == id
      )
    );
  };

  function onChangeShelf(name, id) {
    if (
      selectedShelfid != id &&
      selectedShelfid != null &&
      !checkshelf(selectedShelfid) &&
      !partialcheck(selectedShelfid) &&
      imageCaptured.length != 0
    ) {
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
    } else if (selectedShelfid != id) {
      SetSelectedShelf(name, id);
      setShelfId(id);
      storeShelfData(name, id);
    }
  }

  // console.log(shelf_commands.filter(x=>x.), 'shelf commands')
  const saveandnext = () => {
    sessionStorage.setItem("ShelfId", shelfId);
    sessionStorage.setItem("ShelfComment", shelf_commands);
    sessionStorage.setItem("ShelfName", selectedShelf)
    navigate("/photos");
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
  };
  console.log(shelf_commands, 'shelf comment')
  return (
    <>
      {/* <Spinner loading={shelfMain.length == 0 || spinners} /> */}
      <Logout
        imageCaptured={imageCaptured}
        criterial_post={criterial_post}
        post_criteria_data={post_criteria_data}
        Reset_for_logout={Reset_for_logout}
        handleClose={handleClose}
        openCreate={openCreate}
      />
      <div
        style={{
          background: "linear-gradient(#16529a,#0c9ddc,#007cc6)",
        }}
        className="bg-primary d-flex align-items-center justify-content-between border border-primary"
      >
        {(imageCaptured.length == 0 &&
          criterial_post.length == 0 &&
          selectedShelfid != null &&
          post_criteria_data.length == 0) ||
          (selectedShelfid == null && post_criteria_data.length == 0) ? (
          <label
            className="logo_title"
            style={{ fontWeight: "bold", color: "white" }}
          >
            {common_data.length != 0 ? common_data[0].shelf_header : null} -{" "}
            {SelectedStoreData.label}
          </label>
        ) : (
          <label
            className="logo_title"
            style={{ fontWeight: "bold", color: "white" }}
          >
            {common_data.length != 0 ? common_data[0].shelf_header : null} -{" "}
            {SelectedStoreData.label}
            {/* - {SelectedStoreData} */}
          </label>
        )}
        <div>
          <img className="logo_image" src={logout} />
          <label
            className="headerLogout"
            onClick={() => {
              handleClose(true);
            }}
          >
            <LogoutIcon color="success" className="logout_icon" />
          </label>
        </div>
      </div>

      {shelfMain.length != 0 ? (
        <div
          style={{ backgroundColor: "#f0f1f2, #f0f1f2, #f0f1f2" }}
          //     start={{ x: 0, y: 0 }}
          //     end={{ x: 1, y: 1 }}
          className="bgStyle"
        >
          <div className="mx-3">
            <div
              className="mt-3 
               p-0
              "
            >
              <div
              // className=" d-flex  align-items-center"
              >
                <Card className="bg-light p-3 mt-3">
                  {common_data.length != 0
                    ? common_data[0].shelf_instructions
                    : null}
                </Card>
              </div>
            </div>

            {/* submit =\> */}
            {shelfMain.length != 0 ? (
              <Card className="mt-3 py-3">
                <div>
                  <label className="storeTitle mx-1">
                    <label>
                      {" "}
                      <BentoIcon color="primary" className="logout_icon" />{" "}
                    </label>
                    <label style={{ color: "#014686", fontWeight: "bold" }}>
                      {shelfMain.length != 0
                        ? shelfMain[0].shelf_type_name
                        : null}
                    </label>
                  </label>
                  <div className="d-flex justify-content-between flex-wrap mx-2">
                    {shelfMain
                      //data
                      .map((item) => (
                        <div className=" align-content-center mt-4 ">
                          <GradientBtn name={item.shelf_name} id={item.id} />

                          {/* <Text style={orientation == "POTRAIT" ? styles.storeTextPotrait : styles.storeTextLandscape}>{item.name}</Text> */}
                          <TextField
                            d="outlined-textarea"
                            // label="Multiline Placeholder"
                            placeholder="Open Feedback ( Max 256 Chars )"
                            multiline
                            className="w-52 mt-4"
                            rows={2}
                            inputProps={{
                              maxLength: 256,
                            }}
                            disabled={item.id != selectedShelfid}
                            length={25}
                            // disabled={!checkdisable(item.id)}

                            value={item.id != selectedShelfid ? "" : shelf_commands}
                            onChange={(u) => {
                              Set_shelf_commands(u.target.value);
                            }}
                          // multiline={true}
                          // numberOfLines={2}
                          // maxLines={3}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
            ) : null}
            {shelfSecondary.length != 0 ? (
              <Card className="mt-3 py-3">
                <div>
                  <label className="storeTitle mx-1">
                    <label>
                      {" "}
                      <BentoIcon color="primary" className="logout_icon" />{" "}
                    </label>
                    <label style={{ color: "#014686", fontWeight: "bold" }}>
                      {shelfMain.length != 0
                        ? shelfSecondary[0].shelf_type_name
                        : null}
                    </label>
                  </label>
                  <div className="d-flex justify-content-between flex-wrap mx-2">
                    {shelfSecondary
                      //data
                      .map((item) => (
                        <div className=" align-content-center mt-4 ">
                          <GradientBtn name={item.shelf_name} id={item.id} />

                          {/* <Text style={orientation == "POTRAIT" ? styles.storeTextPotrait : styles.storeTextLandscape}>{item.name}</Text> */}
                          <TextField
                            d="outlined-textarea"
                            // label="Multiline Placeholder"
                            placeholder="Open Feedback ( Max 256 Chars )"
                            multiline
                            className="w-52 mt-4"
                            rows={2}
                            disabled={item.id != selectedShelfid}
                            inputProps={{
                              maxLength: 256,
                            }}
                            // maxLength={256}
                            // disabled={!checkdisable(item.id)}

                            value={item.id != selectedShelfid ? "" : shelf_commands}
                            onChange={(u) => {
                              Set_shelf_commands(u.target.value);
                            }}
                          // multiline={true}
                          // numberOfLines={2}
                          // maxLines={3}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
          <Button
            variant="contained"
            style={{ float: "right" }}
            color="primary"
            className={
              selectedShelfid == null
                ? "float-right px-5 mt-3 mx-2"
                : "float-right px-5 mt-3 next_button mx-2"
            }
            disabled={selectedShelfid == null}
            onClick={() => {
              saveandnext();
            }}
          >
            {common_data.length != 0 ? common_data[0].Next : null}
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default Shelf;
