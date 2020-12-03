import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Pie,
  PieChart,
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
import * as _ from 'lodash';
import * as moment from 'moment';
import { Alert } from 'reactstrap';

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
  constructor(props) {
    super(props);

    this.props.getAction();
  }

  render() {
    const { error, isLoading } = this.props;

    if (error) {
      return <div>{error}</div>;
    }

    if (isLoading) {
      return <Alert color="danger">Loading...</Alert>;
    }

    const {
      totalDurationStreams = [],
      totalDurationSubs = [],
      monthlyStatsStreams = [],
      monthlyStatsSubs = [],
      dayOfWeekStatsStreams = [],
      dayOfWeekStatsSubs = [],
      timeOfDayStatsStreams = [],
      timeOfDayStatsSubs = [],
      topStreamers = [],
    } = this.props.data;

    const totalDurationStreamsData = totalDurationStreams.map((item) => {
      return {
        name: item._id || 'N/A',
        value: Math.round(item.totalDurationSeconds / 60 / 60),
      };
    });

    const totalDurationSubsData = totalDurationSubs.map((item) => {
      return {
        name: item._id || 'N/A',
        value: Math.round(item.totalDurationSeconds / 60 / 60),
      };
    });

    const lineChartDataMonthlyStatsStreams = monthlyStatsStreams.map((item) => {
      const year = item._id.year;
      const month = item._id.month;

      const subsMonthlyStat = _.find(monthlyStatsSubs, {
        _id: { year, month },
      });

      return {
        name: `${item._id.year}/${item._id.month}`,
        value: item.totalCount,
        valueSubs: subsMonthlyStat.totalCount || 0,
      };
    });

    const barChartDataDayOfWeekStatsStreams = dayOfWeekStatsStreams.map(
      (item) => {
        const subsDayOfWeekStat = _.find(dayOfWeekStatsSubs, {
          _id: item._id,
        });

        return {
          name: item._id,
          value: item.totalCount,
          valueSubs: subsDayOfWeekStat.totalCount,
        };
      },
    );

    const barChartTimeOfDayStatsStreams = timeOfDayStatsStreams.map((item) => {
      const subTimeOfDayStat = _.find(timeOfDayStatsSubs, {
        _id: item._id,
      });

      return {
        name: item._id,
        value: item.totalCount,
        valueSubs: subTimeOfDayStat.totalCount,
      };
    });

    const topStreamersData = topStreamers.map((item) => {
      return {
        name: item.user.name,
        value: item.totalCount,
      };
    });

    return (
      <div>
        <div>
          <BarChart
            width={730}
            height={250}
            data={totalDurationStreamsData}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(value) => value} />
            <YAxis />
            <Tooltip labelFormatter={(value) => value} />
            <Legend />
            <Bar stackId={0} name="Streams" dataKey="value" fill="#8884d8" />
          </BarChart>

          <BarChart
            width={730}
            height={250}
            data={totalDurationSubsData}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(value) => value} />
            <YAxis />
            <Tooltip labelFormatter={(value) => value} />
            <Legend />
            <Bar stackId={0} name="Viewers" dataKey="value" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={730}
            height={250}
            data={topStreamersData}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(value) => value} />
            <YAxis />
            <Tooltip labelFormatter={(value) => value} />
            <Legend />
            <Bar stackId={0} name="Streams" dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        <div>
          <ResponsiveContainer width="100%" height={720}>
            <LineChart
              width={730}
              height={250}
              data={lineChartDataMonthlyStatsStreams}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Streams"
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
              <Line
                name="Viewers"
                type="monotone"
                dataKey="valueSubs"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <BarChart
            width={730}
            height={250}
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
            <Bar stackId={0} name="Streams" dataKey="value" fill="#8884d8" />
            <Bar
              stackId={0}
              name="Viewers"
              dataKey="valueSubs"
              fill="#82ca9d"
            />
          </BarChart>
        </div>

        <div>
          <BarChart
            width={730}
            height={250}
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
            <Bar stackId={0} name="Streams" dataKey="value" fill="#8884d8" />
            <Bar
              stackId={0}
              name="Viewers"
              dataKey="valueSubs"
              fill="#82ca9d"
            />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default GraphsPage;
