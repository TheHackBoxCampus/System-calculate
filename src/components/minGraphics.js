export default {
    content (xAsisData, YAsisData){
        return {
            xAxis: {
              type: 'category',
              data: xAsisData
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: YAsisData,
                type: 'bar',
              }
            ]
          }
    },
    
    render_graphics(E, {data}){
        let chart = E.init(document.getElementById('graphics')) 
        let info = this.content(data.x, data.y)
        chart.setOption(info)
    }
}


