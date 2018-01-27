import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import '__Source/styles/global.less'
import HomePage from '__Source/pages/home';
import IntroPage from '__Source/pages/intro';
import SharePage from '__Source/pages/share';
import NonePage from '__Source/pages/none';
import LuckyPage from '__Source/pages/lucky';

import item1 from '__Source/components/intro/images/award1.png';
import item2 from '__Source/components/intro/images/award2.png';
import item3 from '__Source/components/intro/images/award3.png';

import bless2018 from '__Source/components/intro/images/2018.png';
import activityIntro from '__Source/components/intro/images/activity-intro.png';
import brandIntro from '__Source/components/intro/images/brand-intro.png';

import '__Source/pages/pages.less';
import '__Source/common/rAF';

ReactDOM.render(
      <Router>
        <div>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/intro" component={IntroPage}/>
            <Route exact path="/none" component={NonePage}/>
            <Route exact path="/lucky/:prizeId" component={LuckyPage}/>
            <Route exact path="/share" component={SharePage}/>
            <Route render={() => (
              <Redirect to={{
                  pathname: `/`
              }}/>
            )}/>
      </Switch>
    </div>
    </Router>,
    document.body.appendChild(document.getElementById('root'))
)
