import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.common, action) {
  switch (action.type) {

    case types.APPLOADED_SUCCESS:
      return {
        ...state,
        appLoaded: action.appLoaded
      };

    case types.ISMOBILE_SUCCESS:
      return {
        ...state,isMobile: action.isMobile
      };   

    
    case types.SCREEN_SIZE:
      return {
        ...state,
        screen_size: action.screen_size
      };

    case types.TECHNOLOGY_SUCCESS:
      return {
        ...state,
        technology: action.technology
      };

    case types.INVOLVED_SUCCESS:
      return {
        ...state,
        involved: action.involved
      };

    case types.FAQ_SUCCESS:
      return {
        ...state,
        faq: action.faq
      };

    case types.SECTION_LIST:
      return {
        ...state,
        sections: action.sections
      };
      
    default:
      return state;
  }
}
