import React from 'react'
import PropTypes from 'prop-types';
import '__Source/components/content-box/content-box.less';
import arrow from '__Source/components/content-box/images/arrow.png';
import _inner from '__Source/components/content-box/images/line-inner.png';
import inner from '__Source/components/content-box/images/line-inner.png';
import _outer from '__Source/components/content-box/images/line-outer.png';
import outer from '__Source/components/content-box/images/line-outer.png';
import music from '__Source/components/content-box/images/music.png';
import _music from '__Source/components/content-box/images/music-gray.png';

export default class ContentBox extends React.Component {

  static propTypes = {
    noMusic: PropTypes.bool
  };
  constructor(props){
    super(props);
    this.readyImages = 0;
    this._animation = props.animation;
    this.state = {};
  }
  imgReady =() => {
    this.readyImages++;
    if(this.readyImages!==2 || !this._animation){
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
          },delay);
        },delay);
      },delay);
    },500);
  }
  render() {
    return <div className={`${!this._animation || this.state.light?'lighted':''} content-box`}>
      <div className="outer">
        <img className="arrow" alt="" onLoad={this.imgReady} src={arrow} />
        {
          !this.props.noMusic && <img alt="" onLoad={this.imgReady} className="music" src={this.state.light?music:_music} />
        }
        <div className="inner">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}
