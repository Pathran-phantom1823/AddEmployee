<template>
<div>
    <chart :options="chartOptionsBar"></chart>
</div>
</template>

<script>
export default {
    data() {
        return {
            chartOptionsBar: {
                xAxis: {
                    data: ['Q1', 'Q2', 'Q3', 'Q4']
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                data: [63, 75, 24, 92]
            }]
        }
    }
}
</script>
