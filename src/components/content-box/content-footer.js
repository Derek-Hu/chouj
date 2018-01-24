import React from 'react'

export default class ContentFooter extends React.Component {

  render() {
    return <div className="content-footer">
      {this.props.children}
    </div>;
  }
}
