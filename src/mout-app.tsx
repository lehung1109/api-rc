import ReactDOM from "react-dom/client";

import App from "@/components/App";

import { enableMocking } from "./mocks/enable";
import "./styles.css";

const app = document.getElementById("app");

if (app) {
  await enableMocking();
  ReactDOM.createRoot(app).render(<App />);
}
