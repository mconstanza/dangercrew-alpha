import React from 'react';
import { connect } from 'react-redux'

/* Dev Tools */
import ReduxStateDisplayer from './dev-tools/redux-state-displayer'
import seedBattle from './dev-tools/seed-battle'

/* World, Player and NPCs */
import Person from './people/person';
import Map from './map/map';
import PauseController from './pause/pause-controller'

/* Loading a map */
import {loadMap, getJSON} from './map/load-map'
import { getQueryVariable } from './helpers/get-url-parameter'

import TestMap from './_data/maps/dev-colorstreet-map'
import AlphaCoffeeMap from './_data/maps/alpha-coffeeshop-map'


/* Playing music */
import MusicPlayer from './music/music-player'

class GameIndex extends React.Component {

    constructor(props) {
        super(props);

        /* Init game music */
        //MusicPlayer.playTrack("coffeeShop")

        //Load a map
        //Option to load from URL bar for testing. Probably take this out of the full game?
        const mapToLoad = window.location.hash.match(/#useMap=/) ? getJSON(window.location.hash.split('#useMap=')[1]) : TestMap; //AlphaCoffeeMap to load coffee shop on start
        loadMap(mapToLoad);

        /* DEV TOOL - Launch in battle mode */
        //seedBattle(); //Toggle this line on/off. Should be off for production build


    }

    render() {
        return (
                <div className="ui-wrapper">
                    <Map />
                    <ReduxStateDisplayer />
                </div>
        );
    }
}




export default GameIndex;