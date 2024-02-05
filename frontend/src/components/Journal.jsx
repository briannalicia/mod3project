import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import axios from "axios"

const Journal = () => {

   let [ wholeJournals, setWholeJournals ] = useState([])
   let [ date, setDate ] = useState ("") 
   let [ title, setTitle ] = useState ("") 
   let [ entry, setEntry ] = useState ("") 

       

       useEffect(() => {
  
        const getData = async () => {
  
        try {
          const response = await axios.get("/api/logs")
          console.log(response)
          setWholeJournals(response.data)
  
        } catch (err) {
          console.error(err)
        }
      }
      getData()
  
       }, [] )
  
       async function addToList(e) {
         
        
        try {
    
   
          let jounal = {

            date: date,
            title: title, 
            entry: entry,
          
          };
  
          
  
         
  
          console.log(jounal)
    
          const response = await axios.post("/api/logs", jounal )
            console.log(response)
          setWholeJournals([...wholeJournals, response.data]);
  
          setDate("")
          setTitle("")
          setEntry("")
          
         
        } catch(err) {
          console.log(err)
        }
      }
    
     
    
      function handleChangeD (event) {
        setDate(event.target.value)
      }
      function handleChangeT (event) {
        setTitle(event.target.value)
      }
      function handleChangeE (event) {
        setEntry(event.target.value)
      }
      
    
    
      
  
  
  
    return (
      
       
            <div>
        <h1>Existing Journal Entries</h1>
          <ul>
            <li>
            {wholeJournals.map((log) => {
  
              
              return <Link to={`/pages/Show/${log._id}`} key={log._id} log={log}>
                <h1>{log.date} {log.title}</h1>
                </Link>
              
  
            })}
            </li>
          </ul> 
          <br></br>
          <br></br>
          
          
         
          <h1> Create a New Journal Entry</h1>
          <br></br>
          <br></br>
          <form>
              <div>
            <h3>Journal Entry Information</h3>
              
              <br></br>
                Date : 
            <input value={date} onChange={handleChangeD}/>
              <br></br>
              <br></br>
                Title :
              <input value={title} onChange={handleChangeT}/>
              <br></br>
              <br></br>
                Entry :
                <input value={entry} onChange={handleChangeE} />
              </div>
          </form>

          <br></br>

          <button onClick={addToList}>Submit</button>
          
          </div>
      
    )
  }
  
  export default Journal