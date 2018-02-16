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
			$("body").css('background-image', 'url(assets/images/'+ crystalsCollector.bg_image +')');

			// Add Row 1 Content
			$("#row-1").empty();
			$("#row-1").removeClass();

			var title = $("<h1>");
			title.text("CrystalsCollector!");
			title.addClass('col display-4 p-2 text-center');
			$("#row-1").append(title);
			$("#row-1").addClass('row mb-3');

			// Add Row 2 Content
			$("#row-2").empty();
			$("#row-2").removeClass();

			var instructions = "You will be give a random number at the start of " + 
				"the game. There are four crystals below. By clicking on a crystal" + 
				" you will add a specific amount of points to your total score. " + 
				"You win the game by matching your total score to random number," + 
				" you lose the game if your total score goes above the random " + 
				"number. The value of each crsytal is hidden from you until you " + 
				"click on it. Each time when the game starts, the game will " + 
				"change the values of each crystal."

			var btnHide = $("<span>");
			btnHide.text("Hide");
			btnHide.addClass('hide-show float-right');

			var cardHeaderDiv = $("<div>");
			cardHeaderDiv.text("Instructions");
			cardHeaderDiv.append(btnHide);
			cardHeaderDiv.addClass('card-header text-center');

			var instHolder = $("<p>");
			instHolder.text(instructions);
			var cardBodyDiv = $("<div>");
			cardBodyDiv.append(instHolder);
			cardBodyDiv.addClass('card-body');

			var cardDiv = $("<div>");
			cardDiv.append(cardHeaderDiv);
			cardDiv.append(cardBodyDiv);
			cardDiv.addClass('card');

			var colDiv = $("<div>");
			colDiv.append(cardDiv);
			colDiv.addClass('col-12');

			$("#row-2").append(colDiv);
			$("#row-2").addClass('row mb-3');

			// Add Row 3 Content
			$("#row-3").empty();
			$("#row-3").removeClass();

			// Column for Random Number
			var left_card_body = $("<div>");
			left_card_body.attr('id', 'target-number');
			left_card_body.addClass('card-body text-center');

			var left_card_header = $("<div>");
			left_card_header.text("Random Number");
			left_card_header.addClass('card-header text-center');

			var left_card = $("<div>");
			left_card.append(left_card_header);
			left_card.append(left_card_body);
			left_card.addClass("card h-100 p-0 mr-lg-3");

			var left_col_6 = $("<div>");
			left_col_6.append(left_card);
			left_col_6.addClass('col-6 mb-3 mb-lg-0');

			// Column for Your Score
			var mid_card_body = $("<div>");
			mid_card_body.attr('id', 'score');
			mid_card_body.addClass('card-body text-center');

			var mid_card_header = $("<div>");
			mid_card_header.text("Your Score");
			mid_card_header.addClass('card-header text-center');

			var mid_card = $("<div>");
			mid_card.append(mid_card_header);
			mid_card.append(mid_card_body);
			mid_card.addClass("card h-100 p-0 mr-lg-3");

			var mid_col_6 = $("<div>");
			mid_col_6.append(mid_card);
			mid_col_6.addClass('col-6 mb-3 mb-lg-0');

			// Row 3 Left container (for Number & Score)
			var left_div = $("<div>");
			left_div.append(left_col_6);
			left_div.append(mid_col_6);
			left_div.addClass('col-12 col-lg-6 row');

			var gems_holder = $("<ul>");
			gems_holder.addClass('gems mb-0');
			for (var i = 1; i <= 4; i++) {
				var option = $("<li>");
				option.attr('id', 'option-' + i);
				option.attr('data-value', Math.floor(Math.random() * (12 - 1)) + 1);
				option.addClass('crystal ml-3 mr-3');
				gems_holder.append(option);
			}

			var right_card_body = $("<div>");
			right_card_body.append(gems_holder);
			right_card_body.addClass('card-body text-center');
			right_card_body.attr('id', 'gem-card');

			var right_card_header = $("<div>");
			right_card_header.text("Crystals");
			right_card_header.addClass('card-header text-center');

			var right_div = $("<div>");
			right_div.append(right_card_header);
			right_div.append(right_card_body);
			right_div.addClass('col-12 col-lg-6');

			$("#row-3").append(left_div);
			$("#row-3").append(right_div);
			$("#row-3").addClass('row mb-3 flex-column flex-lg-row');

			// Add Row 4 Content
			$("#row-4").empty();
			$("#row-4").removeClass();

			var winSpan = $("<span>");
			winSpan.text("Wins: 0");
			winSpan.addClass('mr-3');
			winSpan.attr('id', 'wins');

			var lossesSpan = $("<span>");
			lossesSpan.text("Losses: 0");
			lossesSpan.attr('id', 'losses');

			var row4CardBodyDiv = $("<div>");
			row4CardBodyDiv.append(winSpan);
			row4CardBodyDiv.append(lossesSpan);
			row4CardBodyDiv.addClass('card-body text-center');
			row4CardBodyDiv.attr('id', 'record');

			var row4CardHeaderDiv = $("<div>");
			row4CardHeaderDiv.text('Win/Loss Record');
			row4CardHeaderDiv.addClass('card-header text-center');

			var row4CardDiv = $("<div>");
			row4CardDiv.append(row4CardHeaderDiv);
			row4CardDiv.append(row4CardBodyDiv);
			row4CardDiv.addClass('card col-12 p-0 mr-3');

			$("#row-4").append(row4CardDiv);
			$("#row-4").addClass('row mb-3');

			// // Add Row 5 Content
			$("#row-5").empty();
			$("#row-5").removeClass();

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
		bg_image: "xwing-bg.jpg",
		canFight: false,
		baseAttackPower: 0,
		gameover: false,
		initialize_game: function(){
			starWarsRPG.build_game();
		},
		build_game: function(){
			$(document).attr('title', 'Star Wars RPG Game');

			$("body").css('background-image', 'url(assets/images/'+ starWarsRPG.bg_image +')');
			$("body").css('background-size', 'cover');

			// TODO: Dynamically build html
	
		},
		player_attack: function() {
			var defenderName = $(".defender-area .name").text();
			var playerDamage = $(".player-area .character").data("attack-power");
			var defenderHealth = $(".defender-area .hp").data("hp");
			var newDefenderHealth = parseInt(defenderHealth) - parseInt(playerDamage);
			$(".defender-area .hp").data("hp", newDefenderHealth);
			$(".defender-area .hp").text(newDefenderHealth);
			$(".playerDamageText").text("You attacked " + defenderName + " for " + playerDamage + " damage");
			playerDamage += starWarsRPG.baseAttackPower;
			$(".player-area .character").data("attack-power", playerDamage);
		},
		counter_attack: function() {
			var defenderName = $(".defender-area .name").text();
			var defenderCounterDamage = $(".defender-area .character").data("counter-attack-power");
			var playerHealth = $(".player-area .hp").data("hp");
			var newPlayerHealth = parseInt(playerHealth) - parseInt(defenderCounterDamage);
			$(".player-area .hp").data("hp", newPlayerHealth);
			$(".player-area .hp").text(newPlayerHealth);
			$(".defenderDamageText").text(defenderName + " attacked you back for " + defenderCounterDamage + " damage");
		},
		check_health: function() {
			var playerHealth = $(".player-area .hp").data("hp");
			if (playerHealth <= 0) {
				starWarsRPG.gameover = true;
				$(".playerDamageText").text("You have been defeated...GAME OVER!!!");
				$(".defenderDamageText").text('');

				var btnRestart = $("<button>");
				btnRestart.text('Restart');
				btnRestart.attr('id', 'restart');
				$("#row-5").append(btnRestart);
			}

			var defenderName = $(".defender-area .name").text();
			var defenderHealth = $(".defender-area .hp").data("hp");
			if (defenderHealth <= 0) {
				starWarsRPG.canFight = false;
				$(".defender-area .character").remove();
				$(".playerDamageText").text("You have defeated " + defenderName + ", you can choose to fight another enemy.");
				$(".defenderDamageText").text('');
				starWarsRPG.check_win_condition();
			}
		},
		check_win_condition: function() {
			if($(".enemies-area").children().length === 0) {
				starWarsRPG.gameover = true;
				$(".playerDamageText").text("You Won!!!! GAME OVER!!!");
				$(".defenderDamageText").text('');

				var btnRestart = $("<button>");
				btnRestart.text('Restart');
				btnRestart.attr('id', 'restart');
				$("#row-5").append(btnRestart);
			}
		},
		restart_game: function() {
			// TODO: Reset player damage power back to initial value
			starWarsRPG.canFight = false;
			starWarsRPG.gameover = false;
			// TODO: Move characters back to initial positions (above Your Character)
			// TODO: remove the restart button
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

	// --------------------------------
	// Start Wars Click Event Handlers
	// --------------------------------
	$("li.character").on('click', function(event) {
		if(!starWarsRPG.gameover) {
			var location = $(this).parent()[0].classList[0];
			if(location === "character-list" && $(".player-area").children().length === 0) {
				$(this).appendTo('.player-area');
				$(".character-list").children().addClass('enemy').removeClass('available').appendTo('.enemies-area');
				starWarsRPG.baseAttackPower = $(".player-area .character").data("attack-power");
			}else if (location === "enemies-area" && $(".defender-area").children().length === 0) {
				$(this).appendTo('.defender-area').removeClass('enemy').addClass('defender');
				starWarsRPG.canFight = true;
				$(".playerDamageText").text('');
			}
		}
	});

	$("#btn-attack").on('click', function(event) {
		if(!starWarsRPG.gameover && starWarsRPG.canFight) {
			starWarsRPG.player_attack();
			starWarsRPG.check_health();

			if (starWarsRPG.canFight) {
				starWarsRPG.counter_attack();
			}
		}else if (!starWarsRPG.canFight) {
			$(".playerDamageText").text('No enemy here');
		}
	});

	$("#restart").on('click', function(event) {
		if(starWarsRPG.gameover) {
			starWarsRPG.restart_game();	
		}
	});
});