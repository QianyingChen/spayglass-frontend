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
      window.location.replace('http://localhost:8080/signin'); // Redirect to login page if user is not logged in
    }
  };

  return (
    <div style={{ backgroundColor: '#fff7de', minHeight: '100vh' }}>
      {userInfo ? (
        <h2>Welcome back, {userInfo.name}!</h2>
      ) : (
        <h2>Welcome to the Spyglass!</h2>
      )}
      <Button
        variant="contained"
        size="large"
        onClick={handleStartSavingsClick}
      >
        Start Your Savings Today
      </Button>
    </div>
  );
}