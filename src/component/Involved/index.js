

import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import Icons from '../Icons/Icons';
import WithScroll from '../scroll-decorator';
import * as Util from '../../state/Util';
import './style.css';



var dataSlider = [
  {
    "title":"Learn",
    "description":"Are you ready to upgrade your career? Begin your journey with us!",
    "link":"https://codelouisville.org/learn",
    "img":"https://hectoricardom.github.io/img/developer.png",
    "class":""
  },
  {
    "title":"Mentors",
    "description":"Are you a software developer who wants to coach and mentor future developers? Join us!",
    "link":"https://codelouisville.org/mentor",
    "img":"https://hectoricardom.github.io/img/mentors.png",
    "class":""
  },
  {
    "title":"Be a Part of the Solution!",
    "description":"Looking for junior software talent? Check out our graduates!",
    "link":"https://codelouisville.org/learn/hire",
    "img":"https://hectoricardom.github.io/img/partners.png",
    "class":""
  }
]

class Involved extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewport:false,
      widthList:[],
      index:0
    };
  }



  componentWillMount(){      
    this.UpdateIndex = this.UpdateIndex.bind(this);  
    this.scrollhandler = this.scrollhandler.bind(this); 
  }

  componentDidMount(){  
    
  }



  scrollhandler(i){
    if(!this.state.viewport){   
      if(Util.isInViewport(this.elm)){
        this.setState({viewport:true});
      }      
    }    
  }

  UpdateIndex(ig){
    this.setState({index:ig});    
  }

  ref = r => {
    this.elm = r
  }

  render() {
      const {UpdateIndex,scrollhandler} = this;     
      return ( 
          <section id="section_get_involved" section-index="1" className="section_involved">
                    <div className="o-container">
                      <div className="left_Section__intro section_involved_width tablet--10-12 --auto--margin">
                        <h2 className="text-large">Three ways to get involved:</h2>
                        <p className="text-normal"> </p>
                      </div>
                      <TabsInvolved data={['code','mentor','hire']} UpdateIndex={UpdateIndex}/>                        
                      
                      {/*    Get Involved Presentations    */}

                      <WithScroll scrollhandler={scrollhandler}/>
                      <div ref={this.ref} className="c-tabs-content"  is-in-viewport={`${this.state.viewport}`}>

                                     {/*    Get Involved Presentation Learn   */}

                                    {  this.props.involved.map((sl,i)=>{
                                      var ariaHidden =  false;
                                      if(this.state.index===i){
                                        ariaHidden =  true;
                                      }
                                      return (
                                            <div className="left_Section left_SectionTextMedia left_SectionTextMedias lSectionNoPadding center_Tabs_Section" aria-hidden={ariaHidden} aria-labelledby="" key={i} role="tabpanel">
                                              <div className="--auto--margin grid--middle u-grid--override center_Tab_Content_Slide  desktop--6-12 tablet--8-12 mobile--11-12">
                                                  <div className="grid__item desktop--7-12 tablet--12-12">
                                                    <div className="left_Section__media left_Section__media--raised u-text-align-center fade-and-slide fade-and-slide--right">
                                                        <div className="left_Section__media-wrapper left_Section__media-wrapper--wear left_Section__media-wrapper--wear">
                                                              <img className="wrapperImg"  src={sl.img} alt=""/>                          
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="grid__item desktop--4-12 tablet--12-12">
                                                    <div className="left_Section__text cascade-text desktop--10-12 tablet--8-12 --auto--margin">
                                                      <h3 className="beta cascade-text__item">{sl.title}</h3>
                                                      <p className="text-normal cascade-text__item">{sl.description}</p>
                                                      <a href={sl.link} className="btn btn--text cascade-text__item" >see details</a>                                         
                                                    </div>
                                                  </div>
                                                </div>
                                          </div>
                                        )
                                      })
                                    }
                     
                      </div>
                    </div>
                </section>

        );
     
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    involved: state.common.involved
  };
}

export default connect(mapStateToProps)(Involved);











class TabI extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      screen_size:0,
      index:0
    };
  }



  componentWillMount(){  
    
    this.UpdateIndex = this.UpdateIndex.bind(this);
    this.TabIndicator = this.TabIndicator.bind(this);
  }

  componentDidMount(){  
    setTimeout(()=>{
      this.TabIndicator();
    },25);
  }

  reCalcSection(){
    var listH = [];
    var sumH=0;
    var section_list = document.querySelectorAll('[section-index]');
    for(var i =0;i<section_list.length;i++){
        var hh = section_list[i];
        var lastS = sumH;
        sumH+=hh.getBoundingClientRect().height;
        listH.push({s:lastS,e:sumH});             
    }
    Util.UpdateTotalHeight(sumH)
    this.props.commonActions.sectionList(listH);
  }


  TabIndicator(){
    var els = document.querySelectorAll('[data-item]'); 
    this.reCalcSection()
    var listTabH = [],sumTH = 0;
    for(var ss =0;ss<els.length;ss++){
      var hh =els[ss].getBoundingClientRect().width;
      if(hh<200){
        listTabH.push({l:sumTH,w:hh});
        sumTH+=hh; 
      }     
    }
    this.setState({widthList:listTabH});
  }


  UpdateIndex(i){
    this.setState({index:i});
    this.TabIndicator();
    if(typeof this.props.UpdateIndex === "function" ){
      this.props.UpdateIndex(i);
    }
  }

  ref = r => {
    this.SM = r
  }

  ref_tab = r => {
    this.tabs = r
  }

  render() {
      const {screen_size, data} = this.props;
      if(screen_size!==this.state.screen_size){
        this.TabIndicator();
        this.setState({screen_size:screen_size});
      }
      var indcatorSize = this.state.widthList?this.state.widthList[this.state.index]:null;
      var tabIndicator = {width: `0px`, left: `0px`};
      if(indcatorSize){
        tabIndicator = {width: `${indcatorSize.w}px`, left: `${indcatorSize.l}px`}
      }      
      return (          
            <div className="c-tabs-nav " data-active-item="1" data-default-key="0" data-c-tabs-nav="" data-ca-category="device-tray">
              <ul className="center_Tab_Nav_Items" role="tablist">
                { data.map((tbI,i)=>{   
                  var color = 'var(--tab--nav-Color--)';
                  var activeClass = 'center_Tab_Nav_Item';
                  if(this.state.index===i){
                    color = 'var(--color-base--hover)';
                    activeClass = 'center_Tab_Nav_Item is-active';
                    }                                        
                    return(                          
                      <li className={activeClass} data-item={i} role="presentation" onClick={()=>this.UpdateIndex(i)} key={i}>
                        <a className="center_Tab_Nav_Link" role="tab"  data-tab-index={i}>
                          <Icons name={tbI} color={color} size={38}/>                                                         
                        </a>
                      </li>
                      )
                  })
                }                         
              </ul>
              <span id="header-tabs-nav__indicator" className="c-tabs-nav__indicator" style={tabIndicator}></span>
            </div>  

        );
     
  }  
}


function mapStateToProps2(state, ownProps) {
  return {       
    screen_size: state.common.screen_size,
  };
}
function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

export const TabsInvolved = connect(mapStateToProps2,mapDispatchToProps)(TabI);