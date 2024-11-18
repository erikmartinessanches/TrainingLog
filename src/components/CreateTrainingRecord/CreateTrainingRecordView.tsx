import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';

interface Props {
  saveExerciseACB: () => void;
  exerciseNames: string[];
  setExerciseName: (exerciseName: string) => void;
  exerciseType: string;
  setExerciseType: (exerciseType: string) => void;
  exerciseList: JSX.Element;
}

function CreateTrainingRecordView({
  saveExerciseACB,
  exerciseNames,
  setExerciseNames,
  exerciseType,
  setExerciseType,
  exerciseList,
}: Props) {
  function onSubmitACB(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    saveExerciseACB();
  }

  const handleChangeExerciseTypeACB = (event: SelectChangeEvent<string>) => {
    setExerciseType(event.target.value);
  };

  return (
    <form onSubmit={onSubmitACB}>
      <Box sx={{ display: 'flex' }}>
        <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
          <InputLabel id="exercise-type-select-label">Exercise</InputLabel>
          <Select
            labelId="exercise-type-select-label"
            id="exercise-type-select"
            value={exerciseType}
            onChange={handleChangeExerciseTypeACB}
            required
          >
            {exerciseNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {exerciseList}
        </FormControl>
      </Box>
      <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
        <Button
          variant="contained"
          type="submit"
          //disabled={loading}
        >
          Save
        </Button>
      </FormControl>
      <Link to="/dashboard">Cancel</Link>
    </form>
  );
}

export default CreateTrainingRecordView;
