import React from 'react';
import { useSelector } from 'react-redux';
import { useUserInfoQuery } from '../api/userAPi';
import { Avatar, Typography } from '@mui/material';

export function Profile() {
  // const { data } = useSelector((state) => state.userApi.userInfo ?? {});

  const { isLoading, data: userInfo } = useUserInfoQuery();
  console.log('userInfo:', userInfo)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <Avatar alt={userInfo.name} src={userInfo.picture} />
      <Typography variant="h4">{userInfo.name}</Typography>
      <Typography variant="body1">{userInfo.email}</Typography>
    </div>
  );
}





// import { useEffect, useState } from 'react';
// import { useUserInfoQuery } from '../api/userAPi';
// import { useNavigate } from 'react-router-dom';

// export function Profile() {
//     const {
//         data: userinfo,
//         isError,
//         isFetching
//       } = useUserInfoQuery();
    
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in
//     if (!isLoggedIn) {
//       // Redirect to login page or show a login prompt
//       navigate('/login');
//       return;
//     }

//     // Fetch user data from the backend API
//     fetchUserData();
//   }, [isLoggedIn, navigate]);

//   const fetchUserData = () => {
//     // Make a request to the backend API to fetch user data
//     // Pass any necessary authentication headers or tokens

//     // Example using fetch API
//     fetch('http://localhost:8080/userinfo', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // Pass the access token
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Store the user data in state
//         setUserData(data);
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error('Error fetching user data:', error);
//       });
//   };

//   // Render the profile page content
//   return (
//     <div>
//       {userData ? (
//         <div>
//           <h2>Welcome, {userData.name}!</h2>
//           {/* Display user information */}
//         </div>
//       ) : (
//         <div>
//           <h2>Please log in to view your profile.</h2>
//           {/* Render login prompt or redirect to login page */}
//         </div>
//       )}
//     </div>
//   );
// }


// export function Profile() {


//     return (
//         <>

//         </>
//     );

// }