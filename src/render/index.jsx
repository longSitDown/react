const app = document.getElementById("app");
import React from "react";
import ReactDOM from "react-dom";

import App from "./views/home";
import MapView from "./views/map";

ReactDOM.render(<MapView />, app);
