import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '__Source/components/layout/layout.less';

export class Layout extends React.Component {

  render() {
    return <div className={classNames('layout', this.props.type || '')}>
      {this.props.children}
    </div>
    ;
  }
}

export class TableLayout extends React.Component {
  render() {
    return <div className="table-layout">{this.props.children}</div>;
  }
}

export class CellLeftLayout extends React.Component {
  render() {
    return <div className="left-layout">{this.props.children}</div>;
  }
}

export class CellRightLayout extends React.Component {
  render() {
    return <div className="right-layout">{this.props.children}</div>;
  }
}

Layout.propTypes = {
  type: PropTypes.string
};
