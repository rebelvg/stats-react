import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Button } from 'reactstrap';

import AdminHeader from '../Shared/Components/AdminHeader/AdminHeader';

interface IChannel {
  _id: string;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IChannelsResponse {
  channels: IChannel[];
}

function generateColumns(updateDataFnc: () => Promise<void>) {
  const tableConfigTemplate = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: (props) => {
        return (
          <Button
            outline
            color="primary"
            onClick={async () => {
              await axios.put(
                `/api/admin/channels/${props.original._id}`,
                {
                  type: props.value === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE',
                },
                {
                  headers: {
                    'jwt-token': window.localStorage.getItem('token'),
                  },
                },
              );

              await updateDataFnc();
            }}
            block
          >
            {props.value}
          </Button>
        );
      },
    },
  ];

  return tableConfigTemplate;
}

class AdminChannelsPage extends Component<any, { channels: IChannel[] }> {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
    };
  }

  async componentDidMount() {
    await this.updateData();
  }

  updateData = async () => {
    const {
      data: { channels },
    } = await axios.get<IChannelsResponse>('/api/admin/channels', {
      headers: {
        'jwt-token': window.localStorage.getItem('token'),
      },
    });

    this.setState({
      channels,
    });
  };

  render() {
    const { channels } = this.state;

    return (
      <div>
        <AdminHeader />
        <ReactTable
          columns={generateColumns(this.updateData)}
          data={channels}
          showPagination={true}
          showPageSizeOptions={false}
          minRows={0}
          className="-striped -highlight"
          defaultPageSize={100}
          showPaginationTop
        />

        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default AdminChannelsPage;
