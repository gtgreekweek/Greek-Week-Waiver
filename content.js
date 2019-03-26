
function nodeInsertedCallback(event) {
    var people = $("tbody tr .list-item a")

    chrome.storage.local.get(["names"], function(result) {
        if (!!result.names) {
            for (var i = 0; i < people.length; i++) {
                var person = people.eq(i)
                var name = person.html()
                
                var goodText = "✔︎"
                var badText = "<b>(No Waiver)</b>"
                
                if (name.indexOf(goodText) != -1 || name.indexOf(badText) != -1) {
                    continue //if the name contains either good or bad text, then this person has already been inspected
                }
                
                hashed_name = sha256_digest(name)
                var hasSignedWaiver = (result.names.indexOf(hashed_name) != -1)
                
                var textToAdd = (hasSignedWaiver) ? goodText : badText
                person.html(name + " " + textToAdd)
                
                if (!hasSignedWaiver) {
                    person.css('background', '#fcc')
                }
            }
        } 
    });
    
    
    
};

document.addEventListener('DOMNodeInserted', nodeInsertedCallback)

// this might be an irresponsible way to do this
// http://stackoverflow.com/questions/2844565/is-there-a-javascript-jquery-dom-change-listener/11546242#11546242 ?