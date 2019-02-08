import React from 'react';
import './Topbar.css';

const overwolf = window.overwolf;

export default class Topbar extends React.Component {

	constructor() {
		super();

		this.onDrag = this.onDrag.bind(this);
	}

	onDrag() {
		overwolf.windows.getCurrentWindow(result => {
			if (result.status === "success" && result.window.state !== "Maximized") {
				overwolf.windows.dragMove(result.window.id, (result) => {
					this.props.onDragMove(result.horizontalChange, result.verticalChange);
				});
			}
		});
	}

	render() {
		return (
			<div className="bar" style={{backgroundColor: this.props.isMainWindow ? "#000" : "rgba(0,0,0,0.0)"}} onMouseDown={this.onDrag}>
				overwolf-react
			</div>
		);
	}

}