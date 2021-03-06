import store from '../init/store';
import {addVisitedMap} from '../redux-action-creators/story-points-actions'
import {doesHaveStoryPoint, doesNotHaveStoryPoint} from '../story-points/story-points'

export function getJSON(urlvar) {
    var data = JSON.parse(decodeURIComponent(urlvar));

    //HACK! add a Player if the map from URL doesnt have one. TODO: The mapmaker should enforce a Player being present.
    data.people = data.people || {
            "player": {
                x: 0,
                y: 0,
                dir: "down"
            }
        };
    return data;
}


export function loadMap(map = {}, coords) {

    store.dispatch({
        type: "REMOVE_NPCS"
    })

    for (var id in map.people) {

        const person_id = id;
        var person = map.people[person_id];

        var npcBehaviorData = {...person.behaviorData}
        if (person.useBehavior == "roaming") {
            npcBehaviorData.pathIndex = 0;
        }

        /* Use "useCoords" X & Y for player */
        if (person_id == "player") {
            if (coords) {
                person.x = coords[0];
                person.y = coords[1];
            }
        }

        /* Different NPC appearing because of a Story Point */
        if (person.includeOnStoryPoint) {
            const shouldAppear = doesHaveStoryPoint(person.includeOnStoryPoint);
            if (!shouldAppear) {
                continue; /* skip this cycle of forLoop */
            }
        }
        if (person.omitOnStoryPoint) {
            const shouldBeOmitted = doesHaveStoryPoint(person.omitOnStoryPoint);
            if (shouldBeOmitted) {
                continue; /* skip this cycle of forLoop */
            }
        }

        store.dispatch({
            type: "ADD_PERSON",
            personId: person_id,
            personData: {
                x: person.x,
                y: person.y,
                dir: person.dir,
                skin: person.skin || null,
                interaction: person.interaction || null,
                transitionProgress: 0, //default
                moving: false, //default,
                useBehavior: person.useBehavior,
                behaviorData: npcBehaviorData
            }
        });
    }

    /* Interactive Events */
    var interactiveEvents = {};
    Object.keys(map.interactiveEvents).forEach(iE => {
        const model = map.interactiveEvents[iE];
        if (model.omitOnStoryPoint) {
            if (doesNotHaveStoryPoint(model.omitOnStoryPoint)) {
                interactiveEvents[iE] = {...model}
            } else {
                //I have the story point, so don't include me
            }
        } else {
           interactiveEvents[iE] = {...model}
        }
    });

    /* CONTRACT */
    store.dispatch({
        type: "LOAD_MAP",
        map: {
            musicTrackId: map.musicTrackId,
            width:map.width,
            height:map.height,
            backgroundImage:map.backgroundImage,
            walls: map.walls,
            footEvents: map.footEvents,
            interactiveEvents: interactiveEvents
        }
    });

    /* Add this map to Story Points! */
    if (!map.mapId) {
        console.warn('WARNING! No mapId set for map:', map)
    } else {
        addVisitedMap(map.mapId)
    }
}