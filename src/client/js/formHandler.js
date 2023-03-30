/* Global Variables */

function handleSubmit(event) {
  event.preventDefault();

  document.getElementById("generate").addEventListener("click", async () => {
    const newplace = document.getElementById("zip").value;
    const newnotes = document.getElementById("notes").value;
    const newDate = document.getElementById("date").value;

    //get data from APIs
    const geodata = await getGeoData(
      process.env.GEONAMES_URL,
      newplace,
      process.env.GEONAMES_USERNAME
    );
    //console.log("data return from geo api", geodata);

    const weatherdata = await getWeatherData(
      process.env.WEATHERBIT_URL,
      process.env.WEATHERBIT_KEY,
      geodata.lat,
      geodata.lng
    );
    //console.log("data return from weather api", weatherdata);

    let imgdata;
    try {
      imgdata = await getImg(
        process.env.PIXABAY_URL,
        process.env.PIXABAY_KEY,
        geodata.name
      );
      //console.log("data return from img api", imgdata);
      if (imgdata.length === 0) {
        imgdata = await getImg(
          process.env.PIXABAY_URL,
          process.env.PIXABAY_KEY,
          geodata.countryName
        );
        //console.log("data return from img api", imgdata);
      }
    } catch (e) {
      console.log("destination name for image search error", e);
    }

    //post data to server side
    const finalData = {
      weathers: weatherdata.slice(0, 4),
      place: geodata.name,
      countryName: geodata.countryName,
      date: newDate,
      userResponse: newnotes,
      imgs: imgdata,
    };
    //console.log("finalData", finalData);

    Client.updateUI(finalData);
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
}
export { handleSubmit };
