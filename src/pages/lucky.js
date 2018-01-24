import React from 'react'
import {Redirect} from 'react-router-dom';
import ContentBox from '__Source/components/content-box/content-box';
import ContentTitle from '__Source/components/content-box/content-title';
import ContentFooter from '__Source/components/content-box/content-footer';
import ContentBody from '__Source/components/content-box/content-body';
import Brand from '__Source/components/brand/brand';
import Start2018 from '__Source/components/start-2018/start-2018';
import PosterContent from '__Source/components/poster/poster';
import LuckyGo from '__Source/components/lucky-go/lucky-go';
import IntroContent from '__Source/components/intro/intro';

export default class LuckyPage extends React.Component {

  constructor(){
    super();
    this.state={
      isOpen: false
    };
  }
  openInput = () => {
    this.setState({
      isOpen: true
    });
  }
  callback = () => {
    this.setState({
      nextPage: '/share'
    });
  }
  render() {
    return this.state.nextPage?<Redirect to={this.state.nextPage}/> : <div className="page-intro">
      <ContentBox noMusic={true}>
        <ContentTitle>
          <Brand></Brand>
        </ContentTitle>
        <ContentBody>
          <IntroContent none={false} item={localStorage.getItem('AZUL2018L.prizeId')}></IntroContent>
        </ContentBody>
        <ContentFooter>
          <LuckyGo item="item-lucky" onClick={this.openInput}></LuckyGo>
        </ContentFooter>
      </ContentBox>

      {
        this.state.isOpen && <PosterContent callback={this.callback}></PosterContent>
      }
    </div>;
  }
}
