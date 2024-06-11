import React from 'react';

import Todo from './Components/Todo';
import Header from './Components/Header/index'
import Footer from './Components/Footer/index'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
      <Todo />
      <Footer />
      </div>
    );
  }
}
