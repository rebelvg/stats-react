import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HomePage from './modules/Home/Containers/HomePage/HomePage';
import StreamsPage from './modules/Streams/Containers/StreamsPage';
import StreamPage from './modules/Stream/Containers/StreamPage';
import SubscribersPage from './modules/Subscribers/Containers/SubscribersPage';
import SubscriberPage from './modules/Subscriber/Containers/SubscriberPage';
import ChannelsPage from './modules/Channels/Containers/ChannelsPage';
import GraphsPage from './modules/Graphs/Containers/GraphsPage';
import IPsPage from './modules/IPs/Containers/IPsPage';
import UserPage from './modules/User/Containers/UserPage';
import UsersPage from './modules/Admin/Users/Containers/UsersPage';
import LoginPage from './modules/Home/Containers/HomePage/HomePage';

const Routes = () => (
  <div>
    <Route exact path="/" component={ChannelsPage} />
    <Route exact path="/streams" component={StreamsPage} />
    <Route exact path="/streams/:id" component={StreamPage} />
    <Route exact path="/subscribers" component={SubscribersPage} />
    <Route exact path="/subscribers/:id" component={SubscriberPage} />
    <Route exact path="/graphs" component={GraphsPage} />
    <Route exact path="/ips" component={IPsPage} />
    <Route exact path="/user" component={UserPage} />
    <Route exact path="/admin/users" component={UsersPage} />
    <Route exact path="/login" component={LoginPage} />
  </div>
);

export default Routes;
