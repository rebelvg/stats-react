import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import _ from 'lodash';
import moment from 'moment';
import { Alert } from 'reactstrap';
import humanizeDuration from 'humanize-duration';
import { withRouter } from 'react-router-dom';

import {
  getAction,
  getError,
  getData,
  getLoading,
} from '../../../redux/graphs';

const DAYS_OF_THE_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
    isLoading: getLoading(state),
  }),
  { getAction },
)
class GraphsPage extends Component<any> {
  componentDidMount() {
    const id = this.props.match.params.id || '';

    this.props.getAction(id);
  }

  render() {
    const { error, isLoading } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;
    if (isLoading) return <Alert color="info">Loading...</Alert>;

    const {
      totalDurationStreams = [],
      totalDurationSubscribers = [],
      monthlyStatsStreams = [],
      monthlyStatsSubscribers = [],
      dayOfWeekStatsStreams = [],
      dayOfWeekStatsSubscribers = [],
      timeOfDayStatsStreams = [],
      timeOfDayStatsSubscribers = [],
      topStreamers = [],
      user = null,
    } = this.props.data;

    const totalDurationStreamsData = totalDurationStreams.map((item) => {
      return {
        name: item._id || 'Local Network',
        value: Math.round(item.totalDurationSeconds / 60 / 60),
      };
    });

    const totalDurationSubsData = totalDurationSubscribers.map((item) => {
      return {
        name: item._id || 'Local Network',
        value: Math.round(item.totalDurationSeconds / 60 / 60),
      };
    });

    const lineChartDataMonthlyStatsStreams = monthlyStatsStreams.map((item) => {
      const year = item._id.year;
      const month = item._id.month;

      const subsItem = _.find(monthlyStatsSubscribers, {
        _id: { year, month },
      });

      return {
        name: `${item._id.year}/${item._id.month}`,
        value: Math.round(item.totalDurationSeconds / 60 / 60),
        valueSubs: Math.round(subsItem?.totalDurationSeconds / 60 / 60) || 0,
      };
    });

    const barChartDataDayOfWeekStatsStreams = dayOfWeekStatsStreams.map(
      (item) => {
        const subsItem = _.find(dayOfWeekStatsSubscribers, {
          _id: item._id,
        });

        return {
          name: item._id,
          value: Math.round(item.totalDurationSeconds / 60 / 60),
          valueSubs: Math.round(subsItem?.totalDurationSeconds / 60 / 60) || 0,
        };
      },
    );

    const barChartTimeOfDayStatsStreams = timeOfDayStatsStreams.map((item) => {
      const subsItem = _.find(timeOfDayStatsSubscribers, {
        _id: item._id,
      });

      return {
        name: item._id,
        value: Math.round(item.totalDurationSeconds / 60 / 60),
        valueSubs: Math.round(subsItem?.totalDurationSeconds / 60 / 60) || 0,
      };
    });

    const topStreamersData = topStreamers.map((item) => {
      return {
        name: item.user.name,
        value: Math.round(item.totalDurationSeconds / 60 / 60),
        userId: item.user._id,
      };
    });

    return (
      <div>
        {user && <Alert color="primary">{user.name}</Alert>}
        <div>
          {/* <BarChart
            width={900}
            height={350}
            data={totalDurationStreamsData}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => {
                return humanizeDuration(value * 60 * 60 * 1000, {
                  round: true,
                  largest: 2,
                });
              }}
            />
            <Legend />
            <Bar
              stackId={0}
              name="Hours Streamed"
              dataKey="value"
              fill="#8884d8"
            />
          </BarChart> */}

          {/* <BarChart
            width={900}
            height={350}
            data={totalDurationSubsData}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => {
                return humanizeDuration(value * 60 * 60 * 1000, {
                  round: true,
                  largest: 2,
                });
              }}
            />
            <Legend />
            <Bar
              stackId={0}
              name="Hours Viewed"
              dataKey="value"
              fill="#82ca9d"
            />
          </BarChart> */}

          <BarChart
            width={900}
            height={350}
            data={topStreamersData}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
            onClick={(data) => {
              const { userId } = data.activePayload[0].payload;

              this.props.history.push(`/graphs/${userId}`);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => {
                return humanizeDuration(value * 60 * 60 * 1000, {
                  round: true,
                  largest: 2,
                });
              }}
            />
            <Legend />
            <Bar
              stackId={0}
              name="Hours Streamed"
              dataKey="value"
              fill="#8884d8"
            />
          </BarChart>
        </div>

        <div>
          <ResponsiveContainer width="100%" height={720}>
            <LineChart
              width={900}
              height={350}
              data={lineChartDataMonthlyStatsStreams}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Hours Streamed"
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
              <Line
                name="Hours Viewed"
                type="monotone"
                dataKey="valueSubs"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <BarChart
            width={900}
            height={350}
            data={barChartDataDayOfWeekStatsStreams}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => DAYS_OF_THE_WEEK[value - 1]}
            />
            <YAxis />
            <Tooltip labelFormatter={(value) => DAYS_OF_THE_WEEK[value - 1]} />
            <Legend />
            <Bar
              stackId={0}
              name="Hours Streamed"
              dataKey="value"
              fill="#8884d8"
            />
            <Bar
              stackId={0}
              name="Hours Viewed"
              dataKey="valueSubs"
              fill="#82ca9d"
            />
          </BarChart>
        </div>

        <div>
          <BarChart
            width={900}
            height={350}
            data={barChartTimeOfDayStatsStreams}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) =>
                moment.utc(value * 3600 * 1000).format('HH:mm')
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) =>
                moment.utc(value * 3600 * 1000).format('HH:mm')
              }
            />
            <Legend />
            <Bar
              stackId={0}
              name="Hours Streamed"
              dataKey="value"
              fill="#8884d8"
            />
            <Bar
              stackId={0}
              name="Hours Viewed"
              dataKey="valueSubs"
              fill="#82ca9d"
            />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default withRouter(GraphsPage);
