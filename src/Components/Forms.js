const Forms = (props) => {
    return(
        <form action="submit">
            <div className="formContainer">
                <div className="dayOfTheWeek">
                    <label htmlFor="day">Day of the week:</label>
                    <input type="text" id="day" placeholder="e.g. Monday, Tuesday etc." onChange={props.day} value={props.dayVal} />
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
                <span id="formError">Please fill in the day of the week, the type of exercise, and the duration!</span>
            </div>
        </form>
    );
}

export default Forms;