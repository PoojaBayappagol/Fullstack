import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([
    {
      title:"test title 1",
      description:"test description 1"
    },
    {
      title:"test title 2 ",
      description:"test description 2"
    }, 
    {
      title:"test title 3 ",
      description:"test description 3"
    },
    {
      title:"test title 4",
      description:"test description 4"
    },
  ])

  function fetchNotes(){
    axios.get("https://fullstack-1-82id.onrender.com/notes")
  .then((res)=>{
    setNotes(res.data.notes)
  })
  }

  useEffect(()=>{
     fetchNotes()
  },[])
 
function handleSubmit(e){
  e.preventDefault()

  const {title, description} = e.target.elements

  axios.post("https://fullstack-1-82id.onrender.com/notes",{
    title: title.value,
    description: description.value
  })
  .then(()=>{
    fetchNotes()
    setTitle("")
    setDescription("")
  })
  .catch(err => console.log(err))
}


function handleDeleteNote(id){
  axios.delete(`https://fullstack-1-82id.onrender.com/notes/${id }`)
  .then(()=>{
    fetchNotes()
  })
  .catch(err => console.log(err))
}

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [editId,setEditId] = useState(null)
function handleEdit(note){
  setTitle(note.title)
  setDescription(note.description)
  setEditId(note._id)
}
function handleSubmit(e){
  e.preventDefault()

  if(editId){
    axios.patch(`https://fullstack-1-82id.onrender.com/${editId}`,{
      title,
      description
    })
    .then(()=>{
      fetchNotes()
      setEditId(null)
      setTitle("")
      setDescription("")
    })
    .catch(err=>console.log(err))

  }else{
    axios.post("https://fullstack-1-82id.onrender.com/notes",{
      title,
      description
    })
    .then(()=>{
      fetchNotes()
      setTitle("")
      setDescription("")
    })
    .catch(err=>console.log(err))
  }
}



  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input value={title}
  onChange={(e)=>setTitle(e.target.value)} type="text" class='input-field'  name='title' placeholder='Enter Title' />
      <input value={description}
  onChange={(e)=>setDescription(e.target.value)} type="text" class='input-field' name='description'  placeholder='Enter Description' />
      <button class='button'>Create Note</button>
      
    </form>


    <div className="notes">
      {
        notes.map(note=>{
        return  <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={()=>handleEdit(note)}>Edit</button>
        <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
      </div>

        })
      }
      
    </div>
  </>
      
  )
}

export default App
