import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import './cards.css'

function Teacherscards({ id, data, onEdit, onDelete }) {
    return (
        <tr>
            <td><span>{data.name}</span></td>
            <td><span>{data.surname}</span></td>
            <td><span>{data.birthdate}</span></td>
            <td><span>{data.subject}</span></td>
            <td><span>{data.town}</span></td>
            <td><span>{data.subjectGroup}</span></td>
            <td>
                <button onClick={() => onDelete(id)} className='btn btn-danger border-0 text-warning mt-2'><MdDelete />
                    <p className='d'>Remove</p></button>
                <button onClick={() => onEdit(data)} className='btn btn-secondary border-0 text-warning mt-2'><AiFillEdit /><p className='e'>Edit</p></button>
            </td>
        </tr>
    )
}

export default Teacherscards