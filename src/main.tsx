import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Route from "./routes/Route";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Route></Route>
    </Provider>
  </StrictMode>
);
