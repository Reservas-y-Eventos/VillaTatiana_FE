import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/home/home";
import LogIn from "../components/login/Login";
import Register from "../components/register/Register";
import Calendar from "../components/calendar/Calendar";
import Property from "../components/booking/Booking";
import Rental from "../components/rental/Rental";
import ContactUs from "../components/contactUs/ContactUs";
import CalendarDataHolder from "../data/calendar-data";
// import NotFound from "../components/notFound/NotFound";

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
                        <Calendar />
                    </CalendarDataHolder>
                </Route>
                <Route exact path={"/property"}>
                    <Property />
                </Route>
                <Route exact path={"/salon"}>
                    <Property />
                </Route>
                <Route exact path={"/objects"}>
                    <Rental />
                </Route>
                <Route exact path={"/spaces"}>
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