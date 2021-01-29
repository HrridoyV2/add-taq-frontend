import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import TaqContext from './App';
function PopupTaq({show, setShow, allCountry, selectedCountry}) {
    const result = [];
    var taqFromPopup = useContext(TaqContext)
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [input, setInput] = useState("null");
  allCountry.map((country) => {
      if(country.name.toLowerCase().includes(input.toLowerCase()) ) {
          
          result.push(country.name);
      }
  })
  var fromPopup = new Array();
  console.log("from popup",typeof fromPopup);
  const handlePopup = (e) => {
    console.log(e.target.value);
    fromPopup.push(e.target.value);
    console.log(fromPopup);
  }
    return (
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
          </Modal.Header>
          <input type="text" className="form-control my-3"
          onChange={(e) => setInput(e.target.value)}
          />

          {
              result.map((country) => (
                  <p><span>{country}</span><button value={country} onClick={handlePopup}>+</button></p>
              ))
          }
            
          {
              fromPopup.map((country) => <button>{country}</button>)
              
          }
        </Modal>
      </>
    )
}

export default PopupTaq;
