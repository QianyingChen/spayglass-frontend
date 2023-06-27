// import React from 'react';
// import { useGetGoalsQuery } from '../api/goalApi';
// import { Box, Typography, Button } from '@mui/material';

// export function Goals() {
//   const { data: goals, isLoading } = useGetGoalsQuery();
  

//   return (
//     <Box>
//       <Typography variant="h4" component="h1" mb={3}>
//         My Goals
//       </Typography>

//       {isLoading ? (
//         <Typography>Loading goals...</Typography>
//       ) : (
//         goals.map((goal) => (
//           <Box key={goal.id} mb={3}>
//             <Typography variant="h6" component="h2">
//               {goal.name}
//             </Typography>
//             <Typography>{goal.description}</Typography>
//             <Typography>Target Date: {goal.targetDate}</Typography>
//             <Typography>Target Amount: ${goal.targetAmount}</Typography>
//             <Typography>Current Amount: ${goal.currentAmount}</Typography>
            
//           </Box>
//         ))
//       )}

//       <Button variant="contained" color="primary">
//         Add Goal
//       </Button>
//     </Box>
//   );
// };

import { useState } from 'react';
import { useGetGoalsQuery, useCreateGoalMutation, useUpdateGoalMutation, useDeleteGoalMutation } from '../api/goalApi';

export function Goals() {
  const { data: goals, error, isLoading } = useGetGoalsQuery();
  const [createGoal, createGoalResult] = useCreateGoalMutation();
  const [updateGoal, updateGoalResult] = useUpdateGoalMutation();
  const [deleteGoal, deleteGoalResult] = useDeleteGoalMutation();

  console.log(goals)
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    picture: '',
    targetDate: '',
    targetAmount: 0,
    savedAmount: 0,
  });

  const handleInputChange = (e) => {
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateGoal = () => {
    createGoal(newGoal);
    setNewGoal({
      name: '',
      description: '',
      picture: '',
      targetDate: '',
      targetAmount: 0,
      savedAmount: 0,
    });
  };

  const handleUpdateGoal = (goalId, updatedGoal) => {
    updateGoal({ id: goalId, ...updatedGoal });
  };

  const handleDeleteGoal = (goalId) => {
    deleteGoal(goalId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error:', error.message); 
    return <div>Error: Failed to fetch goals</div>;
  }

  return (
    <div>
      <h1>Goals</h1>

      <h2>Create New Goal</h2>
      <form onSubmit={handleCreateGoal}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newGoal.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newGoal.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="picture"
          placeholder="Picture"
          value={newGoal.picture}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="targetDate"
          placeholder="Target Date"
          value={newGoal.targetDate}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount"
          value={newGoal.targetAmount}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="savedAmount"
          placeholder="Saved Amount"
          value={newGoal.savedAmount}
          onChange={handleInputChange}
        />
        <button type="submit">Create Goal</button>
      </form>

      <h2>Current Goals</h2>
      {goals.map((goal) => (
        <div key={goal.id}>
          <h3>{goal.name}</h3>
          <p>{goal.description}</p>
          <p>Target Date: {goal.targetDate}</p>
          <p>Target Amount: {goal.targetAmount}</p>
          <p>Saved Amount: {goal.savedAmount}</p>

          <button onClick={() => handleUpdateGoal(goal.id, { savedAmount: goal.savedAmount + 10 })}>
            Increment Saved Amount
          </button>

          <button onClick={() => handleDeleteGoal(goal.id)}>Delete Goal</button>
        </div>
      ))}
    </div>
  );
}

