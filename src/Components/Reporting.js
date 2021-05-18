import React from 'react';
import { db } from '../API';
import ReactDOM from 'react-dom'
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var startData = [{label: 1, y: 10}, {label: 2, y: 13}, {label: 3, y: 18}, {label: 4, y: 20}];


class Reporting extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
		this.updateChart();
	}
	async updateChart() {
      const assignedStudents = await db.endpoints.Students.getAll();
      var graphData = assignedStudents.data.reduce(function(accum, currentVal) {
        if(!(currentVal.grade in accum)){
          accum[currentVal.grade] = 1;
        }
        else{
          accum[currentVal.grade] += 1;
        }
        return accum;
      }, {});
      let returnData = {};
      var arr = [];
      for (const [key, value] of Object.entries(graphData)) {
        arr.push({
            label: 'grade' + ' ' +key,
            y: value
        });
      }
      startData = [];
      startData = arr;

    console.log(startData);
    const options = {
          title: {
            text: "Students by Grade"
          },
          data: [{
                    type: "column",
                    dataPoints: startData
           }]
    }

    ReactDOM.render((
      <div class="graph">
      <CanvasJSChart options = {options}
         onRef={ref => this.chart = ref}
      />
      </div>
    ), document.querySelector(".graph"));
	}
	render() {
		const options = {
          title: {
            text: "Students by Grade"
          },
          data: [{
                    type: "column",
                    dataPoints: startData
           }]
		}
    console.log(options);
		return (
		<div class="graph">
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
}




export default Reporting;
