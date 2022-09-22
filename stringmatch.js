let text = document.querySelector('#large_input');
let query = document.querySelector('#query');

const refreshDisplay = function(text) {
    document.getElementById("results").innerHTML = text;
}

refreshDisplay(text.value);
const processTextInput = function(textIn, queryIn) {
    if (textIn != "") {
        stringMatch(textIn, queryIn);
    } else {
        document.getElementById("results").innerHTML = textIn;
    }
}

text.addEventListener('keyup', e => {
    
    textContent = e.target.value.toString();
    refreshDisplay(textContent)
    processTextInput(textContent, document.getElementById("query").value);

})

query.addEventListener('keyup', e => {

    queryContent = e.target.value.toString();
    processTextInput(document.getElementById("large_input").value, queryContent);
})

function stringMatch(parent, child) {

    let matchRanges = [];
    let reqSum = 0, currSum = 0;

    for (let i = 0; i < child.length; i++) {
        reqSum += child.charCodeAt(i);
        currSum += parent.charCodeAt(i);
    }

    let left = 0, right = child.length;

    while (right <= parent.length) {

        if (currSum === reqSum) {
            if (parent.substring(left, right) === child) {
                matchRanges.push([left, right]);
            }
        }

        currSum += parent.charCodeAt(right++);
        currSum -= parent.charCodeAt(left++);
    }

    if (matchRanges.length > 0) {
        let parentAsCharArray = [...parent];
        generateHighlightedText(parentAsCharArray, matchRanges)
    } 
}

function generateHighlightedText(charArray, ranges) {
    for (let range of ranges) {
        for (let i = range[0]; i < range[1]; i++) {
            charArray[i] = `<span style="background-color: #90ee90">${charArray[i]}</span>`;
        }
    }
    document.getElementById("results").innerHTML = charArray.join('');

}

