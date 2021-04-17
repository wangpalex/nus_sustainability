import { Line } from 'vue-chartjs';
import database from '../../firebase.js' 

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: ["Jan","Feb","Mar","Apr","May","Jun"],
                datasets: [{
                    data: [],
                    label: "Events Attended",
                    borderColor: "#3e95cd",
                    fill: false,
                }, {
                    data: [],
                    label: "Items Exchanged",
                    borderColor: "#3cba9f",
                    fill: false,
                },
                ]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Number of Events and Exchanges Completed',
                    fontSize: 20
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

    methods: {
        fetchItems: function () {
            database.collection('stats').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    // console.log(doc.data().eventsHosted)
                    if (doc.data() !== undefined){
                        this.datacollection.datasets[0].data.push(doc.data().eventsHosted);
                        this.datacollection.datasets[1].data.push(doc.data().itemsExchanged); 
                        // console.log(doc.data());
                        // console.log(doc.id);
                    }
                })
                this.renderChart(this.datacollection, this.options);
            })
        }
    },
    created () {
        this.fetchItems();
    }
}
