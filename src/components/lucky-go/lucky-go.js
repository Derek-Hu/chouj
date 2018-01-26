import React from 'react'
import PropTypes from 'prop-types';
import '__Source/components/lucky-go/lucky-go.less';

import circle from '__Source/components/lucky-go/images/circle.png';
import heart from '__Source/components/lucky-go/images/heart.png';
import goLucky from '__Source/components/lucky-go/images/go.png';
import moreInfo from '__Source/components/lucky-go/images/more-info.png';
import video from '__Source/components/lucky-go/images/more-info.png';

import go2 from '__Source/components/lucky-go/images/go2.png';

export default class LuckyGo extends React.Component {

  static propTypes = {
    item: PropTypes.string,
    tip: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    const url = this.props.item === 'item-lucky'? goLucky:(this.props.item === 'item-get'?go2:heart);
    const clz = (this.props.item === 'item-lucky' || this.props.item === 'item-get')? 'item lucky':'item heart';

    return <div className="lucky-go" onClick={this.props.onClick}>
      <img className="circle" src={circle} alt=""/>
      {
        typeof this.props.tip==='string'?(this.props.tip==='tip-video'? <img alt="" className="tip more-info" src={moreInfo} />:<img alt="" className="tip video" src={video} />):null
      }
      <div>
        {
          this.props.item && (<img alt="" className={clz} src={url} />)
        }
      </div>
    </div>;
  }
}
