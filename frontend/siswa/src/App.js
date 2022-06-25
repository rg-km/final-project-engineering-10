import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/reusable/Layout";
import "./App.css";
import Login from "./components/pages/landing/Login";
import Register from "./components/pages/landing/Register";
import Dashboard from "./components/pages/dashboard/Dashboard";
import ListPelajaran from "./components/pages/dashboard/mataPelajaran/ListPelajaran";
import SelectPelajaran from "./components/pages/dashboard/tugas/SelectPelajaran";
import ListSiswaCreditScore from "./components/pages/dashboard/creditScore/ListPointCreditScore";
import Landing from "./components/pages/landing/Landing";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
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
          <Route
            path="/dashboard"
            element={
              <Layout type={"dashboard"}>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/dashboard/pelajaran"
            element={
              <Layout type={"dashboard"}>
                <ListPelajaran />
              </Layout>
            }
          />
          <Route
            path="/dashboard/tugas"
            element={
              <Layout type={"dashboard"}>
                <SelectPelajaran />
              </Layout>
            }
          />
          <Route
            path="/dashboard/credit-score"
            element={
              <Layout type={"dashboard"}>
                <ListSiswaCreditScore />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
