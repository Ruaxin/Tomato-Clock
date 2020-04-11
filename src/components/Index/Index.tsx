import * as React from 'react';
import {Button} from 'antd';
import '../../App.css';

interface IRouter {
  history: any
}

class Index extends React.Component<IRouter> {
  constructor(props: any)
  {
    super(props);
  }

  login = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="Component">
        <Button onClick={this.login}>登入</Button>
      </div>
    );
  }
}

export default Index;