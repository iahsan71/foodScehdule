import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button, Container, Form, Input, Navbar, NavbarBrand, Spinner } from 'reactstrap'
import { userSignup } from '../../store/actions/authAction'
import { addFoodSchedule } from '../../store/actions/foodAction'

const Signup = (data) => {
    const dispatch = useDispatch()
    const [inputName, setInputName] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPass, setInputPass] = useState("")
    const [submitSignup, setSubmitSignup] = useState(false)
    const [error, setError] = useState(false);
    const uid = useSelector((state) => state.authUser.uid);
    let history = useHistory()
    const handleSubmitSignup = (e) => {
        setSubmitSignup(true)
        e.preventDefault()
        const userName = inputEmail.split('@')[0];
        console.log(userName)
        let data = {
            name: inputName,
            email: inputEmail,
            pass: inputPass
        }
        const timeoutId = setTimeout(() => {
            setSubmitSignup(false)
        }, 3000)
        console.log(data)
// dispatch(addFoodSchedule(data))
        dispatch(userSignup(data, () => {
            setSubmitSignup(false);
            setInputEmail('');
            setInputPass('');
            history.push('/main/home');
        }, (error) => {
            setSubmitSignup(false);
            setError(true);
        }));
    }

    return (
        <>
            <Navbar>
                <NavbarBrand className='fs-1 '>Food Scheduler</NavbarBrand>
                <Button>
                    <Link to='/auth/login'>LogIn</Link>
                </Button>
            </Navbar>
            <Container className='justify-content-center rounded mt-4'>
                <h1 className='font-weight-bold text-center mt-4'>Create Account</h1>
                <p className='text-center mb-4'>SignUp to Your App Account</p>
                <Form onSubmit={handleSubmitSignup}>
                    <h6>Your Name</h6>
                    <Input
                        type="text"
                        placeholder='Enter Your Name'
                        className='mb-4'
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <h6>Email Address</h6>
                    <Input
                        type="Email"
                        className='mb-4'
                        placeholder='Enter Your Email'
                        required
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                    />
                    <h6>Password</h6>
                    <Input
                        type="password"
                        className='mb-4'
                        placeholder='Enter Your Password'
                        required
                        value={inputPass}
                        onChange={(pass) => setInputPass(pass.target.value)}
                    />
                    <Button
                        color='primary w-100'
                        type='submit'
                        disabled={submitSignup}
                    >
                        {error && <p className="text-danger">Invalid email or password. Please try again.</p>}
                        {submitSignup ? <Spinner size="sm" /> : 'Create Account'}
                    </Button>
                </Form>
                <p className='text-center mt-4'>Already have an account?<Link to="/auth/login"> LogIn</Link> here.</p>
            </Container>
        </>
    )
}

export default Signup
