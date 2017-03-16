var React = require('react');
var PropTypes = React.PropTypes;
import { Dimmer, Loader, Image, Segment, Message, Icon } from 'semantic-ui-react'

var styles = {
	container:{
		position: 'fixed',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		fontsize: '55px'
	},
	content: {
		textAlign: 'center',
		position: 'absolute',
		width: '100px',
		marginTop: '30px',
	}
};

var loadingimage = React.createClass({
	propTypes: {
		text: PropTypes.string,
		speed:PropTypes.number
	},
	getDefaultProps: function () {
		return {
			text: 'Loading',
			speed: 300
		}
	},
	getInitialState: function () {
		this.originalText = this.props.text;
		return {
			text: this.originalText
		}
	},
	componentDidMount: function() {
		var stopper = this.originalText + '...';
		this.interval = setInterval(function () {
			if (this.state.text === stopper) {
				this.setState({
					text: this.originalText
				})
			} else {
				this.setState({
					text: this.state.text + '.'
				})
			}
		}.bind(this), this.props.speed)
	},
	componentWillUnmount: function () {
		clearInterval(this.interval);
	},	
	// render: function() {
	// 	return (
	// 		<div>
	// 			<Segment>
	// 		      <Dimmer active inverted>
	// 		        <Loader inverted>{this.state.text}</Loader>
	// 		      </Dimmer>
	// 		      <br/>
	// 		      <br/>
	// 		      <br/>
	// 		      <br/>
	// 		      <br/>
	// 		      <br/>
	// 		      <br/>
	// 		    </Segment>
	// 		</div>	
	// 	);
	// }
	render: function() {
		return (
			<p>{this.state.text}</p>
		);
	}

});

module.exports = loadingimage;

