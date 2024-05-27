import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

initializeApp(firebaseConfig);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
