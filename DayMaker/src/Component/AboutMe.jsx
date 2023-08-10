import './AboutMe.css'
import logo from '../assets/Me.jpg'

export default function AboutMe() {
    return (
        <>
            <div className='about-container'>
                <img src={logo}></img>
                <h2>Sunil Kumar</h2>
                <div className='contact-me'>
                    <a href='http://google.com'><h3>LinkedIn</h3></a>
                    <a href='http://google.com'><h3>Facebool</h3></a>
                    <a href='http://google.com'><h3>Instagram</h3></a>
                </div>
            </div>
        </>
    )
}