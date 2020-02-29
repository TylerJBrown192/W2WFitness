import React, { useState } from 'react';
import { TextField, Button, FormGroup } from '@material-ui/core';
import { createTerminology } from '../../../api/terminology';

const CreateTerm: React.FC = () => {
    const [termForm, setTermForm] = useState({
        name: '',
        definition: '',
    });

    const handleChange = (formKey: string) => (event: React.ChangeEvent<HTMLElement> & { target: { value: string } }) =>
        setTermForm({ ...termForm, [formKey]: event.target.value });

    const submitForm = (): void => {
        createTerminology(termForm)
            .then((res) => {
                console.log(res);
            })
            .catch(alert);
    }

    return <>
        <h2>Create Term</h2>

        <FormGroup>
            <TextField
                // id="outlined-name"
                label="Name"
                value={termForm.name}
                onChange={handleChange('name')}
                margin="normal"
                variant="outlined"
            />

            <TextField
                // id="outlined-multiline-static"
                label="Definition"
                multiline
                rows="4"
                value={termForm.definition}
                onChange={handleChange('definition')}
                margin="normal"
                variant="outlined"
            />

            <Button variant="contained" color="primary" onClick={submitForm}>
                Submit
            </Button>
        </FormGroup>
    </>
}

export default CreateTerm;