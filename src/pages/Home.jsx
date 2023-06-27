import { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import { useUserInfoQuery } from '../api/userAPi';
// import { HomeComponent } from '../components/HomeComponent'
  

export function Home() {
    const [accessToken, setAccessToken] = useState('');
    const [userData, setUserData] = useState('');
    const { data } = useUserInfoQuery();
    console.log(data)
      useEffect(() => {
        fetch('http://localhost:8080/userinfo', { credentials: 'include', method: 'GET' })
          .then(data => data.text())
          .then(token => setAccessToken(token))
          .then(user => setUserData(user)) // Do not set as state, stored in session storage OR in a HttpOnly cookie
          .catch(() => { /* Redirect to http://localhost:8080/signin */ } );
      }, []);

          // useEffect(() => {
    //     fetch('http://localhost:8080/userinfo', { credentials: 'include', method: 'GET' })
    //       .then(response => {
    //         if (response.ok) {
    //           return response.json();
    //         } else {
    //           throw new Error('Failed to fetch user data');
    //         }
    //       })
    //       .then(data => {
    //         setAccessToken(data.accessToken);
    //         setUserData(data.user);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         // Redirect or handle the error as needed
    //       });
    //   }, []);

    return (
        <>
        {/* <HomeComponent /> */}
        <div style={{ backgroundColor: '#fff7de', minHeight: '100vh' }}>
        <div><strong>Access Token: </strong>{accessToken}</div>
        <div><strong>Name: </strong>{userData}</div>
        <div><strong>Email: </strong>{userData}</div>
        <div><img src={userData} alt="Profile Picture" /></div>
        <h2>Home Page</h2>
        <Button variant="contained" size="large">
          Start Your Savings Today
        </Button>
        </div>
      </>
    );
}