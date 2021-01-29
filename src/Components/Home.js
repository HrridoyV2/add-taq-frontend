import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { Button, Modal } from 'react-bootstrap';
import rightArrow from '../right-arrow.jpg'
import loading from '../loading.gif'
function Home() {
    const [allCountry, setAllCountry] = useState([]);
const [text, setText] = useState("");
const selectedCountry = [];
var taqFromPopup = []
useEffect(() => {
  fetch('https://secret-mountain-19052.herokuapp.com/getCountries')
  .then(res => res.json())
  .then(data => setAllCountry(data))
},[])

  allCountry.map((country) => {
    var res = text.split(" ");
    res.map((word) => {
      if(country.name.toLowerCase() === word.toLowerCase()) {
        selectedCountry.push(country.name);
      }
    })  
  })

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

  const dibana = uniq(selectedCountry);
  const [show, setShow] = useState(false);
  
const submitValues = () => {

    fetch('https://secret-mountain-19052.herokuapp.com/addTaq', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({dibana})
    })
    .then((res) => res.json())
    .then(success => {
      if(success) {
        alert('Record saved successfully')
      }
    })
}
//
const result = [];
const handleClose = () => setShow(false);
const [input, setInput] = useState("null");
allCountry.map((country) => {
  if(country.name.toLowerCase().includes(input.toLowerCase()) ) {
      
      result.push(country.name);
  }
})

//
  const [demo, setDemo] = useState(["one"]);
  const [yes, setYes] = useState(false)

  
  useEffect(() => {
    
  },[demo])
    
// 
    return (
        <div className="main_page">
          <button onClick={() => {
        demo.push("six")
        console.log(demo);
          }}>add</button>
          {
            demo.map((i) => <button>{i}</button>)
          }
          <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
          </Modal.Header>
          <div className="container">
            <input type="text" className="form-control my-3"
          onChange={(e) => setInput(e.target.value)}
          />
          {
              result.map((country) => (
                  <div className="d-flex"><p>{country}</p><FiPlusCircle value={country} onClick={(e) => {
                    dibana.push(e.target.value)
                    console.log(selectedCountry, dibana);
                  }} className="add_sign" ></FiPlusCircle></div>
              ))
          }
          </div>          
        </Modal>
            <input type="text" className="form-control my-4 w-50" placeholder="Write your text here"
      onChange={(e) => setText(e.target.value)}
      style={{border: 'none',borderBottom: '1px solid #ced4da',}}
      />
      {
        dibana.map((country) => <button className="taq_name">{country}</button>)
      }<button onClick={() => setShow(true)} className="taq_name bg-light">+add taq</button>
      {/* <h3> Lets go for a <FiPlusCircle style={{color:"grey"}} />? </h3> */}
      
      {/* { 
        demo.map((i) => <button className="taq_name">{i}</button>)
      } */}<br />
      <img onClick={submitValues} className="submit_arrow" src={rightArrow} alt="right" />
      {/* <img src={loading} className="h-25" alt="right" /> */}
        </div>
    )
}

export default Home
