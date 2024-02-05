import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Edit = () => {
    const navigate = useNavigate();

    const params = useParams()
    const {id} = params
    console.log(id)
    
    let [ wholeJournals, setWholeJournals ] = useState([])
    let [ date, setDate ] = useState ("") 
    let [ title, setTitle ] = useState ("") 
    let [ entry, setEntry ] = useState ("") 

  useEffect(() => {

     const getData = async () => {
       try {
         // OPTION 1: use fetch for "index" route
         // const response = await fetch('/api/regs/:id')
         // const data = await response.json()
 
         // OPTION 2: use axios
         const response = await axios.get('/api/logs/' + id)
         console.log(response)
         setWholeJournals(response.data)
         setDate(response.data.date)
         setTitle(response.data.title)
         setEntry(response.data.entry)
        

       } catch(err) {
         console.error(err)
       }
     }
 
     getData()
 
   }, [])
 
async function updateJournal(e) {
    e.preventDefault()

   
    let wholeJournal = {

        date: date,
        title: title, 
        entry: entry,
      
      };

     

 try {

    // OPTION 1: use fetch for "delete" route

   // await fetch(`/api/todos/${id}`, {
   //   method: 'DELETE'
   // })

    // OPTION 2: use axios

    console.log("updating",wholeJournal.title)
    await axios.put(`/api/logs/${id}`, wholeJournal)
    navigate(`/pages/Show/${id}`)
 


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
      
        
        
      <h1> Edit Journal Entry</h1>
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
                <input type="textarea" value={entry} onChange={handleChangeE} />
              </div>
          </form>
          <br></br>
          <button onClick={updateJournal}>Submit</button>
          
        
        </div>
  )
}


export default Edit