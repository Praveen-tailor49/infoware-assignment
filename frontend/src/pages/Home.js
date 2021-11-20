import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Card, ListGroup, ListGroupItem, Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
function Home({ order }) {
    const navigate = useNavigate();
    const [allProduct, setAllProduct] = useState([])
    const [productname, setProductName] = useState()
    const [productprice, setProductPrice] = useState()
    const [productimage, setProductImage] = useState()
    const [username] = useState(localStorage.getItem('user'))
    useEffect(() => {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:3001/allProduct", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setAllProduct(result)

            })
            .catch(error => console.log('error', error));
    }, [])

    const orderPro = (e, { productimage, productname, productprice }) => {

        e.preventDefault();

        setProductImage(productimage)
        setProductName(productname)
        setProductPrice(productprice)


        const payload = {
            productimage,
            productname,
            productprice,
            username,

        }
        fetch('http://localhost:3001/add-order', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    order(productimage, productname, productprice);
                    navigate('/customer-order')
                } else {
                    alert('Not Place Order');
                }
            })
    }

    const logOut = (e) =>{
        e.preventDefault();
        localStorage.removeItem("user");
        navigate('/')
    }

    // if(!localStorage.getItem('user')){
        
    //     navigate('/');
    // }
    // else{

        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand >Infoware</Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/customer-order" style={{ color: 'white' }}>View Order</Link>
                        </Nav>
    
                        <Nav className="me-auto">
                            <h5>Hello {localStorage.getItem('user')}</h5>
    
                        </Nav>
                        <Button variant="primary" type="submit" onClick={(e)=>logOut(e)}>
                            LogOut
                        </Button>
                    </Container>
                </Navbar>
                <Row style={{ marginTop: '30px' }}>
                    {
                        allProduct.map(data => {
                            return (
                                <>
    
    
                                    <Col lg='3'>
    
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={data.productimage} />
                                            <Card.Body>
                                                <Card.Title>{data.productname}</Card.Title>
    
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroupItem>{data.productprice}</ListGroupItem>
                                            </ListGroup>
                                            <Card.Body>
                                                <Button variant="primary" type="submit" onClick={(e) => {
                                                    orderPro(e, data)
    
    
                                                }}
    
                                                >
                                                    Buy
                                                </Button>
    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })
                    }
                </Row>
    
    
            </>
        )
    // }

}

export default Home
