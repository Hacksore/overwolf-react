import React, { Component } from 'react';
import './App.css';

import Topbar from './components/Topbar'

let overwolf;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	overwolf = require("./overworlf.mock");
} else {
	overwolf = window.overwolf;
}

class App extends Component {

	constructor(){
		super();

		this.state = {
			mainWindowID: null,
			windowVisible: true,
			backgroundWindowID: null,

			windowPos: {
				x: 0,
				y: 0
			}
		}

		this.onDragMove = this.onDragMove.bind(this);
	}

	componentWillMount(){
		overwolf.windows.getCurrentWindow(result => {
			this.setState({
				currentWindowName: result.window.name
			});
		});
	}

	toggleWindow(){

		const { mainWindowID, backgroundWindowID } = this.state;
		if(this.state.isWindowVisible){
			overwolf.windows.hide(mainWindowID, () => {})
			overwolf.windows.restore(backgroundWindowID, () => {})
			
			this.setState({ isWindowVisible: false });
		} else {
			overwolf.windows.restore(mainWindowID, () => {})
			overwolf.windows.hide(backgroundWindowID, () => {})
			
			this.setState({ isWindowVisible: true });
		}
	}

	onHotKey(){
		this.toggleWindow();
	}

	componentDidMount(){
		overwolf.windows.obtainDeclaredWindow("MainWindow", result => {	
			this.setState({
				mainWindowID: result.window.id
			});			
		});

		overwolf.windows.obtainDeclaredWindow("BackgroundWindow", result => {	
			this.setState({
				backgroundWindowID: result.window.id
			});			
		});

		overwolf.settings.registerHotKey(
			"open_ui",
			this.onHotKey.bind(this)
		);

		overwolf.settings.registerHotKey(
			"reload_extension",
			() => {
				overwolf.extensions.relaunch();
			}
		);

	}

	onDragMove(){
		overwolf.windows.getCurrentWindow(result => {
			this.setState({
				windowPos: {
					x: result.window.left,
					y: result.window.top
				}
			})

			// update bg window
			overwolf.windows.changePosition(this.state.backgroundWindowID, result.window.left, result.window.top, (result) => {
			});
		});
	}

	render() {
		const isMainWindow = (this.state.currentWindowName === "MainWindow")
		return (
			<div className="app">
				<Topbar 
					onDragMove={this.onDragMove}
					isMainWindow={isMainWindow}
				/>

				<div className="content">
					<h2>
					Overwolf React Boilerplate
					</h2>

					<img src="http://placekitten.com/100/100" alt="CAT"/>

					{isMainWindow && (
						<h4>Hello World!</h4>
					)}

				</div>
			</div>
		);
	}
}

export default App;
