import * as React from 'react';

import { Field, Form, Formik } from 'formik';

import { 
  Button,
  Grid, 
  Theme, 
  withStyles 
} from '@material-ui/core';

import * as Yup from 'yup';


import Wrapper from './Wrapper';

import { SimpleFileUpload } from 'formik-material-ui';

// 10 Megs
const MAX_FILE_SIZE = 10485760;

const schema = Yup.object().shape({
  file: Yup.mixed()
    .required('Required')
    .test(
      'file',
      'File must be less than 10MB',
      value => value == null || value.size < MAX_FILE_SIZE
    ),
});

const styles = (theme: Theme) => ({
  formControl: {
    backgroundColor: 'blue',
    margin: theme.spacing.unit,
    minWidth: 120
  },
});

interface IValues {
  file: '' | File;
}

export default withStyles(styles)(() => (
  <Wrapper title="File Upload">
  <Grid justify="center">
    <Formik<IValues>
      validationSchema={schema}
      initialValues={{ file: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          // action('submit')(values);
        }, 2000);
      }}
      render={({ submitForm }) => (
        <Form>
          <Field component={SimpleFileUpload} name="file" />
          <br />
          <Button variant="contained" color="primary" onClick={submitForm}>
            Submit
          </Button>
          <br />
          
        </Form>
      )}
    />
  </Grid>
  </Wrapper>
));
