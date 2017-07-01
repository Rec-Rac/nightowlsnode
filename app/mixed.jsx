import {Bar} from 'react-chartjs-2';

const React = require('react');

class Bar2 extends React.Component {
  constructor(props) {
    super(props);

    const data = {
      labels: [],
      datasets: [
        {
          label: 'Daily Balance',
          type: 'bar',
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2,
          hoverBackgroundColor: [],
          hoverBorderColor: [],
          data: []
        },
        {
          label: 'Alltime Balance',
          type:'line',
          data: [],
          fill: false,
          borderColor: 'rgba(0,0,0,1)',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBorderColor: 'rgba(0,0,0,1)',
        }
      ]
    };
    
    this.state = {
      data: Object.keys(this.props.spendingData).reduce((acc, curr) => {
        acc.labels.push(curr);
        acc.datasets[0].data.push(this.props.spendingData[curr]);
        acc.datasets[1].data.push(acc.datasets[0].data.reduce((acc,curr) => acc + curr));
        if (this.props.spendingData[curr] < 0) {
          acc.datasets[0].backgroundColor.push('rgba(200,0,0,0.2)');
          acc.datasets[0].borderColor.push('rgba(200,0,0,0.8)');
          acc.datasets[0].hoverBackgroundColor.push('rgba(200,0,0,0.8)');
          acc.datasets[0].hoverBorderColor.push('rgba(200,0,0,1)');
        } else {
          acc.datasets[0].backgroundColor.push('rgba(0,200,0,0.2)');
          acc.datasets[0].borderColor.push('rgba(0,200,0,0.8)');
          acc.datasets[0].hoverBackgroundColor.push('rgba(0,200,0,0.8)');
          acc.datasets[0].hoverBorderColor.push('rgba(0,200,0,1)');
        }
        return acc;
      }, data)
    };
  }

  render() {
    return (
      <div>
        <Bar
          data={this.state.data}
          width={1}
          height={1}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
};

module.exports = Bar2;