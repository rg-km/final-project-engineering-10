import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/reusable/Layout";
import "./App.css";
import Login from "./components/pages/landing/Login";
import Register from "./components/pages/landing/Register";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout type={"front"}></Layout>} />
          <Route
            path="/login"
            element={
              <Layout type={"front"}>
                {" "}
                <Login />{" "}
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout type={"front"}>
                {" "}
                <Register />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
