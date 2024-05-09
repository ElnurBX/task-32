import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router';
import "../add/add.scss"
    
const Edit = () => {
    const { id } = useParams();
    const [edit, setEdit] = useState({}); // edit state'inin boş bir nesne olarak başlatılması

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => setEdit(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='add'>
            <h2>Edit</h2>
            <Formik 
                initialValues={{ 
                    title: '',
                    price: '', 
                    discount:  '', 
                    img:  '', 
                    sale:  false, 
                    rating: 0
                }}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'edit Required';
                    }
                    if (!values.price) {
                        errors.price = 'edit Required';
                    }
                    if (!values.discount ) {
                        errors.discount = 'edit Required';
                    }else if( values.discount >= 101){
                        errors.discount = 'max 100% ';
                    }
                    
                    if (!values.img) {
                        errors.img = 'edit Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        axios.put(`http://localhost:3000/products/${id}`, values) 
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                            .finally(() => setSubmitting(false));
                            window.location='/admin';
                    }, 400);    
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title ? values.title : edit.title}
                        />
                        {errors.title && touched.title && errors.title}
                        <input
                            type="number"
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price ? values.price : edit.price}
                        />
                        {errors.price && touched.price && errors.price}
                        <input
                            type="number"
                            name="discount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discount ? values.discount : edit.discount}
                        />
                        {errors.discount && touched.discount && errors.discount}
                        <input
                            type="url"
                            name="img"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.img ? values.img : edit.img}
                        />

                        {errors.img && touched.img && errors.img}
                        <label htmlFor="sale">
                            <p>Sale:</p>
                            <input
                                type="checkbox"
                                name="sale"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.sale ? values.sale :edit.sale}
                            />
                        </label>
                        {errors.sale && touched.sale && errors.sale}
                        
                        <button  type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Edit;
