

import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../state/commonActions';
import Header from './Header';
import TechnologiesSection from './Technology';
import Involved from './Involved';
import Questions from './Questions';
import LoadingColorSpinner from './Icons/LoadingColorSpinner';
import * as Util from '../state/Util';


class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      badUser:false
    };
  }



  componentWillMount(){  
    this.resize = this.resize.bind(this);
    window.addEventListener('resize',this.resize);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    document.addEventListener('scroll',this.handleScrollEvent)
    
  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize);
  }

  componentDidMount(){
    this.props.commonActions.LoadData();
  }

  resize(e){
    if(this.props.commonActions){
      this.props.commonActions.ScreenSize(window.outerWidth);
    }   
  }

  handleScrollEvent(){
    Util.scrollEvent();
  }

  render() {
    if(this.props.appLoaded){
      return (
        <div className="App">
          <Header/>
          <div id="content_body">              
            <TechnologiesSection/>
            <Involved/>
            <Questions/>
          </div>
        </div>
      );
    }else{
      return (<LoadingColorSpinner/>)
    }
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded    
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));