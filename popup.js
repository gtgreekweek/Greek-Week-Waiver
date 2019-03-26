var dataDocument = "https://docs.google.com/spreadsheets/d/1_5586lebYShIq5it1UYGOn-38UrryW0PyFz4Ylt3jaY/pubhtml"

function updateWaiverChecker() {
	Tabletop.init( 
        { 
        	key: dataDocument,
          	simpleSheet: false,
          	callback: function(data, tabletop) {
              
				namesArray = []

				for (var i = 0; i < data["Names"].elements.length; i++) {
					entry = data["Names"].elements[i]
					namesArray.push(entry["Name"])
				}
              
              	last_updated = data["Updated"].elements[0]["LastUpdated"];
              	chrome.storage.local.set({
              		last_updated: last_updated,
              		names: namesArray
              	}, function() {
					document.getElementById("last_updated_text").innerHTML = new Date(last_updated).toLocaleString()
					document.getElementById("last_refreshed_text").innerHTML = new Date().toLocaleString()
				});
      		},
        }
    );
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', updateWaiverChecker);
	chrome.storage.local.get(["last_updated"], function(result) {
		if (!result.last_updated) {
			document.getElementById("last_updated_text").innerHTML = "Never"
			document.getElementById("last_refreshed_text").innerHTML = "Never"
		} else {
			document.getElementById("last_updated_text").innerHTML = new Date(result.last_updated).toLocaleString()
			document.getElementById("last_refreshed_text").innerHTML = new Date().toLocaleString()
		}
	});
});