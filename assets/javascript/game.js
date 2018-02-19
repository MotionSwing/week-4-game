$(document).ready(function() {

// -----------------------
// CrystalsCollector Game
// -----------------------
	const crystalsCollector = {
		randomNum: 0,
		player_score: 0,
		wins: 0,
		losses: 0,
		bg_image: "circles-dark.png",
		hard_crystal_pos: 1,
		click_count: 0,
		initialize_game: function(){
			crystalsCollector.build_game();
			crystalsCollector.start_game();
			crystalsCollector.addListeners();
		},
		start_game: function(){
			crystalsCollector.randomNum = Math.floor(Math.random() * (120 - 19)) + 19;
			crystalsCollector.change_values();
			crystalsCollector.player_score = 0;
			crystalsCollector.hard_crystal_pos = Math.floor(Math.random() * 4) + 1;
			click_count = 0;
			$("#target-number").text(crystalsCollector.randomNum);
			$("#score").text(crystalsCollector.player_score);
		},
		build_game: function(){
			$(document).attr('title', 'Crystals Collector Game');

			// Add background
			$("body").removeClass().addClass('crystals-collector');

			$("#row-1, #row-2, #row-3, #row-4, #row-5").empty().removeClass();
			// Add Row 1 Content
			const title = $("<h1>").addClass('col display-4 p-2 text-center').text("Crystals Collector!");
			$("#row-1").addClass('row mb-3').append(title);

			// Add Row 2 Content
			const instructions = "You will be given a random number at the start of " + 
				"the game. There are four crystals below. By clicking on a crystal" + 
				" you will add a specific amount of points to your total score. " + 
				"You win the game by matching your total score to the random number," + 
				" you lose the game if your total score goes above the random " + 
				"number. The value of each crystal is hidden from you until you " + 
				"click on it. Each time the game starts, the value of each crystal will change."

			const btnHide = $("<span>").addClass('hide-show float-right').text("Hide");
			const cardHeaderDiv = $("<div>").addClass('card-header text-center').text("Instructions").append(btnHide);
			const instHolder = $("<p>").text(instructions);
			const cardBodyDiv = $("<div>").addClass('card-body').append(instHolder);
			const cardDiv = $("<div>").addClass('card').append(cardHeaderDiv, cardBodyDiv);
			const colDiv = $("<div>").addClass('col-12 p-0').append(cardDiv);
			$("#row-2").addClass('row mb-3').append(colDiv);

			// Add Row 3 Content
			// Column for Random Number
			const left_card_body = $("<div>").attr('id', 'target-number').addClass('card-body text-center');
			const left_card_header = $("<div>").addClass('card-header text-center').text("Target Number");
			const left_card = $("<div>").addClass("card h-100 p-0 mr-lg-3").append(left_card_header,left_card_body);
			const left_col_6 = $("<div>").addClass('col-6 mb-3 mb-lg-0 p-0').append(left_card);

			// Column for Your Score
			const mid_card_body = $("<div>").attr('id', 'score').addClass('card-body text-center');
			const mid_card_header = $("<div>").addClass('card-header text-center').text("Your Score");
			const mid_card = $("<div>").addClass("card h-100 p-0 mr-lg-3").append(mid_card_header, mid_card_body);
			const mid_col_6 = $("<div>").addClass('col-6 mb-3 mb-lg-0 p-0 pl-3 pl-lg-0').append(mid_card);
			const left_div = $("<div>").addClass('col-12 col-lg-6 m-0 p-0 row').append(left_col_6, mid_col_6);

			// Colum for Crystals
			const gems_holder = $("<ul>").addClass('gems mb-0');
			for (let i = 1; i <= 4; i++) {
				const crystal = $("<li>").attr('id', 'option-' + i).addClass('crystal ml-3 mr-3');
				crystal.attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
				gems_holder.append(crystal);
			}
			const right_card_body = $("<div>").attr('id', 'gem-card').addClass('card-body text-center').append(gems_holder);
			const right_card_header = $("<div>").addClass('card-header text-center').text("Crystals");
			const right_card = $("<div>").addClass('card h-100 p-0').append(right_card_header, right_card_body);
			const right_div = $("<div>").addClass('col-12 col-lg-6 p-0').append(right_card);
			$("#row-3").addClass('row mb-3 flex-column flex-lg-row').append(left_div, right_div);

			// Add Row 4 Content
			const winSpan = $("<span>").attr('id', 'wins').addClass('mr-3').text("Wins: 0");
			const lossesSpan = $("<span>").attr('id', 'losses').text("Losses: 0");
			const row4CardBodyDiv = $("<div>").attr('id', 'record').addClass('card-body text-center').append(winSpan, lossesSpan);
			const row4CardHeaderDiv = $("<div>").addClass('card-header text-center').text('Win/Loss Record');
			const row4CardDiv = $("<div>").addClass('card col-12 p-0 mr-3').append(row4CardHeaderDiv, row4CardBodyDiv);
			$("#row-4").addClass('row mb-3').append(row4CardDiv);
		},
		check_score: function(){
			if(crystalsCollector.player_score === crystalsCollector.randomNum) {
				crystalsCollector.wins++;
				$("#wins").text("Wins: " + crystalsCollector.wins);

				// alert("You won!!");
				crystalsCollector.display_outcome("You won!!");
				crystalsCollector.change_colors();
				crystalsCollector.start_game();
			}else if (crystalsCollector.player_score > crystalsCollector.randomNum) {
				crystalsCollector.losses++;
				$("#losses").text("Losses: " + crystalsCollector.losses);

				// alert("You Lost!!");
				crystalsCollector.display_outcome("You Lost!!");
				crystalsCollector.change_colors();
				crystalsCollector.start_game();
			}
		},
		change_values: function(pos){
			if (pos != null) {
				$("#option-" + pos).attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
			}else {
				for (let i = 1; i <= 4; i++) {
					$("#option-" + i).attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
				}	
			}	
			
		},
		change_colors: function(){
			for (let i = 1; i <= 4; i++) {
				$("#option-" + i).css('filter', 'hue-rotate('+ Math.floor(Math.random()*360) +'deg)');
			}
		},
		addListeners: function() {
			$(".crystals-collector").off().on('click', '.gems li', function(event) {
				click_count++;
				crystalsCollector.player_score += parseInt($(this).attr('data-value'));
				$("#score").text(crystalsCollector.player_score);
				crystalsCollector.check_score();

				// Hard Mode - Randomly change the value of two crystals when any crystal 
				// is clicked. The position of one of those two crystal changes after each 
				// round, while the position of the other changes after each click.
				if($(".difficulty .hard").hasClass('active')) {
					crystalsCollector.change_values(crystalsCollector.hard_crystal_pos);
					crystalsCollector.change_values(Math.floor(Math.random() * 4) + 1);
				}
			}).on('click', '.hide-show', function(event) {
				event.preventDefault();
				($(".hide-show").text() === "Hide") ? $(".hide-show").text("Show") : $(".hide-show").text("Hide");
				$("#row-2 .card-body").slideToggle();
			});	
		},
		display_outcome: function(message) {
			var outcome_status = $("<p>").text(message).addClass('status');
			var outcome_clicks = $("<p>").text("You had a total of "+ click_count +" clicks").addClass('clicks');
			var outcome_btn = $("<button>").text("Close");

			var outcome_div = $("<div>").addClass('outcome').append(outcome_status, outcome_clicks, outcome_btn);
			$("body").append(outcome_div);

			$(".outcome").on('click', 'button', function(event) {
				$(".outcome").remove();
			});
		}
	};

// --------------
// Star Wars Game
// --------------
	const starWarsRPG = {
		gameover: false,
		canFight: false,
		baseAttackPower: 0,
		playerBaseHP: null,
		defenderBaseHP: null,
		characters: [
			{
				id: "obi",
				name: "Obi-Wan Kenobi",
				image: "assets/images/obiwan.jpg",
				base_hp: 120,
				base_attack: 8,
				counter_attack: 10
			},
			{
				id: "luke",
				name: "Luke Skywalker",
				image: "assets/images/luke.jpg",
				base_hp: 100,
				base_attack: 15,
				counter_attack: 5
			},
			{
				id: "sidious",
				name: "Darth Sidious",
				image: "assets/images/sidious.jpg",
				base_hp: 150,
				base_attack: 10,
				counter_attack: 20
			},
			{
				id: "maul",
				name: "Darth Maul",
				image: "assets/images/maul.jpg",
				base_hp: 180,
				base_attack: 12,
				counter_attack: 25
			}
		],
		initialize_game: function(){
			starWarsRPG.build_game();
			starWarsRPG.addListeners();
		},
		restart_game: function() {
			starWarsRPG.build_game();
		},
		build_game: function(){
			starWarsRPG.canFight = false;
			starWarsRPG.baseAttackPower = 0;
			starWarsRPG.gameover = false;
			starWarsRPG.playerBaseHP = null,
			starWarsRPG.defenderBaseHP = null,
			$(document).attr('title', 'Star Wars RPG Game');

			if($("body").hasClass('crystals-collector')) {
				$("body").removeClass('crystals-collector').addClass('star-wars');
			}else {
				$("body").addClass('star-wars');
			}
			

			$("#row-1, #row-2, #row-3, #row-4, #row-5").empty().removeClass();
			// Row 1
			let title = $("<h1>").text("Star Wars RPG!");
			let char_list = $("<ul>").addClass('character-list');

			for (let i = 0; i < starWarsRPG.characters.length; i++) {
				const char = $("<li>").attr("id", starWarsRPG.characters[i].id).addClass('character char-' + (i + 1) + ' available');
				char.data({
					hp: starWarsRPG.characters[i].base_hp,
					"attack-power": starWarsRPG.characters[i].base_attack,
					"counter-attack-power": starWarsRPG.characters[i].counter_attack
				});

				const char_name = $("<div>").addClass('name').text(starWarsRPG.characters[i].name);
				const char_img = $("<img>").attr('src', starWarsRPG.characters[i].image);
				const char_hp = $("<div>").addClass('hp').text(starWarsRPG.characters[i].base_hp);

				const char_hp_loss = $("<div>").addClass('progress-bar-preview');
				char_hp_loss.attr({
					role:'progressbar',
					style: 'width: 0%;',
					"aria-valuenow": 0,
					"aria-valuemin": 0,
					"aria-valuemax": starWarsRPG.characters[i].base_hp,
				});

				const char_hp_remaining = $("<div>").addClass('progress-bar').text(starWarsRPG.characters[i].base_hp);
				char_hp_remaining.attr({
					role:'progressbar',
					style: 'width: 100%;',
					"aria-valuenow": starWarsRPG.characters[i].base_hp,
					"aria-valuemin": 0,
					"aria-valuemax": starWarsRPG.characters[i].base_hp,
				});

				const char_hp_total = $("<div>").addClass('progress').append(char_hp_remaining, char_hp_loss);
				char_list.append(char.append(char_name, char_img, char_hp,char_hp_total));
			}
			$("#row-1").append(title, char_list);

			// Row 2
			title = $("<h3>").text("Your Character");
			char_list = $("<ul>").addClass('player-area');
			$("#row-2").append(title, char_list);

			// Row 3
			title = $("<h3>").text("Enemies Available To Attack");
			char_list = $("<ul>").addClass('enemies-area');
			$("#row-3").append(title, char_list);

			// Row 4
			title = $("<h3>").text("Fight Section");
			fight_btn = $("<button>").attr('id', 'btn-attack').text('Attack');
			$("#row-4").append(title, fight_btn);

			$(".star-wars.style-2 #row-4 h3, .star-wars.style-3 #row-4 h3").hide();

			// Row 5
			title = $("<h3>").text("Defender");
			char_list = $("<ul>").addClass('defender-area');
			const player_dmg_text = $("<p>").addClass('playerDamageText');
			const defender_dmg_text = $("<p>").addClass('defenderDamageText');	
			const restart_btn = $("<button>").text('Restart').attr('id', 'restart').css('display', 'none');
			$("#row-5").append(title, char_list, player_dmg_text, defender_dmg_text, restart_btn);
		},
		player_attack: function(defender) {
			let playerDamage = $(".player-area .character").data("attack-power");
			let defenderHealth = $(".defender-area .character").data("hp");
			defenderHealth -= playerDamage;
			$(".defender-area .character").data("hp", defenderHealth);
			$(".defender-area .hp").text(defenderHealth);
			
			// Update Progress Bars
			$(".style-2 .defender-area .progress-bar").css('width', (defenderHealth / starWarsRPG.defenderBaseHP) * 100 + '%').text(defenderHealth);
			$(".style-3 .defender-area .progress-bar").animate({width: (defenderHealth / starWarsRPG.defenderBaseHP) * 100 + '%'}, 500).text(defenderHealth);
			$(".style-3 .defender-area .progress-bar-preview").fadeIn('400').text(playerDamage).animate({width: (playerDamage / starWarsRPG.defenderBaseHP) * 100 + '%'}, 500).fadeOut('700');

			$(".playerDamageText").text("You attacked " + defender + " for " + playerDamage + " damage");
			
			// Add player's base Attack Power to their current Attack Power
			playerDamage += starWarsRPG.baseAttackPower;
			$(".player-area .character").data("attack-power", playerDamage);
		},
		counter_attack: function(defender) {
			const defenderCounterDamage = $(".defender-area .character").data("counter-attack-power");
			let playerHealth = $(".player-area .character").data("hp");
			playerHealth -= defenderCounterDamage;
			$(".player-area .character").data("hp", playerHealth);
			$(".player-area .hp").text(playerHealth);

			// Update Progress Bars
			$(".style-2 .player-area .progress-bar").css('width', (playerHealth / starWarsRPG.playerBaseHP) * 100 + '%').text(playerHealth);
			$(".style-3 .player-area .progress-bar").animate({width: (playerHealth / starWarsRPG.playerBaseHP) * 100 + '%'}, 500).text(playerHealth);
			$(".style-3 .player-area .progress-bar-preview").fadeIn('400').text(defenderCounterDamage).animate({width: (defenderCounterDamage / starWarsRPG.playerBaseHP) * 100 + '%'}, 500).fadeOut('700');

			$(".defenderDamageText").text(defender + " attacked you back for " + defenderCounterDamage + " damage");
		},
		check_health: function(defender) {
			const playerHealth = $(".player-area .character").data("hp");
			if (playerHealth <= 0) {
				starWarsRPG.gameover = true;
				$(".playerDamageText").text("You have been defeated...GAME OVER!!!");
				$(".defenderDamageText").text('');
				$("#restart").css('display', 'block');
				$(".star-wars.style-2 #row-4, .star-wars.style-3 #row-4").hide();
			}

			const defenderHealth = $(".defender-area .character").data("hp");
			if (defenderHealth <= 0) {
				starWarsRPG.canFight = false;
				$(".defender-area .character").remove();
				$(".playerDamageText").text("You have defeated " + defender + ", you can choose to fight another enemy.");
				$(".defenderDamageText").text('');

				if($(".enemies-area").children().length === 0) {
					starWarsRPG.gameover = true;
					$(".playerDamageText").text("You Won!!!! GAME OVER!!!");
					$(".defenderDamageText").text('');
					$("#restart").css('display', 'block');
					$(".star-wars.style-2 #row-4, .star-wars.style-3 #row-4").hide();
				}
			}
		},
		addListeners: function() {
			$(".star-wars").off().on('click', '.character', function() {
				if(!starWarsRPG.gameover) {
					const current_area = $(this).parent()[0].classList[0];
					if(current_area === "character-list" && $(".player-area").children().length === 0) {
						$(this).appendTo('.player-area');
						$(".character-list").children().addClass('enemy').removeClass('available').appendTo('.enemies-area'); 
						$(".star-wars.style-2 .character-list, .star-wars.style-3 .character-list").hide();
						starWarsRPG.baseAttackPower = $(".player-area .character").data("attack-power");
						starWarsRPG.playerBaseHP = $(".player-area .character").data("hp");
					}else if (current_area === "enemies-area" && $(".defender-area").children().length === 0) {
						$(this).appendTo('.defender-area').removeClass('enemy').addClass('defender').removeData('attack-power');
						starWarsRPG.defenderBaseHP = $(".defender-area .character").data("hp");
						$(".star-wars.style-2 #row-4, .star-wars.style-3 #row-4").show();
						starWarsRPG.canFight = true;
						$(".playerDamageText").text('');
					}
				}
			}).on('click', '#btn-attack', function(event) {
				if(!starWarsRPG.gameover && starWarsRPG.canFight) {
					const defenderName = $(".defender-area .name").text();
					starWarsRPG.player_attack(defenderName);
					starWarsRPG.check_health(defenderName);

					if (starWarsRPG.canFight) {
						starWarsRPG.counter_attack(defenderName);
						starWarsRPG.check_health(defenderName);
					}
				}else if (!starWarsRPG.canFight) {
					$(".playerDamageText").text('Select an enemy to attack');
				}
			}).on('click', '#restart', function(event) {
				if(starWarsRPG.gameover) {
					starWarsRPG.restart_game();	
				}
			});
		}
	};

	starWarsRPG.initialize_game();
	
	var expanded = false;
	$(".menu").on('click', '.btn-menu', function() {
		if (!expanded) {
			$(".menu").animate({width: '210px', height: '290px'}, 350).addClass('active');
			$(".menu-right").fadeIn('slow').css('display', 'flex');
			expanded = true;
		}else {
			closeMenu();
		}
	}).on('click', '.game-cc', function(event) {
		crystalsCollector.initialize_game();
		closeMenu();
	}).on('click', '.game-sw', function(event) {
		starWarsRPG.initialize_game();
		closeMenu();
	}).on('click', '.games button', function(event) {
		$(".games button").removeClass('active');
		$(this).addClass('active');
	}).on('click', '.difficulty button', function(event) {
		$(".difficulty button").removeClass('active');
		$(this).addClass('active');
	}).on('click', '.styles button', function(event) {
		$(".styles button").removeClass('active');
		$(this).addClass('active');
		closeMenu();

		if ($(this).hasClass('style-2')) {
			$("body").removeClass('style-3').addClass('style-2');
			$(".star-wars.style-2 #row-4 h3").hide();
			if($(".player-area").children().length > 0) {
				$(".star-wars.style-2 .character-list").hide();
			}
		}else if($(this).hasClass('style-3')){
			$("body").removeClass('style-2').addClass('style-3');
			$(".star-wars.style-3 #row-4 h3").hide();
			if($(".player-area").children().length > 0) {
				$(".star-wars.style-3 .character-list").hide();
			}
		}else {
			$("body").removeClass('style-2 style-3');
			$("#row-4 h3").show();
		}

	});

	function closeMenu() {
		$(".menu-right").hide();
		$(".menu").animate({width: '44px', height: '34px'}, 350).removeClass('active');
		expanded = false;
	}
});