import React from 'react'

export default class ContentTitle extends React.Component {

  render() {
    return <div className="content-title">
      {this.props.children}
    </div>;
  }
}
