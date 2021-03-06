import React, { useState } from 'react'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from "react-router-dom";
import { useField } from './hooks/index';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  if (notification === '') {
    return null;
  }
  return (
    <div style={style}>
      {notification}
    </div>
  );
};

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>Home</Link>
      <Link to='/anecdotes' style={padding}>Anecdotes</Link>
      <Link to='/create' style={padding}>Create New</Link>
      <Link to='/about' style={padding}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes
        .map((anecdote) => {
          return (
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          )
        })}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see:
      <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/PrabhakarRai/fullstackopen-part7/routed-anecdotes/blob/master/src/App.js'>App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0
    });
    props.handleNotification(`Added ${e.target.content.value}`);
    history.push('/anecdotes');
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input { ...content } reset='' />
        </div>
        <div>
          Author
          <input { ...author } reset='' />
        </div>
        <div>
          Url for more info
          <input { ...info } reset='' />
        </div>
        <button type='submit'>Create</button>
        <button type='reset' onClick={() => {
          content.reset();
          author.reset();
          info.reset();
        }}>Reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    }
  ])

  const [notification, setNotification] = useState('')
  const notificationHandler = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 5000);
  }

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null
  
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/anecdotes'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} handleNotification={notificationHandler} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;