import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';


export const NotFound = () => {
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
      navigate('/');
    };

    return (
        <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <h1>Oops!</h1>
      <h2>The page you are looking for does not exist.</h2>
      <Button variant="contained" onClick={handleHomeButtonClick}>
        Go to Home Page 
      </Button>
    </Box>
    );
}