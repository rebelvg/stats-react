import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import AdminHeader from '../../Shared/Components/AdminHeader/AdminHeader';

import { getAction, getError, getData } from '../../../redux/user';

@connect(
  state => ({
    error: getError(state),
    data: getData(state)
  }),
  { getAction }
)
class UserPage extends Component<any, any> {
  componentDidMount() {
    this.props.getAction();
  }

  render() {
    const { user } = this.props.data;
    const { error } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;
    if (!user) return <div>Loading...</div>;

    return (
      <div>
        {user.isAdmin ? <AdminHeader /> : null}
        <ListGroup>
          <ListGroupItem active>
            <ListGroupItemHeading>Emails</ListGroupItemHeading>
            {user.emails.map(email => {
              return <ListGroupItemText>{email.value}</ListGroupItemText>;
            })}
          </ListGroupItem>

          <ListGroupItem>
            <ListGroupItemHeading>Name</ListGroupItemHeading>
            <ListGroupItemText>{user.name}</ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>Is Admin</ListGroupItemHeading>
            <ListGroupItemText>{user.isAdmin ? 'Yes' : 'No'}</ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>Is Streamer</ListGroupItemHeading>
            <ListGroupItemText>{user.isStreamer ? 'Yes' : 'No'}</ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>API Key</ListGroupItemHeading>
            <ListGroupItemText>
              {user.token}
              <CopyToClipboard text={user.token}>
                <Button color="primary">Copy</Button>
              </CopyToClipboard>
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>Stream Key</ListGroupItemHeading>
            <ListGroupItemText>
              {user.streamKey}
              <CopyToClipboard text={user.streamKey}>
                <Button color="primary">Copy</Button>
              </CopyToClipboard>
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>Date Created</ListGroupItemHeading>
            <ListGroupItemText>{moment(user.createdAt).format('ddd D/MMM/YY HH:mm')}</ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default UserPage;
