import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url("https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1380&t=st=1689672305~exp=1689672905~hmac=56d97e8e62807fd3b35e9c33bf537c34cea02a3600ec65e75daadd95228f559c")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20, width: '48%' }}
        type='text'
        placeholder='username'
        onChange={e => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20, width: '48%' }}
        type='password'
        placeholder='password'
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: '49.5%', backgroundColor: 'teal', cursor: 'pointer' }}>
        Login
      </button>
    </div>
  );
};

export default Login;
