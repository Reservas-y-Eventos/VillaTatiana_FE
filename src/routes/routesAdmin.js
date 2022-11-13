import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/home/home";
import LogIn from "../components/login/Login";
import Register from "../components/register/Register";
import MyEvents from "../components/calendar/MyEvents";
import Property from "../components/booking/Booking";
import Rental from "../components/rental/Rental";
import ContactUs from "../components/contactUs/ContactUs";
import CalendarDataHolder from "../data/calendar-data";
import RentalDataHolder from "../data/rental-data";

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
                    <CalendarDataHolder>
                        <MyEvents />
                    </CalendarDataHolder>
                </Route>
                <Route exact path={"/booking"}>
                    <Property />
                </Route>
                <Route exact path={"/rental"}>
                    <RentalDataHolder>
                        <Rental />
                    </RentalDataHolder>
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