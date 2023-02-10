import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
// import Login from '../components/Login';


function CalendarWidget(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    // var userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));

    // Array to store month string values
    const allMonthValues = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    // State for date selected by user
    const [selectedDate, setSelectedDate] = useState();
    // State for text above calander
    const [calendarText, setCalendarText] = useState(`No Date is selected`);
    // Function to update selected date and calander text
    const handleDateChange = (value) => {
        setSelectedDate(value);
        setCalendarText(`The selected Date is ${value.toDateString()}`);
    };
    // Function to handle selected Year change
    const handleYearChange = (value) => {
        const yearValue = value.getFullYear();
        setCalendarText(`${yearValue} Year  is selected`);
    };
    // Function to handle selected Month change
    const handleMonthChange = (value) => {
        const monthValue = allMonthValues[value.getMonth()];
        setCalendarText(`${monthValue} Month  is selected`);
    };


    return (
        <div className="app">
            {/* {userLoggedIn? <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/> : <Login/>} */}
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />
            <div className="calendar-page-div">
                <h2 className="calander-details">{calendarText}</h2>
                <div className="calendar-grid">
                    <Calendar
                        onClickMonth={handleMonthChange}
                        onClickYear={handleYearChange}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
}


export default CalendarWidget;