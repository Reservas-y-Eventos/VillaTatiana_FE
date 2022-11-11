import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/home/home";
import LogIn from "../components/login/Login";
import Register from "../components/register/Register";
import MyEvents from "../components/calendar/MyEvents";
import Property from "../components/booking/Booking";
import Rental from "../components/rental/Rental";
import ContactUs from "../components/contactUs/ContactUs";

const RoutesAdmin = () => {
    const renderRoutes = () => {
        return (
            <>
                <Route exact path={"/"}>
                    <Home />
                </Route>
                <Route exact path={"/login"}>
                    <LogIn />
                </Route>
                <Route exact path={"/sign-up"}>
                    <Register />
                </Route>
                <Route exact path={"/calendar"}>
                    <MyEvents />
                </Route>
                <Route exact path={"/booking"}>
                    <Property />
                </Route>
                <Route exact path={"/rental"}>
                    <Rental />
                </Route>
                <Route exact path={"/contact-us"}>
                    <ContactUs />
                </Route>
            </>
        )
    };

    return (
        <>
            {renderRoutes()}
        </>
    )
}

export default RoutesAdmin;