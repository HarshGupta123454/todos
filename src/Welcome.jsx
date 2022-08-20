import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged ,createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';



export default function Welcome() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isregister, setisregister] = useState(false)

    const [registerinfo , setregisterinfo] = useState({
        email : "",
        conformEmail : "",
        password : "",
        conformPassword : ""
    })

    const navigate = useNavigate()


    const handleregister = () =>{
        if ( (registerinfo.password !== registerinfo.conformPassword)) {
            alert("please conform that your  password is same ")
            return
            
        }
        createUserWithEmailAndPassword(auth , registerinfo.email , registerinfo.password).then(()=>{
            navigate("/homepage")
        }).catch((err)=> alert(err.message))
    }


    useEffect(() => {
        
        auth.onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                navigate("/homepage")

            }
        })

    }, [])


    const emai = (e) => {
        setemail(e.target.value)
    }

    const pass = (e) => {
        setpassword(e.target.value)
    }

    const sign = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            console.log("hello")
            navigate("/homepage")


        } catch (error) {
            alert("couldnt sign in make sure that your email and password is correct ")
        }

    }

    return (
        <>

        


            <div className="welcome d-flex justify-content-center align-items-center">

                
                    
                <div className="div d-flex flex-column justify-content-center align-items-center">
                
                <h1 id='h1'>Todo-List</h1>

                

                    {isregister ? (
                        <>
                            <input type="email" placeholder='enter your email here' onChange={(e)=> {setregisterinfo({...registerinfo,email : e.target.value})}} value={registerinfo.email} />
                            <input type="password" placeholder='enter password here' onChange={(e)=> {setregisterinfo({...registerinfo,password : e.target.value})}} value={registerinfo.password} />
                            <input type="password" placeholder='enter password again' onChange={(e)=> {setregisterinfo({...registerinfo,conformPassword : e.target.value})}} value={registerinfo.conformPassword} />

                            <button className='webutton' onClick={handleregister}>Register</button>
                            <button className='webutton' onClick={() => setisregister(false)}> Go back</button>
                        </>
                    ) : (<>
                        <input type="email" placeholder='enter your email here' onChange={emai} value={email} />
                        <input type="password" placeholder='enter password here' onChange={pass} value={password} />

                        <button className='webutton' onClick={sign}>Sign in</button>
                        <button className='webutton' onClick={() => setisregister(true)}> Create account</button>

                    </>)}

                </div>
                
            </div>


        </>
    )
}
