import React, {useState,useEffect} from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

import {  useParams,Link } from 'react-router-dom';


const NotePage = () => {

    const { noteid } = useParams();

    console.log(noteid)


    let [note, setNote] = useState(null)

    console.log(note)

    useEffect(() => {
        getNote()
    }, [noteid]);

    let getNote = async () => {
        if (noteid === 'new') return;

        let response = await fetch('/api/notes/'+noteid+'/')
        let data = await response.json()
        console.log( 'DATA:', data)
        setNote(data)
    }


    let createNote = async () => {
        fetch('/api/notes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }



    let updateNote = async () => {
        fetch('/api/notes/'+noteid+'/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch('/api/notes/'+noteid+'/', {
            method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
    }

    let handlesubmit = () => {
        if (noteid !== 'new' && !note.body) {
            deleteNote()
        }
        else if (noteid !== 'new') {
            updateNote()
        }
        else if(noteid === 'new' && note.body !== null) {
            createNote()
        }
        console.log('note submitted')

    }

  return (
    <div className='note'>
      <div className='note-header'>
        <Link to='/'>
            <h3>
                <ArrowLeft onClick={handlesubmit}/>
            </h3>
            
        </Link>
        {noteid !== 'new' 
        ? 
        (
            <Link to='/'>
                 <button onClick={deleteNote}>Delete</button>
            </Link>
        )
        :
        (
            <Link to='/'>
                 <button onClick={handlesubmit}>Save</button>
            </Link>
        )
        }

              
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body} ></textarea>
    </div>
  )
}

export default NotePage
