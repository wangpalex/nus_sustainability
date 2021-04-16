import { Bar } from 'vue-chartjs'
import database from '../../firebase.js' ;

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: ["Total Exchanges", "Total Events"],
                datasets: [{
                    label: ["Total Number"],
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: [0,0]
                }]
            },
            options: {
                legend: { display: false},
                title: {
                    display: true,
                    text: 'Total Statistics',
                    fontSize: 30
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
                    console.log(this.datacollection.datasets[0].data[0])
                    if (doc.data().itemsExchanged !== undefined){
                        this.datacollection.datasets[0].data[1] += doc.data().eventsHosted;
                        this.datacollection.datasets[0].data[0] += doc.data().itemsExchanged; 
                        // console.log('in')
                        // console.log(doc.data());
                        console.log(doc.id);
                    }
                    // console.log('total')
                    // console.log(this.datacollection.datasets[0].data[1])
                })
                console.log(this.datacollection.datasets[0].data[0])
                console.log(this.datacollection.datasets[0].data[1])
                this.renderChart(this.datacollection, this.options);
            })
        }
    },
    created () {
        this.fetchItems();
    }
}