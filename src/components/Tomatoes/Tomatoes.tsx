import * as React from 'react';
import "./Tomatoes.scss"
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {initTodos,updateTodo} from '../../redux/actions';

class Tomatoes extends React.Component<any, any> {
  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction/>
      </div>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes:state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
  initTodos,
  updateTodo
};

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);