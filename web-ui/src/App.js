import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./layout/login";
import AdminRouter from "./Router/admin";
import StaffRouter from "./Router/staff";
import "./style/main.scss";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Login />} />
                <Route
                    path="/admin"
                    component={({ match }) => <AdminRouter match={match} />}
                />
                <Route
                    path="/staff"
                    component={({ match }) => <StaffRouter match={match} />}
                />
            </Switch>
        </Router>
    );
}

export default App;
