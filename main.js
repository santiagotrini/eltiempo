let props = {
  humidity: 'Humedad',
  wind_speed: 'Velocidad del viento',
  wing_deg: 'Direccion del viento',
  description: 'Descripcion',
  temp: 'Temperatura'
}

let status = {
  Despejado: '🌞',
  'Algo nublado': '⛅'
}

document.body.children[1].value = '';
const url = 'https://ws.smn.gob.ar/map_items/weather';
let weatherStation = 'Rosario';
document.addEventListener('DOMContentLoaded', init());

function init() {

  // console.log('anda...');
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // aca va lo importante lo que queremos hacer
      // console.log(document.body.children[1].value);
      weatherStation = document.body.children[1].value || weatherStation;
      let filteredData = data.filter(item => item.name == weatherStation)[0];
      if (!filteredData) {
        document.body.children[1].value = '';
        console.log('No existe esa estacion');
        let alert = document.createElement('h2');
        alert.textContent = 'No existe esa estacion';
        document.body.append(alert);
        setTimeout(() => {
          alert.remove();
        }, 2000);
        return false;
      }
      // console.log(filteredData.weather);
      let stationName = filteredData.name;
      // modificamos el div
      let container = document.getElementById('container');
      container.innerHTML = '';
      let title = document.createElement('h2');
      title.textContent = stationName;
      container.append(title);
      console.log(filteredData.weather);
      delete filteredData.weather.id;
      delete filteredData.weather.st;
      delete filteredData.weather.tempDesc;
      delete filteredData.weather.visibility;
      delete filteredData.weather.pressure;
      let dataDiv = document.createElement('div');
      let itemsDiv = document.createElement('div');
      dataDiv.classList.add('data');
      itemsDiv.classList.add('items');
      container.append(dataDiv);
      dataDiv.append(itemsDiv);
      for (let key in filteredData.weather) {
        if (key == 'description') {
          let emoji = document.createElement('div');
          emoji.textContent = status[filteredData.weather[key]];
          emoji.classList.add('weatherStatus');
          dataDiv.append(emoji);
        }
        let div = document.createElement('div');
        div.textContent = `${props[key]}: ${filteredData.weather[key]}`;
        div.classList.add('weatherItem');
        itemsDiv.append(div);
      }
    })
    .catch(err => console.log(err));
}
