import React from 'react'
import '__Source/components/share/share.less';
import share from '__Source/components/share/images/share.gif';

export default class ShareContent extends React.Component {

  render() {
    return <div className="share-content">
      <div></div>
      <img src={share} alt="" />
    </div>;
  }
}
