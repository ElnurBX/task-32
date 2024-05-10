import React from 'react';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './addBlog.scss';

const AddBlog = () => {
    return (
        <div className='add'>
            <h2>Add Blog</h2>
            <Formik 
                initialValues={{
                    Title: '',
                    subtitle: '',
                    Image: '',
                    Description: '',
                    CreateTime: 1,
                    Viuse: 0,
                    id: uuidv4()
                }}
                validate={values => {
                    const errors = {};
                    if (!values.Title) {
                        errors.Title = 'Required';
                    }
                    if (!values.subtitle) {
                        errors.subtitle = 'Required';
                    }
                    if (!values.Image) {
                        errors.Image = 'Required';
                    } else if (values.Image >= 101) {
                        errors.Image = 'Max 100%';
                    }
                    if (!values.Description) {
                        errors.Description = 'Required';
                    }
                    if (!values.CreateTime) {
                        errors.CreateTime = 'Required';
                    }
                    if (!values.Viuse) {
                        errors.Viuse = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post("http://localhost:3000/Blog", values)
                        .then(res => {
                            console.log(res);
                            resetForm();
                        })
                        .catch(err => console.log(err))
                        .finally(() => setSubmitting(false));
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder='Title'
                            type="text"
                            name="Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Title}
                        />
                        {errors.Title && touched.Title && <div className="error">{errors.Title}</div>}
                        <input
                            placeholder='Subtitle'
                            type="text"
                            name="subtitle"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.subtitle}
                        />
                        {errors.subtitle && touched.subtitle && <div className="error">{errors.subtitle}</div>}
                        <input
                            placeholder='Image URL'
                            type="text"
                            name="Image"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Image}
                        />
                        {errors.Image && touched.Image && <div className="error">{errors.Image}</div>}
                        <input
                            placeholder='Description'
                            name="Description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Description}
                        />
                        {errors.Description && touched.Description && <div className="error">{errors.Description}</div>}
                        <input
                            placeholder='CreateTime'
                            type="number"
                            name="CreateTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.CreateTime}
                        />
                        {errors.CreateTime && touched.CreateTime && <div className="error">{errors.CreateTime}</div>}
                        <input
                            placeholder='Viuse'
                            type="number"
                            name="Viuse"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Viuse}
                        />
                        {errors.Viuse && touched.Viuse && <div className="error">{errors.Viuse}</div>}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AddBlog;
