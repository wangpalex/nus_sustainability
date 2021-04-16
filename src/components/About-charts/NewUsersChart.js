import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: ["Dec,", "Jan","Feb","Mar","Apr"],
                datasets: [{
                    data: [20, 50,74,220, 550],
                    label: "Number of Users",
                    borderColor: "#3e95cd",
                    fill: false,
                },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'New Users',
                    fontSize: 30,
                },
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    yAxes:[{
                        ticks:{ min:0 }
                    }],
                }
            }
        }
    },
    mounted () {
        this.renderChart(this.datacollection, this.options)
    }
}