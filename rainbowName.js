const coloursOutLabel = document.querySelector("#colours");
const nickOutLabel = document.querySelector("#nick")

function createGradient(count, coloursArr){
    var rainbow = new Rainbow(); 
    rainbow.setNumberRange(1, count);
    rainbow.setSpectrumByArray(coloursArr);
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
     l: document.querySelector('input#bold').checked,
     o: document.querySelector('input#italics').checked,
     m: document.querySelector('input#strikethrough').checked,
     n: document.querySelector('input#underline').checked,
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

    colours = createGradient(count, [c1, c2]);

    let colouredString = '';
    let colourCodeStr  = '';
    for (let i in colours){
        colouredString +=  `<span style="color: ${colours[i]}" class="${formattingClasses}">${name[i]}</span>`;
        colourCodeStr += mcHex(colours[i]) + formattingCodes + name[i]
    }

    
    coloursOutLabel.innerText = `Colours (${colourCodeStr.length} chars):`;
    nickOutLabel.innerText = `/nick Command (${("/nick + " + colourCodeStr).length} chars):`;
    document.querySelector("#out-coloured").innerHTML = colouredString;
    document.querySelector("#out-colour").value = colourCodeStr;
    document.querySelector("#out-nick").value = "/nick " + colourCodeStr;

    return colouredString;

}