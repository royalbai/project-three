import { useState } from "react";

// Forms Section
const Forms = (props) => {
    const [week, setWeek] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

    return(
        <form className="schedule" action="submit">
            <div className="formContainer">
                <div className="dayOfTheWeek">
                    <label htmlFor="day">Day of the week:</label>
                    {/* <input type="text" id="day" placeholder="e.g. Monday, Tuesday etc." onChange={props.day} value={props.dayVal} /> */}
                    <select name="day" id="day" onChange={(e) => { props.day(e) }} value={props.dayVal}>
                        <option value="" disabled>Select a Day</option>
                        { week.map((day, index) => {
                            return(
                                <option key={index} value={day}>{day}</option>
                            );
                        }) }
                        {/* <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option> */}
                    </select>
                </div>
                <div className="typeOfExercise">
                    <label htmlFor="training">Type of exercise:</label>
                    <input type="text" id="training" placeholder="e.g. Weights, running, yoga, sport" onChange={props.type} value={props.typeVal} />
                </div>
                <div className="durationOfWorkout">
                    <label htmlFor="duration">Duration of workout:</label>
                    <input type="text" id="duration" placeholder="e.g. 30 minutes, 2 hours etc." onChange={props.duration} value={props.durationVal} />
                </div>
                <button onClick={props.submit}>Add a workout</button>
                { props.err === true ? <span id="formError">Please fill in the day of the week, the type of exercise, and the duration!</span> : null }
            </div>
        </form>
    );
}

export default Forms;