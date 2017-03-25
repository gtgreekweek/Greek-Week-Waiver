

function nodeInsertedCallback(event) {
    $("tbody tr .list-item a").each(function (i, element) {
        console.log(element)
    });
};

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);