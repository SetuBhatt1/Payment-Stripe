import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

function ProductCard(props) {
    // props.product -> gives us every detail of the product
    const product = props.product;
    const cart = useContext(CartContext);
    const prodQuantity = cart.getProductQuantity(product.id);

    console.log(cart.items);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
                {
                    prodQuantity > 0 ?
                        <>
                            <Form as={Row}>
                            <Form.Label column="true" sm="6">In Cart: {prodQuantity}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                    
                        </>
                        :
                        <Button variant='primary' onClick={() => { cart.addOneToCart(product.id) }}>Add To Cart</Button>    
                }
            </Card.Body>
        </Card>
    )

}

export default ProductCard;