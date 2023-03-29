function saveTrip(event) {
  event.preventDefault();
  console.log("finaldata", finalData);
  /* document.getElementById("save").addEventListener("click", async () => {
    postData("http://localhost:8081/add", finalData)
      .then((res) => {
        res.json();
      })
      .then(console.log("res", res))
      //.then(showHistory())
      .catch((error) => console.log("error", error));
  }); */

  /*   const postData = async (url, data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });
  }; */
}

export { saveTrip };
