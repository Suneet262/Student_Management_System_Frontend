import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function EditStudent(){

    let navigate = useNavigate();
    const {id} = useParams();

    const [student, setStudent] = useState({
        roll_no:"",
        name:"",
        email_id:""
    });


    const{roll_no, name, email_id} = student;

    const onInputChange=(e)=>{
        setStudent({ ...student,[e.target.name]: e.target.value})

    }

    useEffect(()=>{
        loadStudent()
    }, [])

    const onSubmit = async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/student/${id}`, student);
        navigate("/");
    }

    const loadStudent = async ()=>{
        const result = await axios.get(`http://localhost:8080/student/${id}`)
        setStudent(result.data);
    }


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Student Record</h2>
                    
                    <form onSubmit={(e)=> onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="roll_no" className="form-label">Roll No. </label>
                        <input type={"text"} className="form-control" placeholder="Enter the Candidate's Roll Number" name="roll_no"  value={roll_no} 
                            onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type={"text"} className="form-control" placeholder="Enter the Candidate's Name" name="name" value={name}
                            onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email_id" className="form-label">Email-Id</label>
                        <input type={"email"} className="form-control" placeholder="Enter the Candidate's Email-Id" name="email_id" value={email_id}
                           onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-primary">Submit</button>

                    <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>

                </div>
            </div>

        </div>
    )
}