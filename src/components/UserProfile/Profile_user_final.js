/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import './Profile_user_final.css';
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import App_user from './Profile_user'


export default function Profile_user_final() {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === dataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    return (
        <>
            <div className="AppUser-sd">
                <App_user />
                <div className="container-slider">
                    {dataSlider.map((obj, index) => {
                        return (
                            <div
                                key={obj.id}
                                className={slideIndex === index + 1 ? "slide active-anim" : "slide-pu"}
                            >
                                <img
                                    src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`}
                                    alt="some-inage"
                                />
                            </div>
                        )
                    })}
                    <BtnSlider moveSlide={nextSlide} direction={"next"} />
                    <BtnSlider moveSlide={prevSlide} direction={"prev"} />

                    <div className="container-dots">
                        {Array.from({ length: 5 }).map((item, index) => (
                            <div
                                onClick={() => moveDot(index + 1)}
                                className={slideIndex === index + 1 ? "dot active" : "dot"}
                            ></div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}
