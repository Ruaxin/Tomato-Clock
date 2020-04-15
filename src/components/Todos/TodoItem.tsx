import * as React from 'react';
import {Checkbox} from 'antd';
import {EnterOutlined, DeleteOutlined} from '@ant-design/icons';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  update: (id: number, params: any) => void;
  editing: boolean;
  toEditing: (id: number) => void;
}

interface ITodoItemState {
  editText: string
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }

  update = (params: any) => {
    this.props.update(this.props.id, params);
  };
  toEditing = () => {
    this.props.toEditing(this.props.id);
  };
  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update({description: this.state.editText});
    }
  };

  public render() {
    const Editing = (
      <div className="editing">
        <input type="text" value={this.state.editText}
               onChange={e => this.setState({editText: e.target.value})}
               onKeyUp={this.onKeyUp}/>
        <div className="iconWrapper">
          <EnterOutlined/>
          <DeleteOutlined onClick={() => this.update({deleted: true})}/>
        </div>
      </div>
    );
    const Text = <span onDoubleClick={this.toEditing}>{this.props.description}</span>;
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.update({completed: e.target.checked})}
        />
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

export default TodoItem;