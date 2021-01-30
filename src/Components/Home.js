import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { Alert, Button, Modal } from 'react-bootstrap';
import rightArrow from '../right-arrow.jpg'
import loading from '../loading.gif'
function Home() {
    const [allCountry, setAllCountry] = useState([]);
const [text, setText] = useState("");
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [content, setContent] = useState(true);
const selectedCountry = [];

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

  
  const [show, setShow] = useState(false);
  
const submitValues = () => {
    setContent(false)
    setLoading(true)
    fetch('https://secret-mountain-19052.herokuapp.com/addTaq', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({dibana: finalTaqs})
    })
    .then((res) => res.json())
    .then(success => {
      if(success) {
        setLoading(false);
        setSuccess(true);
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
  const taqFromPopup = [];
  const [list, setList] = useState([]);
  const handleAdd = (e) => {
    taqFromPopup.push(e.target.value)
    console.log(taqFromPopup);
  setList(uniq(taqFromPopup))
  console.log(list);
    
  }
  const temp = uniq(selectedCountry);

  const finalTaqs = temp.concat(list)
  
// 
console.log("list",list);
    return (
        <div className="main_page">
          
          {content && <div className="content">
          <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
          </Modal.Header>
          <div className="container">
            {
              list.map((country) => <button>{country}</button>)
            }
            <input type="text" className="form-control my-3"
          onChange={(e) => setInput(e.target.value)}
          />
          {
              result.map((country) => (
                  <div className="d-flex"><p>{country}</p><button  value={country} onClick={handleAdd} >
                    <FiPlusCircle className="add_sign" ></FiPlusCircle>
                  </button></div>
              ))
          }
          </div>          
        </Modal>
            <input type="text" className="form-control my-4 w-50" placeholder="Write your text here"
      onChange={(e) => setText(e.target.value)}
      style={{border: 'none',borderBottom: '1px solid #ced4da',}}
      />
      {
        finalTaqs.map((country) => <button className="taq_name">{country}</button>)
      }<button onClick={() => setShow(true)} className="taq_name bg-light">+add taq</button>
      
      <br />
      
      <img onClick={submitValues} className="submit_arrow" src={rightArrow} alt="right" />
          </div>}
          {loading && <div>
          <Alert variant="warning" className="mt-5">Submitting record, Please wait a moment</Alert>
      </div>}
          {success &&
            <Alert className="bg-light text-center text-secondary mt-5">Activity saved</Alert>}
      {/* {loading && <img src={loading} className="loading" alt="right" />
      <Alert variant="warning">Submitting record, Please wait a moment</Alert> } */}
        </div>
    )
}

export default Home;
