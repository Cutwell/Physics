var gravity = 6.67 * Math.pow(10, -11);

$(document).ready(function() {
    var SOLOutput = document.getElementById("SOL");
    SOLOutput.innerHTML = (3 * Math.pow(10, 8)).toExponential();

    var radiusSlider = document.getElementById("radius-slider");
    var radiusOutput = document.getElementById("radius-value");
    radiusOutput.innerHTML = radiusSlider.value;

    var massSlider = document.getElementById("mass-slider");
    var massOutput = document.getElementById("mass-value");
    massOutput.innerHTML = massSlider.value;

    var starSelect = document.getElementById("select");

    starSelect.oninput = function() {

        if (this.value == "custom") {
            var split = [50, 50];
        } else {
            var split = this.value.split("-");
        }
        radiusOutput.innerHTML = split[1];
        $("#sun").height(split[1]*2);
        $("#sun").width(split[1]*2);

        massSlider.value = split[0];
        radiusSlider.value = split[1];

        massOutput.innerHTML = split[0];
        var color = approximateColor1ToColor2ByPercent('#fcd440', '#ff6600', split[0]/200);
        $("#sun").css("background-color", color);

        escapeVelocity(massSlider.value, radiusSlider.value);
    }

    radiusSlider.oninput = function() {
        $('#select').val("custom");
        radiusOutput.innerHTML = this.value;
        $("#sun").height(this.value*2);
        $("#sun").width(this.value*2);
        escapeVelocity(massSlider.value, radiusSlider.value);
    }

    massSlider.oninput = function() {
        $('#select').val("custom");
        massOutput.innerHTML = this.value;
        var color = approximateColor1ToColor2ByPercent('#fcd440', '#ff6600', this.value/200);
        $("#sun").css("background-color", color);
        escapeVelocity(massSlider.value, radiusSlider.value);
    }

    escapeVelocity(massSlider.value, radiusSlider.value);
});

function collapseStar() {

    $("#info").html("&#8226; = Schwarzschild radius (not to scale).");

    $("#constant").hide();
    $("#radius").hide();
    $("#mass").hide();

    // schwarzschild radius
    var mass = document.getElementById("mass-slider").value * (2 * Math.pow(10, 30));

    var division = (2*mass*gravity)/Math.pow(3*Math.pow(10, 8), 2);
    var radius = division;
    var schwarzschild = document.getElementById("schwarzschild-value");

    var string = division.toExponential().toString();
    var split = string.split('e');
    var first = split[0];
    var last = split[1];
    
    schwarzschild.innerHTML = Math.round(first)+"e"+last;

    escapeVelocity(mass, radius);

    var schwarzschild_radius = (division/(6.597*Math.pow(10, 8)))*2;

    $("#sun").css("background-color", "#fff");
    $("#sun").animate({
        height: "2px",
        width: "2px",
    }, 1000, function() {
    });
}

function escapeVelocity(mass_value, radius_value) {
    
    var radius = radius_value * (6.597 * Math.pow(10, 8));
    var mass = mass_value * (1.989 * Math.pow(10, 30));

    var division = (2*mass*gravity)/radius;
    var root = Math.sqrt(division);

    var escapeVelocity = document.getElementById("velocity-value");

    var string = root.toExponential().toString();
    var split = string.split('e');
    var first = split[0];
    var last = split[1];

    escapeVelocity.innerHTML = Math.round(first)+"e"+last;
}
