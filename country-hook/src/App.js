import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = () => {
  const [country, setCountry] = useState(null)
  const [countryName, setCountryName] = useState('')

  const changeCountry = (name) => {
    setCountryName(name)
  };

  useEffect(() => {
    if (countryName !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
        .then((res) => res.data[0])
        .then((d) => setCountry({ data: d, found: true }))
        .catch((e) => {
          console.log(e);
          setCountry({
            found: false,
          })
        })
    }
  }, [countryName]);

  return [country, changeCountry]
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [country, changeCountry] = useCountry()

  const fetch = (e) => {
    e.preventDefault()
    changeCountry(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
