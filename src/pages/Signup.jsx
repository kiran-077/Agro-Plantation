import React, { useState } from 'react';
import "../styles/Login.css";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: username,
        email,
      });

      setLoading(false); // Set loading to false after successful signup
      toast.success('Account created')
      navigate('/login'); // Redirect to homepage after signup
    } catch (error) {
      // Handle the error here
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
           {
            loading ? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading...</h5></Col> :  <Col lg='6' className='m-auto text-center'>
            <h3 className='fw-bold mb-4'>Signup</h3>
            <Form className='auth__form' onSubmit={signup}>
              <FormGroup className='form__group'>
                <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
              </FormGroup>
              
              <button type='submit' className='buy__btn auth__btn'>Create an Account</button>
              <p>Already have an account? <Link to='/login'>Login</Link></p>
            </Form>
          </Col>
           }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
