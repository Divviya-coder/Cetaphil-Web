import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import StoreContext from "../store/StoreContext";
import logo from "../images/women1-with-logo.png"
import logo2 from "../images/headerLogo.png"
import logo3 from "../images/Pasas-horizontal.png"
import { useNavigate } from 'react-router-dom';
import StoreScreen from './StoreScreen';
import { TextField } from '@mui/material';



function Login() {
  const [password, setPassword] = useState("");
  const [LoginValidation, setLoginValidation] = useState(false);
  const [UserName, setUserName] = useState("");
  const [visibility, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [storeData, setStoreData] = useState([])

  const { ChangeMclData, Set_CompletedStores, completedStores, ChangeStoreChain,
    ChangeStoreLocal, ChangeStoreIndi, Set_shelf_completed, shelf_completed, user_details, setUserDetails, Set_parameter_creteria, parameter_creteria,
    overallMclData, setOverallMclData, overallBrandData, setOverallBrandData, Set_common_data, common_data,
    storeChain, storeLocal, storeIndi, shelfMain, shelfData, setShelfData, ChangeSampleImage, sampleImage } = useContext(StoreContext)
  let navigate = useNavigate();
  useEffect(() => {
    let userData = sessionStorage.getItem("username");
    console.log(userData, 'user detail')
  }, [])

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData();
    data.append("accesskey", 90336);
    data.append("username", UserName);
    data.append("password", password);
    data.append("login", 1);
    axios
      .post('http://sddigitalcommunication.com/demo/shopology_demo/api-v1.php', data)
      .then((res) => {
        const response = res.data
        console.log(res.data, 'response data')
        if (response.message === "login successfully") {
          setLoginValidation(false)
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
          //User data inserting
          console.log(response.data.user_details[0], 'user id')
          setUserDetails(response.data.user_details[0])
          //parameter_creteria data inserting
          response.data.parameter_creteria.map((x) => {
            let keyvalue = Object.keys(x)
            x[keyvalue[1]].map((y) => {
              let data = {
                ...y,
                "id": y.id,
                "parameter_id": y.parameter_id,
                "criteria_name": y.criteria_name,
                "criteria_desc": y.criteria_desc,
                "criteria_image": y.criteria_image,
                "questions": y.questions,
                "status": x.status,
                "creteria": keyvalue[1]
              }
              parameter_creteria.push(data)
            })
          })
          // mcl list
          setOverallMclData(response.data.mcl_list)
          // brand data
          setOverallBrandData(response.data.brand_list)
          console.log(response.data, 'data')
          //common_data data inserting
          let commonData = {
            "store_instructions": response.data.store_instructions,
            "image_instructions": response.data.image_instructions,
            "shelf_instructions": response.data.shelf_instructions,
            "s5_instruction_name": response.data.slide5.instruction_name,
            "s5_instruction_header": response.data.slide5.instruction_header,
            "s5_instruction_details": response.data.slide5.instruction_details,
            "s5_logo_image": response.data.slide5.logo_image,
            "s5_girl_image": response.data.slide5.logo_image,
            "yes": response.data.yesno.yes,
            "no": response.data.yesno.no,
            "store_header": response.data.store_header,
            "shelf_header": response.data.shelf_header,
            "smapleimage_header": response.data.smapleimage_header,
            "pasas_header": response.data.pasas_header,
            "Possition_header": response.data.header_parameter.Position,
            "Allocation_header": response.data.header_parameter.Allocation,
            "Segmantation_header": response.data.header_parameter.Segmentation,
            "Adjacency_header": response.data.header_parameter.Adjacency,
            "Availability_header": response.data.header_parameter.Availability,
            "Sequencing_header": response.data.header_parameter.Sequencing,
            "Next": response.data.extras.Next,
            "Submit": response.data.extras.Submit,
            "Choose_Next_Shelf": response.data.extras.choose_next_shelf,
            "Capture_Image": response.data.extras.Capture_Image,
            "Example_Image": response.data.extras.Example_Image,
            "criteria_desc": response.data.extras.criteria_desc,
            "criteria_question": response.data.extras.criteria_question,
            "background_image": response.data.slide5.background_image
          }
          Set_common_data([commonData])
          //Store data inserting
          response.data.store_details.map((x) => {
            let keyvalue = Object.keys(x)
            x[keyvalue[1]].map((y) => {
              if (y.store_type == "1") {
                storeChain.push(y)
              }
              if (y.store_type == "2") {
                storeLocal.push()
              }
              if (y.store_type == "3") {
                storeIndi.push(y)
              }
            })
          })
          //Shelf data inserting
          setShelfData(response.data.shelf_list)
          // shelf_sample_images data inserting
          ChangeSampleImage(response.data.shelf_sample_images)
          setLoading(false)
          sessionStorage.setItem("username", UserName);
          sessionStorage.setItem("password", password);
          navigate("/storescreen")
          // window.location.assign('/StoreScreen')
        } else if (response.message === "Invalid Username And password") {
          setLoginValidation(true)
          setLoading(false)
        }
        else if (response.message === "Theres is no Store") {
          setLoading(false)
          alert("Stores not available",)
        }
      })
  };

console.log(overallBrandData, 'brand data')
  // className="col-lg-3 col-md-4 col-12 pt-lg-0 pt-md-0 pt-5

  // className="col-lg-8 col-md-8 col-9 pt-lg-0 pt-md-0 pt-5"

  return (
    <div className="Login_info">
      <div className="container">
        <div className="row">
          <div className="col-xll-6 col-xl-6 col-lg-7 col-md-5 col-sm-12 pt-md-5">
            <div className="d-flex justify-content-center flex-column align-items-center mt-md-5 mt-sm-5">
              <img src={logo2} className="img-fluid" width={100} />
              <img src={logo3} className="img-fluid py-2" width={300} />
              <TextField
                type="textInput"
                // placeholder="USER ID"
                className="my-2 login_input  w-50 w-sm-50"
                onChange={(u) => setUserName(u.target.value)}
                id="standard-textarea"
                label="USER ID"
                variant="standard"
              />

              <TextField
                id="standard-textarea"
                label="PASSWORD"
                variant="standard"
                type="password"
                // placeholder="PASSWORD"
                className=" my-2 login_input  w-50 w-sm-50"
                // secureTextEntry={true}
                onChange={(password) => setPassword(password.target.value)}
                // onSubmitEditing={() => submit()}
              />
              <button
                onClick={(e) => {
                  submit(e);
                }}
                className="btn btn-success w-50 login_btn"
              >
                LOGIN
              </button>

              {/* </Link> */}
              {LoginValidation ? <label style={{color:'red', marginTop:15}}>Invalid username or password!</label> : ""}
            </div>
          </div>
          <div className="col-xll-6 col-xl-6 col-lg-5 col-md-6 col-md-7 col-sm-12 pt-md-5 px-sm-2 mt-sm-3">
            <img src={logo} className="img-fluid logo_size mt-md-5  pr-md-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;