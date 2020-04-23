import * as React from 'react';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import {format} from 'date-fns';
import './Statistics.scss';

interface IStatisticsProps {
  todos: any[];
}

const _ = require('lodash');

class Statistics extends React.Component<IStatisticsProps> {
  constructor(props: IStatisticsProps) {
    super(props);
  }

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }

  get dailyTodos(){
    const obj = _.groupBy(this.finishedTodos,(todo:any)=>{
      return format(todo.updated_at,'YYYY-MM-D')
    })
    return obj
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

export default connect(mapStateToProps)(Statistics);