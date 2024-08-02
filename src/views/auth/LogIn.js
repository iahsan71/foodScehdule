import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button, Container, Form, Input, Navbar, NavbarBrand, Spinner } from 'reactstrap'
import { addFoodSchedule, userLogin } from '../../store/actions/authAction'
function Login() {
    const dispatch = useDispatch()
    const [inputEmail, setInputEmail] = useState("")
    const [inputPass, setInputPass] = useState("")
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false);
    const uid = useSelector((state) => state.authUser.uid);
    let history = useHistory()
    const handleSubmit = (e) => {
        setSubmit(true)
        e.preventDefault()
        let data = {
            email: inputEmail,
            password: inputPass
        }
        const timeoutId = setTimeout(() => {
            setSubmit(true)
        }, 3000)
        dispatch(userLogin(data, () => {
            setSubmit(true);
            setInputEmail('');
            setInputPass('');
            history.push('/main/home');
        }, (error) => {
            setSubmit(false);
            setError(true);

        }));
    }
    return (
        <>
            <Navbar>
                <NavbarBrand className='fs-1 '>Food Scheduler</NavbarBrand>
                <Button>
                    <Link to='/auth/signup' >SignUp</Link>
                </Button>
            </Navbar>
            <Container className='justify-content-center rounded mt-5'>
                <h1 className='font-weight-bold text-center mt-4'>LOGIN</h1>
                <p className='text-center mt-4'>LogIn to Your App Account</p>
                <Form onSubmit={handleSubmit} >
                    <h6>Email Address</h6>
                    <Input type="Email" className='mb-4' placeholder='Enter Your Email' required value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                    <h6>Password</h6>
                    <Input type="password" className='mb-4' placeholder='Enter Your Password' required value={inputPass} onChange={(pass) => setInputPass(pass.target.value)} />
                    {error && <p className="text-danger">Invalid email or password. Please try again.</p>}
                    <Button className='mt-4' color='primary w-100' type='submit' disabled={submit}>
                        {submit ? <Spinner size="sm" /> : 'LogIn'}
                    </Button>
                </Form>
                <p className='text-center mt-4'>Create an account?<Link to="/auth/signup"> SignUp</Link> here.</p>
            </Container>
        </>
    )
}

export default Login

