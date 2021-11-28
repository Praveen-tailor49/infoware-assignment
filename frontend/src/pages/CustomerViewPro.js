import React, { useState, useEffect } from 'react'
import { Navbar, Container, Card, ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap';



function CustomerViewPro() {

    const [userName] = useState(localStorage.getItem('user'))

    const [userOrder, setUserOrder] = useState([])
    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": userName
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/userOrder", requestOptions)
            .then(response => response.json())
            .then((result) =>{

                console.log(result);
                setUserOrder(result)
            }
            )
            .catch(error => console.log('error', error));
    }, [])


    return (
        <>

            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand >View Order</Navbar.Brand>
                </Container>
            </Navbar>

            <Row style={{ marginTop: '30px' }}>
                {
                    userOrder.map(data => {
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
                                    </Card>
                                </Col>
                            </>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default CustomerViewPro
