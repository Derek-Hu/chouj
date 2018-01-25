import React from 'react'
import {Redirect} from 'react-router-dom';
import ContentBox from '__Source/components/content-box/content-box';
import ContentTitle from '__Source/components/content-box/content-title';
import ContentFooter from '__Source/components/content-box/content-footer';
import ContentBody from '__Source/components/content-box/content-body';
import Brand from '__Source/components/brand/brand';
import Start2018 from '__Source/components/start-2018/start-2018';
import LuckyGo from '__Source/components/lucky-go/lucky-go';

import closeImg from '__Source/components/content-box/images/close.png';

var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

export default class HomePage extends React.Component {

  constructor(){
    super();
    this.state={};
  }

  openV = ()=>{
    this.setState({
      isOpen: true
    });
    document.getElementById("videoContent").play();
  }
  onEnded = () => {
    this.setState({
      nextPage: true
    })
  }
  render() {
    return this.state.nextPage?<Redirect to="intro"/> : <div className="page-home">
        <ContentBox animation={true}>
          <ContentTitle>
            <Start2018 animation={true}></Start2018>
          </ContentTitle>
          <ContentBody>
            <Brand animation={true}></Brand>
          </ContentBody>
          <ContentFooter>
            <LuckyGo item="item-heart" onClick={this.openV} tip="tip-more"></LuckyGo>
          </ContentFooter>
        </ContentBox>
      {
        <div id="video-wpr" className={'video-wpr'+(this.state.isOpen?' visible':'')}>
          <div className="v-layer"></div>
          <div className="video" style={{height: height/2, 'marginTop': -height/4}}>
              <video id="videoContent" className="video-js" width={width}
                onEnded={this.onEnded}
                height={height/2} data-setup='{}' preload="auto" poster="video-poster.png">
              <source src="video/hd1080p.mp4" type="video/mp4"/>
              <source src="video/hd1080p.ogg" type="video/webm"/>
            </video>
          </div>
        </div>
      }
    </div>;
  }
}
