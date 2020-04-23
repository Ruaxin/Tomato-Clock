import * as React from 'react';
import {Menu, Dropdown} from 'antd';
import {DownOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import './Home.scss';
import axios from '../../config/axios';
import history from '../../config/history';
import Todos from '../Todos/Todos';
import Tomatoes from '../Tomatoes/Tomatoes';
import Statistics from '../Statistics/Statistics';
import {connect} from 'react-redux';
import {initTodos} from '../../redux/actions/todos';
import {initTomatoes} from '../../redux/actions/tomatoes';

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

class Home extends React.Component<any, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentWillMount() {
    await this.getMe();
    await this.getTodos();
    await this.getTomatoes();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
      this.props.initTodos(todos);
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
            <span>{this.state.user && this.state.user.account}<DownOutlined style={{marginLeft: 8}}/></span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes/>
          <Todos/>
        </main>
        <Statistics/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  initTodos,
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);