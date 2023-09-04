import './App.css';
import { useState } from "react"

function App() {

  const [startDate, setStartDate] = useState("");
  const [interval, setInterval] = useState("");
  const [day, setDay] = useState("");
  const [message, setMessage] = useState([]);


let handleSubmit = async (e) => {
  e.preventDefault();

  const params = {
    startDate: startDate,
    interval: interval,
    day: day
  }


  try{
    const promise = fetch('https://localhost:7205/count',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    });

    promise.then(response => {
      return response.json();
    }).then(data => {
      setMessage(data)
      console.log(data)
    })

  }catch(err){
    console.log(err);
  }
  
};

let handleView = async (e) => {
  try{
    const promise = fetch('https://localhost:7205/giveLast',{
      method: 'GET',
    });

    promise.then(response => {
      return response.json();
    }).then(data => {
      setMessage(data)
      console.log(data)
    })

  }catch(err){
    console.log(err);
  }
}

  return (
    
    <div className="App">
      <div className='formDiv'>
        <form onSubmit={handleSubmit}>
          <p>Data początkowa: </p>
        <input type='date' className='dateInp' value={startDate} placeholder='start date' onChange={(e) => setStartDate(e.target.value)} max={new Date().toISOString().split("T")[0]} required/>
        <br></br>
        <p>Interwał: </p>
        <input type='number' className='numInp' value={interval} placeholder='interval' onChange={(e) => setInterval(e.target.value)} min={1} required/>
        <br></br>
        <p>Dzień tygodnia: </p>
        <select name='day' onChange={(e) => setDay(e.target.value)} required>
          <option value="Pn">Pn</option>
          <option value="Wt">Wt</option>
          <option value="Sr">Sr</option>
          <option value="Cz">Cz</option>
          <option value="Pt">Pt</option>
          <option value="Sb">Sb</option>
          <option value="N">N</option>
        </select>
        <br></br>
        <button type='submit'>Wylicz daty</button>

        
        </form>
      </div>
      <button type='submit' onClick={handleView}>Wyświetl</button>

      <div className='message'>
        {Object.keys(message).length === 0 ? (
        null
        ): 
        message.count !== "" ? (
        <><p>Ilość wystąpień: {message.count}
        <br></br>
        Dzisiejsza data: {message.currentDate}
        <br></br>
        Pierwsze wystąpienie: {message.firstOccurrence}
        <br></br>
        Poprzednie wystąpienie: {message.lastOccurrence}
        <br></br>
        Następne wystąpienie: {message.nextOccurrence}</p></>
        ):
        <p>Wybrana data oraz dzień tygodnia są niepoprawne do wyliczenia dat</p>
        }

      </div>
    </div>
  );
}

export default App;
