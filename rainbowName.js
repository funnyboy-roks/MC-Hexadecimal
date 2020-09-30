function createGradient(count, c1, c2){
    var rainbow = new Rainbow(); 
    rainbow.setNumberRange(1, count);
    rainbow.setSpectrum(c1, c2);
    var hexCodes = [];
    for (var i = 1; i <= count; i++) {
        var hexColour = rainbow.colourAt(i);
        hexCodes.push('#' + hexColour);
    }
    return hexCodes;
}

function createGradFromName(name){
    let count = name.length;
    let c1 = document.querySelector('#picker1').value;
    let c2 = document.querySelector('#picker2').value;

    colours = createGradient(count, c1, c2);

    let s = ''
    for (let i in colours){
        s +=  `<span style="color: ${colours[i]}">${name[i]}</span>`;
    }
    document.querySelector("#out-coloured").innerHTML = s;
    return s;

}