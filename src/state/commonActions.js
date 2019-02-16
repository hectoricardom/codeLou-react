import * as types from '../constants/ActionTypes';
import { DATA_URL } from '../constants/Api';
import * as _Util from './Util';



/***********************************************************************************     COMMON   ***************************************************************************************************/


//https://hectoricardom.github.io/img/data.json

export function LoadData() {
  return function (dispatch, getState) {    
   
    _Util.fetchGetUrl(DATA_URL) 
    .then(res => {
      if(res){
        if(res['technologies']){
          dispatch(UpdTechnology(res['technologies']));
        }
        if(res['envolved']){
          dispatch(UpdInvolved(res['envolved']));
        }
        if(res['faq']){
          dispatch(UpdFAQ(res['faq']));
        }
        dispatch(appLoaded(true));
      }
    })
    .catch(error => {       
      console.log(error); //eslint-disable-line
    });
  };
}


export function UpdTechnology(res) {
  return {
    type: types.TECHNOLOGY_SUCCESS,
    technology : res
  };
}

export function UpdInvolved(res) {
  return {
    type: types.INVOLVED_SUCCESS,
    involved : res
  };
}

export function UpdFAQ(res) {
  return {
    type: types.FAQ_SUCCESS,
    faq : res
  };
}



export function UpdIsMobile(res) {
  return {
    type: types.ISMOBILE_SUCCESS,
    isMobile : res
  };
}


export function appLoaded(res) {
  return {
    type: types.APPLOADED_SUCCESS,
    appLoaded: res
  };
}
 

 

  export function ScreenSize(res) {
    return {
      type: types.SCREEN_SIZE,
      screen_size : res
    };
  }

  export function sectionList(res) {
    return {
      type: types.SECTION_LIST,
      sections: res
    };
  }