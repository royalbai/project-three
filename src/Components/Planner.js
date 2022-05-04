// React Hooks
import { useState, useEffect } from "react";
// Firebase
import { getDatabase, ref, onValue, push, remove, set, update } from "firebase/database";
import firebase from "../firebase";
// Forms Import
import Forms from "./Forms";

// Planner Section
const Planner = () => {
    const [exercises, setExercises] = useState([]);
    const [userDayInput, setUserDayInput] = useState("");
    const [userTypeInput, setUserTypeInput] = useState("");
    const [userDurationInput, setUserDurationInput] = useState("");
    const [error, setError] = useState(false);
    // Firebase Database
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
    // User Database
    const newExercise = {
        day: userDayInput,
        type: userTypeInput,
        duration: userDurationInput
    }
    // User's Values
    const handleDayChange = (e) => {
        setUserDayInput(e.target.value);
    }
    const handleTypeChange = (e) => {
        setUserTypeInput(e.target.value);
    }
    const handleDurationChange = (e) => {
        setUserDurationInput(e.target.value);
    }
    // Submit Request
    const handleSubmit = (e) => {
        e.preventDefault();

        const database = getDatabase(firebase);
        const dbRef = ref(database);

        const displayErr = (value) => {
            if(value === false) {
                setError(false)
            } else {
                setError(true)
            }
        }
        const clearInputs = () => {
            push(dbRef, newExercise);
            setUserDayInput("");
            setUserTypeInput("");
            setUserDurationInput("");
            displayErr(false);
        };
        // Error or Not 
        userDayInput.length && userTypeInput.length && userDurationInput.length
            ? clearInputs() : displayErr(true)
    }
    // Remove Function
    const clearWeek = () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        setExercises([]);
        remove(dbRef, exercises);
    }

    return(
        <>
            <Forms 
            day={ handleDayChange } 
            type={ handleTypeChange } 
            duration={ handleDurationChange } 
            submit={ handleSubmit }
            dayVal={ userDayInput }
            typeVal={ userTypeInput }
            durationVal={ userDurationInput }
            err={ error }
            />

            <ul className="planner">
                { exercises.map((workout) => {
                return(
                    <li key={ workout.key }>
                        <p><u>{ workout.day }</u></p>
                        <p><strong>{ workout.type }</strong></p>
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