import * as React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './Todos.scss';


interface ITodosState {
  todos: any[];
}

class Todos extends React.Component<any, ITodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo = async (params: any) => {
    const {todos} = this.state;
    try {
      const response = await axios.post('todos', params);
      this.setState({todos: [response.data.resource, ...todos]});
    } catch (e) {
      throw new Error(e);
    }
  };
  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      this.setState({todos: response.data.resources});
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
        <main>
          {this.state.todos.map(t => {return <div key={t.id}>{t.description}</div>;})}
        </main>
      </div>
    );
  }
}

export default Todos;