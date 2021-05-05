import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style/main.scss";
import "antd/dist/antd.css";
import Login from "./layout/login";
import AdminRouter from "./Router/admin";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Login />} />
                <Route
                    path="/admin"
                    component={({ match }) => <AdminRouter match={match} />}
                />
                {/* <Route
                    path="/muon-csvc"
                    component={({ match }) => <NhanVien match={match} />}
                /> */}
            </Switch>
        </Router>
    );
}

export default App;
