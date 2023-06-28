import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, TextField, LinearProgress, Typography } from '@mui/material';
import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useGetGoalsQuery,
  useUpdateGoalMutation
} from '../api/goalApi';

export function Goals() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); 

  const [errors, setErrors] = useState({});

  const { data: goals, isSuccess } = useGetGoalsQuery();
  const [createGoal, { isLoading: isCreating }] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const today = new Date().toISOString().split('T')[0];
    if (!targetDate || targetDate < today) {
      newErrors.targetDate = 'Target Date must be today or a future date';
    }

    if (!targetDate) {
      newErrors.targetDate = 'Target Date is required';
    }

    if (Number(targetAmount) <= 0 || !targetAmount.trim()) {
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
          name,
          description,
          picture,
          targetDate,
          targetAmount: Number(targetAmount),
          currentAmount: Number(currentAmount),
        };

        const { data } = await createGoal(newGoal).unwrap();

        // Reset form fields
        setName('');
        setDescription('');
        setPicture('');
        setTargetDate('');
        setTargetAmount('');
        setCurrentAmount('');

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

        

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Goals Page
      </Typography>

      {/* Create New Goal Form */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Create New Goal
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Goal Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Picture"
              fullWidth
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Target Date"
              type="date"
              fullWidth
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              error={!!errors.targetDate}
              helperText={errors.targetDate}
              inputProps={{
                min: new Date().toISOString().split('T')[0], // Prevent selection of past dates
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Target Amount"
              type="number"
              fullWidth
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              error={!!errors.targetAmount}
              helperText={errors.targetAmount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Amount"
              type="number"
              fullWidth
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleCreateGoal}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* List of Goals */}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Picture"
                    fullWidth
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Target Date"
                    type="date"
                    fullWidth
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Target Amount"
                    type="number"
                    fullWidth
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Updated Current Amount"
                    type="number"
                    fullWidth
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleUpdateGoal(goal.id, {
                        name,
                        description,
                        picture,
                        targetDate,
                        targetAmount: Number(targetAmount),
                        currentAmount: Number(currentAmount)
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
};



