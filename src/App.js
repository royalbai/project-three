// Styles
import './App.css';
// useState, useEffect
import { useState, useEffect } from "react";
// Firebase
import firebase from "./firebase";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";


function App() {
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (res) => {
      // console.log(res.val());
      const newState = [];
      const data = res.val();

      for(let key in data) {
        newState.push({key: key, name: data[key]});
      }
      setBooks(newState)
      console.log(newState);
    })
  }, [])
  
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, userInput);

    setUserInput("");
  }

  const handleRemoveBook = (bookId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${bookId}`);

    remove(dbRef);
  }

  return (
    <div className="App">
      <ul>
        {books.map((book) => {
          return(
            <li key={book.key}>
              <p>{book.name} {book.key}</p>
              <button onClick={() => handleRemoveBook(book.key)}>Remove</button>
            </li>
          );
        })}
      </ul>

      <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf</label>
        <input type="text" id="newBook" onChange={handleInputChange} value={userInput}/>
        <button onClick={handleSubmit}>Add Book</button>
      </form>
    </div>
  );
}

export default App;
