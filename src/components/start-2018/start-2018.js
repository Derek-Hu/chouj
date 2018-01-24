import React from 'react'
import '__Source/components/start-2018/start-2018.less';

import tri from '__Source/components/start-2018/images/tri.png';
import love from '__Source/components/start-2018/images/love-start.png';
import heart from '__Source/components/start-2018/images/heart.png';
import star from '__Source/components/start-2018/images/star.png';
import c2018 from '__Source/components/start-2018/images/2018.png';

import _tri from '__Source/components/start-2018/images/tri-gray.png';
import _love from '__Source/components/start-2018/images/love-start-gray.png';
import _heart from '__Source/components/start-2018/images/heart-gray.png';
import _star from '__Source/components/start-2018/images/star-gray.png';
import _c2018 from '__Source/components/start-2018/images/2018-gray.png';

export default class Start2018 extends React.Component {

  constructor(props){
    super(props);
    this.readyImages = 0;
    this._animation = props.animation;
    this.state = {};
  }

  imgReady =() => {
    this.readyImages++;
    if(this.readyImages!==5 || !this._animation){
      return;
    }
    this.animationD();
  }
  toggole = () => {
    this.setState({
      light: !this.state.light
    })
  }
  animationD = () => {
    var _self = this;
    const delay = 80;
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
          },delay);
        },650);
      },150);
    },1000);

  }
  render() {
    return <div className="start-2018"><div>
      <img className="tri" src={this.state.light?tri:_tri} alt="" onLoad={this.imgReady}/>
      <img className="love" src={this.state.light?love:_love} alt="" onLoad={this.imgReady}/>
      <img className="heart" src={this.state.light?heart:_heart} alt="" onLoad={this.imgReady}/>
      <img className="star" src={this.state.light?star:_star} alt="" onLoad={this.imgReady}/>
      <img className="c2018" src={this.state.light?c2018:_c2018} alt="" onLoad={this.imgReady}/>
    </div></div>;
  }
}
