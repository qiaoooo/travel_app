async function showHistory() {
  container = document.querySelector("#history");
  const request = await fetch("http://localhost:8081/all");
  try {
    const allData = await request.json();
    for (let data of allData) {
      const { imgs, weathers, place, countryName, date, userResponse } = data;
      const row = document.createElement("div");
      row.classList.add("row");
      console.log(data);
    }
  } catch (error) {
    console.log("UI error", error);
  }
}

export { showHistory };
