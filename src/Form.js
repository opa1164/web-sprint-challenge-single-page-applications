import React from 'react';


const Form = (props) => {
  const {
    values,
    submit,
    change,
    disabled,
    errors,
  } = props

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  }
  
  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }
  
  return (
    <form className='form container' onSubmit={onSubmit}>
      
      <div className='form-group inputs'>
        <label>Name&nbsp;
          <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
          />
        </label>
        <br/>
        <label>Size
          <select value={values.size} name='size' onChange={onChange}>
              <option value=''>--- Select size.. ---</option>
              <option value='Small'>Small</option>
              <option value='Medium'>Medium</option>
              <option value='Large'>Large</option>
          </select>
        </label>
        <br/>
        <h4>Toppings</h4>
        <label>Pepperoni
        <input 
          type='checkbox'
          name='pep'
          onChange={onChange}
          checked={values.pep}
          />
        </label>
        <br/>
        <label>Sausage 
          <input 
            type='checkbox'
            name='saus'
            onChange={onChange}
            checked={values.saus}
          />
</label>
<br/> 
<label> Olives 
          <input 
            type='checkbox'
            name='olv'
            onChange={onChange}
            checked={values.olv}
          />
</label>
<br/>
<label> Mushrooms 
          <input 
            type='checkbox'
            name='mush'
            onChange={onChange}
            checked={values.mush}
          />
</label>
<br/>

        <button id = 'submit' disabled={disabled}>submit</button>

        <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.size}</div>
        </div>


      </div>
    </form>
  );
};
export default Form;
