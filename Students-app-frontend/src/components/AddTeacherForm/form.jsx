import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2';

function Form() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [town, setTown] = useState('');
    const [subject, setSubject] = useState('');
    const [subjectGroup, setsubjectGroup] = useState('');

    const url = 'http://localhost:5500/api/v1/teachers';

    const userSchema = yup.object().shape({
        name: yup
            .string()
            .nullable(false)
            .typeError('Invalid Input: Must be letters')
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required('Must enter a name'),
        surname: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required('Must enter a surname'),
        birthdate: yup
            .date()
            .nullable()
            .min(new Date(1950, 1, 1), 'Cannot use past date')
            .max(new Date(), "Cannot use future date")
            .typeError('Date birth must be entered')
            .required(),
        town: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required(),
        subject: yup
            .string()
            .nullable(false)
            .strict()
            .required('Must be chosen'),
        subjectGroup: yup
            .string()
            .nullable(false)
            .strict()
            .required('Must be chosen')
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = () => {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                birthdate: birthdate,
                town: town,
                subject: subject,
                subjectGroup: subjectGroup,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        Swal.fire({
            title: 'Registration successful',
            text: `Data has been sent to our database`,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        reset(
            setName(),
            setSurname(),
            setBirthdate(),
            setTown(),
            setSubject(),
            setsubjectGroup()
        )
    };

    return (
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 navigation p-4'>
                <div className='d-flex flex-row align-items-center text-center'>
                    <Link to="/" className='navItem fw-bold mx-1 p-2'>Home</Link>
                    <Link to="/students" className='navItem fw-bold mx-1 p-2'>Students Page</Link>
                    <Link to="/teachers" className='navItem fw-bold mx-1 p-2'>Teachers Page</Link>
                    <Link to="/tform" className='navItem fw-bold mx-1 p-2'>Register teacher</Link>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='form d-flex flex-column justify-content-center m-auto p-2 w-25'>

                <h3 className='text-center my-4 fw-bold'>Teacher registration</h3>

                <p className={errors.name ? 'text-danger text-center ' : ''}><input
                    {...register('name')}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    className='border border-2 m-1 w-100'
                />
                    {errors.name?.message}</p>
                <p className={errors.surname ? 'text-danger text-center ' : ''}><input
                    {...register('surname')}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="surname"
                    className='border border-2 m-1 w-100'
                />
                    {errors.surname?.message}</p>
                <p className={errors.birthdate ? 'text-danger text-center ' : ''}><input
                    {...register('birthdate')}
                    onChange={(e) => setBirthdate(e.target.value)}
                    placeholder='yyyy-mm-dd'
                    className='border border-2 m-1 w-100'
                />
                    {errors.birthdate?.message}</p>
                <p className={errors.town ? 'text-danger text-center ' : ''}><input
                    {...register('town')}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="town"
                    className='border border-2 m-1 w-100'
                />
                    {errors.town?.message}</p>
                <p className={errors.subject ? 'text-danger text-center ' : ''}>
                    <select
                        {...register('subject')}
                        onChange={(e) => setSubject(e.target.value)}
                        defaultValue=''
                        className='border border-2 bg-transparent m-1 w-100'
                    >
                        <option value='' disabled>---Choose your subject--</option>
                        <option value='Javascript'>JavaScript</option>
                        <option value='Java'>Java</option>
                        <option value='PHP'>PHP</option>
                        <option value='Tester'>Programinės įrangos testuotojas</option>
                    </select>
                    {errors.subject?.message}</p>
                <p className={errors.subjectGroup ? 'text-danger text-center ' : ''}>
                    <select
                        {...register('subjectGroup')}
                        onChange={(e) => setsubjectGroup(e.target.value)}
                        defaultValue=''
                        className='border border-2 bg-transparent m-1 w-100'
                    >
                        <option value='' disabled>---Choose your subject group--</option>
                        <option value='1'>1 grupė</option>
                        <option value='2'>2 grupė</option>
                        <option value='3'>3 grupė</option>
                    </select>
                    {errors.subjectGroup?.message}</p>

                <div className='text-center'>
                    <button type="submit" className='btn btn-secondary text-warning w-75 m-1 submit'>Create</button>
                </div>
            </form>
        </div >
    );
}
export default Form;