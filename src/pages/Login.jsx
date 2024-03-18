import React, { useState } from 'react';
import "../styles/Login.css";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user email matches 'admin@gmail.com'
      if (user.email === 'admin@gmail.com') {
        // Redirect to dashboard if user is admin
        navigate('/dashboard');
      } else {
        // Redirect to checkout page for regular users
        navigate('/checkout');
      }

      setLoading(false);
      toast.success('Successfully logged in');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg='12' className='text-center'><h5 className='fw-bold'>loading....</h5></Col>
            ) : (
              <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>Login</h3>
                <Form className='auth__form' onSubmit={signIn}>
                  <FormGroup className='form__group'>
                    <input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                  </FormGroup>
                  <button type='submit' className='buy__btn auth__btn'>Login</button>
                  <p>Dont have an account? <Link to='/signup'>Create an account</Link></p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
