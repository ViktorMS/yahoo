import React from 'react';

import axios from 'axios';

import { Chart } from "react-google-charts";

import SmallChart from './SmallChart';

export default class App extends React.Component {
  state = {
    chartData: [],
    oilData: [],
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
      
    axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/CLQ20.NYM?region=US&lang=en-US&includePrePost=false&interval=1d&range=1y&corsDomain=finance.yahoo.com&.tsrc=finance`)
    .then(res => {
      console.log(res.data.chart.result[0])
      const timestamps = res.data.chart.result[0].timestamp;
      const values = res.data.chart.result[0].indicators.quote[0].close;
      console.log(timestamps);
      console.log(values);

      let oilData = [["Timestamp", "Crude Oil"]]
      timestamps.forEach(
        (element, index) =>  {
          const date = new Date(element*1000); // Unix time in ms
          const prettyDate = date.toDateString()
          oilData.push([prettyDate,values[index]])
        }
        );
        console.log(oilData)
        this.setState({ oilData });
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
        <SmallChart symbol="ARION.IC"/>
        <SmallChart symbol="BRIM.IC"/>
        <SmallChart symbol="EIK.IC"/>
        <SmallChart symbol="EIM.IC"/>
        <SmallChart symbol="FESTI.IC"/>
        <SmallChart symbol="HAGA.IC"/>
        <SmallChart symbol="HEIMA.IC"/>
        <SmallChart symbol="ICEAIR.IC"/>
        <SmallChart symbol="ICESEA.IC"/>
        <SmallChart symbol="KVIKA.IC"/>
        <SmallChart symbol="MAREL.IC"/>
        <SmallChart symbol="ORIGO.IC"/>
        <SmallChart symbol="REGINN.IC"/>
        <SmallChart symbol="REITIR.IC"/>
        <SmallChart symbol="SIMINN.IC"/>
        <SmallChart symbol="SJOVA.IC"/>
        <SmallChart symbol="SKEL.IC"/>
        <SmallChart symbol="SYN.IC"/>
        <SmallChart symbol="TM.IC"/>
        <SmallChart symbol="VIS.IC"/>

      </>
    )
  }
}