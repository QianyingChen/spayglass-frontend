import { Button } from "@mui/material";
import { useUserInfoQuery } from '../api/userAPi';

export function Home() {
  const { data: userInfo } = useUserInfoQuery();

  return (
    <div style={{ backgroundColor: '#fff7de', minHeight: '100vh' }}>
      {userInfo ? (
        <h2>Welcome back, {userInfo.name}!</h2>
      ) : (
        <h2>Welcome to the Home page!</h2>
      )}
      {userInfo ? (
        <Button variant="contained" size="large" href="/goals">
          Start Your Savings Today
        </Button>
      ) : (
        <Button variant="contained" size="large" href="/signin">
          Start Your Savings Today
        </Button>
      )}
    </div>
  );
}