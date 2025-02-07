import React, { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ username });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;