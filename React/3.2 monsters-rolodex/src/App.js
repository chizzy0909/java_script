import React, { Component } from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from './components/search-box/search-box.component';

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
      // title: ''
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  onSearchChange = event => {
    this.setState({
      searchField: event.target.value,
      // title: event.target.value
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    // const monsters = this.state.monsters;
    // const searchField = this.state.searchField;

    const filterMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <div className="App">
        <h1> Monsters Rolodex</h1>
        <SearchBox
          placeholder='Search Monster'
          handleChange={e => this.setState({ searchField: e.target.value })}
        />
        <CardList monsters={filterMonsters} /> {/* <CardList monsters={this.state.monsters} /> */}
      </div>
    );

    // more tools => rendering => paint flash
    // const { monsters, searchField,title} = this.state;
    // return (
    //   <div className="App">
    //     <h1>{title}</h1>
    //     <SearchBox onSearchChange={this.onSearchChange} />
    //     <CardList monsters={monsters} />
    //   </div>
    //);
  }
}

export default App;
