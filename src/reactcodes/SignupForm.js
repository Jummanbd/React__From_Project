import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button.js';
import Checkbox from './Checkbox.js';
import Form from './Form.js';
import Textinput from './Textinput.js';
import { useAuth } from '../contexts/AuthContext.js';
export default function SignupForm() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const {signup} = useAuth();
  const history = useHistory();


  async function handleSubmit(e) {
    e.preventDefault();
    //  do  validation
    if(password !== confirmPassword){
      return setError('Passwords don`t match');
    }

    try{
      setError();
      setLoading(true);
      await signup(email, password, username);
      history.push('/');
    }catch(err) {
      console.log(err);
      setLoading(false);
      setError('Failed to create an account!')
    }
  }
    return(
        <Form style={{ height: "500px" }} onSubmit = {handleSubmit}> 
        <Textinput type="text" placeholder="Enter name" icon ='person' value =  {username} onChange = {(e) => setUsername(e.target.value)} required />

        <Textinput type="text" placeholder="Enter email" icon ='alternate_email' value =  {email} onChange = {(e) => setEmail(e.target.value)} required/>

        <Textinput  type="password" placeholder="Enter password" icon= 'lock' value =  {password} onChange = {(e) => setPassword(e.target.value)} required />

        <Textinput type="password" placeholder="Confirm password" icon= 'lock_clock' value =  {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} required />

        <Checkbox text={'I agree to the Terms &amp; Conditions'} value =  {agree} onChange = {(e) => setAgree(e.target.value)} required/>

        <Button disabled = {loading} type ='submit'><span>Submit Now</span></Button>
        
        {error && <p className='error'>{error}</p>}

        <div className="info">
          Already have an account? <Link to="/login">Login</Link> instead.
        </div>
        
        </Form>
    )
}