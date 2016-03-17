import React from 'react'
import { connect } from 'react-redux'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../helpers/single-keypress-binding'

@connect((state, props) => {
    return {
    }
})

class TitleScreen extends React.Component {

    componentDidMount() {
        var self = this;
        var handleEnter = function() {
            /* Insert Sound Effect here */


            setTimeout(function() {
                /* TODO: refactor game reducer to use utilities. That will clean this up */
                self.props.dispatch({
                    type: 'SET_GAME_AREA',
                    payload: {
                        gameArea: 'map'
                    }
                });
                setTimeout(function() {
                    self.props.dispatch({
                        type: 'SET_TRANSITION_OVERLAY_OPACITY',
                        payload: {
                            transitionOverlayOpacity: 0
                        }
                    });
                }, 1000)

            }, 600);
        };
        addKeyboardSinglePress(13, handleEnter, 'title-screen')
    }

    componentWillUnmount() {
        removeKeyboardSinglePress('title-screen')
    }


    render() {
        const containerStyle = {
            width: '100%',
            color: '#fff',
            position: 'relative'
        };

        const imageStyle = {
            width: '60vw',
            animation: 'fade-in 1s',
            display: 'block',
            margin: '7vw auto 0 auto'
        };

        const enterText = {
            fontFamily: '"Source Code Pro", monospace',
            textAlign: 'center',
            fontSize: '3vw',
            position: 'relative',
            top: '-1vw',
            animation: 'blink 1s steps(2, start) infinite'
        };

        const jacobStyle = {
            position:'absolute',
            right: '2vw',
            bottom: '-10px',
            width: '180px',
            height: '180px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '400%',
            backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg)',
            backgroundPosition: '33.3% 33.3%'
        };

        return (
           <div style={containerStyle}>
               <div>
                    <img style={imageStyle} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/logo.svg" />
                    <div style={enterText}>Press ENTER</div>
               </div>
               <div style={jacobStyle}></div>
           </div>
        );
    }
}

TitleScreen.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

TitleScreen.defaultProps = {
}



export default TitleScreen;