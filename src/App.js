import React, { useEffect, useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import StoreScreen from "./Components/StoreScreen";
import Shelf from './Components/Shelf'
import Photos from './Components/Photos'
import Pasas from './Components/Pasas'
import Position from './Components/Position'
import Allocation from './Components/Allocation'
import Segmentation from './Components/Segmentation'
import Adjacency from './Components/Adjacency'
import Sequencing from './Components/Sequencing'
import Logout from './Components/Logout'
import StoreContext from "./store/StoreContext";
import axios from 'axios'
import './App.css';
import { SET_SHELF_COMMANDS } from "./store/actions";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  const { Set_CompletedStores, Set_shelf_completed, setUserDetails, parameter_creteria, setOverallMclData,
    setOverallBrandData, Set_common_data, storeChain, storeLocal, storeIndi, setShelfData, ChangeSampleImage,
    shelfData, Set_parameter_creteria, setShelfId, SetSelectedShelf, shelfId, changeCriterialPost,
    Set_Brand_Clear, SetSelectedStoreData, SelectedStoreData, Set_shelf_commands, imageUpload,
    ChangeImageUpload, imageCaptured, ChangeImageCaptured, shelf_completed } = useContext(StoreContext)
  let UserName = sessionStorage.getItem("username");
  let password = sessionStorage.getItem("password");
  console.log(shelfData, 'shelf data')
  useEffect(() => {
    let name = sessionStorage.getItem('StoreName')
    let id = sessionStorage.getItem('StoreId')
    let ShelfId = sessionStorage.getItem('ShelfId')
    let ShelfName = sessionStorage.getItem('ShelfName')
    let criterial_post = JSON.parse(sessionStorage.getItem('post_creteria_data'))
    let brand_post = JSON.parse(sessionStorage.getItem('brand_data'))
    let shelf_comment = sessionStorage.getItem('ShelfComment')
    let capture_image = JSON.parse(sessionStorage.getItem('captureImages'))
    // console.log(name, 'name', SelectedStoreData, 'selected store')
    if (SelectedStoreData.id == '' && name != null) {
      SetSelectedStoreData(name, id)
    }

    if (shelfId == undefined && ShelfId != null) {
      SetSelectedShelf(ShelfName, ShelfId)
      Set_shelf_commands(shelf_comment)
    }
    if (criterial_post != null) {
      changeCriterialPost(criterial_post)
    }
    if (brand_post != null) {
      Set_Brand_Clear(brand_post)
    }
    if (UserName != null && password != null && storeChain.length == 0) {
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
              rowdata.map((s) => {
                let completed_shelf_data = {
                  ...s,
                  "store_id": x,
                  "shelf_id": s.shelf_id
                }
                shelf_completed.push(completed_shelf_data)
              })

            })
            //User data inserting
            console.log(response.data.user_details[0], 'user id')
            setUserDetails(response.data.user_details[0])
            //parameter_creteria data inserting
            if (parameter_creteria.length == 0) {
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
                  // Set_parameter_creteria([data])
                })
              })
            }
            // mcl list
            setOverallMclData(response.data.mcl_list)
            // brand data
            setOverallBrandData(response.data.brand_list)
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
            if (storeChain.length == 0) {
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
            }
            //Shelf data inserting
            setShelfData(response.data.shelf_list)
            // shelf_sample_images data inserting
            ChangeSampleImage(response.data.shelf_sample_images)
          }
        })
    }
    if (capture_image != null) {
      for (let i = 0; i <= capture_image.length; i++) {
        imageUpload.pop()

      }
      let image_data = [...capture_image, ...imageUpload]
      ChangeImageUpload(image_data)

      ChangeImageCaptured(capture_image)

    }

  }, [])
  return (
    <div className="App">
      <Routes>
        {
          UserName == null ?
            <Route path="/" element={<Login />} />
            :
            <Route path="/" element={<StoreScreen />} />
        }
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/storescreen" element={<StoreScreen />} />
        <Route path="/shelf" element={<Shelf />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/pasas" element={<Pasas />} />
        <Route path="/position" element={<Position />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/segmentation" element={<Segmentation />} />
        <Route path="/adjacency" element={<Adjacency />} />
        <Route path="/sequencing" element={<Sequencing />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </div>
  );
}