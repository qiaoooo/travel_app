export async function updateUI(allData) {
  try {
    const { imgs, weathers, place, countryName, date, userResponse } = allData;
    const imgHidden = document.createElement("input");

    Object.assign(imgHidden, {
      type: "hidden",
      value: imgs[0].webformatURL,
      id: "imgHidden",
    });
    const mysaveForm = document.querySelector("#mySaveForm");
    mysaveForm.appendChild(imgHidden);

    //clean up current display
    const tripsnotes = document.querySelector(".tripsnotes");
    const carousel = document.querySelector(".carousel-inner");
    const container = document.querySelector("#weather");

    tripsnotes.innerHTML = "";
    carousel.innerHTML = "";
    container.innerHTML = "";

    //calculate days
    const dayGap = Client.calcDayGap(date);

    //output to tripnote
    tripsnotes.innerHTML = `
    <h2 class="entryheader" data-name="${place},${countryName}"> 
      <span>${place}, ${countryName}</span> in ${dayGap} days
    </h2> 
    <div class="entrynotes">${userResponse}</div>`;

    //get image galary
    document.getElementById("showrow").style.display = "inline";

    for (let img of imgs) {
      const div = document.createElement("div");
      div.classList.add("carousel-item");
      const markup = `  <div class="container">
      <img src=${img.webformatURL}  style="height: 18rem"  class="d-block w-100 mx-auto img-thumbnail" alt="${img.id}"></div>
      <div class="carousel-caption d-none d-md-block">
      <p>"${img.tags}"</p>
    </div>`;
      // console.log(markup);
      div.innerHTML = markup;
      carousel.appendChild(div);
    }
    carousel.firstElementChild.classList.add("active");

    //output weather forcast
    for (let weather of weathers) {
      const icon = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`;

      const col = document.createElement("div");
      col.classList.add("col-sm");

      const weathercard = document.createElement("div");
      weathercard.classList.add("card");
      weathercard.style.height = "100%";
      const markup = `
        <figure> 
          <img src=${icon} style="height: 8rem;" alt=${
        weather.weather.code
      } class="card-img-top img-thumbnail" >
          <figcaption>
          <div>${weather.weather.description}</div> 
          <div>wind speed ${weather.wind_spd} m/s</div>
          </figcaption> 
        </figure> 
        <div class="card-body align-bottom">
          <p class="card-title">${weather.valid_date}</p>
          <p class="card-text">${Math.round(weather.temp)}<sup>°C</sup></p>
        </div>`;
      weathercard.innerHTML = markup;
      col.appendChild(weathercard);
      container.appendChild(col);
    }
  } catch (error) {
    console.log("UI error", error);
  }
}
