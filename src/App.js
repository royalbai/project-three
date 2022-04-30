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
  const [ userLengthInput, setUserLengthInput ] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)

    onValue(dbRef, (res) => {
      const newState = [];
      const data = res.val();

      for(let key in data) {
        newState.push(data[ key ]);
      }

      setExercises(newState);
    })
  }, [])

  const handleInputDay = (e) => {
    setUserDayInput(e.target.value);
  }

  const handleInputType = (e) => {
    setUserTypeInput(e.target.value);
  }

  const handleInputLength = (e) => {
    setUserLengthInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, { userDayInput, userTypeInput, userLengthInput });
  }

  return(
    <div className='App'>
      <ul>
        { exercises.map((workout, index) => {
          return(
            <li key={ index }>
              <p>{ workout }</p>
            </li>
          );
        }) }
      </ul>

      <form action="submit">
        <label htmlFor="day">What day of the week</label>
        <input type="text" id="day" onChange={ handleInputDay } value={ userDayInput } />

        <label htmlFor="training">What form of exercise</label>
        <input type="text" id="training" onChange={ handleInputType } value={ userTypeInput } />

        <label htmlFor="duration">For how long</label>
        <input type="text" id="duration" onChange={ handleInputLength } value={ userLengthInput } />

        <button onClick={ handleSubmit }>Add a workout</button>
      </form>
    </div>
  );
}

export default App;
