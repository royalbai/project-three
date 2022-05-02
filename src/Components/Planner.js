// React Hooks
import { useState, useEffect } from "react";
// Firebase
import { getDatabase, ref, onValue, push, remove, set, update } from "firebase/database";
import firebase from "../firebase";

const Planner = () => {
    const [exercises, setExercises] = useState([]);
    const [userDayInput, setUserDayInput] = useState("");
    const [userTypeInput, setUserTypeInput] = useState("");
    const [userDurationInput, setUserDurationInput] = useState("");

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database)

        onValue(dbRef, (res) => {
            const newState = [];
            const data = res.val();

            for (let key in data) {
                newState.push({
                    key: key,
                    day: data[key].day,
                    type: data[key].type,
                    duration: data[key].duration
                });
            }

            setExercises(newState);
        })
    }, [])

    const newExercise = {
        day: userDayInput,
        type: userTypeInput,
        duration: userDurationInput
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const database = getDatabase(firebase);
        const dbRef = ref(database);

        const showErr = (element) => {
            element.style.display = "block";
        }
        const hideErr = (element) => {
            element.style.display = "none";
        }

        const clearInputs = () => {
            push(dbRef, newExercise);
            setUserDayInput("");
            setUserTypeInput("");
            setUserDurationInput("");
        };

        userDayInput.length && userTypeInput.length && userDurationInput.length
            ? clearInputs(hideErr(document.querySelector("span")))
            : showErr(document.querySelector("span"))
    }

    const clearWeek = () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        setExercises([]);
        remove(dbRef, exercises);
    }

    return(
        <>
            <form action="submit">
                <div className="formContainer">
                    <div className="dayOfTheWeek">
                        <label htmlFor="day">Day of the week:</label>
                        <input type="text" id="day" placeholder="e.g. Monday, Tuesday etc." onChange={(e) => setUserDayInput(e.target.value)} value={userDayInput} />
                    </div>
                    <div className="typeOfExercise">
                        <label htmlFor="training">Type of exercise:</label>
                        <input type="text" id="training" placeholder="e.g. Weights, running, yoga, sport" onChange={(e) => setUserTypeInput(e.target.value)} value={userTypeInput} />
                    </div>
                    <div className="durationOfWorkout">
                        <label htmlFor="duration">Duration of workout:</label>
                        <input type="text" id="duration" placeholder="e.g. 30 minutes, 2 hours etc." onChange={(e) => setUserDurationInput(e.target.value)} value={userDurationInput} />
                    </div>
                    <button onClick={handleSubmit}>Add a workout</button>
                    <span id="formError">Please fill in the day of the week, the type of exercise, and the duration!</span>
                </div>
            </form>

            <ul className="planner">
                { exercises.map((workout) => {
                return(
                    <li key={ workout.key }>
                        <p>{ workout.day }</p>
                        <p>{ workout.type }</p>
                        <p>{ workout.duration }</p>
                    </li>
                );
                }) }
            </ul>
                
            <button onClick={clearWeek}>Clear week</button>
        </>
        
    );
}

export default Planner;