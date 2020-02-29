import React, { useState } from "react";
import { TextField, Button, FormGroup } from "@material-ui/core";
import { createLog } from "../../../api";
import Log from "../../../../../w2w-fitness-server/src/server/entity/Log";

const CreateDailyLog: React.FC = () => {
  const [logForm, setLogForm] = useState<Partial<Log>>({
    date: undefined,
    weight: undefined,
    sleepHours: undefined,
    emotionalRating: undefined,
    physicalRating: undefined,
    notes: undefined,
    calories: undefined,
    fatGrams: undefined,
    carbohydrateGrams: undefined,
    proteinGrams: undefined
  });

  const handleChange = (formKey: string) => (
    event: React.ChangeEvent<HTMLElement> & { target: { value: string } }
  ) => setLogForm({ ...logForm, [formKey]: event.target.value });

  const submitForm = (): void => {
    createLog(logForm)
      .then(res => {
        console.log("createLog response: ", res);
      })
      .catch(alert);
  };

  // TODO:
  //// Apply proper form type restrictions (number, text, etc)
  //// Proper form validation && Button disable on invalidity
  return (
    <>
      <h2>Create Term</h2>

      {/* TODO: Make this into a DatePicker (material-ui?) and bring in moment.js and enforce formatting (research postgres date formatting, because it's weird as hell...) */}
      {/* TODO #2: Default to "Today" */}
      <FormGroup>
        <TextField
          // id="outlined-name"
          label={`Date (e.g. "1985-03-27)`}
          value={logForm.date}
          onChange={handleChange("date")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Weight"
          value={logForm.weight}
          onChange={handleChange("weight")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Sleep Hours"
          value={logForm.sleepHours}
          onChange={handleChange("sleepHours")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Emotional Rating"
          value={logForm.emotionalRating}
          onChange={handleChange("emotionalRating")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Physical Rating"
          value={logForm.physicalRating}
          onChange={handleChange("physicalRating")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Notes"
          value={logForm.notes}
          onChange={handleChange("notes")}
          margin="normal"
          variant="outlined"
        />

        {/* TODO: Auto-calculate this value based on all other macros? But still make it edit-able (due to alcohol calories, etc) */}
        <TextField
          // id="outlined-name"
          label="Calories"
          value={logForm.calories}
          onChange={handleChange("calories")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Fat (grams)"
          value={logForm.fatGrams}
          onChange={handleChange("fatGrams")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Carbs (grams)"
          value={logForm.carbohydrateGrams}
          onChange={handleChange("carbohydrateGrams")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          // id="outlined-name"
          label="Protein (grams)"
          value={logForm.proteinGrams}
          onChange={handleChange("proteinGrams")}
          margin="normal"
          variant="outlined"
        />

        <Button variant="contained" color="primary" onClick={submitForm}>
          Submit
        </Button>
      </FormGroup>
    </>
  );
};

export default CreateDailyLog;
