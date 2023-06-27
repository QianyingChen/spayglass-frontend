import { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import { useUserInfoQuery } from '../api/userAPi';
// import { HomeComponent } from '../components/HomeComponent'
  

export function Home() {
    const [accessToken, setAccessToken] = useState('');
    const [userData, setUserData] = useState('');
    const { data } = useUserInfoQuery();
    console.log(data)

    return (
        <>
        {/* <HomeComponent /> */}
        <div style={{ backgroundColor: '#fff7de', minHeight: '100vh' }}>
        <h2>Home Page</h2>
        <Button variant="contained" size="large">
          Start Your Savings Today
        </Button>
        </div>
      </>
    );
}