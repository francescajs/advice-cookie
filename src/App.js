import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      advice: "",
      keyword: ""
    };

    this.findAdvice = this.findAdvice.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.lessRandomAdvice = this.lessRandomAdvice.bind(this);
  }

  lessRandomAdvice(slips, numslips) {
    let index = Math.floor(Math.random() * numslips)
    this.setState({
      advice: slips[index].advice
    });
  }

  async findAdvice() {
    const input = this.state.keyword

    const search = await fetch('https://api.adviceslip.com/advice/search/' + input);
    const json1 = await search.json();
    const slips = json1.slips;
    const numslips = json1.total_results;
  
    this.lessRandomAdvice(slips, numslips);
  }

  async componentDidMount() {
    const random = await fetch('https://api.adviceslip.com/advice');
    const json2 = await random.json();
    this.setState({
      advice: json2.slip.advice
    });
  }

  handleInput(event) {
    this.setState({
      keyword: event.target.value
    });
    if (event.key === 'Enter') {
      this.findAdvice();
      console.log(event.target.value);
    }
  }

  render() {
    return (
      <div className="view">
        <div className="headline">
          <div className="title"> 
            <h2>Advice Cookie!</h2>
          </div>
        </div>

        <div className="content">
          <div className="search-section">
            <div className="directions">
              <h3>Looking for something else? Search below!</h3>
            </div>
            <input 
              placeholder="Enter keyword" 
              onKeyPress={this.handleInput}
              className="search-box"
            />
          </div>
          <div className="advice-slip">
            <div className="outer-box">
              <div className="inner-box">
                <div className="advice">
                    {this.state.advice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
