import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        // Placeholder login logic
        navigate('/todo');
    }

    return (
        <div className='login-container' style={{ marginTop: '10vh' }}>
            <form className='login-form'>
                <h2>Login to your account</h2>
                <p>Welcome back!</p>
                <div className='login-input-item'>
                    <label htmlFor='email'>Email address :</label>
                    <input onChange={e => setEmail(e.target.value)} type='email' id='email' />
                </div>
                <div className='login-input-item'>
                    <label htmlFor='password'>Password :</label>
                    <input onChange={e => setPassword(e.target.value)} type='password' id='password' />
                </div>
                <button className='primaryBtn' onClick={handleLogin}>LOG IN</button>
            </form>
        </div>
    );
}

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     const handleLogin = () => {
//         navigate('/todo');
//     }

//     return (
//         <div className='container' style={{ marginTop: '10vh' }}>
//             <form>
//                 <h2>Login to your account</h2>
//                 <p>Welcome back!</p>
//                 <div>
//                     <label htmlFor='email'>Email address :</label>
//                     <input onChange={e => setEmail(e.target.value)} type='email' id='email' />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password :</label>
//                     <input onChange={e => setPassword(e.target.value)} type='password' id='password' />
//                 </div>
//                 <button onClick={handleLogin}>LOG IN</button>
//             </form>
//         </div>
//     );
// }

// export default Login;
