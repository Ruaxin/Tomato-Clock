import * as React from 'react';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';
import axios from '../../config/axios';

interface ITodoInputState {
  description: string
}

interface ITodoInputProps {
  addTodo: (params: any) => void
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
  constructor(props: ITodoInputProps) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo();
      this.setState({description: ''});
    }
  };

  addTodo = () => {
    this.props.addTodo({description: this.state.description});
  };

  public render() {
    const {description} = this.state;
    return (
      <div className="TodoInput" id="TodoInput">
        <Input
          placeholder="添加新任务"
          suffix={<EnterOutlined onClick={this.addTodo}/>}
          value={description}
          onChange={(e) => this.setState({description: e.target.value})}
          onKeyUp={this.onKeyUp}
        />
      </div>
    );
  }
}

export default TodoInput;