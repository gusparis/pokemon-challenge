import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login, register } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ username, password })).then(() => navigate('/'));
    } else {
      dispatch(register({ username, password })).then(() => navigate('/'));
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>{isLogin ? 'Login' : 'Signup'}</AuthTitle>
      <AuthFormWrapper onSubmit={handleSubmit}>
        <AuthLabel>Username</AuthLabel>
        <AuthInput
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <AuthLabel>Password</AuthLabel>
        <AuthInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
        </AuthButton>
      </AuthFormWrapper>
      {error && <AuthError>{error}</AuthError>}
      <AuthSwitch>
        {isLogin ? (
          <span>
            Don't have an account?{' '}
            <AuthLink onClick={() => navigate('/signup')}>
              Sign up here
            </AuthLink>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <AuthLink onClick={() => navigate('/login')}>Log in here</AuthLink>
          </span>
        )}
      </AuthSwitch>
    </AuthContainer>
  );
};

export default AuthForm;

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AuthTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
`;

const AuthFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const AuthLabel = styled.label`
  margin-bottom: 0.5rem;
  text-align: left;
  color: #555;
`;

const AuthInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const AuthButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:disabled {
    background: #ccc;
  }
`;

const AuthError = styled.p`
  margin-top: 1rem;
  color: red;
`;

const AuthSwitch = styled.div`
  margin-top: 1rem;
  color: #555;
`;

const AuthLink = styled.span`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
