import * as React from 'react';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import {format} from 'date-fns';
import './Statistics.scss';
import TodoHistory from './TodoHistory/TodoHistory';
import {Collapse, Calendar} from 'antd';


interface IStatisticsProps {
  todos: any[];
}

const _ = require('lodash');
const {Panel} = Collapse;


class Statistics extends React.Component<IStatisticsProps> {
  constructor(props: IStatisticsProps) {
    super(props);
  }

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(todo.updated_at, 'YYYY-MM-D');
    });
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="任务历史统计" key="1">
            <div>
              <ul>
                <li>
                  <div className="site-calendar-demo-card">
                    <Calendar fullscreen={false}/>
                  </div>
                </li>
                <li>
                  <div className="data">
                    任务历史:
                    累计完成{this.finishedTodos.length}个任务
                    <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
                  </div>
                </li>
              </ul>
            </div>
          </Panel>
        </Collapse>,
        <TodoHistory/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

export default connect(mapStateToProps)(Statistics);