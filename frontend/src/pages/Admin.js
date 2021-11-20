import React,{useState} from 'react'
import {Button, Form, Card,  Navbar, Container, Nav} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Admin() {

    const navigate = useNavigate();
    const [productname,setProductName] = useState()
    const [productprice,setProductPrice] = useState()
    const [productimage,setProductImage] = useState()

    const addPro = (e) => {
        // console.log(username+"->"+password);
        e.preventDefault();
        const payload = {
            productname,
            productprice,
            productimage,
        }
        fetch('http://localhost:3001/add-product', {
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(payload)
        }).then(res=>res.json())
        .then((res)=>{
            if(res === 'Add Successfully'){
                alert('Add Successfully');
            }else{
                alert('Not Add Product');
            }
        })
    }
    const logOut = (e) =>{
        e.preventDefault();
        localStorage.removeItem("user");
        navigate('/')
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand >Admin Page</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/view-order" style={{color: 'white'}}>View Order</Link>
                        
                    </Nav>
                    <Nav className="me-auto">
                       <h5>Hello {localStorage.getItem('user') }</h5>
                        
                    </Nav>

                    <Button variant="primary" type="submit" onClick={(e)=>logOut(e)}>
                            LogOut
                    </Button>
                </Container>
            </Navbar>
            <div style={{ justifyContent: 'center', display: 'flex' }}>

                <Card style={{ width: '28rem', margin: '6em' }}>
                    <Card.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setProductName(e.target.value)}>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product Name" />
                            </Form.Group>
                            

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setProductPrice(e.target.value)}>
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product Price" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setProductImage(e.target.value)}>
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="text" placeholder="Product Image Link" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e)=>addPro(e)}>
                                Add Product
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Admin
