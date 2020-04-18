import * as React from 'react';
import { Menu, Dropdown} from 'antd';
import {DownOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import './Home.scss';
import axios from '../../config/axios';
import history from '../../config/history';
import Todos from '../Todos/Todos';

interface IRouter {
  history: any
}

interface IIndexState {
  user: any
}

const logout = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
};

const menu = (
  <Menu>
    <Menu.Item key="1">
      <UserOutlined/>
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <LogoutOutlined/>
      <UserOutlined/>
      注销
    </Menu.Item>
  </Menu>
);

class Home extends React.Component<IRouter, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };

  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <span>{this.state.user && this.state.user.account}<DownOutlined style={{marginLeft:8}}/></span>
          </Dropdown>
        </header>
        <main>
          <Todos/>
        </main>
      </div>
    );
  }
}

export default Home;