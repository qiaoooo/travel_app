async function showHistory() {
  const container = document.querySelector("#history");
  const request = await fetch("http://localhost:8081/all");
  try {
    const allData = await request.json();
    for (let data of allData) {
      const { img, newDate, newPlace, newNotes } = data;
      //console.log(img, newDate, newPlace, newNotes);
      const li = document.createElement("li");
      li.classList.add(
        ...[
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-start",
        ]
      );

      li.innerHTML = `
      <div >
        <div class="fw-bold">${newPlace}</div>
        <div class="row">
          <div class="col-8 col-sm-6 historyImg">
            <img class="img-fluid"  src="${img}"/>
          </div>
          <div class="col-4 col-sm-6">
            ${newNotes}
          </div>
        </div>
      </div>
      <span class="badge bg-primary rounded-pill">${newDate}</span>`;
      container.appendChild(li);
    }
  } catch (error) {
    console.log("history error", error);
  }
}

export { showHistory };
