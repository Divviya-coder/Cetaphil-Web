import React, { useEffect, useContext } from "react";
// import styles from '../css/PasasStyle';
import StoreContext from "../store/StoreContext";
// import Spinner from './Spinner';
import { useNavigate } from "react-router-dom";
function Pasas({ navigation }) {
  const {
    common_data,
    s5_parameters,
    Set_s5_parameters,
    orientation,
    Set_parameter_creteria,
    Reset_for_logout,
    SelectedStoreData,
    imageCaptured,
    post_criteria_data,
    criterial_post,
  } = useContext(StoreContext);
  const navigate = useNavigate();
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
  }, []);
  function deleteTables() {
    Reset_for_logout();
    navigate("/Login");
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
        style={{
          background:
            "linear-gradient(-26deg, #e1f4fe 0%, #9cdce8 48%, #3eb1dc 91%)",
        }}
        className="bg-primary d-flex align-items-center justify-content-between border border-primary"
      >
        <label className="headerTextLand">
          {common_data.length != 0 ? common_data[0].pasas_header : null}
          {/* - {SelectedStoreData} */}
        </label>
        <div>
          <img
            className="logo_image"
            src={require("../images/headerLogo.png")}
          />
          <label
            className="headerLogout"
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </label>
        </div>
      </div>
      {/* {
                s5_parameters.length != 0 ? */}
      <div colors={["#f0f1f2", "#f0f1f2", "#f0f1f2"]} className="bgStyle">
        <img src={common_data[0].background_image} className="img-fluid" />
        <label
          className="nextBtnLandscape"
          onClick={() => {
            navigate("/Position");
          }}
        >
          <div>
            <div
              style={{ backgroundColor: "#82bc12, #61910a" }}
              className="d-flex jutify-content-between"
            >
              <div></div>

              <label className="btn btn-success border border-rounded">
                {common_data[0].Next}
              </label>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}

export default Pasas;
