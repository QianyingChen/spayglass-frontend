import { useState } from 'react';
import { useGetGoalQuery, useUpdateGoalMutation, useDeleteGoalMutation } from '../api/goalApi';

const ChangeGoal = ({ goalId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  //  other fields here

  const { data: goal, isSuccess: isGoalLoaded } = useGetGoalQuery(goalId);
  const [updateGoal, { isLoading: isUpdating }] = useUpdateGoalMutation();
  const [deleteGoal, { isLoading: isDeleting }] = useDeleteGoalMutation();

  const handleUpdateGoal = () => {
    const updatedGoal = {
      id: goalId,
      name,
      description,
      // other fields here
    };

    updateGoal(updatedGoal)
      .unwrap()
      .then(() => {
        // Handle success
        console.log('Goal updated successfully!');
        // Add any additional logic or UI updates here
      })
      .catch((error) => {
        // Handle error
        console.error('Failed to update goal:', error);
        // Add any error handling logic or UI updates here
      });
  };

  const handleDeleteGoal = () => {
    deleteGoal(goalId)
      .unwrap()
      .then(() => {
        // Handle success
        console.log('Goal deleted successfully!');
        // Add any additional logic or UI updates here
      })
      .catch((error) => {
        // Handle error
        console.error('Failed to delete goal:', error);
        // Add any error handling logic or UI updates here
      });
  };

  if (!isGoalLoaded) {
    return <div>Loading goal...</div>;
  }

  return (
    <>
    <div>
      <h2>Change Goal</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Add other input fields for updating other goal fields */}
      <button onClick={handleUpdateGoal} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Goal'}
      </button>
      <button onClick={handleDeleteGoal} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Goal'}
      </button>
    </div>
    </>
  );
};

export default ChangeGoal;
