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
import shareIcon from '__Source/common/images/share-icon.png';

var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


function parseJSON(reponse) {
  return reponse.json();
}

export default class HomePage extends React.Component {

  constructor(){
    super();
    this.state={};
  }

  getJsSign = (cb) => {
    const link = encodeURIComponent(window.location.href.split('#')[0]);
    console.log(window.wx);
    fetch(`/v1/prize/wechat/js-ticket?url=${link}`).then(parseJSON).then((res) => {
      const jsSign = res.content;
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
        // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: jsSign.ticket, // 必填，公众号的唯一标识
        timestamp: jsSign.timestamp, // 必填，生成签名的时间戳
        nonceStr: jsSign.nonceStr, // 必填，生成签名的随机串
        signature: jsSign.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'chooseImage',
          'getLocation',
          'getLocalImgData',
          'uploadImage'
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      window.wx.ready((result) => {
        this.shareIndex();
      });
      window.wx.error((e) => {
        console.log(e);
      });
    },).catch((e) => {
      console.log(e);
    });
  }

  shareIndex = () => {
      let url = window.location.protocol + '//' + window.location.hostname;
      window.wx.onMenuShareTimeline({
        title: '#2018从喜欢你开始#', // 分享标题
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareIcon, // 分享图标
      });

      window.wx.onMenuShareAppMessage({
        title: '#2018从喜欢你开始#', // 分享标题
        desc: '2018，快去和大家分享你喜欢的礼物吧！', // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareIcon, // 分享图标
      });
  }

  componentDidMount() {
    this.getJsSign();
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
