import React, { useEffect, useState, useContext } from 'react'
import StoreContext from "../store/StoreContext";
import { useNavigate } from 'react-router-dom';
import logout from "../images/headerLogo.png"
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from './Logout'
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

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
  const [popupVisible, setPopupVisible] = useState(false)
  console.log(userData, 'user detail')
  useEffect(() => {
    let name = sessionStorage.getItem('StoreName')
    let id = sessionStorage.getItem('StoreId')
    console.log(name, 'name', SelectedStoreData, 'selected store')
    if (SelectedStoreData.id == '' && name != null) {
      SetSelectedStoreData(name, id)
    }
  }, [])

  const [color, setColor] = useState(false)

  const checkdisable = (id) => {
    return completedStores.some((x) => x.store_id == id)
  }
  const checkPartial = (id) => {
    return shelf_completed.filter((x) => x.store_id == id).length != 0
  }
  console.log(shelf_completed, 'completed shelf')
  const GradientBtn = ({ name, id }) => (
    <div className='row'>
      <div className='col-md-8 col-lg-8 col-xl-12 col-xll-12 col-sm-12'>
        <label
          className={SelectedStoreData.id == id ? "selected border border-primary text-white" :
            checkdisable(id) ?
              "disabled border border-primary text-white" :
              checkPartial(id) ? "datas border border-primary text-green" :
                "default border border-primary"}
        >{name}</label>
      </div>
    </div>
  )
  const storeData = (store_name, id) => {
    if (imageCaptured.length != 0 || criterial_post.length != 0) {
      setPopupVisible(true)
    }
    else {
      sessionStorage.setItem('StoreId', id)
      sessionStorage.setItem('StoreName', store_name)
      SetSelectedStoreData(store_name, id)
      navigate('/Shelf')
    }

  }
  const InsertStore = (store_name, id) => {
    console.log(id, 'id')
    ChangeShelfMain(shelfData.filter(x => x.store_id == id && x.shelf_type == "1"))
    ChangeShelfSecondary(shelfData.filter(x => x.stored_id == id && x.shelf_type == "2"))
    storeData(store_name, id)
    // if (SelectedStoreData.id == id) {
    //     storeData(store_name, id)
    //     navigate('/Shelf')
    // }
    // else {
    //     StateReset_Forshelf()
    //     storeData(store_name, id)
    //     navigate('/Shelf')
    // }
  }
  const unique = [...new Set(post_data1.map(item => item.shelf_id))];






  return (
    <>
      <Dialog open={popupVisible}>
        <DialogTitle>Would you like to change the current store ?</DialogTitle>
        <DialogContent>Please note that if you change the current store, your store details will be deleted.</DialogContent>
        <DialogActions>
          <Button onClick={() => { setPopupVisible(false) }}>NO</Button>
          <Button onClick={() => {
            sessionStorage.removeItem('StoreName')
            sessionStorage.removeItem('StoreId')
            sessionStorage.removeItem('brand_data')
            sessionStorage.removeItem('post_creteria_data')
            sessionStorage.removeItem('ShelfId')
            sessionStorage.removeItem('ShelfName')
            sessionStorage.removeItem('ShelfComment')
            sessionStorage.removeItem('captureImages')
            SetSelectedStoreData(null, null)
            setPopupVisible(false)
            StateReset_Forshelf()

            // storeShelfData(name, id)
          }}>YES</Button>
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

      <div
        style={{
          background: "linear-gradient(#16529a,#0c9ddc,#007cc6)",
        }}
        className="bg-primary d-flex align-items-center justify-content-between border border-primary"
      >
        {" "}
        <div className="logo_title" style={{ fontWeight: 'bold', color: 'white' }}>
          {common_data.length != 0 ? common_data[0].store_header : null}
        </div>

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
      <div className="m-3 container-fluid">
        <div>
          <Card className="bg-light p-3 mt-3">
            {common_data.length != 0
              ? common_data[0].store_instructions
              : null}
          </Card>

          <Card className="mt-4">
            {storeChain.length != 0 ? (
              <div className="bg-light">
                <StoreIcon color="primary" className="logout_icon" />

                <label style={{
                  color: '#014686',
                  fontWeight: 'bold'
                }}>{storeChain != 0
                  ? storeChain[0].store_name
                  : null}</label>

                <br />


                {storeChain.map((item) => (
                  <label
                    disabled={checkdisable(item.id)}
                    onClick={() => {
                      if (!checkdisable(item.id)) {
                        InsertStore(item.store_name, item.id);
                      }

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
                <StoreIcon color="primary" className="logout_icon" />
                <label style={{
                  color: '#014686',
                  fontWeight: 'bold'
                }}>{storeLocal.length != 0
                  ? storeLocal[0].store_name
                  : null}</label>

                {storeLocal.map((item) => (
                  <label
                    disabled={checkdisable(item.id)}
                    onPress={() => {
                      if (!checkdisable(item.id)) {
                        InsertStore(item.store_name, item.id);
                      }
                    }}
                  >
                    <GradientBtn name={item.store_name} id={item.id} />
                  </label>
                ))}

              </div>
            ) : null}
          </Card>

          <Card className="mt-4">
            {storeIndi.length != 0 ? (
              <div className="bg-light">
                <StoreIcon color="primary" className="logout_icon" />

                <label style={{
                  color: '#014686',
                  fontWeight: 'bold'
                }}>{storeIndi.length != 0 ? storeIndi[0].store_name : null}</label>
                {storeIndi.map((item) => (
                  <label
                    disabled={checkdisable(item.id)}
                    onClick={() => {
                      if (!checkdisable(item.id)) {
                        InsertStore(item.store_name, item.id);
                      }
                    }}
                  >
                    <GradientBtn name={item.store_name} id={item.id} />
                  </label>
                ))}

              </div>
            ) : null}
          </Card>
        </div>


      </div>
    </>
  );
}

export default StoreScreen