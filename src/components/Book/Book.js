import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckInDateChange = (date) => {
        const newDates = {...selectedDate};
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleCheckOutDateChange = (date) => {
        const newDates = {...selectedDate};
        newDates.checkOut = date;
        setSelectedDate(newDates);
    }

    const handleBooking = () =>{
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch ("http://localhost:5000/addBooking", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBooking)
        })
        .then (res => res.json())
        .then (data =>{
            console.log(data);
        })
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello, {loggedInUser.name}! </h1>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check in Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check out Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;