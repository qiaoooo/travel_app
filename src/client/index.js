import { handleSubmit } from "./js/formHandler";
import { onChange } from "./js/onChange";
import { validateForm } from "./js/validateForm";
import { calcDayGap } from "./js/dayGap";
import { saveTrip } from "./js/saveTrip";
import { updateUI } from "./js/updateUI";
import { showHistory } from "./js/showHistory";
import "./styles/style.scss";

/* alert("received!"); */
export {
  handleSubmit,
  showHistory,
  onChange,
  validateForm,
  calcDayGap,
  saveTrip,
  updateUI,
};
