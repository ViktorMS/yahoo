import React from 'react';

import axios from 'axios';

import { Chart } from "react-google-charts";

export default class SmallChart extends React.Component {
  state = {
    chartData: [],
    change: 1,
  }

  componentDidMount() {
    axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${this.props.symbol}?region=US&lang=en-US&includePrePost=false&interval=1d&range=5d&corsDomain=finance.yahoo.com&.tsrc=finance`)
      .then(res => {
        console.log(res.data.chart.result[0])
        const timestamps = res.data.chart.result[0].timestamp;
        const values = res.data.chart.result[0].indicators.quote[0].close;
        console.log(timestamps);
        console.log(values);

        this.setState({ change: values[values.length-1]/values[0] });

        let chartData = [["Timestamp", "Price"]]
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
    let color = 'blue';
    if(this.state.change >= 1.01) color = 'green';
    if(this.state.change <= 0.99) color = 'red';
    const options = {
      legend :'none',
      axisFontSize : 0,
      hAxis: {
        baselineColor: 'none',
        ticks: [],
        textPosition: 'none'
      },
      vAxis: {
        baselineColor: 'none',
        ticks: [],
        textPosition: 'none'
      },
      colors: [color]
    };

    const divStyle = {
      borderBottom: '1px solid black',
      verticalAlign: 'middle',
      paddingLeft: '2rem',
    };

    return (
        <tr>
          <td style={divStyle}>
            <h3>{this.props.symbol} {this.state.change}</h3>
          </td>
          <td style={divStyle}>        
            <Chart
              chartType="LineChart"
              data={this.state.chartData}
              width="100px"
              height="50px"
              legendToggle
              options={options}
              />
          </td>
        </tr>
        
    )
  }
}