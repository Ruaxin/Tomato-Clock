import * as React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {initTomato, addTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';

interface ITomatoesProps {
  addTomato: (payload: any) => any;
  tomatoes: any[]
}

class Tomatoes extends React.Component<ITomatoesProps, any> {
  constructor(props: ITomatoesProps) {
    super(props);
  }

  componentDidMount() {
    this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ender_at)[0];
  }

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      this.props.addTomato(response.data.resource);
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };
  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato}/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
  initTomato,
  addTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);