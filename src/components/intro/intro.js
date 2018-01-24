import React from 'react'
import PropTypes from 'prop-types';
import '__Source/components/intro/intro.less';

import item1 from '__Source/components/intro/images/award1.png';
import item2 from '__Source/components/intro/images/award2.png';
import item3 from '__Source/components/intro/images/award3.png';

import bless2018 from '__Source/components/intro/images/2018.png';
import activityIntro from '__Source/components/intro/images/activity-intro.png';
import brandIntro from '__Source/components/intro/images/brand-intro.png';

import left from '__Source/components/intro/images/left.png';
import right from '__Source/components/intro/images/right.png';

export default class IntroContent extends React.Component {

  static propTypes = {
    none: PropTypes.bool,
    item: PropTypes.string
  };

  render() {
    return <div className={'intro-content ' + (this.props.none ? ' none ':' ') + (this.props.item?' prized':'')}>
      <img src={activityIntro} alt=""/>
      <img src={brandIntro} alt=""/>
      <ul>
        <li>
          <img src={item1} alt=""/>
        </li>
        <li>
          { !this.props.item && <img src={item2} alt="" />}
          { this.props.item==='1' && <img src={item1} alt="" />}
          { this.props.item==='2' && <img src={item2} alt="" />}
          { this.props.item==='3' && <img src={item3} alt="" />}
        </li>
        <li>
          <img src={item3} alt=""/>
        </li>
      </ul>
      {
        this.props.none && <div className="none-item"><div>
          <img src={right} alt=""/>
          <img src={bless2018} alt=""/>
          <img src={left} alt=""/>
        </div></div>
      }
    </div>;
  }
}
