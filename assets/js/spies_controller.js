
;
(function($, Spies) {
    "use strict";

    var Spy = new Spies( );

    // events

    $('#main')
        // player name entry form
        .on('submit', '#players_entry_form', function(evt) {
            evt.preventDefault( );

            if ( ! Spy.addPlayer($('#name').val( ))) {
                alert('A player with that name already exists');
                display_players( );
                return;
            }

            $('#name').val('');

            display_players( );
        })
        // remove player icon
        .on('click', 'span.remove', function(evt) {
            var id = this.id.substr(7);

            Spy.removePlayer(id);

            display_players( );
        })
        // start game button
        .on('click', '#start_game:not(.disabled)', function(evt) {
            Spy.doneAddingPlayers( );
            render('view_alliance_pass', {
                'name': Spy.players[Spy.current_player].name
            });
        })
        // show alliance button
        .on('click', '#show_alliance', function(evt) {
            var name = Spy.players[Spy.current_player].name;
            if (confirm('Are you sure you are ' + name + '?')) {
                render('show_alliance', {
                    'spy': Spy.players[Spy.current_player].spy
                });
            }
        })
        // alliance done button
        .on('click', '#alliance_done', function(evt) {
            var player = Spy.nextPlayer( );

            if (false === player) {
                render('script');
            }
            else {
                render('view_alliance_pass', {
                    'name': Spy.players[Spy.current_player].name
                });
            }
        })
        // script done button
        .on('click', '#script_done', function(evt) {
            render('view_leader_pass', {
                'name': Spy.players[Spy.current_leader].name
            });
        })
        // create team button
        .on('click', '#create_team', function(evt) {
            render('create_team', {
                'fail_count': Spy.required_fails[Spy.players.length][Spy.current_mission],
                'players': Spy.players,
                'count': Spy.team_size[Spy.players.length][Spy.current_mission]
            });
        })
        // team player
        .on('click', '.team_player', function(evt) {
            var count = Spy.team_size[Spy.players.length][Spy.current_mission] - $('input[type="checkbox"]:checked').length;

            $('input.button').val('Pick ' + count + ' more players');

            if ($(this).prop('checked')) {
                if (0 === count) {
                    $('input.button')
                        .removeClass('disabled')
                        .prop('disabled', false)
                        .val('Create Team');
                    $('input[type="checkbox"]')
                        .not(':checked')
                        .addClass('disabled')
                        .prop('disabled', true);
                }
            }
            else {
                if (0 < count) {
                    $('input.button')
                        .addClass('disabled')
                        .prop('disabled', true);
                    $('input[type="checkbox"]')
                        .removeClass('disabled')
                        .prop('disabled', false);
                }
            }
        })
        // done creating team
        .on('submit', '#create_team_form', function(evt) {
            evt.preventDefault( );

            var team = [];

            $('input[type="checkbox"]:checked').each( function(i, elem) {
               team.push(elem.name.substr(7));
            });

            Spy.setTeam(team);

            render('team_vote', {
                'team': Spy.getTeam( )
            });
        })
        // mission vote passed
        .on('click', '#mission_vote_accept', function(evt) {
            Spy.teamVote(true);
            render('do_mission_pass', {
                'name': Spy.players[Spy.current_player].name
            });
        })
        // mission vote failed
        .on('click', '#mission_vote_reject', function(evt) {
            Spy.teamVote(false);
            render('view_leader_pass', {
                'name': Spy.players[Spy.current_leader].name
            });
        })
        // mission button
        .on('click', '#do_mission', function(evt) {
            var name = Spy.players[Spy.current_player].name;
            if (confirm('Are you sure you are ' + name + '?')) {
                render('mission_vote', {
                    'pre': Array(rand(0, 3)).fill(1),
                    'alt': (rand(0, 1) ? true : false),
                    'post': Array(rand(0, 3)).fill(1),
                    'fail_count': Spy.required_fails[Spy.players.length][Spy.current_mission]
                });
            }
        })
        // mission success
        .on('click', '#mission_success', function(evt) {
            Spy.missionVote(true);
            var result = Spy.finishMission( );

            if (false !== result) {
                render('mission_done', { }, true);
            }
            else {
                render('do_mission_pass', {
                    'name': Spy.players[Spy.current_player].name
                });
            }
        })
        // mission fail
        .on('click', '#mission_fail', function(evt) {
            Spy.missionVote(false);
            var result = Spy.finishMission( );

            if (false !== result) {
                render('mission_done', { }, true);
            }
            else {
                render('do_mission_pass', {
                    'name': Spy.players[Spy.current_player].name
                });
            }
        })
        // mission done button
        .on('click', '#mission_done', function(evt) {
            var result;
            var successes = 0;
            var fails = 0;

            if (1 === Spy.last_mission_result) {
                result = true;
            }
            else if (-1 === Spy.last_mission_result) {
                result = false;
            }
            else {
                render('error', {
                    'msg': 'The mission has not completed yet'
                });
            }

            for (var i = 0; i < Spy.last_votes.length; i += 1) {
                if (Spy.last_votes[i].vote) {
                    successes += 1;
                }
                else {
                    fails += 1;
                }
            }

            Spy.updateMissionMarkers( );

            render('show_results', {
                'result': result,
                'successes': successes,
                'fails': fails
            }, true);
        })
        // results done button
        .on('click', '#results_done', function(evt) {
            render('view_leader_pass', {
                'name': Spy.players[Spy.current_leader].name
            });
        })
        // view alliances button
        .on('click', '#view_all_alliances', function (evt) {
            render('show_all_alliances', {
                'players': Spy.players
            }, true);
        })
        ;
    

    // functions

    function check_game_over( ) {
        if (Spy.winners) {
            var resistance = ('Resistance' === Spy.winners);
            render('game_over', {'resistance': resistance}, true);
            throw 'Game Over'; // exit all remaining script
        }
    }

    function display_players( ) {
        var player_count = 5;
        var $start_button = $('#start_game');

        $('#players').empty( );
        $.each(Spy.players, function (i, elem) {
            $('#players').append('<li><span class="icon fa-times spy remove" id="remove_' + i + '"></span> &nbsp; ' + elem.name + '</li>');
        });

        player_count = player_count - Spy.players.length;

        if (0 > player_count) {
            player_count = 0;
        }

        $start_button
            .text('Start Game')
            .removeClass('disabled')
            .prop('disabled', false);

        if (player_count) {
            $start_button
                .text(player_count + ' more players')
                .addClass('disabled')
                .prop('disabled', true);
        }

        $('#players_entry_form').show( );
        if (10 <= Spy.players.length) {
            $('#players_entry_form').hide( );
        }

        store_data( );
    }


    function update_markers( ) {
        var $missions = $('#mission_markers').find('span');
        var $votes = $('#failed_votes_markers').find('span');

        // reset all the markers
        $missions.attr('class', 'circle');
        $votes.attr('class', 'icon fa-circle-thin');

        $missions.each( function(i, elem) {
            var $elem = $(elem).text(Spy.team_size[Spy.players.length][i]);

            if ('undefined' !== typeof Spy.missions[i]) {
                if (Spy.missions[i]) {
                    $elem.attr('class', 'circle resistance');
                }
                else {
                    $elem.attr('class', 'circle spy');
                }
            }
            else if (Spy.current_mission === i) {
                $elem.addClass('active');
            }
        });

        $votes.each( function(i, elem) {
           if (i < Spy.failed_votes) {
               $(elem).attr('class', 'icon fa-times-circle spy');
           }
        });
    }


    function render(template, data, skip_check_game_over) {
        skip_check_game_over = !! skip_check_game_over;

        if ( ! skip_check_game_over) {
            check_game_over( );
        }

        $('#main').empty( ).append(Templates[template].render(data));

        store_data( );
        update_markers( );
    }


    function store_data( ) {
        console.log('Storing data: ');
        console.log(Spy);
        console.log(JSON.stringify(Spy));
        sessionStorage.setItem('Spies', JSON.stringify(Spy));
    }


    function get_data( ) {
        var data = sessionStorage.getItem('Spies');

        if (data) {
            data = JSON.parse(data);
        }

        return data;
    }


    function clear_data( ) {
        sessionStorage.setItem('Spies', '');
    }


    // instantiation

    var data = get_data();
    if (!data || ('undefined' === typeof data.players)) {
        render('intro');
    }
    else {
        Spy = new Spies( );
        Spy.setData(data);
    }

    switch (window.location.hash) {
        case '#reset' :
            Spy = new Spies( );
            clear_data( );
            window.location = window.location.href.split('#')[0];
            break;

        case '#new' :
            Spy.newGame( );
            store_data( );
            window.location = window.location.href.split('#')[0];
            break;

        case '#undo' :
            // not sure yet...
            window.location = window.location.href.split('#')[0];
            break;

        default :
            // do nothing
            break;
    }

    // refresh on menu item clicks
    $('a[href^="#"]').not('a[href="#nav"]').on('click', function(evt) {
        store_data( );
        window.location.reload( );
    });


    // refreshiation
    // at the bottom because it may forcefully quit on render

    if (null === Spy.current_leader) {
        render('intro');
        display_players( );
    }
    else if ( ! Spy.mission_running && (null !== Spy.current_player)) {
        render('view_alliance_pass', {'name': Spy.players[Spy.current_player].name});
    }
    else if (-1 !== Spy.current_mission) {
        render('view_leader_pass', {'name': Spy.players[Spy.current_leader].name});
    }
    else if (false === Spy.finishMission( )) {
        render('do_mission_pass', {'name': Spy.players[Spy.current_player].name});
    }
    else if ( ! Spy.mission_running) {
        render('team_vote', {'team': Spy.getTeam( )});
    }
    else if (Spy.mission_running) {
        if (null === Spy.current_player) {
            Spy.nextPlayer( );
        }
        render('do_mission_pass', {'name': Spy.players[Spy.current_player].name});
    }

})(jQuery, Spies);
