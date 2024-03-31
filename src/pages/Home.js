import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home(){

  const [students, setStudents] = useState([]);

  const {id} = useParams();

  useEffect(()=>{
    loadStudents();
  },[]);


  const loadStudents = async () =>{
    const result = await axios.get("http://localhost:8080/students");
    setStudents(result.data);
  }

  const deleteStudent = async (id)=>{
    await axios.delete(`http://localhost:8080/student/${id}`);
    loadStudents();
  }

    return(
        <div className="container">
            <div className="py-4">
            <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Roll No.</th>
      <th scope="col">Name</th>
      <th scope="col">Email-Id</th>
    </tr>
  </thead>
  <tbody>

    {students.map((student, index)=>(
      <tr key={index}>
      <th scope="row">{index + 1}</th>
        <td>{student.roll_no}</td>
        <td>{student.name}</td>
        <td>{student.email_id}</td>
        <td>
          <Link className="btn btn-primary mx-2" to={`/viewStudent/${student.id}`}>View</Link>
          <Link className="btn btn-outline-primary mx-2" to={`/editStudent/${student.id}`}>Edit</Link>
          <button className="btn btn-danger mx-2" onClick={()=> deleteStudent(student.id)}>Delete</button>
        </td>
      </tr>
      ))}
  </tbody>
</table>
            </div>
        </div>
    )
}