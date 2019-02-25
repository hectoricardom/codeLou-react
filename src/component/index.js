

import React, { Component } from 'react';
import { withRouter,Switch,Route} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../state/commonActions';
import Header from './Header';
import TechnologiesSection from './Technology';
import Involved from './Involved';
import Questions from './Questions';
import SlideCards from './SlideCards';
import Footer from './Footer';
import LoadingColorSpinner from './Icons/LoadingColorSpinner';
import ApplyContainer from './applyContainer';
import ApplyMentorForm from './applyMentorForm';
import ApplyHireForm from './applyHireForm';
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
    //Util.addScroll2();
   
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

 

  render() {
    if(this.props.appLoaded){
      return (
        <div className="App">
          <Header/>
          <div id="content_body">    
            <Switch>
              <Route exact path="/" component={DR3235} />
              <Route path="/learn" component={CA95h3} />
              <Route path="/mentor" component={MNT5h3} />
              <Route path="/hire" component={MNT5hHr} />              
            </Switch>
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



class Dashboard extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }
  
  componentDidMount(){    
    this.props.commonActions.setPath('/');
  }

  render() {
    return(
      <div className="content_home">
        <Involved/>   
        <TechnologiesSection/>
        <Footer/>        
      </div>
    )
  }
}

function mS2P1(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded    
  };
}

function mD2P1(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

 const DR3235 = connect(mS2P1, mD2P1)(Dashboard);






class Learn extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }

  componentDidMount(){
    this.props.commonActions.setPath('/learn');
  }

  render() {    
    const {learn} = this.props;
    return(
      <div className="content_details">
        <SlideCards data={learn.slides} title={`Program Structure`}/>
        <Questions data={learn.faq} />        
        <Footer/>        
      </div>
    )
  }
}

function mS2P2(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded,
    learn:state.common.learn    
  };
}

function mD2P2(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


const CA95h3 = connect(mS2P2, mD2P2)(Learn);





class Mentors extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }

  componentDidMount(){
    this.props.commonActions.setPath('/mentor');
  }

  render() {    
    const {mentor} = this.props;    
    return(
      <div className="content_details">
        <SlideCards data={mentor.slides} title={``} h={250}/>        
        <TechnologiesSection/>
        <Questions data={mentor.faq} />
        <section section-index="Become a mentor" className="content_forms">          
          <ApplyMentorForm dark={true}/>
        </section>
        <Footer/>        
      </div>
    )
  }
}

function mS2P3(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded,
    mentor:state.common.mentor        
  };
}

function mD2P3(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


const MNT5h3 = connect(mS2P3, mD2P3)(Mentors);




class Hire extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }

  componentDidMount(){
    this.props.commonActions.setPath('/hire');
  }

  render() {    
    const {hire} = this.props;
    return(
      <div className="content_details">
        <SlideCards data={hire.slides} title={``} h={250}/>       
        <Questions data={hire.faq} />   
        <section section-index="Learn more" className="content_forms">
          <ApplyHireForm dark={true}/>
        </section>
        <Footer/>        
      </div>
    )
  }
}

function mS2P4(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded,
    hire:state.common.hire        
  };
}

function mD2P4(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


const MNT5hHr = connect(mS2P4, mD2P4)(Hire);