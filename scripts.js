const birthrate = "RBIRTH2015"
const deathrate = "RDEATH2015"
const naturalIncreaseRate = "RNATURALINC2015"
const netMigrationRate = "RNETMIG2015"
const totalDeaths = "DEATHS2015"
const totalPopulation ="POPESTIMATE2015"

var dataSet = totalPopulation;

function dataCalculations(data) {
  var dataByState = _.keyBy(populationData, "NAME");

  dataByState = _.filter(dataByState, function(item){
    return item.NAME.length < 3
  })

  var populationEst2015 = _.map(dataByState, function(state){
    var stateName=state.NAME;
    return {
      state: state.NAME,
      data: state[data],
    }
  });

  var max = _.maxBy(populationEst2015, function(object){
    return object.data
  });

  var min = _.minBy(populationEst2015, function(object){
    return object.data
  });

  var color = d3.scaleLinear()
      .domain([min.data, max.data])
      .range(["white", "darkGreen"]);

  var popByState = _.keyBy(populationEst2015, "state");

  var colorDataByState = _.map(popByState, function(item){
    return {
      state: item.state,
      fill: color(item.data)
    }
  })

  colorDataByState = _.keyBy(colorDataByState, "state")

  var mapColorData = _.mapValues(colorDataByState, function(item){
    return item.fill
  });

  console.log(popByState);

  var map = new Datamap({
      element: document.getElementById('container'),
      scope: 'usa',
      geographyConfig: {
        highlightFillColor: 'purple',
        popupOnHover: true,
        popupTemplate: function(geography, data){
          return `<div class="hoverinfo">
                    ${geography.properties.name}
                    Data: ${data.data}
                  </div>`
        },
      },
      data: popByState,
    });

  map.updateChoropleth(mapColorData, {reset: false});
}

// document.getElementById("switch-view-button").addEventListener("click", function(){
//     switchView();
// });

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

dataCalculations(dataSet)

document.getElementById('switch-view-form').onsubmit = function(e) {
    e.preventDefault();
    // this (keyword) refers to form to which onsubmit attached
    // 'ship' is name of radio button group
    var val = getRadioVal(this, 'view');
    // display value obtained
    console.log(val);

    switch(val){
      case 'totalpopulation':
        dataSet = totalPopulation;
        break;
      case 'birthrate':
        dataSet = birthrate;
        break;
      case 'deathrate':
        dataSet = deathrate;
        break;
    }
    // more code here ...
    document.getElementById('container').innerHTML = '';

    dataCalculations(dataSet)
}
