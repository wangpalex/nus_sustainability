import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: ["Jan","Feb","Mar","Apr"],
                datasets: [{
                    data: [74,121,225, 550],
                    label: "Total Number of Users",
                    borderColor: "#3e95cd",
                    fill: false,
                },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'NUSustainability Users',
                    fontSize: 20,
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