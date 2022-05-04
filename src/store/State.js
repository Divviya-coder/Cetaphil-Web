import React, { useReducer } from "react";
import Store from "./StoreContext";
import Reducer from "./reducer";
import * as actionTypes from "./actions";

function State(props) {
  const intialState = {
    user_name: "SRIRAM",
    Logined: false,
    login_data: { username: '', password: '' },
    orientation: "",
    storeChain: [],
    storeLocal: [],
    storeIndi: [],
    shelfMain: [],
    shelfSecondary: [],
    common_data: [{ 'shelf_instructions': '', 's5_logo_image': '', 's5_girl_image': '' }],
    s5_parameters: [],
    SelectedStoreData: { id: '' },
    selectedShelf: '',
    selectedShelfid: null,
    shelf_commands: { "1": "" },
    criterial_post: [],
    sampleImage: [],
    shelf_completed: [],
    parameter_creteria: [],
    imageUpload: [{ id: 1, type: "image" },
    { id: 2, type: "image" },
    { id: 3, type: "image" },
    { id: 4, type: "image" }
    ],
    imageCaptured: [],
    post_data1: [],
    post_criteria_data: [],
    shelfLength: 0,
    isOffline: false,
    refresh: 0,
    mclData: [],
    brandData: [],
    brandPost: [],
    brand: [],
    completedStores: [],
    user_details: '',
    overallMclData: [],
    overallBrandData: [],
    shelfData: []
    // NetInfo.fetch().then(state => {
    //   return state.isConnected
    // })

  }
  const [state, dispatch] = useReducer(Reducer, intialState)
  const Set_common_data = (data) => {
    dispatch({
      type: actionTypes.SET_COMMMON_DATA,
      data: data
    })
  }
  const setShelfData = (data) => {
    dispatch({
      type: actionTypes.SET_SHELFDATA,
      data: data
    })
  }
  const setOverallBrandData = (data) => {
    dispatch({
      type: actionTypes.SET_OVERALLBRANDDATA,
      data: data
    })
  }
  const setOverallMclData = (data) => {
    dispatch({
      type: actionTypes.SET_OVERALLMCLDATA,
      data: data
    })
  }
  const Set_CompletedStores = (data) => {
    dispatch({
      type: actionTypes.SET_COMPLETEDSTORES,
      data: data
    })
  }
  const setUserDetails = (data) => {
    dispatch({
      type: actionTypes.SET_USERDETAILS,
      data: data
    })
  }
  const Set_shelf_completed = (data) => {
    console.log(data, 'data')
    dispatch({
      type: actionTypes.SET_SHELF_COMPLETED,
      data: data
    })
  }
  const Set_Brand = (data) => {
    console.log(data, 'data')
    dispatch({
      type: actionTypes.SET_BRAND,
      data: data
    })
  }
  const Set_Refresh = (data) => {
    console.log(data, 'data')
    dispatch({
      type: actionTypes.SET_REFRESH,
      data: data
    })
  }
  const Reset_for_logout = () => {
    dispatch({
      type: actionTypes.LOGOUT_RESET,
    })
  }
  const Shelf_Submit_Reset = () => {
    dispatch({
      type: actionTypes.SHELF_SUBMIT_RESET,
    })
  }
  const Set_criterial_post = (id, name, yesorno, feedback, data) => {
    dispatch({
      type: actionTypes.SET_CRITERIA_POST,
      feedback: feedback,
      id: id,
      data: data,
      name: name,
      yesorno: yesorno,
    })
  }
  const changeCriterialPost = (data) => {
    dispatch({
      type: actionTypes.SET_CRITERIAL,
      data: data
    })
  }
  const Set_Brand_Post = (id, name, no_of_brands, data) => {
    dispatch({
      type: actionTypes.SET_BRAND_POST,
      name: name,
      no_of_brands: no_of_brands,
      data: data,
      id: id
    })
  }
  const Set_Brand_Clear = (data) => {
    dispatch({
      type: actionTypes.SET_BRAND_CLEAR,
      data: data,
    })
  }
  const changeBrandData = (data) => {
    dispatch({
      type: actionTypes.CHANGE_BRAND_DATA,
      data: data
    })
  }
  const Set_parameter_creteria = (data) => {
    dispatch({
      type: actionTypes.SET_PARAMETER_CRETERIA,
      data: data
    })
  }
  const Set_Logined = (data) => {
    dispatch({
      type: actionTypes.SET_LOGINED,
      data: data
    })
  }
  const Set_post_data1 = (data) => {
    dispatch({
      type: actionTypes.SET_POST_DATA1,
      data: data
    })
  }
  const Set_post_criteria_data = (data) => {
    dispatch({
      type: actionTypes.SET_POST_CRITERIA_DATA,
      data: data
    })
  }
  const StateReset_Forshelf = () => {
    dispatch({
      type: actionTypes.STATE_RESETFORSHELF,
    })
  }
  const Set_shelf_commands = (id, data) => {
    dispatch({
      type: actionTypes.SET_SHELF_COMMANDS,
      data: data,
      id: id
    })
  }
  const Set_s5_parameters = (data) => {
    dispatch({
      type: actionTypes.SET_S5_PARAMETERS,
      data: data
    })
  }
  const ChangeUser = (data) => {
    dispatch({
      type: actionTypes.USER_NAME,
      data: data
    })

  }
  const ChangeMclData = (data) => {
    dispatch({
      type: actionTypes.MCL_DATA,
      data: data
    })

  }
  const ChangeStoreChain = (data) => {
    dispatch({
      type: actionTypes.STORE_CHAIN,
      data: data
    })

  }
  const ChangeStoreLocal = (data) => {
    dispatch({
      type: actionTypes.STORE_LOCAL,
      data: data
    })

  }
  const ChangeStoreIndi = (data) => {
    dispatch({
      type: actionTypes.STORE_INDI,
      data: data
    })

  }

  const LoginOnChange = (field, value) => {
    dispatch({
      type: actionTypes.LOGINDATA_UPDATE,
      field: field,
      value: value
    })

  }
  const ChangeShelfMain = (data) => {
    dispatch({
      type: actionTypes.SHELF_MAIN,
      data: data
    })

  }

  const ChangeShelfSecondary = (data) => {
    dispatch({
      type: actionTypes.SHELF_SECONDARY,
      data: data
    })

  }
  const ChangeSampleImage = (data) => {
    dispatch({
      type: actionTypes.CHANGE_SAMPLE_IMAGE,
      data: data
    })

  }
  const SetSelectedStoreData = (data, id) => {
    dispatch({
      type: actionTypes.SET_SELECTEDSTORE_DATA,
      data: data,
      id: id
    })
  }
  const SetSelectedShelf = (data, id) => {
    dispatch({
      type: actionTypes.SET_SELECTEDSHELF_DATA,
      data: data,
      id: id
    })
  }
  const ChangeImageUpload = (data, id) => {
    dispatch({
      type: actionTypes.IMAGE_UPLOAD,
      data: data,
    })
  }
  const ChangeImageCaptured = (data, id) => {
    dispatch({
      type: actionTypes.IMAGE_CAPTURED,
      data: data,
    })
  }
  const changeOrientation = () => {
    dispatch({
      type: actionTypes.SCREEN_ORIENTATION,
      data: ""
    })

  }
  const changeIsOffline = (data) => {
    dispatch({
      type: actionTypes.IS_OFFLINE,
      data: data
    })
  }
  const SetShelfLength = (data) => {
    dispatch({
      type: actionTypes.SHELF_LENGTH,
      data: data
    })
  }

  return <Store.Provider value={{
    Logined: state.Logined,
    user_name: state.user_name,
    login_data: state.login_data,
    orientation: state.orientation,
    storeChain: state.storeChain,
    storeLocal: state.storeLocal,
    storeIndi: state.storeIndi,
    shelfMain: state.shelfMain,
    shelfSecondary: state.shelfSecondary,
    common_data: state.common_data,
    s5_parameters: state.s5_parameters,
    SelectedStoreData: state.SelectedStoreData,
    selectedShelf: state.selectedShelf,
    sampleImage: state.sampleImage,
    parameter_creteria: state.parameter_creteria,
    selectedShelfid: state.selectedShelfid,
    shelf_commands: state.shelf_commands,
    imageUpload: state.imageUpload,
    criterial_post: state.criterial_post,
    post_data1: state.post_data1,
    post_criteria_data: state.post_criteria_data,
    imageCaptured: state.imageCaptured,
    offline: state.isOffline,
    shelf_completed: state.shelf_completed,
    shelfLength: state.shelfLength,
    refresh: state.refresh,
    mclData: state.mclData,
    brandData: state.brandData,
    brandPost: state.brandPost,
    brand: state.brand,
    completedStores: state.completedStores,
    user_details: state.user_details,
    overallMclData: state.overallMclData,
    overallBrandData: state.overallBrandData,
    shelfData: state.shelfData,
    Set_post_data1,
    Set_post_criteria_data,
    Set_criterial_post,
    Set_parameter_creteria,
    StateReset_Forshelf,
    Set_Logined,
    Set_shelf_commands,
    ChangeUser,
    Reset_for_logout,
    LoginOnChange,
    changeOrientation,
    Set_shelf_completed,
    ChangeStoreChain,
    ChangeStoreLocal,
    ChangeStoreIndi,
    ChangeShelfMain,
    ChangeShelfSecondary,
    Set_common_data,
    Set_s5_parameters,
    SetSelectedStoreData,
    SetSelectedShelf,
    ChangeSampleImage,
    ChangeImageUpload,
    ChangeImageCaptured,
    changeCriterialPost,
    changeIsOffline,
    SetShelfLength,
    Set_Refresh,
    ChangeMclData,
    Set_Brand_Post,
    changeBrandData,
    Set_Brand,
    Set_Brand_Clear,
    Set_CompletedStores,
    Shelf_Submit_Reset,
    setUserDetails,
    setOverallMclData,
    setOverallBrandData,
    setShelfData
  }}>{props.children}</Store.Provider>;
}

export default State;