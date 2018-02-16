$(document).ready(function() {
// -----------------------
// CrystalsCollector Game
// -----------------------
	var crystalsCollector = {
		targetNum: 0,
		gem_values: [],
		player_score: 0,
		wins: 0,
		losses: 0,
		bg_image: "circles-dark.png",
		start_game: function(){
			// TODO: Draw game board
			crystalsCollector.build_game();
			crystalsCollector.targetNum = Math.floor(Math.random() * (120 - 19)) + 19;
			crystalsCollector.gem_values = [
				Math.floor(Math.random() * (12 - 1)) + 1,
				Math.floor(Math.random() * (12 - 1)) + 1,
				Math.floor(Math.random() * (12 - 1)) + 1,
				Math.floor(Math.random() * (12 - 1)) + 1
			];

			crystalsCollector.player_score = 0;
			// crystalsCollector.wins = 0;
			// crystalsCollector.losses = 0;

			console.log("Target Number: " + crystalsCollector.targetNum);
			console.log("Crystal Values: " + crystalsCollector.gem_values);

			$("#target-number").text(crystalsCollector.targetNum);
			$("#score").text(crystalsCollector.player_score);

		},
		check_score: function(){
			if(crystalsCollector.player_score === crystalsCollector.targetNum) {
				crystalsCollector.game_status = "win";
				crystalsCollector.wins++;
				$("#wins").text("Wins: " + crystalsCollector.wins);

				alert("You won!!");
				crystalsCollector.start_game();
			}else if (crystalsCollector.player_score > crystalsCollector.targetNum) {
				crystalsCollector.game_status = "loss";
				crystalsCollector.losses++;
				$("#losses").text("Losses: " + crystalsCollector.losses);

				alert("You Lost!!");
				crystalsCollector.start_game();
			}
		},
		build_game: function(){
			$(document).attr('title', 'CrystalsCollector Game');

			// Add background
			$("body").css('background-image', 'url(assets/images/'+ crystalsCollector.bg_image +')');

			// // Add Row 1 Content
			// var title = $("<h1>");
			// title.text("CrystalsCollector!");
			// title.addClass('cc-title');
			// $("#row-1").empty();
			// $("#row-1").append(title);

			// // Add Row 2 Content
			// var instructions = [
			// 	"You will be give a random number at the start of the game.",
			// 	"There are four crystals below. By clicking on a crystal you " + 
			// 	"will add a specific amount of points to your total score.",
			// 	"You win the game by matching your total score to random number" + 
			// 	", you lose the game if your total score goes above the random number.",
			// 	"The value of each crsytal is hidden from you until you click on it.",
			// 	"Each time when the game starts, the game will change the values of each crystal"
			// ];
			// $("#row-2").empty();
			// for (var i = 0; i < instructions.length; i++) {
			// 	$("#row-2").append($("<p>").text(instructions[i]));
			// }

			// // Add Row 3 Content
			// $("#row-3").empty();
			// var dispNumber = $("<div>");
			// dispNumber.attr('id', 'target-number');
			// $("#row-3").append(dispNumber);
			// var dispRecord = $("<div>");
			// dispRecord.attr('id', 'wins-and-losses');

			// var dispWins = $("<p>");
			// dispWins.attr('id', 'wins');
			// dispWins.text("Wins: 0");
			// dispRecord.append(dispWins);

			// var dispLosses = $("<p>");
			// dispLosses.attr('id', 'losses');
			// dispLosses.text("Losses: 0");
			// dispRecord.append(dispLosses);

			// $("#row-3").append(dispRecord);

			// // Add Row 4 Content
			// $("#row-4").empty();
			// var gemsHolder = $("<ul>");
			// gemsHolder.addClass('gems');

			// for (var i = 1; i <= 4; i++) {
			// 	var option = $("<li>");
			// 	option.attr('id', 'option-' + i);
			// 	option.addClass('crystal');
			// 	gemsHolder.append(option);
			// }
			// $("#row-4").append(gemsHolder);

			// // Add Row 5 Content
			// $("#row-5").empty();
			// var scoreTitle = $("<div>");
			// scoreTitle.addClass('score-header');
			// scoreTitle.text("Your total score is:");
			// $("#row-5").append(scoreTitle);

			// var scoreValue = $("<div>");
			// scoreValue.attr('id', 'score');
			// scoreValue.addClass('score');
			// scoreValue.text("0");

			// $("#row-5").append(scoreValue);
		}
	};

// --------------
// Star Wars Game
// --------------

	var starWarsRPG = {
		title: "Star Wars RPG!",
		bg_image: "xwing-bg.jpg",
		characters: [
			{
				name: "Obi-Wan Kenobi",
				image: "obiwan.jpg",
				hp: 120,
				attack_power: 5,
				counter_attack_power: 5
			},
			{
				name: "Luke Skywalker",
				image: "luke.jpg",
				hp_points: 100,
				attack_power: 5,
				counter_attack_power: 5
			},
			{
				name: "Darth Sidious",
				image: "sidious.jpg",
				hp: 150,
				attack_power: 5,
				counter_attack_power: 5
			},
			{
				name: "Darth Maul",
				image: "maul.jpg",
				hp: 180,
				attack_power: 2,
				counter_attack_power: 55
			}
		],
		start_game: function() {
			starWarsRPG.build_game();

			$(".character-list li").on('click', function(event) {
				console.log($(this).children('.character-name').text());
				$(this).appendTo('.player-holder');
				$(this).removeClass('available');
				$(".character-list").children().addClass('enemy').removeClass('available').appendTo('.enemies-holder');
				$(this).off();

				$(".enemies-holder li").on('click', function(event) {
					$(this).appendTo('.defender-holder').removeClass('enemy').addClass('defender');
					$(this).off();
				});
			});

		},
		build_game: function(){
			$(document).attr('title', 'Star Wars RPG Game');

			$("body").css('background-image', 'url(assets/images/'+ starWarsRPG.bg_image +')');
			$("body").css('background-size', 'cover');
	
		}
	};

	crystalsCollector.start_game();
	// starWarsRPG.start_game();
	// 
	$("#option-1").click(function(event) {
		crystalsCollector.player_score += crystalsCollector.gem_values[0];
		$("#score").text(crystalsCollector.player_score);
		crystalsCollector.check_score();
	});
	$("#option-2").click(function(event) {
		crystalsCollector.player_score += crystalsCollector.gem_values[1];
		$("#score").text(crystalsCollector.player_score);
		crystalsCollector.check_score();
	});
	$("#option-3").click(function(event) {
		crystalsCollector.player_score += crystalsCollector.gem_values[2];
		$("#score").text(crystalsCollector.player_score);
		crystalsCollector.check_score();
	});
	$("#option-4").click(function(event) {
		crystalsCollector.player_score += crystalsCollector.gem_values[3];
		$("#score").text(crystalsCollector.player_score);
		crystalsCollector.check_score();
	});


	$(".hide-show").click(function(event) {
		($(".hide-show").text() === "Hide") ? $(".hide-show").text("Show") : $(".hide-show").text("Hide");
		$("#row-2 .card-body").toggle();
	});
// 
});