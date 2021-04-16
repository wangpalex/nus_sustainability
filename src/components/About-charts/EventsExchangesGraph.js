import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: ["Events", "Exchanges"],
                datasets: [{
                    label: "No. Completed",
                    backgroundColor: ["#3e95cd", "#8e5ea2"],
                    data: [548,832]
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Number of Events and Exchanges Completed'
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
