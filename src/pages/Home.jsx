import { Button } from "@mui/material";
import { useUserInfoQuery } from '../api/userAPi';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { data: userInfo } = useUserInfoQuery();
  const navigate = useNavigate();

  const handleStartSavingsClick = () => {
    if (userInfo) {
      navigate('/goals'); // Redirect to goals page if user is logged in
    } else {
      window.location.replace(`${import.meta.env.VITE_API_URI}/signin`); // Redirect to login page if user is not logged in
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://qianying-project3-spyglass.s3.amazonaws.com/1.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#fff7de',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {userInfo ? (
          <h1 style={{ color: 'white' }}>Welcome back, {userInfo.given_name}!</h1>
        ) : (
          <h1 style={{ color: 'white' }}>Welcome to the Spyglass, 
          where your Financial Dreams are Empowered !</h1>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={handleStartSavingsClick}
          style={{ marginTop: '20px' }}
        >
          Start Your Savings Today
        </Button>
      </div>
    </>
  );
}
