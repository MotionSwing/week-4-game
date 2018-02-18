$(document).ready(function() {
// -----------------------
// CrystalsCollector Game
// -----------------------
	var crystalsCollector = {
		randomNum: 0,
		player_score: 0,
		wins: 0,
		losses: 0,
		// gameover: false,
		bg_image: "circles-dark.png",
		initialize_game: function(){
			crystalsCollector.build_game();
			crystalsCollector.start_game();
		},
		start_game: function(){
			// crystalsCollector.gameover = false;
			crystalsCollector.change_values();
			crystalsCollector.randomNum = Math.floor(Math.random() * (120 - 19)) + 19;
			crystalsCollector.player_score = 0;
			$("#target-number").text(crystalsCollector.randomNum);
			$("#score").text(crystalsCollector.player_score);
		},
		check_score: function(){

			if(crystalsCollector.player_score === crystalsCollector.randomNum) {
				crystalsCollector.game_status = "win";
				crystalsCollector.wins++;
				$("#wins").text("Wins: " + crystalsCollector.wins);

				alert("You won!!");
				// crystalsCollector.gameover = true;
				crystalsCollector.change_colors();
				crystalsCollector.start_game();
			}else if (crystalsCollector.player_score > crystalsCollector.randomNum) {
				crystalsCollector.game_status = "loss";
				crystalsCollector.losses++;
				$("#losses").text("Losses: " + crystalsCollector.losses);

				alert("You Lost!!");
				// crystalsCollector.gameover = true;
				crystalsCollector.change_colors();
				crystalsCollector.start_game();
			}
		},
		build_game: function(){
			$(document).attr('title', 'CrystalsCollector Game');

			// Add background
			$("body").removeClass().addClass('crystals-collector');

			// Add Row 1 Content
			$("#row-1").empty().removeClass();
			var title = $("<h1>").text("CrystalsCollector!").addClass('col display-4 p-2 text-center');
			$("#row-1").append(title).addClass('row mb-3');

			// Add Row 2 Content
			$("#row-2").empty().removeClass();

			var instructions = "You will be give a random number at the start of " + 
				"the game. There are four crystals below. By clicking on a crystal" + 
				" you will add a specific amount of points to your total score. " + 
				"You win the game by matching your total score to random number," + 
				" you lose the game if your total score goes above the random " + 
				"number. The value of each crsytal is hidden from you until you " + 
				"click on it. Each time when the game starts, the game will " + 
				"change the values of each crystal."

			var btnHide = $("<span>").text("Hide").addClass('hide-show float-right');
			var cardHeaderDiv = $("<div>").text("Instructions").append(btnHide).addClass('card-header text-center');
			var instHolder = $("<p>").text(instructions);
			var cardBodyDiv = $("<div>").append(instHolder).addClass('card-body');
			var cardDiv = $("<div>").append(cardHeaderDiv).append(cardBodyDiv).addClass('card');
			var colDiv = $("<div>").append(cardDiv).addClass('col-12');
			$("#row-2").append(colDiv).addClass('row mb-3');

			// Add Row 3 Content
			$("#row-3").empty().removeClass();

			// Column for Random Number
			var left_card_body = $("<div>").attr('id', 'target-number').addClass('card-body text-center');
			var left_card_header = $("<div>").text("Random Number").addClass('card-header text-center');
			var left_card = $("<div>").append(left_card_header).append(left_card_body).addClass("card h-100 p-0 mr-lg-3");
			var left_col_6 = $("<div>").append(left_card).addClass('col-6 mb-3 mb-lg-0');

			// Column for Your Score
			var mid_card_body = $("<div>").attr('id', 'score').addClass('card-body text-center');
			var mid_card_header = $("<div>").text("Your Score").addClass('card-header text-center');
			var mid_card = $("<div>").append(mid_card_header).append(mid_card_body).addClass("card h-100 p-0 mr-lg-3");
			var mid_col_6 = $("<div>").append(mid_card).addClass('col-6 mb-3 mb-lg-0');

			// Row 3 Left container (for Number & Score)
			var left_div = $("<div>").append(left_col_6).append(mid_col_6).addClass('col-12 col-lg-6 row');
			var gems_holder = $("<ul>").addClass('gems mb-0');
			for (var i = 1; i <= 4; i++) {
				var option = $("<li>").attr('id', 'option-' + i).addClass('crystal ml-3 mr-3');
				option.attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
				gems_holder.append(option);
			}
			var right_card_body = $("<div>").append(gems_holder).addClass('card-body text-center').attr('id', 'gem-card');
			var right_card_header = $("<div>").text("Crystals").addClass('card-header text-center');
			var right_div = $("<div>").append(right_card_header).append(right_card_body).addClass('col-12 col-lg-6');
			$("#row-3").append(left_div).append(right_div).addClass('row mb-3 flex-column flex-lg-row');

			// Add Row 4 Content
			$("#row-4").empty().removeClass();
			var winSpan = $("<span>").text("Wins: 0").addClass('mr-3').attr('id', 'wins');
			var lossesSpan = $("<span>").text("Losses: 0").attr('id', 'losses');
			var row4CardBodyDiv = $("<div>").append(winSpan).append(lossesSpan).addClass('card-body text-center').attr('id', 'record');
			var row4CardHeaderDiv = $("<div>").text('Win/Loss Record').addClass('card-header text-center');
			var row4CardDiv = $("<div>").append(row4CardHeaderDiv).append(row4CardBodyDiv).addClass('card col-12 p-0 mr-3');
			$("#row-4").append(row4CardDiv).addClass('row mb-3');

			// // Add Row 5 Content
			$("#row-5").empty().removeClass();
		},
		change_values: function(){	
			$("#option-1").attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
			$("#option-2").attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
			$("#option-3").attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
			$("#option-4").attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
		},
		change_colors: function(){
			$("#option-1").css('filter', 'hue-rotate('+ Math.floor(Math.random()*360) +'deg)');
			$("#option-2").css('filter', 'hue-rotate('+ Math.floor(Math.random()*360) +'deg)');
			$("#option-3").css('filter', 'hue-rotate('+ Math.floor(Math.random()*360) +'deg)');
			$("#option-4").css('filter', 'hue-rotate('+ Math.floor(Math.random()*360) +'deg)');
		}
	};

// --------------
// Star Wars Game
// --------------

	var starWarsRPG = {
		title: "Star Wars RPG!",
		canFight: false,
		baseAttackPower: 0,
		gameover: false,
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
				image: "assets/images/sidious-2.jpg",
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
		build_game: function(){
			starWarsRPG.canFight = false;
			starWarsRPG.baseAttackPower = 0;
			starWarsRPG.gameover = false;
			$(document).attr('title', starWarsRPG.title);
			$("body").removeClass().addClass('star-wars');

			$("#row-1, #row-2, #row-3, #row-4, #row-5").empty().removeClass();

			// Row 1
			var title = $("<h1>").text("Star Wars RPG!");
			var char_list = $("<ul>").addClass('character-list');

			for (var i = 0; i < starWarsRPG.characters.length; i++) {
				var char = $("<li>").addClass('character char-' + (i + 1) + ' available');
				char.attr("id", starWarsRPG.characters[i].id);
				char.data({
					hp: starWarsRPG.characters[i].base_hp,
					"attack-power": starWarsRPG.characters[i].base_attack,
					"counter-attack-power": starWarsRPG.characters[i].counter_attack
				});

				var char_name = $("<div>").addClass('name').text(starWarsRPG.characters[i].name);
				var char_img = $("<img>").attr('src', starWarsRPG.characters[i].image);
				var char_hp = $("<div>").addClass('hp').text(starWarsRPG.characters[i].base_hp);
				// char_hp.attr('data-hp', starWarsRPG.characters[i].base_hp);
				char.append(char_name, char_img, char_hp);
				char_list.append(char);
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

			// Row 5
			title = $("<h3>").text("Defender");
			char_list = $("<ul>").addClass('defender-area');
			var player_dmg_text = $("<p>").addClass('playerDamageText');
			var defender_dmg_text = $("<p>").addClass('defenderDamageText');	
			var restart_btn = $("<button>").text('Restart').attr('id', 'restart').css('display', 'none');
			$("#row-5").append(title, char_list, player_dmg_text, defender_dmg_text, restart_btn);
		},
		player_attack: function() {
			var defenderName = $(".defender-area .name").text();
			var playerDamage = $(".player-area .character").data("attack-power");
			var defenderHealth = $(".defender-area .character").data("hp");
			var newDefenderHealth = defenderHealth - playerDamage;
			$(".defender-area .character").data("hp", newDefenderHealth);
			$(".defender-area .hp").text(newDefenderHealth);
			$(".playerDamageText").text("You attacked " + defenderName + " for " + playerDamage + " damage");
			
			// Add player's base Attack Power to their current Attack Power
			playerDamage += starWarsRPG.baseAttackPower;
			$(".player-area .character").data("attack-power", playerDamage);
		},
		counter_attack: function() {
			var defenderName = $(".defender-area .name").text();
			var defenderCounterDamage = $(".defender-area .character").data("counter-attack-power");
			var playerHealth = $(".player-area .character").data("hp");
			var newPlayerHealth = playerHealth - defenderCounterDamage;
			$(".player-area .character").data("hp", newPlayerHealth);
			$(".player-area .hp").text(newPlayerHealth);
			$(".defenderDamageText").text(defenderName + " attacked you back for " + defenderCounterDamage + " damage");
		},
		check_health: function() {
			var playerHealth = $(".player-area .character").data("hp");
			if (playerHealth <= 0) {
				starWarsRPG.gameover = true;
				$(".playerDamageText").text("You have been defeated...GAME OVER!!!");
				$(".defenderDamageText").text('');
				$("#restart").css('display', 'block');
			}

			var defenderName = $(".defender-area .name").text();
			var defenderHealth = $(".defender-area .character").data("hp");
			if (defenderHealth <= 0) {
				starWarsRPG.canFight = false;
				$(".defender-area .character").remove();
				$(".playerDamageText").text("You have defeated " + defenderName + ", you can choose to fight another enemy.");
				$(".defenderDamageText").text('');

				if($(".enemies-area").children().length === 0) {
					starWarsRPG.gameover = true;
					$(".playerDamageText").text("You Won!!!! GAME OVER!!!");
					$(".defenderDamageText").text('');
					$("#restart").css('display', 'block');
				}
			}
		},
		restart_game: function() {
			starWarsRPG.build_game();
		},
		addListeners: function() {
			$(".container").on('click', '.character', function() {
				if(!starWarsRPG.gameover) {
					var location = $(this).parent()[0].classList[0];
					if(location === "character-list" && $(".player-area").children().length === 0) {
						$(this).appendTo('.player-area');
						$(".character-list").children().addClass('enemy').removeClass('available').appendTo('.enemies-area'); 
						starWarsRPG.baseAttackPower = $(".player-area .character").data("attack-power");
					}else if (location === "enemies-area" && $(".defender-area").children().length === 0) {
						$(this).appendTo('.defender-area').removeClass('enemy').addClass('defender').removeData('attack-power');
						starWarsRPG.canFight = true;
						$(".playerDamageText").text('');
					}
				}
			}).on('click', '#btn-attack', function(event) {
				if(!starWarsRPG.gameover && starWarsRPG.canFight) {
					starWarsRPG.player_attack();
					starWarsRPG.check_health();

					if (starWarsRPG.canFight) {
						starWarsRPG.counter_attack();
						starWarsRPG.check_health();
					}
				}else if (!starWarsRPG.canFight) {
					$(".playerDamageText").text('No enemy here');
				}
			}).on('click', '#restart', function(event) {
				if(starWarsRPG.gameover) {
					starWarsRPG.restart_game();	
				}
			});
		}
	};

	// crystalsCollector.initialize_game();
	starWarsRPG.initialize_game();
	
	// --------------------------------
	// CrystalsCollector event handlers
	// --------------------------------
	$(".gems li").click(function(event) {
		// if (!crystalsCollector.gameover){
			crystalsCollector.player_score += parseInt($(this).attr('data-value'));
			$("#score").text(crystalsCollector.player_score);
			crystalsCollector.check_score();
		// }else if (crystalsCollector.gameover){
		// 	crystalsCollector.change_colors();
		// 	crystalsCollector.start_game();
		// }
	});

	$(".hide-show").click(function(event) {
		($(".hide-show").text() === "Hide") ? $(".hide-show").text("Show") : $(".hide-show").text("Hide");
		$("#row-2 .card-body").toggle();
	});
});