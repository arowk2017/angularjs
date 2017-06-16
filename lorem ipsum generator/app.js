
   var app = angular.module("lorem", []);      
		 
		 
         app.controller("loremController", function($scope, loremService) {
            $scope.lorem = {};
            $scope.lorem.title = "Lorem Ipsum Generator";
			$scope.lorem.sentence = "";
			$scope.lorem.paragraph = "";
			$scope.lorem.length = "";
			$scope.lorem.quantity = "";
			$scope.lorem.type = "1";
			$scope.lorem.style = "1";
			
			$scope.lorem.choices = ["Short", "Medium", "Long"];
			
			$scope.generateLorem = function() {
               			   
			   switch($scope.lorem.type) {
						case "1":
							$scope.lorem.result = loremService.generate_multiple_paragraphs($scope.lorem.quantity, $scope.lorem.length, $scope.lorem.style);
							break;
						case "2":
							$scope.lorem.result = loremService.generate_multiple_sentences($scope.lorem.quantity, $scope.lorem.length, $scope.lorem.style);
							break;
						default:
							$scope.lorem.result = loremService.generate_multiple_paragraphs($scope.lorem.quantity, $scope.lorem.length, $scope.lorem.style);
					}
			   
            }
			
			$scope.clear_result = function() {
						console.log("testing");
						$scope.lorem.result = "";
							
			   
            }
			
         });
		 
		 app.service("loremService", function() {
			var a = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", 
			"india", "julia", "kilo", "lima", "mike", "november", "oscar", "papa", "quebec", 
			"rome", "sierra", "tango", "uniform", "victor", "whiskey", "x-ray", "yankee", "zulu"];
			var n = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", 
			"iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", 
			"sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"];
			return {
				get_word: function(b,o) {
					var type = "";
					switch(o) {
						case "1":
							type = a[b];
							
							break;
						case "2":
							type = n[b];
							break;
						default:
							type = a[b];
					}
					return type;
				},
				word_count: function(p) {
					var length = "";
					switch(p) {
						case "1":
							length = a.length;
							
							break;
						case "2":
							length = n.length;
							break;
						default:
							length = a.length;
					}
					return length;
					
				},
				capitalize_sentence: function(j) {
					return (angular.isString(j) && j.length > 0) ? j[0].toUpperCase() + j.substr(1).toLowerCase() : j;
				},
				random_sort: function() {
					return 0.5 - Math.random();
				},
				random_result: function(c) {
					return Math.floor(Math.random() * c);
				},
				random_result_long: function() {
					//14-16 words
					return Math.floor(Math.random() * 3) + 14;
				},
				random_result_medium: function() {
					//11-13
					return Math.floor(Math.random() * 3) + 11;
				},
				random_result_short: function() {
					//8-10
					return Math.floor(Math.random() * 3) + 8;
				},
				random_result_paragraph: function() {
					//5-7
					return Math.floor(Math.random() * 3) + 5;
				},
				random_word: function(r) {
					return this.get_word(this.random_result(this.word_count(r)),r);
				},
				generate_single_sentence: function() {
					var sentence = "";
					
					var	d = this.random_result(10);
					
					while(d < 4)
					{
						d = this.random_result(10);
					}
					
					for(var x = 0; x <= d; x++)
					{
						
						sentence += this.random_word() + " ";
					}
					
					var trimmed_sentence = sentence.replace(/\s+$/, '');
					
					return trimmed_sentence;
				},
				generate_single_paragraph: function(h) {
					var paragraph = "";
					
					for(var x = 0; x <= h; x++)
					{
						paragraph += this.generate_single_sentence() + ". ";
					}
					return paragraph;
				},
				generate_multiple_sentences: function(g,k,p) {
					var sentence = "";
					var trimmed_sentence = "";
					var multi_sentence = [];
					var sentence_length = "";
					
					switch(k) {
						case "Short":
							sentence_length = this.random_result_short();
							
							break;
						case "Medium":
							sentence_length = this.random_result_medium();
							break;
						case "Long":
							sentence_length = this.random_result_long();
							break;
						default:
							sentence_length = this.random_result_short();
					}

					var i = 0;
					
					//if input is null or if it is not a number (i.e. "1A")
					if(isNaN(parseInt(g,10)) || isNaN(Number(g)))
					{
						g = 1;
					}
						
					while((i < g))
					{
						sentence = "";
						for(var x = 0; x <= sentence_length; x++)
						{
							sentence += this.random_word(p) + " ";
						}
						trimmed_sentence = sentence.replace(/\s+$/, '.');
						trimmed_sentence = this.capitalize_sentence(trimmed_sentence);
						multi_sentence.push(trimmed_sentence);
						i++;
					}

					return multi_sentence;
					
				},
				generate_multiple_paragraphs: function(g,l, q) {
					var paragraph = "";
					var trimmed_sentence = "";
					var multi_paragraph = [];
					
					var i = 0;
					
					//if input is null or if it is not a number (i.e. "1A")
					if(isNaN(parseInt(g,10)) || isNaN(Number(g)))
					{
						g = 1;
					}
						
					while((i < g))
					{
						
						multi_paragraph.push(this.generate_multiple_sentences(this.random_result_paragraph(),l,q));
						i++;
					}

					
					return multi_paragraph;
					
				}
				
			}
	});
	
