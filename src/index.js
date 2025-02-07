import React, { useState } from 'react';
import Login from './Login';
import TypingTest from './TypingTest';
import Results from './Results';

function App() {
    const [user, setUser] = useState(null);
    const [testResults, setTestResults] = useState([]);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleTestComplete = (result) => {
        setTestResults([...testResults, result]);
    };

    return (
        <div className="App">
            {!user ? (
                <Login onLogin={handleLogin} />
            ) : (
                <TypingTest onTestComplete={handleTestComplete} />
            )}
            {/* Display results if needed */}
            <Results results={testResults} />
        </div>
    );
}

export default App;
