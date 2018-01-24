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
    })
  }
  closeV = (e)=>{
      this.setState({
        isOpen: false,
        nextPage: true
      })
  }
  onplaying = ()=>{
    this.setState({
      played: true,
      nextPage: false
    })
  }
  render() {
    return this.state.played && this.state.nextPage?<Redirect to="intro"/> : <div className="page-home">
      {
        !this.state.isOpen && <ContentBox animation={true}>
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
      }
      {
        this.state.isOpen && <div id="video-wpr" className="video-wpr">
          <div className="v-layer" onClick={this.closeV}></div>
          <img src={closeImg} />
          <div className="video" style={{height: height/2, 'marginTop': -height/4}}>
              <video className="video-js" onPlaying={this.onplaying} width={width} height={height/2} data-setup='{}' preload="auto" controls="controls" poster="video-poster.png">
              <source src="video/hd1080p.mp4" type="video/mp4"/>
              <source src="video/hd1080p.ogg" type="video/webm"/>
            </video>
          </div>
        </div>
      }
    </div>;
  }
}
