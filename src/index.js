import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component{
  
    // define state
    state = { lat: null, errorMessage: '' };

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            // call setState and set callback
            (position) => { this.setState({lat: position.coords.latitude}) }, // success callback
            (err) => { // failure callback
                this.setState({errorMessage: err.message});
            } 
        );
    }

    renderContent()
    {
        if(this.state.errorMessage && !this.state.lat) {
            return (
                <div>
                    Error: {this.state.errorMessage }
                </div>);
        } else if(!this.state.errorMessage && this.state.lat) {
            return (
                <div>
                   <SeasonDisplay lat={this.state.lat}>

                   </SeasonDisplay>
                </div>
                );
        } else {
            return ( 
                <Spinner message="Please accept location request"/>
            );
        }
    }

    // required by React
    render()
    {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
};

ReactDOM.render(<App/>, document.querySelector('#root'));