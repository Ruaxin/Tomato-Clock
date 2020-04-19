import * as React from 'react';
import {Checkbox} from 'antd';
import {EnterOutlined, DeleteOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {editTodo, updateTodo} from '../../redux/actions/todos';
import axios from '../../config/axios';
import './TodoItem.scss';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  editTodo: (id: number) => any;
  updateTodo: (payload: any) => any;
}

interface ITodoItemState {
  editText: string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }

  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  editTodo = () => {
    this.props.editTodo(this.props.id);
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.updateTodo({description: this.state.editText});
    }
  };


  public render() {
    const Editing = (
      <div className="editing">
        <input type="text" value={this.state.editText}
               onChange={e => this.setState({editText: e.target.value})}
               onKeyUp={this.onKeyUp}
        />
        <div className="iconWrapper">
          <EnterOutlined className="icon" onClick={e => this.updateTodo({description: this.state.editText})}/>
          <DeleteOutlined className="icon" onClick={e => this.updateTodo({deleted: true})}/>
        </div>
      </div>
    );
    const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>;
    let classNames = require('classnames');
    const todoItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    });
    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.updateTodo({completed: e.target.checked})}
        />
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  editTodo,
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);