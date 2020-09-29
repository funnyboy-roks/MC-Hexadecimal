inField = document.querySelector("#hex-in");
inField.value = location.hash;
convertToMC(inField);

function convertToMC(obj) {
  obj.value = obj.value.replace(/[^0-9a-f#]/g, '');
  let maxLen = obj.value.startsWith('#') ? 7 : 6;
  obj.value = obj.value.substring(0, maxLen)

  if (obj.value.startsWith('#')) {
    obj.value = '#' + obj.value.substring(1).replace(/#/g, '');
  } else {
    obj.value = '#' + obj.value.replace(/#/g, '');

  }

  hexIn = obj.value.replace(/#/g, "");
  output = "";
  matchRegex = hexIn.match(/[0-9a-f]{6}|[0-9a-f]{3}/i);
  if ((hexIn.length == 6 || hexIn.length == 3) && matchRegex) {
    if (matchRegex[0] == hexIn) {
      output = "&x";
      if (hexIn.length == 3) {
        temp = "";
        for (x of hexIn) {
          temp += x + x;
        }
        hexIn = temp;
      }
      for (x of hexIn) {
        output += `&${x}`;
      }
    }
    var rgb = parseInt(hexIn, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 100) {
      document.querySelector("#out").style.color = "#fff";
    } else {
      document.querySelector("#out").style.color = "#000";
    }
  } else {
    document.querySelector("#out").style.color = "#000";
  }

  // return hexIn
  location.hash = hexIn;
  document.querySelector("html").style.background = "#" + hexIn;
  document.querySelector("#out").innerText = output;
}