import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Show = () => {
   const params = useParams()
    const {id} = params
    console.log(id)

    let [ journalEntry, setJournalEntry ] = useState ([])

   useEffect(() => {

    const getData = async () => {
      try {
        // OPTION 1: use fetch for "index" route
        // const response = await fetch('https://localhost:5000/api/regs/:id')
        // const data = await response.json()

        // OPTION 2: use axios
        const response = await axios.get('/api/logs/' + id)
        console.log(response)
        setJournalEntry(response.data)
      } catch(err) {
        console.error(err)
      }
    }

    getData()

  }, [])

  async function deleteEntry(id) {
  
    try {

       // OPTION 1: use fetch for "delete" route

      // await fetch(`/api/todos/${id}`, {
      //   method: 'DELETE'
      // })

       // OPTION 2: use axios

       await axios.delete(`/api/logs/${id}`)
       res.redirect("/pages/Profile")


    } catch(err) {
      console.log(err)
    }
    
  }

//   async function updatePerson(id) {
  
//     try {

//        // OPTION 1: use fetch for "delete" route

//       // await fetch(`/api/todos/${id}`, {
//       //   method: 'DELETE'
//       // })

//        // OPTION 2: use axios

//        await axios.patch(`http://localhost:5000/api/regs/${id}`)
    


//     } catch(err) {
//       console.log(err)
//     }
    
//   }


   

  return (
    <div>
      <br></br>
      <h1> {journalEntry.date} {journalEntry.title} </h1>

      
<div className='flex justify-center'>
        <Link to={`/pages/edit/${journalEntry._id}`}>
          <button> Edit Journal Entry </button>
          </Link>
        <Link to={"/profile"} onClick={()=> deleteEntry(journalEntry._id)}>
          < button> Delete Journal Entry </button>

          </Link>
        <br></br>
        <Link to={`/profile`}>
          <button > See Complete Journal </button>
          </Link>
         
    </div>
    <br></br>
    <br></br>
    <div>
      <h1> Journal Date : {journalEntry.date} </h1> 
        <br></br>
        <h1>Journal Title: {journalEntry.title} </h1>
        <br></br>
        <br></br>
        <p>Journal Entry : {journalEntry.entry} </p>
        <br></br>
        

          <br></br>
          </div>
      
    </div>
  )
}

export default Show