import React, { useContext, useEffect, useState } from 'react'
// import styles from '../css/SequencingStyle'
import StoreContext from '../store/StoreContext'
// import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material';
import './Sequencingstyle.css'
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from '@mui/material/Avatar';
import Logout from './Logout';

function Sequencing() {
  const { orientation, Set_parameter_creteria, parameter_creteria, StateReset_Forshelf,
    shelf_commands, Set_shelf_completed, common_data, Reset_for_logout,
    Set_criterial_post, criterial_post, SelectedStoreData, Set_post_criteria_data,
    Set_post_data1, imageCaptured, post_criteria_data, post_data1,
    Set_Refresh, refresh, Set_Brand, brand, handleClose,
    openCreate, selectedShelfid, brandPost, user_details, Set_CompletedStores } = useContext(StoreContext)
  let navigate = useNavigate()
  const [Spinners, setSpinners] = useState(false);
  const [visible, setVisible] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    // db.transaction((tx) => {
    //     tx.executeSql(
    //         'SELECT * FROM brand_post_data',
    //         [],
    //         (tx, results) => {
    //             var temp = [];
    //             for (let i = 0; i < results.rows.length; ++i) {
    //                 console.log(results.rows.item(i), temp, 'console brand')
    //                 temp.push(results.rows.item(i));
    //             }
    //             Set_Brand(temp);
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




  const unique = [...new Set(post_data1.map(item => item.shelf_id))];




  console.log("", 'sequencing criteria')
  // console.log(user_details, 'sequencing spinner')






  const Validation = () => {
    let datalen = 0
    let filteredData = parameter_creteria.filter((x) => x.parameter_id == 6).map((e) => { return e.id })
    let CheckedData = filteredData.map((x) => {
      if (criterial_post.some((e) => e.id === x)) {
        datalen += 1;
      }

    })
    return filteredData.length === datalen ? false : true
  }


  const yes = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 1 : null
  const no = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 0 : null
  const na = (eventid) => criterial_post.find(e5 => e5.id == eventid) ? criterial_post.find(e5 => e5.id == eventid).yesorno == 2 : null
  // console.log(post_data1.length, 'post data')
  console.log(user_details, 'user details')
  function submit() {
    setVisible(false)
    var PostImg = {};
    var PostNoOfBrands = {};
    var PostBrandId = {};
    // let UserDeatails = {};
    var Postfeedback = {}
    var PostYN = {}
    var PostCriteriaId = {}
    var feedtemp = [];
    var yntemp = [];
    var idtemp = [];
    for (let i = 0; i <
      criterial_post.length; ++i) {
      // console.log([i], criterial_post[i].yesorno, 'yn')
      yntemp = { ...yntemp, [criterial_post[i].id]: criterial_post[i].yesorno };
      feedtemp = { ...feedtemp, [criterial_post[i].id]: criterial_post[i].feedback };
      idtemp = { ...idtemp, [i]: criterial_post[i].id }
    }
    Postfeedback = { ...Postfeedback, [selectedShelfid]: feedtemp == null ? "" : feedtemp }
    PostYN = { ...PostYN, [selectedShelfid]: yntemp }
    PostCriteriaId = { ...PostCriteriaId, [selectedShelfid]: idtemp }
    var imgtemp = {};
    for (let i = 0; i < imageCaptured.length; ++i) {
      imgtemp = { ...imgtemp, [i]: imageCaptured[i].uriImage };
    }
    PostImg = { ...PostImg, [selectedShelfid]: imgtemp };
    var brandvaluestemp = [];
    var brandidtemp = [];
    for (let i = 0; i <
      brandPost.length; ++i) {
      brandvaluestemp = { ...brandvaluestemp, [brandPost[i].id]: brandPost[i].no_of_brands };
      brandidtemp = { ...brandidtemp, [i]: brandPost[i].id }
    }
    PostNoOfBrands = { ...PostNoOfBrands, [selectedShelfid]: brandvaluestemp }
    PostBrandId = { ...PostBrandId, [selectedShelfid]: brandidtemp }



    const data = new FormData();
    data.append("accesskey", 90336);
    data.append("store_id", SelectedStoreData.id);
    data.append("store", 1);
    data.append("emp_id", user_details.id);
    data.append("shelf_id", { "0": selectedShelfid });//
    data.append("feedback", { "0": shelf_commands });
    data.append("capture_image", PostImg); //
    data.append("criteria", PostCriteriaId); //
    data.append("ct_feedback", Postfeedback); //
    // data.append("ct_feedback", JSON.stringify(Postfeedback)); //
    data.append("brand_list", PostBrandId); //
    data.append("brand_value", PostNoOfBrands); //
    data.append("c_status", PostYN);//
    console.log("accesskey", 90336);
    console.log("store_id", SelectedStoreData.id);
    console.log("store", 1);
    console.log("emp_id", user_details.id);
    console.log("shelf_id", { "0": selectedShelfid });//
    console.log("feedback", { "0": shelf_commands });
    console.log("capture_image", PostImg); //
    console.log("criteria", PostCriteriaId); //
    console.log("ct_feedback", Postfeedback); //
    // data.append("ct_feedback", JSON.stringify(Postfeedback)); //
    console.log("brand_list", PostBrandId); //
    console.log("brand_value", PostNoOfBrands); //
    console.log("c_status", PostYN);//  
    axios
      .post('http://sddigitalcommunication.com/demo/shopology_demo/api-v1.php', data)
      .then((res) => {
        console.log(res.data, 'res data')
        let response = res.data;
        console.log(response.message, 'response message');
        if (response.message === 'success') {
          console.log(response.message, 'response message')
          setSubmitSuccess(true)
          //completed store         
          Set_CompletedStores(
            response.data.completed_store_only.map((x) => {
              return {
                ...x,
                "store_id": x[0]
              }
            })
          )
          //shelf_completed data Inserting
          let keyvalue = Object.keys(response.data.shelf_completed)
          keyvalue.map((x) => {
            let rowdata = response.data.shelf_completed[x]
            Set_shelf_completed(rowdata.map((s) => {
              return {
                ...s,
                "store_id": x,
                "shelf_id": s.shelf_id
              }
            }))
          })

        }
      })
      .catch((e) => { console.log(e, 'e') })

  }
  const finalClose = () => {
    sessionStorage.removeItem('StoreName')
    sessionStorage.removeItem('StoreId')
    sessionStorage.removeItem('brand_data')
    sessionStorage.removeItem('post_creteria_data')
    sessionStorage.removeItem('ShelfId')
    sessionStorage.removeItem('ShelfName')
    sessionStorage.removeItem('ShelfComment')
    navigate('/StoreScreen')
    Reset_for_logout()
    setSubmitSuccess(false)
  }
  return (
    <>
      <Dialog open={visible} onClose={() => { setVisible(false) }}>
        <DialogTitle>Are you sure to submit?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setVisible(false)}>CANCEL</Button>
          <Button onClick={() => { submit() }}>SUBMIT</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={submitSuccess} onClose={() => { finalClose() }}>
        <DialogTitle>Submitted Successfully</DialogTitle>
        <DialogActions><Button onClick={() => { finalClose() }}></Button>
        </DialogActions>
      </Dialog>
      <Logout
        imageCaptured={imageCaptured}
        criterial_post={criterial_post}
        post_criteria_data={post_criteria_data}
        Reset_for_logout={Reset_for_logout}
        handleClose={handleClose}
        openCreate={openCreate}
      />
      {/* <Spinner loading={parameter_creteria.length == 0 || Spinners} /> */}
      <div
        style={{
          background: "linear-gradient(#16529a,#0c9ddc,#007cc6)",
        }}
        className="d-flex align-items-center justify-content-between border border-primary"
      >
        {common_data.length != 0 ? (
          <div className="styles.headerLand">
            <label className="logo_title" style={{ fontWeight: 'bold', color: 'white' }}>
              {common_data.length != 0 ? common_data[0].Sequencing_header != undefined ? common_data[0].Sequencing_header.split(" ")[0] : null : null}
              &nbsp;&nbsp;:&nbsp;&nbsp;
            </label>
            <label className="headerAvatarLand">
              <Avatar sx={{ bgcolor: '#5bcbbb' }}>{common_data.length != 0 ? common_data[0].Sequencing_header != undefined ? common_data[0].Sequencing_header.split(" ")[1][0] : null : null}</Avatar>

            </label>
            <label className="logo_title" style={{ fontWeight: 'bold', color: 'white' }}>
              &nbsp;&nbsp;{common_data.length != 0 ? common_data[0].Sequencing_header != undefined ? common_data[0].Sequencing_header.split(" ")[1] : null : null}{" "}
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
              .filter((e) => e.parameter_id == 6)
              .map((e) => (
                <Card>
                  <label
                    style={{ backgroundColor: "#5bcbbb" }}
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
                          ? "yesbtn_selected"
                          : "yesbtn"
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
                          ? "nobtn_selected"
                          : "nobtn"
                      }
                      onClick={() => {
                        no(e.id);
                        Set_criterial_post(e.id, "yesorno", 0, null, 0);
                      }}
                    >
                      {common_data[0].no}
                    </label>
                    <label
                      className={
                        na(e.id)
                          ? "nabtn_selected"
                          : "nobtn"
                      }
                      onClick={() => {
                        na(e.id);
                        Set_criterial_post(e.id, "yesorno", 2, null, 2);
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

          {/* <div className="row"> */}
          {/* <div className="col-11">
              <label   
                    className='next_button'
                    onClick={() => {
                        navigate('/Shelf')
                        SequencingInsert('Shelf')
                    }}
                >


                    {common_data.length != 0 ? common_data[0].Choose_Next_Shelf : null}

                </label>

              </div> */}
          <Button variant="contained" style={{ float: 'right' }} color="primary" className={Validation() ? "float-right px-5 mt-3" : "float-right px-5 mt-3 next_button"}
            disabled={Validation()}
            onClick={() => {
              setVisible(true)
              sessionStorage.setItem('post_creteria_data', JSON.stringify(criterial_post))
            }}>{common_data.length != 0 ? common_data[0].Submit : null}</Button>

        </div>
        //   </div>
      ) : null}
    </>
  )
}

export default Sequencing

