
import './App.css';
import logo from './logo.svg';
import React from 'react';
import Lifecycles from './lifecycles.component';

class App extends React.Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       meaningOfLife: 47 + this.props.increment //48
  //     }
  //   }

  //   handleClick = () => {
  //     // this.setState({ meaningOfLife: this.state.meaningOfLife + 1 },
  //     //   () => console.log(this.state.meaningOfLife))
  //     this.setState((prevState, prevProps) => {
  //       return { meaningOfLife: prevState.meaningOfLife + prevProps.increment }
  //     },
  //       () => console.log(this.state.meaningOfLife))
  //   }

  //   render() {
  //     return (
  //       <div className="App" >
  //         <header className="App-header">

  //           <p>
  //             {this.state.meaningOfLife}
  //           </p>

  //           <button
  //             onClick={this.handleClick}
  //           >
  //             Update State
  //           </button>

  //         </header>
  //       </div>
  //     );

  constructor() {
    super()
    this.state = {
      showChild: true,
      text: ''
    }
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className='App-logo' alt='logo' />

          <button
            onClick={() => {
              this.setState(state => ({
                showChild: !state.showChild
              }))
            }}
          >
            Toggle Lifecycles
          </button>

          <button
            onClick={() => {
              this.setState(state => ({
                text: state.text + '_hello'
              }))
            }}
          >
            Update Text
          </button>

          {this.state.showChild ? <Lifecycles text={this.state.text} /> : null}

        </header>
      </div>
    );
  }

}

export default App;
