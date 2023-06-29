import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import { useGetGoalsQuery, useUpdateGoalMutation, useDeleteGoalMutation, useUploadGoalImageMutation } from '../api/goalApi';
import { useUserInfoQuery } from '../api/userApi';

const ChangeGoal = () => {
  const { data: goals, isLoading, isError } = useGetGoalsQuery(undefined, { refetchOnMount: true });
  const [updateGoal, { isLoading: isUpdating }] = useUpdateGoalMutation();
  const [deleteGoal, { isLoading: isDeleting }] = useDeleteGoalMutation();
  const [uploadGoalImage] = useUploadGoalImageMutation();
  const { data: userInfo } = useUserInfoQuery();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);
  const [editFormFields, setEditFormFields] = useState({
    name: '',
    description: '',
    targetAmount: '',
    startDate: '',
    targetDate: '',
    currentAmount: '',
    image: null,
  });

  const handleOpenEditModal = (goal) => {
    setEditedGoal(goal);
    setEditFormFields({
      name: goal.name,
      description: goal.description,
      targetAmount: goal.targetAmount,
      startDate: goal.startDate,
      targetDate: goal.targetDate,
      currentAmount: goal.currentAmount,
      image: null,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditedGoal(null);
    setEditFormFields({
      name: '',
      description: '',
      targetAmount: '',
      startDate: '',
      targetDate: '',
      currentAmount: '',
      image: null,
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleEditFormFileChange = (event) => {
    const file = event.target.files[0];
    setEditFormFields((prevFields) => ({
      ...prevFields,
      image: file,
    }));
  };

  const handleUpdateGoal = async () => {
  const { image, ...updatedFields } = editFormFields;

  try {
    const updatedGoal = await updateGoal({ id: editedGoal.id, userId: userInfo.data.id, ...updatedFields }).unwrap();

    if (image) {
      await uploadGoalImage({ id: editedGoal.id, image });
    }

    // Update the goal in the local state instead of reloading the page
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === updatedGoal.id) {
          return updatedGoal;
        }
        return goal;
      })
    );

    handleCloseEditModal();
  } catch (error) {
    console.error('Failed to update goal:', error);
  }
};

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId).unwrap();
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  if (isLoading) {
    return <p>Loading goals...</p>;
  }

  if (isError) {
    return <p>Error loading goals</p>;
  }

  return (
    <div>
      {goals.map((goal) => (
        <Card key={goal.id} sx={{ mb: 2, width: 350, height: 450, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardContent>
            <img src={`http://localhost:8080/goals/${goal.id}/goal-image`} alt="Goal" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </CardContent>
          <CardContent>
            <Typography variant="h6">{goal.name}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Description: {goal.description}
            </Typography>
            <Typography variant="body2">Start Date: {goal.startDate}</Typography>
            <Typography variant="body2">Target Date: {goal.targetDate}</Typography>
            <Typography variant="body2">Target Amount: {goal.targetAmount}</Typography>
            <Typography variant="body2">Current Amount: {goal.currentAmount}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleOpenEditModal(goal)} variant="contained">
              Edit Goal
            </Button>
            <Button onClick={() => handleDeleteGoal(goal.id)} variant="contained" color="error">
              Delete Goal
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Edit Goal Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxWidth: 600,
            p: 4,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
            opacity: 0.5,
          }}
        >
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Edit Goal
          </Typography>
          <form onSubmit={handleUpdateGoal}>
            <TextField
              name="name"
              label="Name"
              value={editFormFields.name}
              onChange={handleEditFormChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="description"
              label="Description"
              value={editFormFields.description}
              onChange={handleEditFormChange}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              name="targetAmount"
              label="Target Amount"
              value={editFormFields.targetAmount}
              onChange={handleEditFormChange}
              fullWidth
              required
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              name="startDate"
              label="Start Date"
              value={editFormFields.startDate}
              onChange={handleEditFormChange}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="targetDate"
              label="Target Date"
              value={editFormFields.targetDate}
              onChange={handleEditFormChange}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="currentAmount"
              label="Current Amount"
              value={editFormFields.currentAmount}
              onChange={handleEditFormChange}
              fullWidth
              type="number"
              sx={{ mb: 2 }}
            />
            <input type="file" accept="image/*" onChange={handleEditFormFileChange} sx={{ mb: 2 }} />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseEditModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isUpdating || isDeleting}>
                {isUpdating ? 'Updating...' : isDeleting ? 'Deleting...' : 'Update Goal'}
              </Button>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangeGoal;





