import React from 'react'
import '__Source/components/brand/brand.less';

import logo from '__Source/components/brand/images/logo.png';
import by from '__Source/components/brand/images/by.png';
import hu from '__Source/components/brand/images/hu.png';
import like from '__Source/components/brand/images/like.png';

import _logo from '__Source/components/brand/images/logo-gray.png';
import _by from '__Source/components/brand/images/by-gray.png';
import _hu from '__Source/components/brand/images/hu-gray.png';
import _like from '__Source/components/brand/images/like-gray.png';

export default class Brand extends React.Component {

  constructor(props){
    super(props);
    this.readyImages = 0;
    this._animation = props.animation;
    this.state = {};
  }
  imgReady =() => {
    this.readyImages++;
    if(this.readyImages!==4 || !this._animation){
      return;
    }
    this.animationD();
  }
  toggole = () => {
    this.setState({
      light: !this.state.light
    });
    var _self = this;
    setTimeout(()=>{
      _self.setState({
        likeLight: !_self.state.likeLight
      });
      setTimeout(()=>{
        _self.setState({
          logoLight: !_self.state.logoLight
        });
      },50)
    },20)
  }
  animationD = () => {
    var _self = this;
    const delay = 100;
    setTimeout(()=>{
      _self.toggole();
      setTimeout(()=>{
        _self.toggole();
        setTimeout(()=>{
          _self.toggole();
          setTimeout(()=>{
            _self.toggole();
            setTimeout(()=>{
              _self.toggole();
              setTimeout(()=>{
                _self.toggole();
                setTimeout(()=>{
                  _self.toggole();
                },delay);
              },delay);
            },delay);
          },1200);
        },delay);
      },delay);
    },800);

    setTimeout(()=>{
      this.toggole();
      this.toggole();
    },delay);
  }
  render() {
    return <div className="brand"><div>
      <img className="logo" onLoad={this.imgReady} src={!this._animation || this.state.logoLight?logo:_logo} alt=""/>
      <img className="by" onLoad={this.imgReady} src={!this._animation || this.state.light?by:_by} alt=""/>
      <img className="hu" onLoad={this.imgReady} src={!this._animation || this.state.light?hu:_hu} alt=""/>
      <img className="like" onLoad={this.imgReady} src={!this._animation || this.state.likeLight?like:_like} alt=""/>
    </div></div>;
  }
}
