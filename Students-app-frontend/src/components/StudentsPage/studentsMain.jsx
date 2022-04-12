import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { BiSearchAlt } from "react-icons/bi";
import {
    Link,
    useSearchParams
} from "react-router-dom";
import Studentscards from './studentscards';
import './studentmain.css'
import Editinfo from '../EditStudentInfo/editinfo';


const url = 'http://localhost:5500/api/v1/students/';

function StudentsMain() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams('');
    let [editId, setEditId] = useState("");

    const getUsers = async () => {
        setLoading(true);
        const response = await fetch(url);
        const users = await response.json();
        console.log(users);
        setUsers(users.data.students);
        setLoading(false);
    };
    useEffect(() => {
        getUsers();
    }, []);

    //---SearchStudent---//
    const searchTerm = searchParams.get("name") || "";
    function handleSearch(e) {
        const name = e.target.value;
        if (name) {
            setSearchParams({ name });
        } else {
            setSearchParams({});
        }
    }

    //---DeleteStudent---//
    function handleDelete(e, id) {
        e.preventDefault();
        Swal
            .fire({
                title: 'Are you sure?',
                text: 'This data will be lost forever',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Delete',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal
                        .fire('Data has been deleted!', '', 'success')

                    const dlt = users.filter((data) => data._id !== id);
                    setUsers(dlt);
                    fetch(`http://localhost:5500/api/v1/students/${id}`, { method: 'DELETE' })
                        .then(() => console.log("success"));

                } else if (result.isDenied) {
                    Swal.close()
                }
            })
    };

    //---OpenEditForm---//
    const handleEdit = (e, data) => {
        e.preventDefault();
        console.log(data._id);
        setEditId(data._id);
    };

    //---HandleStudentEdit---//
    const submitEdit = (e, data) => {
        e.preventDefault();
        fetch(url + editId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                data
            )
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                getUsers()
                cancelEdit();
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    //---CancelStudentEdit---//
    function cancelEdit() {
        setEditId("")
        console.log('canceling')
    }

    return (
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 navigation p-4'>
                <div className='d-flex flex-row align-items-center text-center'>
                    <Link to="/" className='navItem fw-bold mx-1 p-2'>Home</Link>
                    <Link to="/students" className='navItem fw-bold mx-1 p-2'>Students Page</Link>
                    <Link to="/teachers" className='navItem fw-bold mx-1 p-2'>Teachers Page</Link>
                    <Link to="/sform" className='navItem fw-bold mx-1 p-2'>Register student</Link>
                    <p className='counter text-warning fs-5'>Counted users: {users.length}</p>
                    <div className='search'>
                        <label><BiSearchAlt />Search:&nbsp;</label>
                        <input type="text" value={searchTerm} onChange={handleSearch} className='text-dark' placeholder='Search students...' />
                    </div>
                </div>
            </div>
            <table className='table mt-3'>
                <thead className='thead-dark text-center'>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Birthdate</th>
                        <th>Town</th>
                        <th>Program</th>
                        <th>Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {searchParams ?
                        (!loading ?
                            users.filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase())).map((data) => (
                                <>
                                    {editId === data._id ? (
                                        <Editinfo
                                            key={data._id}
                                            data={data}
                                            onCancel={cancelEdit}
                                            onSubmit={submitEdit}
                                        />
                                    ) : (
                                        <Studentscards
                                            key={data._id}
                                            data={data}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    )}
                                </>
                            ))
                            : <tr><td className='loader'>Loading...</td></tr>
                        ) : ''
                    }
                </tbody>
            </table>
        </div >
    )
}

export default StudentsMain