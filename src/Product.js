import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'

export default function Product(props) {
    const {product, onAdd} = props

    return (
        <Row className="mb-3 justify-content-center">
            <Col sm={12} md={6} >
                <h6 className="float-md-start">{product.title}</h6>
            </Col>
            <Col sm={12} md={2} >
                <p className="float-md-end">{product.quantity}{product.unit}</p>
            </Col>
                <div className="clearfix"></div>
            <Col sm={12} md={8} >
                <h6>Cena: {product.price} zł</h6>
            </Col>
                <div className="clearfix"></div>
            <Col sm={12} md={8} >
                <p>{product.describe}</p>
            </Col>
            <Col sm={12} md={8}>
                <Button variant="danger" className="float-end" onClick={() => onAdd(product)}>Dodaj</Button>
            </Col>
            <Col md={9}>
            <hr/>
            </Col>
        </Row>
  )
}