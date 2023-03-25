/* Global Variables */

function handleSubmit(event) {
  event.preventDefault();
  
  document.getElementById("generate").addEventListener("click", async () => {
    const newplace = document.getElementById("zip").value;
    const newnotes = document.getElementById("notes").value;
    const newDate = document.getElementById("date").value;

    //get data from APIs
    const geodata = await getGeoData(process.env.GEONAMES_URL, newplace, process.env.GEONAMES_USERNAME);
    console.log("data return from geo api", geodata);

    const weatherdata = await getWeatherData(
      process.env.WEATHERBIT_URL,
      process.env.WEATHERBIT_KEY,
      geodata.lat,
      geodata.lng
    );
    console.log("data return from weather api", weatherdata);

    let imgdata;
    try {
      imgdata = await getImg(process.env.PIXABAY_URL, process.env.PIXABAY_KEY, geodata.name);
      console.log("data return from img api", imgdata);
      if (imgdata.length === 0) {
        imgdata = await getImg(process.env.PIXABAY_URL, process.env.PIXABAY_KEY, geodata.countryName);
        console.log("data return from img api", imgdata);
      }
    } catch (e) {
      console.log("destination name for image search error", e);
    }

    //post data to server side
    postData("http://localhost:8081/add", {
      weathers: weatherdata.slice(0, 4),
      place: geodata.name,
      countryName: geodata.countryName,
      date: newDate,
      userResponse: newnotes,
      imgs: imgdata,
    })
      .then(updateUI())
      .catch((error) => console.log("error", error));
  });

  const getGeoData = async (baseurl, placename, urluser) => {
    const resGeo = await fetch(`${baseurl}q=${placename}&username=${urluser}`);

    try {
      const data = await resGeo.json();
      //console.log("data return from geonames", data.geonames[0]);
      return data.geonames[0];
    } catch (error) {
      console.log("geolocation data error", error);
    }
  };

  const getWeatherData = async (baseurl, apikey, lat, lon) => {
    const resWeather = await fetch(
      `${baseurl}&lat=${lat}&lon=${lon}&key=${apikey}`
    );

    try {
      const data = await resWeather.json();
      //console.log("data return from getweather API", data.data);
      return data.data;
    } catch (error) {
      console.log("geo weather data error", error);
    }
  };

  const getImg = async (baseurl, apikey, searchterm) => {
    const resImg = await fetch(
      `${baseurl}key=${apikey}&q=${searchterm}&image_type=photo&per_page=4`
    );

    try {
      const data = await resImg.json();
      //console.log("data return from img API", data);
      return data.hits;
    } catch (error) {
      console.log("image data error", error);
    }
  };

  const postData = async (url, data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });
  };

  const updateUI = async () => {
    const request = await fetch("http://localhost:8081/all");
    try {
      const allData = await request.json();
      console.log("update UI", allData);
      const { imgs, weathers, place, countryName, date, userResponse } =
        allData;

      //clean up current display
      const tripsnotes = document.querySelector(".tripsnotes");
      const carousel = document.querySelector(".carousel-inner");
      const container = document.querySelector("#weather");

      tripsnotes.innerHTML = "";
      carousel.innerHTML = "";
      container.innerHTML = "";

      //calculate days
      const one_day = 1000 * 60 * 60 * 24;
      const currDate = new Date();
      const departDate = new Date(date);
      const result =
        Math.round(departDate.getTime() - currDate.getTime()) / one_day;
      const dayGap = result.toFixed(0); // To remove the decimals from the (Result) resulting days value

      //output to tripnote
      tripsnotes.innerHTML = `
      <h2 class="entryheader" data-name="${place},${countryName}"> 
        <span>${place}, ${countryName}</span> in ${dayGap} days
      </h2> 
      <div class="entrynotes">${userResponse}</div>`;

      //get image galary
      document.getElementById("carouselExampleCaptions").style.display =
        "inline";

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
        col.classList.add("col");

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

    document.querySelector("form").reset();
  };
}
export { handleSubmit };
