import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  logOut: () => void;
  //loading: boolean;
  createNewACB: () => void;
  createNewTrainingSessionACB: () => void;
  user: {
    firstName: string | null;
    lastName: string | null;
    email?: string | null;
  };
}

function DashboardView({
  logOut,
  /* loading, */ createNewACB,
  createNewTrainingSessionACB,
  user,
}: Props) {
  function onLogOutClicked() {
    logOut();
  }

  function onCreateNewRecord() {
    createNewACB();
  }

  function onNewTrainingSession() {
    createNewTrainingSessionACB();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        {user?.firstName} {user.lastName} {user?.email}
      </p>
      <Button
        variant="contained"
        onClick={onLogOutClicked}
        type="submit"
        // disabled={loading}
      >
        Log out
      </Button>
      <Button
        variant="contained"
        onClick={onCreateNewRecord}
        type="submit"
        // disabled={loading}
      >
        Create exercise
      </Button>
      <Button
        variant="contained"
        onClick={onNewTrainingSession}
        type="submit"
        // disabled={loading}
      >
        Create training record
      </Button>
    </div>
  );
}

export default DashboardView;
