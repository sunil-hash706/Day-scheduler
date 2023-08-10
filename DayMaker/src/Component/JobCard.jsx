import './JobCard.css';
import { useEffect, useState } from "react";

export default function JobCard() {

    const auth = localStorage.getItem("user");
    const [jobs, setJobs] = useState([]);
    const [jobId, setJobId] = useState('');
    useEffect(() => {
        getJob();
    }, []);

    const getJob = async () => {
        let result = await fetch("http://localhost:5000/jobs");
        result = await result.json();
        setJobs(result);
        for (let i = 0; i < result.length; i++) {
            if (result[i].userId != JSON.parse(auth).email) {
                result.splice(i, 1);
                i--;
            }
        }
    };

    async function deleteJob(id) {
        // alert(id)
        let result = await fetch("http://localhost:5000/deletejob/" + id, {
            method: "DELETE"
        });
        // console.log(result)
        getJob();
    }

    return jobs.length ? jobs.map((item) => (
        <>
            <div className='job-card'>
                <h3>{item.workName}</h3>
                <div className='job-time'> Date: {item.workDate} </div>
                <div className="job-time">From  {item.workStartTime} To {item.workEndTime}</div>
                <div className="delete-btn" onClick={() => deleteJob(item._id)}>Delete Work</div>
            </div >
        </>
    )) :
        (
            <>
                <h2>No Work Added, Please go to add work and add a work </h2 >
            </>
        )
        ;
}