import React,{useState, useEffect} from 'react'
import { Navbar, Container, Nav, Card, ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function ViewOrder() {

    const [allOrder, setAllOrder] = useState([])

    useEffect(() => {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:3001/allOrder", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setAllOrder(result)

            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand >View Order</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/admin" style={{ color: 'white' }}>Admin page</Link>

                    </Nav>
                </Container>
            </Navbar>

            <Row style={{ marginTop: '30px' }}>
                    {
                        allOrder.map(data => {
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
                                                <ListGroupItem> Customer Name {data.username}</ListGroupItem>
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

export default ViewOrder
