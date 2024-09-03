import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import CSS here
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/style.css"
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/index";
ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById("root")
);
