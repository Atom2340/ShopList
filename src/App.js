import logo from './logo.svg';
import './App.css';
import { MenuItem, Select, TextField } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

function App() {
  const [areaList, setAreaList] = useState([
    'Thane',
    'Pune',
    'Mumbai',
    'Suburban',
    'Nashik',
    'Nagpur',
    'Ahmednagar',
    'Solapur',
  ]);

  const [categoryList, setCategoryList] = useState([
    'Grocery',
    'Butcher',
    'Baker',
    'Chemist',
    'Stationery shop',
  ]);

  const initialValues = {
    name: '',
    area: 'Thane',
    category: 'Grocery',
    opening: '',
    closing: '',
  };

  const [shopList, setShopList] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string().required('*Required'),
    opening: Yup.string().required('*Required'),
    closing: Yup.string().required('*Required'),
  });

  const onSubmit = (values) => {
    if (values.opening > values.closing) {
      alert('Opening time should be less than closing time');
    } else {
      setShopList((prev) => {
        return [
          ...prev,
          {
            ...values,
            id: shopList.length + 1,
          },
        ];
      });
      formik.handleReset();
    }
  };

  console.log('shopList', shopList);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="App">
      <h1 style={{textAlign:"center",color:'crimson', fontFamily:"monospace"
      }}>My Shop list</h1>
      <header className="App-header">
        <div className="container">
          <form className="shop-form" onSubmit={formik.handleSubmit}>
            <input
              className="input-field"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div style={{color:'red', fontSize:"12px", textAlign:'end'}}>{formik.errors.name}</div>
            ) : null}
            <Select
            style={{backgroundColor:'white'}}
              className="input-field"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Area"
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {areaList.map((area, index) => {
                return (
                  <MenuItem value={area} key={index}>
                    {area}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.errors.area && formik.touched.area ? (
              <div style={{color:'red', fontSize:"12px", textAlign:'end'}}>{formik.errors.area}</div>
            ) : null}

            <Select
            style={{backgroundColor:'white'}}
              className="input-field"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {categoryList.map((category, index) => {
                return (
                  <MenuItem value={category} key={index}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.errors.category && formik.touched.category ? (
              <div style={{color:'red', fontSize:"12px", textAlign:'end'}}>{formik.errors.category}</div>
            ) : null}
            <input
              className="input-field"
              type="time"
              name="opening"
              value={formik.values.opening}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.opening && formik.touched.opening ? (
              <div style={{color:'red', fontSize:"12px", textAlign:'end'}}>{formik.errors.opening}</div>
            ) : null}
            <input
              className="input-field"
              type="time"
              name="closing"
              value={formik.values.closing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.closing && formik.touched.closing ? (
              <div style={{color:'red', fontSize:"12px", textAlign:'end'}}  >{formik.errors.closing}</div>
            ) : null}
            <button className="btn" type="submit" style={{marginBottom:'10px'}}>
              Submit
            </button>
          </form>
          <div className="shop-list">
            {shopList.map((shop, index) => {
              return (
                <div key={index}>
                  <div className='gre'>
                  <p>Name: {shop.name}</p>
                  <p>Area: {shop.area}</p>
                  <p>Category: {shop.category}</p>
                  <p>Opening Time: {shop.opening}</p>
                  <p>Closing Time: {shop.closing}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShopList((prev) => {
                        return prev.filter((item) => item.id !== shop.id);
                      });
                    }}
                    >
                    delete
                    </button>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
