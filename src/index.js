import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/Store";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NetworkStatus from "./Services/NetworkStatus";
import { OnlineStatusProvider } from "./Provider/OnlineStatusProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          {/* <NetworkStatus> */}
          <OnlineStatusProvider>
          <App />
          </OnlineStatusProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* </NetworkStatus> */}
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </StyledEngineProvider>
);

reportWebVitals();
