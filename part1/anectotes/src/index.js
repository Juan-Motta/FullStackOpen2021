import React, { useState } from 'react';
import ReactDOM from 'react-dom';


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


const Anecdote = ({ text }) => {
    return (
        <p>{text}</p>
    )
}


const Votes = ({ text }) => {
    return (
        <p>has {text} votes</p>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

    const getRandomAnecdote = () => {
        let randomNumber = Math.floor(Math.random() * 6);
        setSelected(randomNumber);
    }

    const setVoteForAnecdote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    }

    const anecdoteWithMostVotes = anecdotes[votes.indexOf(Math.max(...votes))];

    return (
        <>
            <Header text="Anecdote of the day" />
            <Anecdote text={anecdotes[selected]} />
            <Votes text={votes[selected]} />
            <Button text="next anecdote" onClick={getRandomAnecdote} />
            <Button text="vote" onClick={setVoteForAnecdote} />
            <Anecdote text={anecdoteWithMostVotes} />
        </>
    )
}



const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

