import React, { useContext, useEffect } from 'react'
// import styles from '../css/PositionStyle'
import StoreContext from '../store/StoreContext'
// import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Card, TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Logout from './Logout'

function Position() {
    const navigate = useNavigate()
    const { orientation, Set_parameter_creteria, parameter_creteria, common_data, Set_criterial_post, criterial_post,
        Reset_for_logout, SelectedStoreData, imageCaptured, post_criteria_data, handleClose, openCreate } = useContext(StoreContext)

    useEffect(() => {

    }, [])


    const Validation = () => {
        let datalen = 0
        let filteredData = parameter_creteria.filter((x) => x.parameter_id == 1).map((e) => { return e.id })
        let CheckedData = filteredData.map((x) => {
            if (criterial_post.some((e) => e.id === x)) {
                datalen += 1;
            }
        })
        return filteredData.length === datalen ? false : true
    }

    const CriteriaInsert = () => {
      sessionStorage.setItem('post_creteria_data', criterial_post)
        navigate('/Allocation')
        let selected_store_shelf = [];
        // db.transaction(function (txn) {
        //     //txn.executeSql('DROP TABLE IF EXISTS selected_store_shelf', []);
        //     txn.executeSql(
        //         "SELECT name FROM sqlite_master WHERE  name='post_criteria_data'",
        //         [],
        //         function (tx, res) {
        //             if (res.rows.length == 0) {
        //                 txn.executeSql(
        //                     'CREATE TABLE IF NOT EXISTS post_criteria_data(post_criteria_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10),criteria_id INT(10),criteriayn VARCHAR(10),feedback VARCHAR(100))',
        //                     [],
        //                     (tx, result1) => {
        //                         tx.executeSql(
        //                             "SELECT * FROM selected_store_shelf",
        //                             [],
        //                             (tx, results) => {
        //                                 var temp = [];
        //                                 for (let i = 0; i < results.rows.length; ++i)
        //                                     temp.push(results.rows.item(i));
        //                                 criterial_post.map((x) => {
        //                                     txn.executeSql(
        //                                         'INSERT INTO post_criteria_data (store_id ,shelf_id,criteria_id,criteriayn,feedback) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
        //                                         [temp[0].store_id, temp[0].shelf_id, x.id, x.yesorno, x.feedback],  //Argument to pass for the prepared statement                  
        //                                         (tx, results) => {
        //                                             if (results.rowsAffected > 0) {
        //                                                 // console.log('position insert1')
        //                                                 navigation.navigate('Allocation')
        //                                             }
        //                                         } //Callback function to handle the result
        //                                     );
        //                                 })

        //                             }
        //                         );
        //                     });
        //             } else {
        //                 let selected_store_shelf = [];
        //                 txn.executeSql("SELECT * FROM selected_store_shelf",
        //                     [],
        //                     (tx, Selectedresult) => {
        //                         if (Selectedresult.rows.length > 0) {
        //                             var tot = 0;
        //                             for (let i = 0; i < Selectedresult.rows.length; ++i)
        //                                 selected_store_shelf.push(Selectedresult.rows.item(i));
        //                             criterial_post.map((c) => {
        //                                 txn.executeSql(
        //                                     "SELECT * FROM post_criteria_data where store_id=? AND shelf_id=? AND criteria_id=?",
        //                                     [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
        //                                     (tx, postdata_results) => {
        //                                         if (postdata_results.rows.length > 0) {
        //                                             // console.log('up')
        //                                             txn.executeSql('UPDATE post_criteria_data set criteriayn=?,feedback=? where store_id=? AND shelf_id=? AND criteria_id=? ',
        //                                                 [c.yesorno, c.feedback, selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
        //                                                 (tx, result2) => {
        //                                                     if (result2.rowsAffected > 0) {
        //                                                         tot += 1;
        //                                                         if (criterial_post.length == tot) {
        //                                                             // console.log('position update')
        //                                                             navigation.navigate('Allocation')
        //                                                         }
        //                                                     }
        //                                                 }
        //                                             )
        //                                         } else {
        //                                             txn.executeSql(
        //                                                 'INSERT INTO post_criteria_data (store_id ,shelf_id,criteria_id,criteriayn,feedback) VALUES (?,?,?,?,?)', //Query to execute as prepared statement
        //                                                 [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id, c.yesorno, c.feedback],  //Argument to pass for the prepared statement                  
        //                                                 (tx, results) => {
        //                                                     if (results.rowsAffected > 0) {
        //                                                         tot += 1;
        //                                                         if (criterial_post.length == tot) {
        //                                                             // console.log('position insert2')
        //                                                             navigation.navigate('Allocation')
        //                                                         }
        //                                                     }
        //                                                 } //Callback function to handle the result
        //                                             );

        //                                         }
        //                                     }
        //                                 );
        //                             })
        //                         }
        //                     }
        //                 )

        //             }
        //         }
        //     )
        // });
    }
    

    const yes = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 1 : null
    const no = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 0 : null
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
        {/* <Spinner loading={parameter_creteria.length == 0} /> */}
        <div
          style={{
            background: "linear-gradient(#16529a,#0c9ddc,#007cc6)",
          }}
          className="d-flex align-items-center justify-content-between border border-primary"
        >
          {common_data.length != 0 ? (
            <div className="styles.headerLand">
              <label className="logo_title" style={{fontWeight:'bold', color:'white'}}>
                {common_data.length!=0?common_data[0].Possition_header!=undefined?common_data[0].Possition_header.split(" ")[0]:null:null}
                &nbsp;&nbsp;:&nbsp;&nbsp;
              </label>
              <label className="headerAvatarLand">
              <Avatar sx={{ bgcolor: '#0f5a8e' }}>{common_data.length!=0?common_data[0].Possition_header!=undefined?common_data[0].Possition_header.split(" ")[1][0]:null:null}</Avatar>
                
              </label>
              <label className="logo_title" style={{fontWeight:'bold', color:'white'}}>
                &nbsp;&nbsp;{common_data.length!=0?common_data[0].Possition_header!=undefined?common_data[0].Possition_header.split(" ")[1]:null:null}{" "}
              </label>
              {/* - {SelectedStoreData} */}
            </div>
          ) : null}
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
        {parameter_creteria.length != 0 ? (
          <div className="bgStyle">  
            <div className="cards">
              {parameter_creteria
                .filter((e) => e.parameter_id == 1)
                .map((e) => (
                  <Card>
                    <label
                      style={{ backgroundColor: "#0f5a8e" }}
                      className="w-100 px-2 py-2 text-light"
                    >
                      {e.criteria_name}
                    </label>
                    <label className="textBox py-3 px-2">{e.questions}</label>
                    <div
                      className="px-2 positionTextLand"
                      style={{ backgroundColor: "gray" }}
                    >
                      <label>{e.criteria_desc}</label>
                    </div>

                    <div className="buttonStyle py-2 px-2">
                      <label
                        className={
                          yes(e.id)
                            ? "positon_yesbtn_selected"
                            : "positon_yesbtn"
                        }
                        onClick={() => {
                          yes(e.id);
                          Set_criterial_post(e.id, "yesorno", 1, null, 1);
                        }}
                      >
                        {common_data[0].yes}
                      </label>
                      <label
                        className={
                          no(e.id)
                            ? "positon_nobtn_selected"
                            : "positon_nobtn"
                        }
                        onClick={() => {
                          no(e.id);
                          Set_criterial_post(e.id, "yesorno", 0, null, 0);
                        }}
                      >
                        {common_data[0].no}
                      </label>
                    </div>
                    <TextField
                    d="outlined-textarea"
                    // label="Multiline Placeholder"
                    placeholder="Open Feedback ( Max 256 Chars )"
                    multiline
                      rows={9}
                      inputProps={{
                        maxLength: 256,
                      }}
                      // fullWidth
                      className="w-100 mt-2"
                      // placeholder="Open Feedback ( Max 256 Chars )"
                      // multiline
                      
                      // maxLength={256}
                      // numberOfLines={9}
                      value={
                        criterial_post.filter((e5) => e5.id == e.id).length != 0
                          ? criterial_post.filter((e5) => e5.id == e.id)[0]
                              .feedback
                          : ""
                      }
                      onChange={(u) => {
                        Set_criterial_post(e.id, "feedback", null, u.target.value, u.target.value);
                        console.log(u.length);
                      }}
                    />
                  </Card>
                ))}
            </div>
            <Button variant="contained" style={{float: 'right'}} color="primary" className={Validation()?"float-right px-5 mt-3":"float-right px-5 mt-3 next_button"}
            disabled={Validation()}
            onClick={() => {
              CriteriaInsert();
            }}>{common_data.length != 0 ? common_data[0].Next : null}</Button>
            
          </div>
        ) : null}
      </>
    );
}

export default Position