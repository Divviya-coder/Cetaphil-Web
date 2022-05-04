import * as actionTypes from "./actions";
const Reducer = (state, action) => {
    if (action && action.type) {
        // Action defined based on action type    
        switch (action.type) {
            case actionTypes.SET_COMMMON_DATA:
                return {
                    ...state,
                    common_data: action.data
                }
            case actionTypes.SET_SHELFDATA:
                return {
                    ...state,
                    shelfData: action.data
                }
            case actionTypes.SET_OVERALLBRANDDATA:
                return {
                    ...state,
                    overallBrandData: action.data
                }
            case actionTypes.SET_OVERALLMCLDATA:
                return {
                    ...state,
                    overallMclData: action.data
                }
            case actionTypes.SET_USERDETAILS:
                return {
                    ...state,
                    user_details: action.data
                }
            case actionTypes.SET_POST_DATA1:
                return {
                    ...state,
                    post_data1: action.data
                }
            case actionTypes.MCL_DATA:
                return {
                    ...state,
                    mclData: action.data
                }
            case actionTypes.STATE_RESETFORSHELF:
                return {
                    ...state,
                    selectedShelf: '',
                    selectedShelfid: null,
                    shelf_commands: { "1": "" },
                    criterial_post: [],
                    imageUpload: [{ id: 1, type: "image" },
                    { id: 2, type: "image" },
                    { id: 3, type: "image" },
                    { id: 4, type: "image" }
                    ],
                    imageCaptured: [],
                    brandPost: []
                }
            case actionTypes.LOGOUT_RESET:
                return {
                    ...state,
                    SelectedStoreData: { id: '' },
                    selectedShelf: '',
                    selectedShelfid: null,
                    shelf_commands: { "1": "" },
                    criterial_post: [],
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
                    brandData: [],
                    brandPost: [],
                    brand: [],
                    storeChain: [],
                    storeLocal: [],
                    storeIndi: [],
                    completedStores: []
                    // brandPost: []
                }
            case actionTypes.SHELF_SUBMIT_RESET:
                return {
                    ...state,
                    selectedShelf: '',
                    selectedShelfid: null,
                    shelf_commands: { "1": "" },
                    imageUpload: [{ id: 1, type: "image" },
                    { id: 2, type: "image" },
                    { id: 3, type: "image" },
                    { id: 4, type: "image" }
                    ],
                    imageCaptured: [],
                    post_data1: [],
                    post_criteria_data: [],
                    shelfLength: 0,
                    // brandPost: []
                }
            case actionTypes.SHELF_LENGTH:
                return {
                    ...state,
                    shelfLength: action.data
                }
            case actionTypes.SET_COMPLETEDSTORES:
                return {
                    ...state,
                    completedStores: action.data
                }
            case actionTypes.SET_POST_CRITERIA_DATA:
                return {
                    ...state,
                    post_criteria_data: action.data
                }
            case actionTypes.SET_BRAND_CLEAR:
                return {
                    ...state,
                    brandPost: action.data
                }
            case actionTypes.SET_SHELF_COMPLETED:
                return {
                    ...state,
                    shelf_completed: action.data
                }
            case actionTypes.SET_CRITERIAL:
                return {
                    ...state,
                    criterial_post: action.data
                }
            case actionTypes.SET_PARAMETER_CRETERIA:
                return {
                    ...state,
                    parameter_creteria: action.data
                }
            case actionTypes.SET_LOGINED:
                return {
                    ...state,
                    Logined: action.data
                }
            case actionTypes.SET_CRITERIA_POST:
                if (state.criterial_post.some((x) => x.id == action.id)) {
                    let Existing = state.criterial_post.filter((x) => x.id == action.id)
                    let Notexisting = state.criterial_post.filter((x) => x.id != action.id)
                    return {
                        ...state,
                        criterial_post: [...Notexisting, { ...Existing[0], [action.name]: action.data }]
                    }
                } else {
                    return {
                        ...state,
                        criterial_post: [...state.criterial_post, { 'id': action.id, 'yesorno': action.yesorno, 'feedback': action.feedback }]
                    }
                }
            case actionTypes.SET_S5_PARAMETERS:
                return {
                    ...state,
                    s5_parameters: action.data
                }
            case actionTypes.SET_BRAND_POST:
                if (state.brandPost.some((x) => x.id == action.id)) {
                    let Existing = state.brandPost.filter((x) => x.id == action.id)
                    let Notexisting = state.brandPost.filter((x) => x.id != action.id)
                    return {
                        ...state,
                        brandPost: [...Notexisting, { ...Existing[0], [action.name]: action.data }]
                    }
                } else {
                    return {
                        ...state,
                        brandPost: [...state.brandPost, { 'id': action.id, 'no_of_brands': action.no_of_brands }]
                    }
                }
            case actionTypes.CHANGE_BRAND_DATA:
                return {
                    ...state,
                    brandData: action.data
                }
            case actionTypes.SET_BRAND:
                return {
                    ...state,
                    brand: action.data
                }
            case actionTypes.USER_NAME:
                return {
                    ...state,
                    user_name: action.data
                }
            case actionTypes.LOGINDATA_UPDATE:
                return {
                    ...state,
                    login_data: { ...state.login_data, [action.field]: action.value }
                }
            case actionTypes.SCREEN_ORIENTATION:
                return {
                    ...state,
                    orientation: action.data
                }
            case actionTypes.IS_OFFLINE:
                return {
                    ...state,
                    isOffline: action.data
                }
            case actionTypes.STORE_CHAIN:
                return {
                    ...state,
                    storeChain: action.data
                }
            case actionTypes.STORE_LOCAL:
                return {
                    ...state,
                    storeLocal: action.data
                }
            case actionTypes.STORE_INDI:
                return {
                    ...state,
                    storeIndi: action.data
                }
            case actionTypes.SHELF_MAIN:
                return {
                    ...state,
                    shelfMain: action.data
                }
            case actionTypes.SET_REFRESH:
                return {
                    ...state,
                    refresh: action.data
                }
            case actionTypes.SET_SHELF_COMMANDS:
                return {
                    ...state,
                    shelf_commands: { ...state.shelf_commands, [action.id]: action.data }
                }
            case actionTypes.SHELF_SECONDARY:
                return {
                    ...state,
                    shelfSecondary: action.data
                }
            case actionTypes.SET_SELECTEDSTORE_DATA:
                return {
                    ...state,
                    SelectedStoreData: { ...state.SelectedStoreData, 'label': action.data, 'id': action.id }
                }
            case actionTypes.SET_SELECTEDSHELF_DATA:
                return {
                    ...state,
                    selectedShelf: action.data,
                    selectedShelfid: action.id,
                }
            case actionTypes.CHANGE_SAMPLE_IMAGE:
                return {
                    ...state,
                    sampleImage: action.data
                }
            case actionTypes.IMAGE_UPLOAD:
                return {
                    ...state,
                    imageUpload: action.data
                }
            case actionTypes.IMAGE_CAPTURED:
                return {
                    ...state,
                    imageCaptured: action.data
                }
            default:
                return state

        }
    }

}

export default Reducer