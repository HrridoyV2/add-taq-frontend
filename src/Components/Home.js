import React, { useEffect, useState } from 'react'
import PopupTaq from '../PopupTaq';

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
console.log("From app",selectedCountry);
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
    return (
        <div>
            <input type="text" className="form-control mt-5 w-25" placeholder="Write your text here"
      onChange={(e) => setText(e.target.value)}
      />
      {
        dibana.map((country) => <button>{country}</button>)
      }<button onClick={() => setShow(true)}>+add taq</button>
      <PopupTaq show={show} setShow={setShow} allCountry={allCountry} setAllCountry={setAllCountry} selectedCountry={selectedCountry} tagFromPopup={taqFromPopup} /><br/>
      <button onClick={submitValues}>Submit</button>
        </div>
    )
}

export default Home
