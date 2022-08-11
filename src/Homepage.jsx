import React, { useEffect, useState } from 'react'
import './App.css'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './Firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from "uid"
import { set, ref, onValue, remove, update } from 'firebase/database'


export default function Homepage() {
    // hook for todo inpur
    const [todo, settodo] = useState("")
    // hook for all todos
    const [todos, settodos] = useState([])
    //update
    const [isup, setisup] = useState(false)
    //uid toupdate
    const [tempuid, settempuid] = useState("")

    const navigate = useNavigate()

    //to stop changing page
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    settodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map(todo => {
                            settodos((oldarr) => [...oldarr, todo]);
                        })
                    }
                })

            }


            else if (!user) {
                navigate("/")
            }
        })
    }, [])


    //function for sign out
    const signout = () => {
        signOut(auth).then(() => (navigate("/"))).catch(err => alert(err.message))
    }


    //add to database

    const writetodatabase = () => {
        const uidd = uid();
        set(ref(db, `${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        })

        settodo("")

    }

    //to delete
    const handledelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
    }

    //to update
    const handleupdate = (todo) => {
        setisup(true)
        settodo(todo.todo)
        settempuid(todo.uidd)
    }

    const handledit = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempuid}`), {
            todo: todo,
            uidd: tempuid
        })

        settodo("")
        setisup(false)
    }


    return (
        <>



            <div className="main row">
            <button id='signout' onClick={signout}>signout</button>
                <div className="col-8 mx-auto mt-5 text-center">

                    <div className="add">
                        <input id='addinp' type="text" placeholder='Addtodo...' value={todo} onChange={(e) => { settodo(e.target.value) }} />
                        <div className="b">
                        {isup ?
                            <button className='conform'  onClick={handledit}>conform </button> : <button className='conform' onClick={writetodatabase}>Add</button>

                        }
                        </div>

                    </div>


                    {todos.map((tod) => {
                        return (
                            <>
                            <div className="cd card my-3">
                                <div className="card-body text-center">
                                <h1 className='todotext'>{tod.todo}</h1>
                                <div className="buts">
                                <button className='cardbot' onClick={() => handleupdate(tod)}>update</button>
                                <button className='cardbot'onClick={() => handledelete(tod.uidd)}>delete</button>
                                </div>
                                </div>
                            </div>
                            </>
                        )

                    })}
                   
                    

                </div>


            </div>

            

        </>
    )
}
