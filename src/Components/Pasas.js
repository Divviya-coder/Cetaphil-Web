import React, { useEffect, useContext } from "react";
// import styles from '../css/PasasStyle';
import StoreContext from "../store/StoreContext";
// import Spinner from './Spinner';
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Logout from './Logout'
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
    handleClose,
    openCreate
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
      {/* <Spinner loading={s5_parameters.length == 0} /> */}
      <div
        style={{
          background: "linear-gradient(#16529a,#0c9ddc,#007cc6)",
        }}
        className="d-flex align-items-center justify-content-between border border-primary"
      >
        <div >
          <label  className="logo_title" style={{fontWeight:'bold', color:'white'}}>
            {common_data.length != 0 ? common_data[0].pasas_header : null}
            {/* - {SelectedStoreData} */}
          </label>
        </div>
        <div>
          <img
            className="logo_image"
            src={require("../images/headerLogo.png")}
          />
          <label
            className="headerLogout"
            onClick={() => {
              handleClose(true)
            }}
          >
            <LogoutIcon color="success" className="logout_icon" />
          </label>
        </div>
      </div>
      {/* {
                s5_parameters.length != 0 ? */}
      <div className="main_bigimage">
        <div className="row">
          <div className="col-12">
            <img src={common_data[0].background_image} className="img-fluid" />
          </div>
        </div>
        <Button variant="contained" style={{float: 'right'}} color="primary" className="float-right px-5 mt-3 next_button"
            
            onClick={() => {
              navigate("/Position");
            }}>{common_data.length != 0 ? common_data[0].Next : null}</Button>
       
      </div>
    </>
  );
}

export default Pasas;
