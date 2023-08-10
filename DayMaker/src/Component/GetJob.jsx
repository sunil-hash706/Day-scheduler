import { useState } from 'react'
import './GetJob.css'
import { useNavigate } from 'react-router-dom';

export default function GetJob() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const [workName, setWorkName] = useState('');
    const [workStartTime, setWorkStartTime] = useState('');
    const [workEndTime, setWorkEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [rem1, setRem1] = useState('');
    const [rem2, setRem2] = useState('');
    const [rem3, setRem3] = useState('');
    const [userId, setUserId] = useState();



    const AddJob = async () => {
        if (workName === undefined || workStartTime === undefined || workEndTime === undefined) {
            alert("Add required data");
        }
        else {
            let result = await fetch("http://localhost:5000/add-job", {
                method: "post",
                body: JSON.stringify({ userId, workName, workStartTime, workEndTime, location, rem1, rem2, rem3 }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // result = await result.json();
            navigate("/work");
        }
    };

    return (
        <>
            <div className='job-container'>
                <h2>Planning a day before makes your life more organized</h2>
                <input type='text' value={workName} onChange={(e) => {
                    setWorkName(e.target.value)
                    setUserId(JSON.parse(auth).email);
                }} placeholder='Name of work'></input>
                <label>Start Time</label>
                <input type='datetime-local' value={workStartTime} onChange={(e) => { setWorkStartTime(e.target.value) }} max="9999-12-31" ></input>
                <label>End Time</label>
                <input type='datetime-local' value={workEndTime} onChange={(e) => { setWorkEndTime(e.target.value) }} max="9999-12-31" ></input>
                <input type='text' value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder='Locations you may go through'></input>
                <input type='text' value={rem1} onChange={(e) => { setRem1(e.target.value) }} placeholder='Things to remember'></input>
                <input type='text' value={rem2} onChange={(e) => { setRem2(e.target.value) }} placeholder='Things to remember'></input>
                <input type='text' value={rem3} onChange={(e) => { setRem3(e.target.value) }} placeholder='Things to remember'></input>
                <button onClick={AddJob}>ADD</button>
            </div >
        </>
    )
}