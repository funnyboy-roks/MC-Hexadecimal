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
    formatting = {
     l: document.querySelector('#bold').checked,
     o: document.querySelector('#italics').checked,
     m: document.querySelector('#strikethrough').checked,
     n: document.querySelector('#underline').checked,
    };
    formattingClasses = "";
    formattingCodes = "";
    for (k in formatting){
        if(formatting[k]){
            formattingClasses += k + ' ';
            formattingCodes += '&' + k;
        } 
    }
    formattingClasses = formattingClasses.trim();
    formattingCodes = formattingCodes.trim();

    colours = createGradient(count, c1, c2);

    let colouredString = '';
    let colourCodeStr  = '';
    for (let i in colours){
        colouredString +=  `<span style="color: ${colours[i]}" class="${formattingClasses}">${name[i]}</span>`;
        colourCodeStr += mcHex(colours[i]) + formattingCodes + name[i]
    }

    

    document.querySelector("#out-coloured").innerHTML = colouredString;
    document.querySelector("#out-colour").value = colourCodeStr;
    document.querySelector("#out-nick").value = "/nick " + colourCodeStr;

    return colouredString;

}