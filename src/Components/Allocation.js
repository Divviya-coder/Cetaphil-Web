import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import styles from '../css/AllocationStyle'
import StoreContext from '../store/StoreContext'
// import Spinner from './Spinner'
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Button, Card, TextField } from '@mui/material';
import Logout from './Logout';

function Allocation() {
    const { orientation, Set_parameter_creteria, parameter_creteria, common_data, Set_criterial_post, criterial_post,
        Reset_for_logout, SelectedStoreData, imageCaptured, post_criteria_data, mclData,
        brandData, brandPost, Set_Brand_Post, brand, Set_Brand, Set_Brand_Clear, changeBrandData, overallBrandData, selectedShelfid, overallMclData, ChangeMclData, handleClose, openCreate } = useContext(StoreContext)
    // if (brandPost[0].no_of_brands == undefined) {
    //     Set_Brand_Post([])
    // }
    const navigate = useNavigate()
    // console.log(overallBrandData, selectedShelfid+'brand data')
    if((brandData.length==0 && overallBrandData.length!=0)||( mclData.length==0 && overallMclData.length!=0)) {
    let store_id = sessionStorage.getItem('selectedStore')
        let shelf_id = sessionStorage.getItem('selectedShelf')
    changeBrandData(overallBrandData.filter((e) => e.store_id == store_id && e.shelf_id == shelf_id))
        ChangeMclData(overallMclData.filter((e) => e.store_id == store_id && e.shelf_id == shelf_id))
    }
    useEffect(() => {
        
        if (brandPost.length != 0 && brandPost[0].no_of_brands == undefined) {
            Set_Brand_Clear([])
            // console.log(brandPost, 'useeffect brandpost')
        }



    }, [])

    const mclName = parameter_creteria.filter((e) => e.parameter_id == 4 && e.questions != null)
    const CriteriaInsert = () => {
        navigate('/Segmentation')
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
        //                                                 navigation.navigate('Segmentation')
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
        //                             var tot5 = 0;
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
        //                                                             navigation.navigate('Segmentation')
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
        //                                                             navigation.navigate('Segmentation')
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

        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "SELECT name FROM sqlite_master WHERE  name='brand_post_data'",
        //         [],
        //         function (tx, res) {
        //             console.log(res.rows, 'first if')
        //             if (res.rows.length == 0) {
        //                 txn.executeSql(
        //                     'CREATE TABLE IF NOT EXISTS brand_post_data(brand_id INTEGER PRIMARY KEY AUTOINCREMENT,store_id  INT(10),shelf_id INT(10), no_of_brands VARCHAR(100))',
        //                     [],
        //                     (tx, result1) => {
        //                         tx.executeSql(
        //                             "SELECT * FROM selected_store_shelf",
        //                             [],
        //                             (tx, results) => {
        //                                 var temp = [];
        //                                 for (let i = 0; i < results.rows.length; ++i)
        //                                     temp.push(results.rows.item(i));
        //                                 console.log(temp, 'brand value')
        //                                 brandPost.map((x) => {
        //                                     console.log(x, 'x')
        //                                     txn.executeSql(
        //                                         'INSERT INTO brand_post_data (store_id ,shelf_id,brand_id,no_of_brands) VALUES (?,?,?,?)', //Query to execute as prepared statement
        //                                         [temp[0].store_id, temp[0].shelf_id, x.id, x.no_of_brands],  //Argument to pass for the prepared statement                  
        //                                         (tx, results) => {
        //                                             if (results.rowsAffected > 0) {
        //                                                 console.log('brand post data insert1')
        //                                                 navigation.navigate('Segmentation')
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
        //                             // var tot = 0;
        //                             var tot5 = 0;
        //                             for (let i = 0; i < Selectedresult.rows.length; ++i)
        //                                 selected_store_shelf.push(Selectedresult.rows.item(i));
        //                             brandPost.map((c) => {
        //                                 console.log(c, 'c')
        //                                 console.log(selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id)
        //                                 txn.executeSql(
        //                                     "SELECT * FROM brand_post_data where store_id=? AND shelf_id=? AND brand_id=?",
        //                                     [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
        //                                     (tx, postdata_results) => {
        //                                         console.log(postdata_results, 'postdata_results')
        //                                         if (postdata_results.rows.length > 0) {
        //                                             console.log('up')
        //                                             txn.executeSql('UPDATE brand_post_data set no_of_brands=? where store_id=? AND shelf_id=? AND brand_id=? ',
        //                                                 [c.no_of_brands, selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id],
        //                                                 (tx, result2) => {
        //                                                     if (result2.rowsAffected > 0) {
        //                                                         tot5 += 1;
        //                                                         if (brandPost.length == tot5) {
        //                                                             console.log('brand update')
        //                                                             navigation.navigate('Segmentation')
        //                                                         }
        //                                                     }
        //                                                 }
        //                                             )
        //                                         }
        //                                         else {
        //                                             console.log('else else')
        //                                             txn.executeSql(
        //                                                 'INSERT INTO brand_post_data (store_id ,shelf_id,brand_id,no_of_brands) VALUES (?,?,?,?)', //Query to execute as prepared statement
        //                                                 [selected_store_shelf[0].store_id, selected_store_shelf[0].shelf_id, c.id, c.no_of_brands],  //Argument to pass for the prepared statement          

        //                                                 (tx, results) => {
        //                                                     console.log(results, 'results')
        //                                                     if (results.rowsAffected > 0) {
        //                                                         tot5 += 1;
        //                                                         if (brandPost.length == tot5) {
        //                                                             console.log('brand insert2')
        //                                                             navigation.navigate('Segmentation')
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

    // console.log(brandData.length, brandPost.length, brand, 'length')
    const Validation = () => {
        let datalen = 0
        let datalen5 = 0
        let filteredData = parameter_creteria.filter((x) => x.parameter_id == 4 && x.questions == null).map((e) => { return e.id })
        let filteredData5 = mclData.map((e) => { return e.id })
        let CheckedData = filteredData.map((x) => {
            if (criterial_post.some((e) => e.id === x)) {
                datalen += 1;
            }
        })
        let CheckedData5 = filteredData5.map((x) => {
            if (criterial_post.some((e) => e.id === x)) {
                datalen5 += 1;
            }
        })
        return filteredData.length === datalen && filteredData5.length === datalen5 && brandData.length <= brandPost.length
            ? false : true
    }
    
    var filterValue = (eventid) => criterial_post.find(e5 => e5.id == eventid)
    const yes = (eventid) => filterValue(eventid) ? filterValue(eventid).yesorno == 1 : null
    const no = (eventid) => filterValue(eventid) ? filterValue(eventid).yesorno == 0 : null

    const e5 = parameter_creteria.filter((e) => e.parameter_id == 2)[0]
    // console.log(overallBrandData.length, 'mcldata')
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
          className="bg-primary d-flex align-items-center justify-content-between border border-primary w-100"
        >
          {common_data.length != 0 ? (
            <div className="headerLand">
              <label
                className="logo_title"
                style={{ fontWeight: "bold", color: "white" }}
              >
                {common_data[0].length != 0
                  ? common_data[0].Allocation_header != undefined
                    ? common_data[0].Allocation_header.split(" ")[0]
                    : null
                  : null}
                &nbsp;&nbsp;:&nbsp;&nbsp;
              </label>
              <label className="headerAvatarLand">
                <Avatar sx={{ bgcolor: "blue" }}>
                  {common_data[0].length != 0
                    ? common_data[0].Allocation_header != undefined
                      ? common_data[0].Allocation_header.split(" ")[1][0]
                      : null
                    : null}
                </Avatar>
              </label>
              <label
                className="logo_title"
                style={{ fontWeight: "bold", color: "white" }}
              >
                &nbsp;&nbsp;
                {common_data[0].length != 0
                  ? common_data[0].Allocation_header != undefined
                    ? common_data[0].Allocation_header.split(" ")[1]
                    : null
                  : null}
                &nbsp;&nbsp;{" "}
              </label>
              <label
                className="logo_title"
                style={{ fontWeight: "bold", color: "white" }}
              >
                +&nbsp;&nbsp;
                {common_data[0].length != 0
                  ? common_data[0].Allocation_header != undefined
                    ? common_data[0].Allocation_header.split(" ")[3]
                    : null
                  : null}
              </label>

              {/* - {SelectedStoreData} */}
            </div>
          ) : null}
          <div>
            <img
              className="logo_image"
              src={require("../images/headerLogo.png")}
            />
            <label className="headerLogout" onClick={() => handleClose(true)}>
              <LogoutIcon color="success" className="logout_icon" />
            </label>
          </div>
        </div>

        {parameter_creteria.length != 0 ? (
          <div>
            <div className="d-flex mx-2">
              <div className="d-flex justify-content-between flex-column">
                <div>
                  <div className="cards">
                    {parameter_creteria
                      .filter((e) => e.parameter_id == 2)
                      .map((e) => (
                        <Card>
                          <label
                            style={{ backgroundColor: "#16529a" }}
                            className="w-100 px-2 py-2 text-light"
                          >
                            {e.criteria_name}
                          </label>
                          <label className="textBox py-3 px-2">
                            {e.questions}
                          </label>
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
                                  : "positon_yesbtn"
                              }
                              onPress={() => {
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
                            // fullWidth
                            className="w-100 mt-2"
                            // placeholder="Open Feedback ( Max 256 Chars )"
                            // multiline

                            // maxLength={256}
                            // numberOfLines={9}
                            value={
                              criterial_post.filter((e5) => e5.id == e.id)
                                .length != 0
                                ? criterial_post.filter(
                                    (e5) => e5.id == e.id
                                  )[0].feedback
                                : ""
                            }
                            onChange={(u) => {
                              Set_criterial_post(
                                e.id,
                                "feedback",
                                null,
                                u.target.value,
                                u.target.value
                              );
                              console.log(u.length);
                            }}
                          />
                        </Card>
                      ))}
                  </div>
                  <div className="cards">
                    {brandData.length != 0 ? (
                      <div className="card">
                        <label
                          style={{ backgroundColor: "#16529a" }}
                          className="w-100 px-2 py-2 text-light"
                        >
                          Brand
                        </label>
                        <div className="brandScroll">
                          {brandData.map((b) => (
                            <div className="d-flex justify-content-between py-1">
                              <label className="brandText">
                                {b.brand_name}
                              </label>
                              <input
                                type="textInput"
                                className="w-25"
                                placeholder="0"
                                // maxLength={3}
                                // keyboardType='number-pad'
                                value={
                                  brandPost.filter((e5) => e5.id == b.id)
                                    .length != 0
                                    ? brandPost.filter((e5) => e5.id == b.id)[0]
                                        .no_of_brands
                                    : ""
                                }
                                onChange={(u) => {
                                  Set_Brand_Post(
                                    b.id,
                                    "no_of_brands",
                                    u.target.value,
                                    u.target.value
                                  );
                                }}
                              ></input>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <Card className="cards_big">
                {mclData.length != 0 ? (
                  <div>
                    <label
                      style={{ backgroundColor: "#16529a" }}
                      className="w-100 px-2 py-2 text-light"
                    >
                      {common_data[0].criteria_desc}
                    </label>
                    <label className="py-2">
                      {common_data[0].criteria_question}
                    </label>
                    <div style={{ height: "100%" }}>
                      {mclData.map((e) => (
                        <div className="border border-secondary rounded px-1">
                          <label className="mclQuestions">
                            {e.mcl_questions}
                          </label>

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
                              onPress={() => {
                                no(e.id);
                                Set_criterial_post(e.id, "yesorno", 0, null, 0);
                              }}
                            >
                              {common_data[0].no}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Card>
            </div>

            <Button
              variant="contained"
              style={{ float: "right" }}
              color="primary"
              className={
                Validation()
                  ? "float-right px-5 mt-3"
                  : "float-right px-5 mt-3 next_button"
              }
              disabled={Validation()}
              onClick={() => {
                CriteriaInsert();
              }}
            >
              {common_data.length != 0 ? common_data[0].Next : null}
            </Button>
          </div>
        ) : null}
      </>
    );
}

export default Allocation