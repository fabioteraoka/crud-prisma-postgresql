import type { NextPage } from 'next'
import {useState, useEffect} from "react"

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [inputData, setInputData] = useState({
    id: '',
    title: '',
    content: ''
  })

  const fechedData = async () => {
    const response = await fetch('/api/post/getdata');
    const json = await response.json();
    setData(json);
  }

  const handleCreateData = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editMode){
      handleUpdateData();
    } else {
    const response = await fetch('/api/post/createdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: inputData.title,
        content: inputData.content
      })
    });
    const json = await response.json();
    setInputData({id:'', title: '', content: '' });
    fechedData();
  }}

  const handleDeleteData = async (id: string) => {
    const response = await fetch(`/api/post/deletedata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    });
    const json = await response.json();
    fechedData();
  }

  const handleEditData = async (id: string, title: string, content: string) => {
    setInputData({id:id, title: title, content: content });
    setEditMode(true);
  }

  const handleUpdateData = async () => {
    const response = await fetch('/api/post/updatedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: inputData.id,
          title: inputData.title,
          content: inputData.content
          })
    });
    const json = await response.json();
    setInputData({id:'', title: '', content: '' });
    fechedData();
  }

  useEffect(() => {
    fechedData();
  }, []);

  return (
    <div>
      <h1>Hello Next.js</h1>
      <div>
        <form onSubmit={handleCreateData}>
          <input 
                 type="text"
                 value={inputData.title || ''}
                 name="title" 
                 placeholder="title"
                 onChange={(event)=> setInputData({...inputData, title: event.target.value})}/>
          <input type="text" 
                 value={inputData.content || ''}
                 name="content" 
                 placeholder="content" 
                 onChange={(event)=> setInputData({...inputData, content: event.target.value})}/>
          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        {data.map(({id,title,content}) => {
          return (
            <div key={id}>
              <h2>{title}</h2>
              <p>{content}</p>
              <button onClick={() =>handleDeleteData(id)}>Delete</button>
              <button onClick={() =>handleEditData(id, title, content)}>Edit</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
