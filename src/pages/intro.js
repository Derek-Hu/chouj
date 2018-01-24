import React from 'react'
import {Redirect} from 'react-router-dom';
import ContentBox from '__Source/components/content-box/content-box';
import ContentTitle from '__Source/components/content-box/content-title';
import ContentFooter from '__Source/components/content-box/content-footer';
import ContentBody from '__Source/components/content-box/content-body';
import Brand from '__Source/components/brand/brand';
import LuckyGo from '__Source/components/lucky-go/lucky-go';
import IntroContent from '__Source/components/intro/intro';

export default class IntroPage extends React.Component {
  constructor(){
      super();
      this.state = {

      }
  }
  luckyGo = () => {
      this.setState({
        nextPage: (localStorage.getItem('AZUL2018L.prizeId')?`lucky/${localStorage.getItem('AZUL2018L.prizeId')}`:'none')
      })
  }
  render() {
    return this.state.nextPage?<Redirect to={this.state.nextPage}/>:<div className="page-intro">
      <ContentBox noMusic={true}>
        <ContentTitle>
          <Brand></Brand>
        </ContentTitle>
        <ContentBody>
          <IntroContent></IntroContent>
        </ContentBody>
        <ContentFooter>
          <LuckyGo item="item-lucky" onClick={this.luckyGo}></LuckyGo>
        </ContentFooter>
      </ContentBox>
    </div>;
  }
}
