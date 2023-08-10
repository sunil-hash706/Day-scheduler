import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashbord.css'


export default function Dashbord() {
    const auth = localStorage.getItem("user");
    const [job, setJobs] = useState([]);
    useEffect(() => {
        getJob();
    }, []);
    // const d = new Date
    const [time, setTime] = useState(new Date());
    const apiKey = "2ac91dfccfd65eda2998528176f1bf7f"
    const [jobLocation, setJobLocation] = useState(JSON.parse(auth).city)
    const [userLocation, setUserLocation] = useState(JSON.parse(auth).city)
    const [dataJobLocation, setDataJobLocation] = useState({})
    const [dataUserLocation, setUserJobLocation] = useState({})
    const [nextTime, setNextTime] = useState({})
    const [freeTime, setFreeTime] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getJob = async () => {
        let result = await fetch("http://localhost:5000/jobs");
        result = await result.json();
        let flag = true;
        // setJobs(result);
        for (let i = 0; i < result.length; i++) {
            if (result[i].userId != JSON.parse(auth).email) {
                result.splice(i, 1);
                i--;
            }
            if ((flag) && (result[i].userId == JSON.parse(auth).email)) {
                setJobs(result[i]);
                flag = false;
                setJobLocation(result[i].location)
            }
        }
        // console.log(job, "hiiii ")
    };





    // Weather Part 



    // console.log(auth)
    const getWetherDetails = (cityName) => {
        console.log(auth)
        // console.log(jobLocationCity);
        if (!jobLocation) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + jobLocation + "&appid=" + apiKey
        console.log(apiURL);
        axios.get(apiURL).then((res) => {
            console.log("response", res.data)
            setDataJobLocation(res.data)

        }).catch((err) => {
            console.log("err", err)
        })
        // console.log(data);
    }

    useEffect(() => {
        console.log("hoi");
        getWetherDetails();

    }, []);

    // console.log(data)

    return (

        <>
            <div className="dashbord">
                <div className="work-card">
                    <h3 className='work-name'>{job.workName}</h3>
                    <h4 className='work-time'>{job.workStartTime.toUTCString()} to {job.workEndTime}</h4>
                    <h4 className='work-date'>{job.workDate} </h4>
                    <h4 className='work-location'>{job.location}</h4>

                    <div className='work-reminder'>
                        <h3>Things To Remember</h3>
                        <ul>
                            <li>{job.rem1}</li>
                            <li>{job.rem2}</li>
                            <li>{job.rem3}</li>
                        </ul>
                    </div>
                    <div className="free-time">
                        <h3>Know when you are free for continous X hours </h3>
                        <input type="number" value={nextTime} placeholder='How many hours you want' />
                        <button className='btn'> Find</button>
                        <h3>{freeTime}</h3>
                    </div>
                </div>
                <div className="time-card">
                    <h2>Your Home Location</h2>
                    <h3>{userLocation}</h3>
                    <h3>{time.toLocaleTimeString()}</h3>
                    <h4>{time.toLocaleDateString()}</h4>
                    <div className='weather-info'>Temperature - {((dataJobLocation?.main?.temp) - 273.15).toFixed(2)}°C</div>
                    <div className='weather-info'> Wind - {((dataJobLocation?.wind?.speed))} Meter/Sec</div>
                    <div className='weather-info'> Weather - {((dataJobLocation?.weather?.main))} </div>
                </div>
                <div className="weather-card">
                    <h2>Work Location</h2>
                    <div className='weather-reminder'>
                        <h3>{job.location}</h3>
                        <div className='weather-info'>Temperature - {((dataUserLocation?.main?.temp) - 273.15).toFixed(2)}°C</div>
                        <div className='weather-info'> Wind - {((dataUserLocation?.wind?.speed))} Meter/Sec</div>
                        <div className='weather-info'> Weather - {((dataUserLocation?.weather?.main))} </div>
                        <h3>Things To Remember</h3>
                        <ul>
                            <li>{job.rem1}</li>
                            <li>{job.rem2}</li>
                            <li>{job.rem3}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}