import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import { useGetGoalsQuery } from '../api/goalApi'; 

export function GoalList1() {
  const { data: goals, isLoading, isError } = useGetGoalsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(useGetGoalsQuery());
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography variant="body1">Error loading goals</Typography>;
  }

  return (
    <div>
      {goals.map((goal) => (
        <div key={goal.id}>
          <Typography variant="h6">{goal.name}</Typography>
          <Typography variant="body1">{goal.description}</Typography>
          <LinearProgress
            variant="determinate"
            value={(goal.currentAmount / goal.targetAmount) * 100}
          />
          <Typography variant="body2">{`${goal.currentAmount} / ${goal.targetAmount}`}</Typography>
        </div>
      ))}
    </div>
  );
};


