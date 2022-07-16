import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './PopupForm.css';

const PopupForm = (props) => {
    const { getStudentData, handleClose } = props;
    // form state
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        axios.post('https://immense-plateau-15676.herokuapp.com/studentinfo', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Data inserted successfully');
                    getStudentData();
                }
            })
        // props.data();
        handleClose();
    };

    console.log(watch("example"));
    return (
        <>
            <form className='form-body' onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input {...register("name", { required: true })} placeholder="Name" />
                {errors.name && <span className='text-danger ms-2'>Name field is required</span>}<br />

                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("class", { required: true })} placeholder="Class" />
                {/* errors will return when field validation fails  */}
                {errors.phone && <span className='text-danger ms-2'>Class field is required</span>}<br />

                <input {...register("roll", { required: true })} placeholder="Roll" />
                {/* errors will return when field validation fails  */}
                {errors.email && <span className='text-danger ms-2'>Roll field is required</span>}<br />

                <input {...register("group", { required: true })} placeholder="Group" />
                {/* errors will return when field validation fails  */}
                {errors.hobby && <span className='text-danger ms-2'>Group field is required</span>}<br />

                <input className='btn btn-primary' type="submit" />
            </form>
        </>
    );
};

export default PopupForm;