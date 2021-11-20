import React,{useState} from 'react'
import { Button, Form, Card, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [email,setEmail] = useState()

    const userReg = (e) => {
        // console.log(username+"->"+password);
        e.preventDefault();
        const payload = {
            username:username,
            password:password,
            email:email,
        }
        fetch('http://localhost:3001/register', {
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(payload)
        }).then(res=>res.json())
        .then((res)=>{
            if(res === 'Registered Successfully'){
                navigate('/')
            }else{
                alert('Already Registered');
            }
        })
    }
    
    return (
        <>
        <ButtonGroup size="lg" className="mb-2" style={{marginRight:'35px', justifyContent:'end', display:' flex', marginTop:'16px'}}>
               <Link to='/'> <Button>Login</Button> </Link>
            </ButtonGroup>
            <div style={{ justifyContent: 'center', display:'flex'}}>
            
                <Card style={{ width: '28rem', margin:'6em'}}>
                    <Card.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setUsername(e.target.value)}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setEmail(e.target.value)}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setPassword(e.target.value)}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e)=>userReg(e)}>
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Register
