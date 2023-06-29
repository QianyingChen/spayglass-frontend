import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  LinearProgress,
  Typography,
} from '@mui/material';
import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useGetGoalsQuery,
  useUpdateGoalMutation,
} from '../api/goalApi';
import { useUserInfoQuery } from '../api/userApi';


export function Profile() {
  const { isLoading, data: userInfo } = useUserInfoQuery();
  const { data: goals, isSuccess } = useGetGoalsQuery();
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPicture, setUpdatedPicture] = useState('');
  const [updatedTargetDate, setUpdatedTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [updatedTargetAmount, setUpdatedTargetAmount] = useState('');
  const [updatedCurrentAmount, setUpdatedCurrentAmount] = useState('');

  const [errors, setErrors] = useState({});

  const [createGoal, { isLoading: isCreating }] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!updatedName.trim()) {
      newErrors.name = 'Name is required';
    }

    const today = new Date().toISOString().split('T')[0];
    if (!updatedTargetDate || updatedTargetDate < today) {
      newErrors.targetDate = 'Target Date must be today or a future date';
    }

    if (!updatedTargetDate) {
      newErrors.targetDate = 'Target Date is required';
    }

    if (Number(updatedTargetAmount) <= 0 || !updatedTargetAmount.trim()) {
      newErrors.targetAmount = 'Target Amount should be a positive number';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isSuccess) {
      // Fetch goals data
    }
  }, [isSuccess]);

  const handleCreateGoal = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        const newGoal = {
          name: updatedName,
          description: updatedDescription,
          picture: updatedPicture,
          targetDate: updatedTargetDate,
          targetAmount: Number(updatedTargetAmount),
          currentAmount: Number(updatedCurrentAmount),
        };

        const { data } = await createGoal(newGoal).unwrap();

        // Reset form fields
        setUpdatedName('');
        setUpdatedDescription('');
        setUpdatedPicture('');
        setUpdatedTargetDate('');
        setUpdatedTargetAmount('');
        setUpdatedCurrentAmount('');

        window.location.reload();
      } catch (error) {
        console.log('Error creating goal:', error);
      }
    }
  };

  const handleUpdateGoal = async (id, updatedGoal) => {
    try {
      await updateGoal({ id, ...updatedGoal });

      window.location.reload();
    } catch (error) {
      console.log('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);

      window.location.reload();
    } catch (error) {
      console.log('Error deleting goal:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <Container maxWidth="md">
      {/* <Avatar alt={userInfo.name} src={userInfo.picture} /> */}
      <Typography variant="h4">{userInfo.name}</Typography>
      {/* <Typography variant="body1">{userInfo.email}</Typography> */}

      <Box>
        <Typography variant="h6" gutterBottom>
          Goals List
        </Typography>
        <Grid container spacing={2}>
        {goals && goals.length > 0 ? (
          goals.map((goal) => (
            <Grid item xs={12} sm={6}  key={goal.id}>
                <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6">{goal.name}</Typography>
              <Typography>{goal.description}</Typography>
              <Typography>
                Target Date: {new Date(goal.targetDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Target Amount: ${goal.targetAmount.toFixed(2)}
              </Typography>
              <Typography>
                Current Amount: ${goal.currentAmount.toFixed(2)}
              </Typography>

              {/* Progress Bars */}
              <Box
                width="100%"
                height="20px"
                borderRadius="10px"
                backgroundColor="#96151d"
                overflow="hidden"
                position="relative"
              >
                <Box
                  height="100%"
                  width={`${(goal.currentAmount / goal.targetAmount) * 100}%`}
                  backgroundColor="#35cb3a"
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  color="white"
                  fontWeight="bold"
                  zIndex={1}
                  fontSize="15px" 
                  lineHeight="0" 
                >
                  {`${Math.round((goal.currentAmount / goal.targetAmount) * 100)}%`}
                </Box>
              </Box>
              
              {/* Update Goal Form */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} >
                  <TextField
                    label="Updated Goal Name"
                    fullWidth
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Description"
                    fullWidth
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Picture"
                    fullWidth
                    value={updatedPicture}
                    onChange={(e) => setUpdatedPicture(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Target Date"
                    type="date"
                    fullWidth
                    value={updatedTargetDate}
                    onChange={(e) => setUpdatedTargetDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Target Amount"
                    type="number"
                    fullWidth
                    value={updatedTargetAmount}
                    onChange={(e) => setUpdatedTargetAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Current Amount"
                    type="number"
                    fullWidth
                    value={updatedCurrentAmount}
                    onChange={(e) => setUpdatedCurrentAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleUpdateGoal(goal.id, {
                        name: updatedName,
                        description: updatedDescription,
                        picture: updatedPicture,
                        targetDate: updatedTargetDate,
                        targetAmount: Number(updatedTargetAmount),
                        currentAmount: Number(updatedCurrentAmount)
                      })
                    }
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
              {/* Delete Goal */}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteGoal(goal.id)}
              >
                Delete
              </Button>
            </Box>
            </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No goals found.</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

