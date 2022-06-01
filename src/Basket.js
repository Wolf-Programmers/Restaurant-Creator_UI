import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';


export default function Basket(props){

    const {cartItems, onAdd, onRemove} = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)
    const [cupon, setC] = useState()

    return (
        <Row>
            <div>
                {cartItems.length === 0 && <Col>Koszyk jest pusty</Col> }
            </div>
        {cartItems.map((item) => (
                <Row key={item.id}>
                    <Col sm={8}>
                        <h5>{item.title}</h5>
                    </Col>
                    <Col sm={4}>
                       <p className="float-end" >{item.quantity}{item.unit}</p>
                    </Col>
                    <Col sm={12}>
                        {item.describe}
                    </Col>
                    <Col className="mt-2" sm={5}>
                    <Button variant="danger" onClick={() => onRemove(item)}><FontAwesomeIcon icon={faMinus} /></Button>
                    <Button variant="success" onClick={() => onAdd(item)}><FontAwesomeIcon icon={faPlus} /></Button>
                    </Col>
                    <Col className="mt-3"  sm={7}>
                    {cupon ?
                        <h5 className="float-end">{item.qty} <FontAwesomeIcon icon={faXmark} /> <s>{item.price.toFixed(2)}</s> {(item.price * ((100 - cupon)/100)).toFixed(2)}zł</h5>
                        :
                        <h5 className="float-end">{item.qty} <FontAwesomeIcon icon={faXmark} /> {item.price}zł</h5>
                        }
                    </Col>
               </Row>
        ))} 
        {cartItems.length !== 0 && (
            <Row>
                <hr className="mt-3"/>
                <Col>
                {cupon ? 
                <h5 className="float-end">Suma: <s>{itemsPrice.toFixed(2)}</s> {(itemsPrice * ((100 - cupon)/100)).toFixed(2)}zł</h5> 
                :
                <h5 className="float-end">Suma: {itemsPrice.toFixed(2)}zł</h5>
                }
                </Col>
            </Row>  
        )}
        
        </Row>
    );
}