function saveTrip(event) {
  event.preventDefault();
  document.getElementById("save").addEventListener("click", async () => {
    const img = document.getElementById("imgHidden").value;
    const newDate = document.getElementById("date").value;
    const newPlace = document.getElementById("zip").value;
    const newNotes = document.getElementById("notes").value;

    const finalData = { img, newDate, newPlace, newNotes };

    postData("http://localhost:8081/add", finalData)
      .then(Client.showHistory())
      .catch((error) => console.log("error", error));

    document.querySelector("form").reset();
  });

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
}

export { saveTrip };
