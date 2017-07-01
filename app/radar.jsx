import {Radar} from 'react-chartjs-2';

const React = require('react');

var getRandom = (max = 999999999999, min = 0) => {
  return min + Math.floor(Math.random() * (max - min))
}

var getColor = ({first, second, third}, opacity = 1) => {
  return `rgba(${first},${second},${third},${opacity})`;
}

class Radar1 extends React.Component {
  constructor(props) {
    super(props);

    const data = {
      labels: [],
      datasets: [{
        label: "Transaction Value",
        backgroundColor: [],
        borderColor: [],
        data: []
      }]
    };

    this.state = {
      data: Object.keys(this.props.spendingData).reduce((acc, curr) => {
        acc.labels.push(curr);
        acc.datasets[0].data.push(this.props.spendingData[curr]);
        let randomColor = {
          first : getRandom(255, 0),
          second : getRandom(255, 0),
          third : getRandom(255, 0)
        };
        acc.datasets[0].backgroundColor.push(getColor(randomColor, 0.5));
        acc.datasets[0].borderColor.push(getColor(randomColor, 0.8));
        return acc;
      }, data)
    };
  }

  render() {
    return (
      <div>
        <center><h4>Usage by Transaction Value</h4></center>
        <Radar data={this.state.data} />
      </div>
    );
  }
};

module.exports = Radar1;