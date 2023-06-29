import { useState, useEffect } from 'react';
import { FormControl, InputLabel,Button,Card, TextField, CardContent, Box, Typography, LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateGoalMutation, useUploadGoalImageMutation, useGetGoalsQuery } from '../api/goalApi';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 400,
  margin: 'auto',
  marginTop: 20,
  padding: 20,
});

const StyledTextField = styled(TextField)({
  marginBottom: 10,
});

const ProgressCard = styled(Card)({
  width: '400px',
  margin: 'auto',
  marginTop: '20px',
  padding: '20px',
});

export function CreateGoal() {
  const navigate = useNavigate();
  const [inputGoalName, setInputGoalName] = useState('');
  const [inputGoalDescription, setInputGoalDescription] = useState('');
  const [inputTargetAmount, setInputTargetAmount] = useState('');
  const [inputTargetDate, setInputTargetDate] = useState('');
  const [inputStartDate, setInputStartDate] = useState('');
  const [inputCurrentAmount, setInputCurrentAmount] = useState('');
  const [imageData, setImageData] = useState(null);
  const [createGoal] = useCreateGoalMutation();
  const [uploadGoalImage] = useUploadGoalImageMutation();
  const [defaultStartDate, setDefaultStartDate] = useState('');
  const today = new Date();
  
  const { data: goals, isFetching } = useGetGoalsQuery();
  const [selectedGoal, setSelectedGoal] = useState(null);

  const CustomTextField = styled(TextField)({
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red', // Adjust the color as desired
    },
  });

  useEffect(() => {
    // Calculate default dates
    const defaultStartDateValue = today.toISOString().split('T')[0];
    setInputStartDate(defaultStartDateValue);
    setDefaultStartDate(defaultStartDateValue);

    const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const defaultTargetDate = oneWeekLater.toISOString().split('T')[0];
    setInputTargetDate(defaultTargetDate);
  }, []);
 /**
  * 
  * Handles creating a goal
  */
 async function handleSubmitCreate(event) {
   event.preventDefault();

   // Validate form inputs
   if (!inputGoalName || !inputStartDate || !inputTargetDate || !inputTargetAmount) {
     return;
   }

   if (Number(inputTargetAmount) <= 0) {
     return;
   }

   try {
     const goalData = {
       name: inputGoalName,
       description: inputGoalDescription,
       targetAmount: inputTargetAmount,
       targetDate: inputTargetDate,
       startDate: inputStartDate,
       currentAmount: inputCurrentAmount,
     };

     const createdGoal = await createGoal(goalData).unwrap();

     if (imageData) {
       await uploadGoalImage({ id: createdGoal.id, image: imageData });
     }

     console.log('Created goal:', createdGoal); // Log the created goal
     navigate('/goals');

     // Auto-refresh the page after a short delay (e.g., 500 milliseconds)
     setTimeout(() => {
       window.location.reload();
     }, 500);
   } catch (error) {
     console.error('Failed to create goal:', error);
     navigate('/goals');
   }
 }


   /**
   * Handles opening the goal details dialog
   */
   function handleViewDetails(goal) {
    setSelectedGoal(goal);
  }

  /**
   * Handles closing the goal details dialog
   */
  function handleCloseDialog() {
    setSelectedGoal(null);
  }
 return (
  <>
  <StyledCard>
  <CardContent>
    <Typography variant="h5" gutterBottom>
      Create Goal
    </Typography>

     <form onSubmit={handleSubmitCreate}>
     <Box sx={{ width: '300px', margin: '10px' }}>
          <FormControl fullWidth margin="normal">
          <label htmlFor="goalName">Goal Name:</label>
            {/* <InputLabel htmlFor="goalName">Goal Name:</InputLabel> */}
            <CustomTextField
              id="goalName"
              value={inputGoalName}
              onChange={(e) => setInputGoalName(e.target.value)}
              fullWidth
              variant="standard"
            />
          </FormControl>
        </Box>
        <Box sx={{ width: '300px', margin: '10px' }}>
       <FormControl fullWidth margin="normal">
            <label htmlFor="goalDescription">Goal Description:</label>
         <TextField
           id="goalDescription"
           value={inputGoalDescription}
           onChange={(e) => setInputGoalDescription(e.target.value)}
           fullWidth
           variant="outlined"
           label="Goal Description"
           margin="normal"
           multiline
           rows={4}
         />
        </FormControl>
        </Box>
        <Box sx={{ width: '300px', margin: '10px' }}>
         <label htmlFor="targetAmount">Target Amount:</label>
         <TextField
           id="targetAmount"
           value={inputTargetAmount}
           onChange={(e) => setInputTargetAmount(e.target.value)}
           fullWidth
           variant="outlined"
           label="Target Amount"
           margin="normal"
           type="number"
         />
       </Box>
       <Box sx={{ width: '300px', margin: '10px' }}>
  <label htmlFor="startDate">Start Date:</label>
  <TextField
    id="startDate"
    value={inputStartDate}
    onChange={(e) => setInputStartDate(e.target.value)}
    fullWidth
    variant="outlined"
    label="Start Date"
    margin="normal"
    type="date"
    InputProps={{
      inputProps: { max: today }, // Disable selecting dates in the future
    }}
    required
  />
</Box>
      <Box sx={{ width: '300px', margin: '10px' }}>
        <label htmlFor="targetDate">Target Date:</label>
        <TextField
          id="targetDate"
          value={inputTargetDate}
          onChange={(e) => setInputTargetDate(e.target.value)}
          fullWidth
          variant="outlined"
          label="Target Date"
          margin="normal"
          type="date"
          required
        />
      </Box>
      
      <Box sx={{ width: '300px', margin: '10px' }}>
         <label htmlFor="currentAmount">Current Amount:</label>
         <TextField
           id="currentAmount"
           value={inputCurrentAmount}
           onChange={(e) => setInputCurrentAmount(e.target.value)}
           fullWidth
           variant="outlined"
           label="Current Amount"
           margin="normal"
           type="number"
         />
       </Box>
       <Box sx={{ width: '300px', margin: '10px' }}>
         <label htmlFor="image">Image:</label>
         <input
           type="file"
           id="image"
           accept="image/*"
           onChange={(e) => setImageData(e.target.files[0])}
         />
       </Box>
       <Button type="submit" variant="contained" color="primary">
         Create Goal
       </Button>
     </form>
     </CardContent>
 </StyledCard>
     <ProgressCard>
       <CardContent>
         <Typography variant="h5" component="h2">
           List of Goals
         </Typography>
         {isFetching ? (
           <Typography variant="body1">Loading goals...</Typography>
         ) : (
           goals && goals.length > 0 ? (
             goals.map((goal) => (
               <div key={goal.id}>
                 <Typography variant="body1">{goal.name}</Typography>
                 <LinearProgress
                   variant="determinate"
                   value={(goal.currentAmount / goal.targetAmount) * 100}
                   sx={{ height: '10px', borderRadius: '5px', marginTop: '5px' }}
                 />
                 <Typography variant="body2">
                   {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% completed
                 </Typography>
                 <Button onClick={() => handleViewDetails(goal)}>View Details</Button>
               </div>
             ))
           ) : (
             <Typography variant="body1">No goals found.</Typography>
           )
         )}
       </CardContent>
     </ProgressCard>

     <Dialog open={selectedGoal !== null} onClose={handleCloseDialog}>
       <DialogTitle>Goal Details</DialogTitle>
       <DialogContent>
         {selectedGoal && (
           <DialogContentText>
             Target Amount: {selectedGoal.targetAmount}
             <br />
             Remaining Amount: {selectedGoal.targetAmount - selectedGoal.currentAmount}
           </DialogContentText>
         )}
       </DialogContent>
       <DialogActions>
         <Button onClick={handleCloseDialog}>Close</Button>
       </DialogActions>
     </Dialog>
   </>
 );
}