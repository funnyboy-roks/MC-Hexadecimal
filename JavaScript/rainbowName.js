const coloursOutLabel = document.querySelector("#colours");
const nickOutLabel = document.querySelector("#nick");
const nameField = document.querySelector('#nameField');

function hexStoF(hexidecimalString) {
    // Takes a 2 digit hex value as a string (ex: "2f")
    // Returns the value as a float from 0-1 (ex: 0.1843)
    // Warning: Rounding errors may result in a returned float slightly ouside of the 0-1 range

    // parseInt understands a number starting w/ 0x to be hex
    let asInt = parseInt("0x" + hexidecimalString);
    return asInt/255.0;
}

function ftoHexS(floatCol) {
    // Takes a float value from 0-1 (ex: 0.1843)
    // Returns the corresponding hex value from 0x00 to 0xff as a string (ex: "2f")
    // The return value will: always have 2 digits, exclude the "0x", be clamped to 0x00-0xff

    let asInt = Math.round(floatCol*255);
    asInt = Math.min(Math.max(0, asInt), 255); // Clamp from 0-255
    let asHexStr = asInt.toString(16);
    asHexStr = "0".repeat(2-asHexStr.length) + asHexStr;
    return asHexStr;
}

const gamma = 2.2;

function createLinearGradient(count, coloursArr) {
    var rainbow = new Rainbow(); 

    // Convert the color into linear space
    for (let i=0; i<coloursArr.length; i++) {
        colour = [
            coloursArr[i].substring(1,3),
            coloursArr[i].substring(3,5),
            coloursArr[i].substring(5,7)
        ];
        coloursArr[i] = "#"
        for (let j=0; j<colour.length; j++) {
            colour[j] = hexStoF(colour[j]); // Convert to float
            colour[j] = colour[j]**gamma; // Actual gamma->linear conversion
            coloursArr[i] += ftoHexS(colour[j]); // Convert back to hex
        }
    }

    rainbow.setNumberRange(1, count);
    rainbow.setSpectrumByArray(coloursArr);
    var hexCodes = [];
    for (var i = 1; i <= count; i++) {
        var hexColour = rainbow.colourAt(i);

        // Convert the color back into gamma space
        colour = [
            hexColour.substring(0,2),
            hexColour.substring(2,4),
            hexColour.substring(4,6)
        ];
        hexColour = "";
        for (let j=0; j<colour.length; j++) { 
            colour[j] = hexStoF(colour[j]); // Convert to float
            colour[j] = colour[j]**(1/gamma); // Actual linear->gamma conversion
            hexColour += ftoHexS(colour[j]); // Convert back to hex
        }

        hexCodes.push('#' + hexColour.replace(/0/g, "1"));
    }
    return hexCodes;
}

function createGradient(count, coloursArr){
    // Temporarily use linear gradient by default until option to switch mode is made
    return createLinearGradient(count, coloursArr);

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
    colourValues = [];
    pickers.forEach(x => {
        colourValues.push(x.value);
    });
    name = name.trim();
    let count = name.length;
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

    colours = createGradient(count, colourValues);

    let colouredString = '';
    let colourCodeStr  = '';
    for (let i in colours){
        colouredString +=  `<span style="color: ${colours[i]}" class="${formattingClasses}">${name[i]}</span>`;
        colourCodeStr += mcHex(colours[i]) + formattingCodes + name[i]
    }

    
    coloursOutLabel.innerText = `Colours (${colourCodeStr.length} chars) (Click To Copy):`;
    nickOutLabel.innerText = `/nick Command (${("/nick + " + colourCodeStr).length} chars) (Click To Copy):`;

    document.querySelector("#out-coloured").innerHTML = colouredString;

    let outColourElem = document.querySelector("#out-colour")
    outColourElem.value = colourCodeStr;
    if(colourCodeStr.length > 250){
        outColourElem.style.color = '#f55';
    }else{
        outColourElem.style.color = '#fff';
    }

    let outNickElem = document.querySelector("#out-nick")
    outNickElem.value = "/nick " + colourCodeStr;
    if(("/nick " + colourCodeStr).length > 250){
        outNickElem.style.color = '#f55';
    }else{
        outNickElem.style.color = '#fff';
    }

    return colouredString;

}
