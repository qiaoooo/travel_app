function validateForm() {
  var place = document.forms["myForm"]["zip"].value;
  var date = document.forms["myForm"]["date"].value;

  if (place === "" || date === "") {
    alert("Name or Date must be filled out");
    return false;
  }
}
export { validateForm };
