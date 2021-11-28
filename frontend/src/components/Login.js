import React, { useState } from 'react'
import { Button, Form, Card, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const userLogin = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        if(username === '' && password === ''){
            alert('username and password empty')
        } else {

            const payload = {
                username,
                password,
            }
            
            fetch('http://localhost:3001', {
                method:'POST',
                mode:'cors',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(payload)
            })
            // .then(res=>res.json())
            .then((res)=>{
                console.log(res);
    
                // customer login
                if(res.status === 201){
                    alert('login page');
                    localStorage.setItem('user', username);

                    navigate('/home')
                } else if(res.status === 200){
                    localStorage.setItem('user', username);
                    navigate('/admin') 
                } else(
                    alert('username and password is wrong')
                )
            
            })
        }
    
    }
    return (
        <>
            <ButtonGroup size="lg" className="mb-2" style={{marginRight:'35px', justifyContent:'end', display:' flex', marginTop:'16px'}}>
               <Link to='/register'> <Button>Register</Button> </Link>
            </ButtonGroup>

            <div style={{ justifyContent: 'center', display: 'flex' }}>

                <Card style={{ width: '28rem', margin: '6em' }}>
                    <Card.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setUsername(e.target.value)} required>
                                <Form.Label>UserName</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" />
                            </Form.Group>
                            

                            <Form.Group className="mb-3" controlId="formBasicPassword"onChange={(e)=>setPassword(e.target.value)} required>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e)=>userLogin(e)}>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Login
