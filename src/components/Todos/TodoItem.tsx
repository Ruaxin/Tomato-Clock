import * as React from 'react';
import { Checkbox } from 'antd';

interface ITodoItemProps {
  id:number;
  description:string;
  completed:boolean;
  update:(id:number,params:any)=>void;
}
class TodoItem extends React.Component<ITodoItemProps> {
  constructor(props: ITodoItemProps) {
    super(props);
    console.log(this.props)
  }
  public render(){
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={e=>this.props.update(this.props.id,{completed:e.target.checked})}
        >{this.props.description}</Checkbox>
      </div>
    );
  }
}

export default TodoItem;