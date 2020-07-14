import React from 'react';

import axios from 'axios';

import { Chart } from "react-google-charts";

export default class App extends React.Component {
  state = {
    chartData: []
  }

  componentDidMount() {
    axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/MAREL.IC?region=US&lang=en-US&includePrePost=false&interval=1wk&range=5y&corsDomain=finance.yahoo.com&.tsrc=finance`)
      .then(res => {
        // const persons = res.data;
        // this.setState({ persons });
        console.log(res.data.chart.result[0])
        const timestamps = res.data.chart.result[0].timestamp;
        const values = res.data.chart.result[0].indicators.adjclose[0].adjclose;
        console.log(timestamps);
        console.log(values);

        let chartData = [["Timestamp", "Marel"]]
        timestamps.forEach(
          (element, index) =>  {
            const date = new Date(element*1000); // Unix time in ms
            const prettyDate = date.toDateString()
            chartData.push([prettyDate,values[index]])
          }
          );
          console.log(chartData)
          this.setState({ chartData });
      })
  }

  render() {
    const options = {
      title: "Marel Stock Price",
      hAxis: {
        title: 'Time',
        format: 'yyyy'
      }
    };

    return (
      <>
        <h1>Yahoo Finance</h1>
        <Chart
        chartType="LineChart"
        data={this.state.chartData}
        width="100%"
        height="500px"
        legendToggle
        options={options}
        />
      </>
    )
  }
}