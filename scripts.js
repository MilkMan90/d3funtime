// var Converter = require("csvtojson").Converter;
// var converter = new Converter({});
//
// converter.fromFile("./achievement.csv",function(err,result){
//  console.log(result);
// });

console.log(populationData);

  var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
    fills: {
      HIGH: '#afafaf',
      LOW: '#123456',
      MEDIUM: 'blue',
      UNKNOWN: 'rgb(0,0,0)',
      defaultFill: 'green'
    },
    geographyConfig: {
      highlightFillColor: '#f1231d',
      popupOnHover: true,
      popupTemplate: function(geography, data){
        console.log(geography.properties)
        console.log(data);
        return '<div class="hoverinfo">'+geography.properties+'</div>'
      }
    },
    data:{
      NY: {
        test: 'hello',
      }
    }
  });

function data(){
  return {
    CA: {
      fillKey: 'LOW',
    },
    NY: {
      fillKey: 'LOW',
    },
    NJ: {
      fillKey: 'MEDIUM',
    },
    CO: {
      fillKey: 'HIGH',
    }
  }
}

map.updateChoropleth(data());
