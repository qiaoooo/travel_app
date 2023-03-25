function onChange(event) {
  // check what text was put into the form field
  document.querySelector("textarea").style.backgroundColor =
    "rgb(232, 240, 254)";
  document.querySelector("textarea").style.color = "rgba(0,0,0)";
}

export { onChange };
