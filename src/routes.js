import React from 'react'
import {Route} from 'react-router-dom'
import HomePage from './modules/Home/Containers/HomePage/HomePage'
import StreamsPage from './modules/Streams/Containers/StreamsPage'
import StreamPage from './modules/Stream/Containers/StreamPage'
import SubscribersPage from './modules/Subscribers/Containers/SubscribersPage'
import SubscriberPage from './modules/Subscriber/Containers/SubscriberPage'
import ChannelsPage from './modules/Channels/Containers/ChannelsPage'

const Routes = () => (
    <div>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/streams' component={StreamsPage}/>
        <Route exact path='/streams/:id' component={StreamPage}/>
        <Route exact path='/subscribers' component={SubscribersPage}/>
        <Route exact path='/subscribers/:id' component={SubscriberPage}/>
        <Route exact path='/channels/' component={ChannelsPage}/>
    </div>
);

export default Routes;
