import { Toaster } from "react-hot-toast";
import "./App.css";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <Router />
        <Toaster />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
