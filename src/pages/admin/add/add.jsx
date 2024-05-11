import React from 'react';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './add.scss'
const Add = () => (
  
  <div className='add'>

    <h2>Add Product</h2>
    <Formik 
      initialValues={{ title: '', price: '', discount: '' ,img:'',sale:false ,  rating:{"count":0,"ratings":[]},id:uuidv4()}}
      validate={values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        }
        if (!values.price ) {
          errors.price = 'Required';
        }
        if (!values.discount ) {
          errors.discount = 'edit Required';
        }else if( values.discount >= 101){
            errors.discount = 'max 100% ';
        }
        if (!values.img) {
          errors.img = 'Required';
        }
      
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          
          axios.post("http://localhost:3000/products",values).then(res=>console.log(res)).catch(err=>console.log(err)).finally(()=>setSubmitting(false))
          setSubmitting(false);
          values.title=''
          values.price=''
          values.discount=''
          values.img=''
          values.sale=false
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
          placeholder='title'
            type="text"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {errors.title && touched.title && errors.title}
          <input
          placeholder='price'
            type="number"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
          />
          {errors.price && touched.price && errors.price}
          <input
            placeholder='discount'
            type="number"
            name="discount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.discount}
          />
          {errors.discount && touched.discount && errors.discount}
          <input
          placeholder='image url'
            type="url"
            name="img"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.img}
          />
          {errors.img && touched.img && errors.img}
          <label htmlFor="sale">
          <p>Sale:</p>
          <input
          
            type="checkbox"
            name="sale"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.sale}
          /></label>
          {errors.sale && touched.sale && errors.sale}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default Add;