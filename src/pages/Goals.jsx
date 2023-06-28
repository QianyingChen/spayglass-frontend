import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGoalMutation, useGetGoalsQuery, useUpdateGoalMutation, useDeleteGoalMutation } from '../api/goalApi';
import { Card, CardContent, Typography, TextField, Button, LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  width: '400px',
  margin: 'auto',
  marginTop: '20px',
  padding: '20px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '10px',
});

const StyledButton = styled(Button)({
  backgroundColor: 'green',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});

const ProgressCard = styled(Card)({
  width: '400px',
  margin: 'auto',
  marginTop: '20px',
  padding: '20px',
});


export function Goals() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [createGoal, { isLoading, isError }] = useCreateGoalMutation();
  const { data: goals, isFetching } = useGetGoalsQuery();
  const [selectedGoal, setSelectedGoal] = useState(null);

  const onSubmit = (data) => {
    createGoal(data)
      .unwrap()
      .then(() => {
        reset();
        window.location.reload(); // Refresh the page after successful goal creation
      });
  };

  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [isError, reset]);

  const handleViewDetails = (goal) => {
    setSelectedGoal(goal);
  };

  const handleCloseDialog = () => {
    setSelectedGoal(null);
  };

  return (
    <>
      <StyledCard>
        <CardContent>
        <Typography variant="h5" component="h2">
          Create a New Goal
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <StyledTextField
              label="Goal Name"
              fullWidth
              {...register('name', { required: true })}
              error={!!errors.name}
              helperText={errors.name ? 'Goal Name is required' : ''}
            />
          </div>
          <div>
            <StyledTextField
              label="Target Date"
              type="date"
              fullWidth
              defaultValue={new Date().toISOString().split('T')[0]}
              {...register('targetDate', { required: true, min: new Date().toISOString().split('T')[0] })}
              error={!!errors.targetDate}
              helperText={errors.targetDate ? 'Target Date is required and should not be in the past' : ''}
            />
          </div>
          <div>
            <StyledTextField
              label="Description"
              fullWidth
              {...register('description')}
            />
          </div>
          <div>
            <StyledTextField
              label="Picture"
              fullWidth
              {...register('picture')}
            />
          </div>
          <div>
            <StyledTextField
              label="Target Amount"
              type="number"
              fullWidth
              {...register('targetAmount', { min: 0 })}
              error={!!errors.targetAmount}
              helperText={errors.targetAmount ? 'Target Amount should be a positive number' : ''}
            />
          </div>
          <div>
            <StyledTextField
              label="Currently Saved Amount"
              type="number"
              fullWidth
              {...register('currentAmount', { min: 0 })}
            />
          </div>
          <StyledButton type="submit" disabled={isLoading}>
            Create Goal
          </StyledButton>
          {isError && (
            <Typography color="error" variant="body1">
              An error occurred while creating the goal.
            </Typography>
          )}
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
};



