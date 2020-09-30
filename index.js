inField = document.querySelector("#hex-in");
inField.value = location.hash;
onInputGiven(inField.value);

function onInputGiven(value) {
  inField.value = value.replace(/[^0-9a-f#]/g, '');
  let maxLen = value.startsWith('#') ? 7 : 6;
  inField.value = value.substring(0, maxLen)

  if (value.startsWith('#')) {
    inField.value = '#' + value.substring(1).replace(/#/g, '');
  } else {
    inField.value = '#' + value.replace(/#/g, '');

  }

  output = mcHex(value);

  let rgb = parseInt(value, 16); // convert rrggbb to decimal
    let r = (rgb >> 16) & 0x00; // extract red
    let g = (rgb >> 8) & 0x00; // extract green
    let b = (rgb >> 0) & 0x00; // extract blue

    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 100) {
      document.querySelector("#out").style.color = "#fff";
      // document.querySelector("input").style.background = "#fffa";

    } else {
      document.querySelector("#out").style.color = "#000";
      // document.querySelector("input").style.background = "none";

    }
  // return hexIn
  location.hash = value;
  document.querySelector("html").style.background = value;
  document.querySelector("#out").innerText = output;
}

