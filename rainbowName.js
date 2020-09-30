function createGradient(count, c1, c2){
    var rainbow = new Rainbow(); 
    rainbow.setNumberRange(1, count);
    rainbow.setSpectrum(c1, c2);
    var hexCodes = [];
    for (var i = 1; i <= count; i++) {
        var hexColour = rainbow.colourAt(i);
        hexCodes.push('#' + hexColour.replace(/0/g, "1"));
    }
    return hexCodes;
}

function createGradFromName(name){
    name = name.trim();
    let count = name.length;
    let c1 = document.querySelector('#picker1').value;
    let c2 = document.querySelector('#picker2').value;

    colours = createGradient(count, c1, c2);

    let colouredString = '';
    let colourCodeStr  = '';
    for (let i in colours){
        colouredString +=  `<span style="color: ${colours[i]}">${name[i]}</span>`;
        colourCodeStr += `${mcHex(colours[i])}${name[i]}`
    }

    

    document.querySelector("#out-coloured").innerHTML = colouredString;
    document.querySelector("#out").value = colourCodeStr;
    return colouredString;

}