import React, { useEffect, useState } from 'react'
import './App.css'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './Firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from "uid"
import { set, ref, onValue, remove, update } from 'firebase/database'
import { AiFillDelete } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { Scrollbars } from "react-custom-scrollbars-2"


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

            <div className='back' >


                <div className="main">

                    <div className="glass">
                        

                            <div className="add">
                                <input autoComplete='off' id='addinp' type="text" placeholder='Add todo...' value={todo} onChange={(e) => { settodo(e.target.value) }} />
                                <div className="b">
                                    {isup ?
                                        <button className='conform' onClick={handledit}>conform </button> : <button className='conform' onClick={writetodatabase}>Add</button>

                                    }
                                    <button id='signout' onClick={signout}><GoSignOut /></button>

                                </div>

                            </div>



                    
                        <Scrollbars style={{height : "86%"}}>
                            {todos.map((tod) => {
                                return (
                                    <>
                                        <div className='row'>
                                            <div className="cd col-10 mx-auto">
                                                <h1 className='todoo'>{tod.todo}</h1>
                                                <div className="buts">
                                                    <button className='ico' onClick={() => handleupdate(tod)}>update</button>
                                                    <button className='ico io' onClick={() => handledelete(tod.uidd)}><AiFillDelete /></button>


                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )

                            })}

                        </Scrollbars>


                    </div>
                </div>


            </div>



        </>
    )
}
