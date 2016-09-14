function Tag(x) {
	if (x[0] == "#") {
		this.main = document.getElementById(x.slice(1));
	}
	if (x[0] == ".") {
		this.main = document.getElementsByClassName(x.slice(1));
	}

	this.set = function(c) { this.main.innerHTML = c; }
	this.style = function(a, v) { this.main.style[a] = v; }
	this.append = function(c) { this.main.innerHTML += c; }
	this.value = function() { return this.main.value; }
	this.show = function(s) { this.main.style.display = "block"; }
	this.hide = function(s) { this.main.style.display = "none"; }
	this.listen = function(a, f) { this.main.addEventListener(a, f, false); }
	this.disabled = function(s) { this.main.disabled = s; }
}

var $ = function(name) { return new Tag(name); }

var selected, challenge;
var output = $("#output");
var files;


// initialize
function init() {

	// challenge select
	$("#challenge").listen("change", update);

	// file select
	$("#fileselect").listen("change", onDrop);

	// Resubmit
	$("#resubmit").listen("click", read);

}

// file selection
function onDrop(e) {
	$('#resubmit').show();
	output.set("running.");

	// fetch FileList object
	files = e.target.files || e.dataTransfer.files;

	// read files
	read();
}

function read() {
	output.set("running..");
	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		parse(f);
	}
}

function parse(file) {
	$("#results").show();
	output.set("running...");

	try {
		var reader = new FileReader();
		reader.onload = function(e) {
			let data = e.target.result;
			test(data);
		}
		reader.readAsText(file);
	}

	catch(err) {
		output.set("invalid file type");
	}
}

function test(prog) {
	output.set("running....");
	try {
		var tests = [];

		for (var i = 0; i < challenge.tests.length ; i++) {
			tests.push("main([" + challenge.tests[i][0] + "])");
		}

		var cmd = prog + "\n[" + tests.join(",") + "];";

		score(eval(cmd));
	}

	catch (err) {
		console.log(err);
		output.set("eval error");
	}
}

function score(input) {
	output.set("running.....");
	try {
		var text = "";
		var pass = [];
		var tests = challenge.tests;
		
		for (var i = 0; i < tests.length; i++) {
			var correct = input[i] == tests[i][1];
			pass.push(correct);

			text += "Round " + (i+1) + ": <br>";
			text += "Input: " + tests[i][0] + "<br>";
			text += "Output: " + input[i] + "<br>";
			text += "Passed: " + (correct ? "✅" : "❌") + "<br>";
			text += "<br>";
		}

		text += "Success! (" + pass.reduce((a, b) => a + b, 0) + "/3)";
		
		output.set(text);
	}

	catch(err){
		output.set("formatting error.")
	}
}

function update() {
	$('#fileselect').disabled(false);

	selected = $("#challenge").value();
	challenge = challenges[selected];
	$("#desc").set(challenge.desc);
	$("#sample-input").set(challenge.sample[0]);
	$("#sample-output").set(challenge.sample[1]);
}

function add_challenges() {
	var options = $("#challenge");
	var keys = Object.keys(challenges);
	for (var i = 0; i < keys.length; i++) {
		options.append("<option value='" + keys[i] + "'>" + challenges[keys[i]]["name"] +"</option>")
	}
}