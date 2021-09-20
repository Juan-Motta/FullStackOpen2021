import React from 'react'

import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ courses }) => {

    return (
        courses.map(({ id, name, parts }) => {
            return (
                <div key={id}>
                    <Header name={name} />
                    <Content parts={parts} />
                    <Total parts={parts} />
                </div>
            )
        })
    )
}

export default Course;