import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  TextField,
} from '@mui/material';
import { useGetGoalsQuery, useUpdateGoalMutation, useDeleteGoalMutation } from '../api/goalApi';
import { useUserInfoQuery } from '../api/userAPi';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 400,
  margin: 'auto',
  marginTop: 20,
  padding: 20,
});

const ProgressCard = styled(Card)({
  width: '400px',
  margin: 'auto',
  marginTop: '20px',
  padding: '20px',
});

const Profile = () => {
  const { data: goals, isFetching, refetch } = useGetGoalsQuery(); // Added refetch function
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();
  const { data: userInfo } = useUserInfoQuery();

  const handleViewDetails = (goal) => {
    setSelectedGoal(goal);
  };

  const handleCloseDialog = () => {
    setSelectedGoal(null);
  };

  const handleUpdateGoal = async (updatedGoal) => {
    try {
      await updateGoal(updatedGoal).unwrap();
      handleCloseDialog();
      window.location.reload(); // Refresh the page after successful update
    } catch (error) {
      console.error('Failed to update goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId).unwrap();
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  return (
    <>
    
      <ProgressCard sx={{ width: '650px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
          Welcome to the Goals List !
          </Typography>
          {isFetching ? (
            <Typography variant="body1">Loading goals...</Typography>
          ) : goals && goals.length > 0 ? (
            goals.map((goal) => (
              <Card key={goal.id} sx={{ marginBottom: '20px', width: '600px' }}>
                <CardContent>
                <Typography variant="body1">
                  Goal Name:<strong>{goal.name}</strong> 
                  </Typography>
                  <Typography variant="body2">Start Date: {goal.startDate}</Typography>
                  <Typography variant="body2">Target Date: {goal.targetDate}</Typography>
                  <CardContent>
                    <img   
                      // src={`http://localhost:8080/goals/${goal.id}/goal-image`}
                      src={`${import.meta.env.VITE_API_URI}/goals/${goal.id}/goal-image`}
                      alt="Goal"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </CardContent>
                  <Typography variant="body2">Target Amount: {goal.targetAmount}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(goal.currentAmount / goal.targetAmount) * 100}
                    sx={{ height: '10px', borderRadius: '5px', marginTop: '5px' }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewDetails(goal)}
                      style={{ marginRight: '10px', marginTop: '10px' }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteGoal(goal.id)}
                      style={{ marginTop: '10px' }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No goals found.</Typography>
          )}
        </CardContent>
      </ProgressCard>

      <Dialog open={selectedGoal !== null} onClose={handleCloseDialog}>
        <DialogTitle>Goal Details</DialogTitle>
        <DialogContent>
          {selectedGoal && (
            <>
              <CardContent>
                <img
                  // src={`http://localhost:8080/goals/${selectedGoal.id}/goal-image`}
                  src={`${import.meta.env.VITE_API_URI}/goals/${selectedGoal.id}/goal-image`}
                  alt="Goal"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </CardContent>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="goal-name"
                  label="Goal Name"
                  variant="outlined"
                  value={selectedGoal.name}
                  onChange={(e) =>
                    setSelectedGoal((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={selectedGoal.description}
                  onChange={(e) =>
                    setSelectedGoal((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="target-amount"
                  label="Target Amount"
                  variant="outlined"
                  type="number"
                  value={selectedGoal.targetAmount}
                  onChange={(e) =>
                    setSelectedGoal((prevState) => ({
                      ...prevState,
                      targetAmount: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="start-date"
                  label="Start Date"
                  variant="outlined"
                  type="date"
                  value={selectedGoal.startDate}
                  onChange={(e) =>
                    setSelectedGoal((prevState) => ({
                      ...prevState,
                      startDate: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="target-date"
                  label="Target Date"
                  variant="outlined"
                  type="date"
                  value={selectedGoal.targetDate}
                  onChange={(e) =>
                    setSelectedGoal((prevState) => ({
                      ...prevState,
                      targetDate: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="current-amount"
                  label="Current Amount"
                  variant="outlined"
                  type="number"
                  value={selectedGoal.currentAmount}
                  onChange={(e) =>
                    setSelectedGoal((prevState) => ({
                      ...prevState,
                      currentAmount: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <Box sx={{ marginTop: '10px' }}>
                <Typography variant="body2">Upload New Image:</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(selectedGoal.id, e.target.files[0])}
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="primary" onClick={() => handleUpdateGoal(selectedGoal)}>
            Update Goal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
