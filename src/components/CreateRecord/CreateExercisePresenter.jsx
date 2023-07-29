import { React, useState, useRef } from "react";
import CreateRecordView from "./CreateExerciseView";
import { SaveNewRecord } from "../../models/ThunkFunctions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import { createResistanceExercise } from "../../models/userSlice";

function CreateRecordPresenter() {
  /**State behaves more like a snapshot. Setting it does not change the state
   * variable you already have, but instead triggers a re-render. */
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  //const exerciseNameRef = useRef(""); //For uncontrolled inputs.
  //const exerciseTypeRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**In React, side effects usually belong inside event handlers. Even though
   * event handlers are defined inside your component, they don’t run during
   * rendering! So event handlers don’t need to be pure.
   *
   * I think this why we never want to call event handlers during rendering,
   * as Cristi put it. (Calling with the () notation.)*/

  function saveExerciseACB() {
    console.log(`Save exercise name: ${exerciseName}, type: ${exerciseType}`);
    // Use this one or the next? 
    dispatch(createResistanceExercise({ exerciseName, exerciseType }))
    //dispatch(SaveNewRecord(recordText)); //Saves in persistence via Thunk.
    //I think we need to just set the exercise in the model first.


    //Creates a record with a temporary id. This id will be replaced by the id
    //from the db when the record is saved in the persistence layer.
/*      dispatch({
      type: "RECORD_CREATED",
      payload: { recordId: uuidv4(), text: recordText },
    });  */
    navigate("/dashboard");
  }

  /**“Rendering” means that React is calling your component, which is a
   * function. The JSX you return from that function is like a snapshot of the
   * UI in time. Its props, event handlers, and local variables were all
   * calculated using its state at the time of the render. 
   * 
   * When React re-renders a component:

    React calls your function again.
    Your function returns a new JSX snapshot.
    React then updates the screen to match the snapshot you’ve returned.

    As a component’s memory, state is not like a regular variable that disappears 
    after your function returns. State actually “lives” in React itself—as if on 
    a shelf!—outside of your function. When React calls your component, it gives 
    you a snapshot of the state for that particular render. Your component 
    returns a snapshot of the UI with a fresh set of props and event handlers in 
    its JSX, all calculated using the state values from that render!
    Setting state only changes it for the next render.
   * */
  return (
    <CreateRecordView
      saveExerciseACB={saveExerciseACB}
      exerciseName={exerciseName}
      setExerciseName={setExerciseName}
      exerciseType={exerciseType}
      setExerciseType={setExerciseType}
    />
  );
}

export default CreateRecordPresenter;
