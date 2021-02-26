import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Link} from '../node_modules/react-router-dom' //wouldnt work without me going to the actual directory
import Form from './Form.js'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  size: '',
  pep: false,
  saus: false,
  olv: false,
  mush: false
}
const initialFormErrors = {
  name: '',
  size: '',
}

const formSchema = yup.object().shape({
  name: yup.string()
      .trim()
      .required('A name is required, please fill out.')
      .min(2, 'Name must be at least 2 characters long'),
  size: yup.string()
  .oneOf(['Small', 'Medium', 'Large'], 'Need a size'),
 // Checkboxes are not required
  pep: yup.boolean(),
  saus: yup.boolean(),
  olv: yup.boolean(),
  mush: yup.boolean()
});




const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  
  const inputChange = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setFormValues({ ...formValues,[name]: value })
    console.log(formValues);
  }


  const postNewPizza = pizza => {
    axios.post('https://reqres.in/api/users', pizza)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      setFormValues(initialFormValues);
  }
  const formSubmit = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size,
      pep: formValues.pep,
      saus: formValues.saus,
      olv: formValues.olv,
      mush: formValues.mush
    }
    postNewPizza(newPizza);
  }
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <>
    <h1>Lambda Eats</h1>
    <Route exact path = '/' render ={() => 
      <div>
        <p>Home</p>
        <Link to = "/pizza">Make a pizza</Link>
      </div>
    }/>
    <Route path = '/pizza' render ={() => 
      <div>
        <Link to = "/">Home</Link>
        <Form values = {formValues} errors = {formErrors} disabled = {disabled} submit = {formSubmit} change = {inputChange}/>
      </div>
    }/>
      
    </>
  );
};
export default App;
