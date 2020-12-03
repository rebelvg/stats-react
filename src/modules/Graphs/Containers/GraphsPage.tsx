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

import { getAction, getError, getData } from '../../../redux/graphs';

const DAYS_OF_THE_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
  }),
  { getAction },
)
class GraphsPage extends Component<any> {
  constructor(props) {
    super(props);

    this.props.getAction();
  }

  render() {
    const {
      totalDurationStreams = [],
      monthlyStatsStreams = [],
      dayOfWeekStatsStreams = [],
      timeOfDayStatsStreams = [],
    } = this.props.data;

    const pieDataTotalDurationStreams = totalDurationStreams.map((item) => ({
      name: item._id || 'N/A',
      value: Math.round(item.totalDurationSeconds / 60 / 60),
    }));

    const lineChartDataMonthlyStatsStreams = monthlyStatsStreams.map(
      (item) => ({
        name: `${item._id.year}/${item._id.month}`,
        value: item.totalCount,
      }),
    );

    const barChartDataDayOfWeekStatsStreams = dayOfWeekStatsStreams.map(
      (item) => ({
        name: item._id,
        value: item.totalCount,
      }),
    );

    const barChartTimeOfDayStatsStreams = timeOfDayStatsStreams.map((item) => ({
      name: item._id,
      value: item.totalCount,
    }));

    return (
      <div>
        <div>
          <PieChart width={350} height={350}>
            <Pie
              data={pieDataTotalDurationStreams}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
            <Tooltip labelFormatter={(value) => `${value}h`} />
            <Legend />
          </PieChart>
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
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <BarChart
            width={730}
            height={250}
            data={_.sortBy(barChartDataDayOfWeekStatsStreams, ['name'])}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(tick) => DAYS_OF_THE_WEEK[tick - 1]}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        <div>
          <BarChart
            width={730}
            height={250}
            data={_.sortBy(barChartTimeOfDayStatsStreams, ['name'])}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default GraphsPage;
