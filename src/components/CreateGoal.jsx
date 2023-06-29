
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateGoalMutation, useUploadGoalImageMutation } from '../api/goalApi';


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
  
    /**
     * Handles creating a goal
     */
    async function handleSubmitCreate(event) {
      event.preventDefault();
  
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
      } catch (error) {
        console.error('Failed to create goal:', error);
        navigate('/goals');
      }
    }
      
      
  
      return (
        <div>
          <h2>Create Goal</h2>
          <form onSubmit={handleSubmitCreate}>
            <div>
              <label htmlFor="goalName">Goal Name:</label>
              <input
                type="text"
                id="goalName"
                value={inputGoalName}
                onChange={(e) => setInputGoalName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="goalDescription">Goal Description:</label>
              <textarea
                id="goalDescription"
                value={inputGoalDescription}
                onChange={(e) => setInputGoalDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="targetAmount">Target Amount:</label>
              <input
                type="number"
                id="targetAmount"
                value={inputTargetAmount}
                onChange={(e) => setInputTargetAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="targetDate">Target Date:</label>
              <input
                type="date"
                id="targetDate"
                value={inputTargetDate}
                onChange={(e) => setInputTargetDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={inputStartDate}
                onChange={(e) => setInputStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="currentAmount">Current Amount:</label>
              <input
                type="number"
                id="currentAmount"
                value={inputCurrentAmount}
                onChange={(e) => setInputCurrentAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImageData(e.target.files[0])}
              />
            </div>
            <button type="submit">Create Goal</button>
          </form>
        </div>
      );
    }
  