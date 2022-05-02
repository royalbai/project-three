// Styles
import './App.css';
// React
import { useState, useEffect } from "react";
// Firebase
import firebase from "./firebase";
import { getDatabase, ref, onValue, push, remove, set, update } from "firebase/database";


const App = () => {
  const [ exercises, setExercises ] = useState([]);
  const [ userDayInput, setUserDayInput] = useState("");
  const [ userTypeInput, setUserTypeInput ] = useState("");
  const [ userDurationInput, setUserDurationInput ] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)

    onValue(dbRef, (res) => {
      const newState = [];
      const data = res.val();

      for(let key in data) {
        newState.push({
          key: key,
          day: data[ key ].day,
          type: data[ key ].type,
          duration: data[ key ].duration
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
    <div className='App'>
      <header>
        <div className="wrapper">
          <h1>Fitness Planner</h1>
          <img src="" alt="" />
        </div>
      </header>

      <div className="about">
        <div className="wrapper">
          <h2>How to get started</h2>
          <p>Plan your week ahead of time with the <strong>Fitness Planner</strong> app! Start by putting in the day of the week(Mon-Sun), then any form of excercise ranging from yoga to the gym to outdoor sports, and follow it up with the length of time you aim to workout for. Afterwards, when the week has ended you can clear the entries and log in your plans for the new week ahead of you. Achieve your goals or strive for a healthy lifetyle!</p>
        </div>
      </div>

      <form action="submit">
        <div className="wrapper">
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
        </div>
      </form>

      <div className="planner">
        <div className="wrapper">
          { exercises.map((workout) => {
            return(
                <li key={ workout.key }>
                  <p>{ workout.day }</p>
                  <p>{ workout.type }</p>
                  <p>{ workout.duration }</p>
                </li>
            );
          }) }
        </div>
      </div>

      <div className="wrapper">
        <button onClick={clearWeek}>Clear week</button>
      </div>

      <footer>
        <div className="wrapper">
          <p>Created at Juno College of Technology</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
