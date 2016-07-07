/**
 * Resistance: A Deduction Game (renamed to Spies because shorter)
 */
;
function Spies( ) {
    "use strict";

    this.players = [];
    this.team = [];
    this.votes = [];
    this.last_votes = [];
    this.current_leader = null;
    this.current_mission = -1;
    this.current_player = null;
    this.mission_running = false;
    this.last_mission_result = false;
    this.failed_votes = 0;
    this.missions = [];
    this.failed_missions = 0;
    this.succeeded_missions = 0;
    this.winners = false;

    this.teams = {
        5: [3, 2],
        6: [4, 2],
        7: [4, 3],
        8: [5, 3],
        9: [6, 3],
        10: [6, 4]
    };

    this.team_size = {
        0: [0, 0, 0, 0, 0], // to prevent errors in the markers
        5: [2, 3, 2, 3, 3],
        6: [2, 3, 3, 3, 4],
        7: [2, 3, 3, 4, 4],
        8: [3, 4, 4, 5, 5],
        9: [3, 4, 4, 5, 5],
        10: [3, 4, 4, 5, 5]
    };

    this.required_fails = {
        5: [1, 1, 1, 1, 1],
        6: [1, 1, 1, 1, 1],
        7: [1, 1, 1, 2, 1],
        8: [1, 1, 1, 2, 1],
        9: [1, 1, 1, 2, 1],
        10: [1, 1, 1, 2, 1]
    };
}


/**
 * Set data from outside
 *
 * @param data
 */
Spies.prototype.setData = function(data) {
    for (var elem in data) {
        if (data.hasOwnProperty(elem) && this.hasOwnProperty(elem)) {
            this[elem] = data[elem];
        }
    }
};


/**
 * Reset the game but keep the current players
 */
Spies.prototype.newGame = function () {
    "use strict";

    this.team = [];
    this.votes = [];
    this.last_votes = [];
    this.current_leader = null;
    this.current_mission = -1;
    this.current_player = null;
    this.mission_running = false;
    this.last_mission_result = false;
    this.failed_votes = 0;
    this.missions = [];
    this.failed_missions = 0;
    this.succeeded_missions = 0;
    this.winners = false;

    for (var i = 0; i < this.players.length; i += 1) {
        this.players[i].spy = false;
    }
};


/**
 * Add a player to the player list
 *
 * @param name string
 * @returns boolean name added successfully
 */
Spies.prototype.addPlayer = function(name) {
    "use strict";

    // test for player with the same name
    name = name.trim( );

    for (var i = 0; i < this.players.length; i += 1) {
        if (name === this.players[i].name) {
            return false;
        }
    }

    var player = {
        'id': this.players.length,
        'name': name,
        'spy': false
    };

    this.players.push(player);

    return true;
};


/**
 * Remove a player from the player list
 *
 * @param id
 */
Spies.prototype.removePlayer = function(id) {
    "use strict";

    this.players.splice(id, 1);
};



/**
 * Done adding players. Start the missions
 */
Spies.prototype.doneAddingPlayers = function( ) {
    "use strict";

    this.generateSpies( );
    this.nextMission( );
    this.nextPlayer( );
};


/**
 * Randomly select the spies for the game
 */
Spies.prototype.generateSpies = function( ) {
    "use strict";

    // pull out the required number of random players to be spies
    var current;
    var names = shuffle(this.players);

    for (var i = 0; i < this.teams[this.players.length][1]; i += 1) {
        current = names[i].id;
        this.players[current].spy = true;
    }
};


/**
 * Is the given player a spy
 *
 * @param id
 * @returns boolean player is a spy
 */
Spies.prototype.isSpy = function(id) {
    "use strict";

    return this.players[id].spy;
};


/**
 * Selects the next mission leader
 */
Spies.prototype.nextLeader = function( ) {
    "use strict";

    // randomize first leader
    if (null === this.current_leader) {
        // because this gets incremented below, decrease all valid values by 1
        this.current_leader = rand(-1, this.players.length - 2);
    }

    this.current_leader += 1;

    if (this.current_leader >= this.players.length) {
        this.current_leader = 0;
    }
};


/**
 * Starts the next mission
 * Tests for game completion
 */
Spies.prototype.nextMission = function( ) {
    "use strict";

    this.last_votes = this.votes;

    this.nextLeader( );

    if (3 <= this.succeeded_missions) {
        this.setWinners('Resistance');
        return;
    }
    else if (3 <= this.failed_missions) {
        this.setWinners('Spies');
        return;
    }

    this.current_mission += 1;
    this.mission_running = false;

    this.team = [];
    this.votes = [];
};


/**
 * Sets the selected team for the next mission
 *
 * @param team
 * @returns boolean team was successfully set
 */
Spies.prototype.setTeam = function(team) {
    if (this.team_size[this.players.length][this.current_mission] !== team.length) {
        return false;
    }

    this.team = team;
    return true;
};


/**
 * submit a team vote
 * If `id` is boolean, the entire vote is passed or failed as given
 *
 * @param id
 * @param vote
 * @returns {boolean}
 */
Spies.prototype.teamVote = function(id, vote) {
    "use strict";

    if (false === id) {
        this.failTeamVote( );
    }
    else if (true === id) {
        this.startMission( );
    }
    else {
        if ('undefined' !== typeof this.team_votes[id]) {
            return false;
        }

        this.team_votes[id] = !! vote;

        if (this.team_votes.length === this.players.length) {
            this.tallyTeamVotes( );
        }
    }

    return true;
};


/**
 * Marks this team vote as failed
 * If 5 team votes fail, the Spies win
 */
Spies.prototype.failTeamVote = function( ) {
    "use strict";

    this.failed_votes += 1;

    if (5 <= this.failed_votes) {
        this.setWinners('Spies');
        return;
    }

    this.nextLeader( );
};


/**
 * Count up the team votes
 */
Spies.prototype.tallyTeamVotes = function( ) {
    "use strict";

    var votes_for = 0;
    var votes_against = 0;

    for (var id in this.team_votes) {
        if (this.team_votes.hasOwnProperty(id)) {
            if (this.team_votes[id]) {
                votes_for += 1;
            }
            else {
                votes_against += 1;
            }
        }
    }

    if (votes_for > votes_against) {
        this.startMission( );
    }
    else {
        this.failTeamVote( );
    }
};


/**
 * Start the current mission
 */
Spies.prototype.startMission = function( ) {
    "use strict";

    this.mission_running = true;
    this.last_mission_result = false;
    this.current_player = null;
    this.nextPlayer( );
};


/**
 * Go to the next player in the mission
 *
 * @returns {boolean|int} next player or false if no more left in team
 */
Spies.prototype.nextPlayer = function( ) {
    "use strict";

    var team = this.team;

    if ( ! team.length) {
        // this is fancy JavaScript for range(0, n) -> [0, 1, 2, 3, ..., n]
        team = Array.apply(null, Array(this.players.length)).map(function (_, i) { return i; });
    }

    if (null === this.current_player) {
        this.current_player = team[0];
        return this.current_player;
    }

    var idx = team.indexOf(this.current_player);
    idx += 1;

    if (idx >= team.length) {
        this.current_player = null;
        return false;
    }

    this.current_player = team[idx];
    return this.current_player;
};


/**
 * Submit a mission vote
 *
 * @param vote
 * @returns {boolean}
 */
Spies.prototype.missionVote = function(vote) {
    "use strict";

    // if player[id] is not a spy, make sure vote is 'success'
    if ( ! this.isSpy(this.current_player)) {
        vote = true;
    }

    this.votes.push({'id': this.current_player, 'vote': vote});

    this.nextPlayer( );
};


/**
 * Finish the mission and set the results
 *
 * @returns {*} mission result (1 | -1) or false on failure
 */
Spies.prototype.finishMission = function( ) {
    "use strict";

    if (this.votes.length !== this.team.length) {
        this.last_mission_result = false;
        return false;
    }

    var fail_votes = 0;
    var team = [];
    for (var i = 0; i < this.votes.length; i += 1) {
        if ( ! this.votes[i].vote) {
            fail_votes += 1;
        }

        team.push(this.votes[i].id);
    }

    // make sure everybody on the team voted
    if (this.team.diff(team).length) {
        this.last_mission_result = false;
        return false;
    }

    if (fail_votes >= this.required_fails[this.players.length][this.current_mission]) {
        this.last_mission_result = -1;
        this.failed_missions += 1;
    }
    else {
        this.last_mission_result = 1;
        this.succeeded_missions += 1;
    }

    this.nextMission( );

    return this.last_mission_result;
};


/**
 * Update the mission markers
 */
Spies.prototype.updateMissionMarkers = function( ) {
    "use strict";

    if (1 === this.last_mission_result) {
        this.missions.push(true);
    }
    else if (-1 === this.last_mission_result) {
        this.missions.push(false);
    }
};


/**
 * Set the game winners (Resistance | Spies)
 *
 * @param team string
 */
Spies.prototype.setWinners = function(team) {
    "use strict";

    this.winners = team;
};


/**
 * Get the names of the current mission team
 *
 * @returns {Array}
 */
Spies.prototype.getTeam = function( ) {
    "use strict";

    var team = [];
    for (var i = 0; i < this.team.length; i += 1) {
        team.push(this.players[this.team[i]].name);
    }

    return team;
};


/// FUNCTIONS

/**
 * shuffle an array clone
 *
 * @param array array
 * @return array shuffled array clone
 */
function shuffle(array) {
    "use strict";

    // make sure this is a clone, not the original array
    array = array.slice(0);

    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
 * randomly pick a value between two values, inclusive
 *
 * @param min int
 * @param max int
 * @return int
 */
function rand(min, max) {
    "use strict";

    return parseInt(Math.floor(Math.random( ) * (max - min + 1)) + min, 10);
}


if ( ! Array.prototype.diff) {
    /**
     * Diff an array with another array and return the
     * elements in the first array that are not in the
     * second array
     *
     * @param arr
     * @returns Array
     */
    Array.prototype.diff = function(arr) {
        return this.filter( function(elem) { return (arr.indexOf(elem) < 0); } );
    }
}
