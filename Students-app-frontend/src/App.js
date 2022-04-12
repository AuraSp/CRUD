import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomePage/Home';
import StudentsMain from './components/StudentsPage/studentsMain';
import TeachersMain from './components/TeachersPage/teachersMain';
import SForm from './components/AddStudentForm/form';
import TForm from './components/AddTeacherForm/form';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='container-fluid'>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentsMain />} />
        <Route path="/teachers" element={<TeachersMain />} />
        <Route path="/sform" element={<SForm />} />
        <Route path="/tform" element={<TForm />} />
      </Routes>
    </Router>
    </div>
  )
}
export default App;