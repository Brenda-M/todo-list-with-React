import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import './App.css';
// import { v4 as uuid } from 'uuid';
import axios from 'axios';

class App extends Component {
  // state = {
  //   todos: [
  //     {
  //       id: uuid(),
  //       title: 'Take out the trash',
  //       completed: true,
  //     },
  //     {
  //       id: uuid(),
  //       title: 'Dinner with the fictional boyfriend',
  //       completed: false,
  //     },
  //     {
  //       id: uuid(),
  //       title: 'Meeting with the boss',
  //       completed: false,
  //     },
  //   ],
  // };

  state = {
    todos: []
  }

componentDidMount(){
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({todos: res.data}))
}
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // Delete Todo
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>  this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    }))
   
  };

  // Add Todo
  addTodo = title => {
    axios.post('https://jsonplaceholder.typicode.com/todos', { title:title, completed:false}).then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    // const newTodo = {
    //   id: uuid(),
    //   title: title,
    //   completed: false,
    // };
    // this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route
            exact
            path='/'
            render={props => (
              <React.Fragment>
                <div className='container'>
                  <AddTodo addTodo={this.addTodo} />
                  {/* passing the todo list as properties  to the Todo component*/}
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </div>
              </React.Fragment>
            )}
          />
          <Route path='/about' component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
