import * as React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {initTomatoes, addTomato, updateTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';

interface ITomatoesProps {
  addTomato: (payload: any) => any;
  tomatoes: any[];
  initTomatoes: (payload: any[]) => any;
  updateTomato: (payload: any) => any;
}

class Tomatoes extends React.Component<ITomatoesProps, any> {
  constructor(props: ITomatoesProps) {
    super(props);
  }

  componentDidMount() {
    this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at)[0];
  }

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };
  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction startTomato={this.startTomato}
                      unfinishedTomato={this.unfinishedTomato}
                      updateTomato={this.props.updateTomato}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
  initTomatoes,
  addTomato,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);