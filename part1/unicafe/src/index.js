import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = () => {
        setGood(good + 1);
    }

    const setToNeutral = () => {
        setNeutral(neutral + 1);
    }

    const setToBad = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <Header text="give feedback" />
            <Button text="good" onClick={setToGood} />
            <Button text="neutral" onClick={setToNeutral} />
            <Button text="bad" onClick={setToBad} />
            <SectionTitle text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {

    const sum = () => {
        return good + neutral + bad
    }

    const average = () => {
        let average = (good + bad * (-1)) / sum();
        return average ? average : 0;
    }

    const positive = () => {
        let positive = (good / sum()) * 100;
        return positive ? positive : 0;
    }

    if (sum()) {
        return (
            <>
                <table>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="all" value={sum()} />
                    <Statistic text="average" value={average()} />
                    <Statistic text="positive" value={`${positive()} %`} />
                </table>
            </>
        )
    } else {
        return (
            <h3>Not feedback given</h3>
        )
    }
}


const Statistic = ({ text, value }) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}


const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    )
}

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const SectionTitle = ({ text }) => {
    return (
        <h2>{text}</h2>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
