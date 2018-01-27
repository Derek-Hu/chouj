import React from 'react'
import {Redirect} from 'react-router-dom';
import ContentBox from '__Source/components/content-box/content-box';
import ContentTitle from '__Source/components/content-box/content-title';
import ContentFooter from '__Source/components/content-box/content-footer';
import ContentBody from '__Source/components/content-box/content-body';
import Brand from '__Source/components/brand/brand';
import LuckyGo from '__Source/components/lucky-go/lucky-go';
import IntroContent from '__Source/components/intro/intro';


function parseJSON(reponse) {
    return reponse.json();
}

const luckyGo2 = () => {
  fetch('/v1/prize/win').then(parseJSON).then(resp => {
    if(resp.code === 200){
      localStorage.setItem('AZUL2018L.isAlreadyGo', 'Done');
      localStorage.setItem('AZUL2018L.token', resp.content.token);
      localStorage.setItem('AZUL2018L.prizeId', resp.content.prizeId?resp.content.prizeId:'');
    }
  })
}

export default class IntroPage extends React.Component {
  constructor(){
      super();
      this.state = {

      }
  }
  luckyGo = () => {
      luckyGo2().then(() => {
        this.setState({
          nextPage: (localStorage.getItem('AZUL2018L.prizeId')?`lucky/${localStorage.getItem('AZUL2018L.prizeId')}`:'none')
        })
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
