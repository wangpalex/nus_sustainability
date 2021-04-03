import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: ["Jan","Feb","Mar","Apr","May","Jun"],
                datasets: [{
                    data: [5,3,2,4,5,6],
                    label: "Events Attended",
                    borderColor: "#3e95cd",
                    fill: false,
                }, {
                    data: [3,4,5,1,2,4],
                    label: "Items Exchanged",
                    borderColor: "#3cba9f",
                    fill: false,
                },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'User Activities',
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