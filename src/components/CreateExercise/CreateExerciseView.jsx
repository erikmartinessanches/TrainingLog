import { React, useRef } from "react";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from "react-router-dom";

function CreateExerciseView({ saveExerciseACB, exerciseName, setExerciseName, exerciseType, setExerciseType }) {


  function onSubmitACB(e) {
    e.preventDefault();
    saveExerciseACB();
  }

  const handleChangeExerciseTypeACB = (event) => {
    setExerciseType(event.target.value);
  }

  return (
    <form onSubmit={onSubmitACB}>
      <Box sx={{ display: 'flex' }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="exercise-name-input-label">Exercise name</InputLabel> */}
          <TextField
            //labelId="exercise-name-input-label"
            id="exercise-name"
            label="Exercise name"
            onChange={(event) => {setExerciseName(event.target.value)}}
            defaultValue={exerciseName}
            required
          />
          </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="exercise-type-select-label">Exercise type</InputLabel>
          <Select
            labelId="exercise-type-select-label"
            id="exercise-type-select"
            value={exerciseType}
            onChange={handleChangeExerciseTypeACB}
            required
          >
            <MenuItem value={"Cardio"}>Cardio</MenuItem>
            <MenuItem value={"Resistance"}>Resistance</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Button
          variant="contained"
          type="submit"
          //disabled={loading}
        >
          Save
        </Button>
      </FormControl>
      <Link to="/dashboard">Cancel</Link>
    </Box>
    </form>
  );
}

export default CreateExerciseView;
