import { Row, Col } from "react-bootstrap";
import { prodArray } from "../productStore";
import ProductCard from "../components/ProductCard";

function Store() {
    return (
        <>
            <Row xs={1} md={3} className="g-4">
                {prodArray.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>

    )
}

export default Store;