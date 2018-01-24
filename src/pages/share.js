import React from 'react'
import ContentBox from '__Source/components/content-box/content-box';
import ContentTitle from '__Source/components/content-box/content-title';
import ContentFooter from '__Source/components/content-box/content-footer';
import ContentBody from '__Source/components/content-box/content-body';
import Brand from '__Source/components/brand/brand';
import Start2018 from '__Source/components/start-2018/start-2018';
import LuckyGo from '__Source/components/lucky-go/lucky-go';
import ShareContent from '__Source/components/share/share';

export default class SharePage extends React.Component {

  render() {
    return <div className="page-home">
      <ContentBox>
        <ContentTitle>
          <Start2018></Start2018>
        </ContentTitle>
        <ContentBody>
          <Brand></Brand>
        </ContentBody>
        <ContentFooter>
          <LuckyGo item="item-heart"></LuckyGo>
        </ContentFooter>
      </ContentBox>
      <ShareContent></ShareContent>
    </div>;
  }
}
