import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { useForm } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import { auth, googleProvider } from "../../utils/firebase";
import logo from "../../assets/logo.png";
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Required for accessibility
const SignIn = () => {
    const initialValues = {
        email: "",
        password: ""
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [signupComplete, setSignupComplete] = useState(false);
    const onSignUp = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            console.log(' OnSignUp user', user);
            setShowModal(true);

            // Send email verification
            // await sendEmailVerification(user);
            // alert('A verification email has been sent to your email address. Please verify your email before signing in.');
            // Reset input fields and hide signup button
            setSignupComplete(true);
            setUserEmail(data.email);
        } catch (err) {
            console.error('Error signing up:', err);
            alert('Failed to sign up. Please try again.');
        }
    };
    const onSignIn = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            console.log("user--->>>", user)
            if (user.emailVerified) {
                navigate('/dashboard'); // Redirect to Dashboard on successful sign-in
            } else {
                setUserEmail(data.email);
                setShowModal(true); // Show the modal if the email is not verified
            }
        } catch (err) {
            console.error('Error signing in with email and password:', err);
            alert('Failed to sign in. Please check your credentials and try again.');
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard'); // Redirect to Dashboard on successful Google sign-in
        } catch (err) {
            console.error('Error signing in with Google:', err);
            alert('Failed to sign in with Google. Please try again.');
        }
    };
    const handleResendVerification = async () => {
        try {
            const user = auth.currentUser;
            console.log("user", user)
            if (user) {
             const res =  await sendEmailVerification(user);
                console.log("res",res)
            reset();
                // alert('Verification email has been resent. Please check your inbox.');
            }
        } catch (err) {
            console.error('Error sending verification email:', err);
            alert('Failed to send verification email. Please try again.');
        } finally {
            setShowModal(false); // Close the modal after resending the verification email
        }
    };
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <div className='w-96 border-2 shadow-xl p-4 rounded-lg'>
                {/* <img src={logo} alt='logo' className='w-full h-auto items-center mb-5 rounded-lg' /> */}
                {/* {!signupComplete && ( */}
                    <form onSubmit={handleSubmit(onSignUp)} className="space-y-6">
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        </div>
                        <button type="submit" className='h-10 w-full bg-blue-400 text-white rounded-lg'>
                            Sign Up
                        </button>
                    </form>
                {/* )} */}
                <div className="mt-6">
                    <p className="text-center">Already have an account?</p>
                    <button onClick={handleSubmit(onSignIn)} className='h-10 w-full bg-blue-400 text-white rounded-lg'>
                        Sign In
                    </button>
                    <button onClick={signInWithGoogle} className='h-10 w-full bg-blue-400 text-white rounded-lg mt-4'>
                        Sign In With Google
                    </button>
                </div>
            </div>
            {/* Modal for Email Verification */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Email Verification Required"
                className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Email Verification Required</h2>
                    <p>Your email <strong>{userEmail}</strong> is not verified. Please verify your email before proceeding.</p>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button onClick={handleResendVerification} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Resend Verification Email
                        </button>
                        <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-black rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default SignIn;