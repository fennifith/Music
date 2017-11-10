function loadCompositions(element) {
	var dataRequest = new XMLHttpRequest();
    dataRequest.onreadystatechange = function () {
      if (dataRequest.readyState === 4) {
        if (dataRequest.status === 200 || dataRequest.status == 0) {
          var obj = JSON.parse(dataRequest.responseText);
					var html = "";
					for (var i = 0; obj[i]; i++) {
						html += "<div class=\"composition\"><img src=\"compositions/" + obj[i].id + "/thumb.png\"><div class=\"info\"><p><b>" + obj[i].name + "</b><br>" + obj[i].date + "</p></div></div>";
					}
					element.innerHTML = html;
        }
      }
    }
    dataRequest.open("GET", "https://theandroidmaster.github.io/Music/compositions/data.json", true);
    dataRequest.send(null);
}

function loadPractice(element) {
	var dataRequest = new XMLHttpRequest();
    dataRequest.onreadystatechange = function () {
      if (dataRequest.readyState === 4) {
        if (dataRequest.status === 200 || dataRequest.status == 0) {
          var obj = JSON.parse(dataRequest.responseText);
					//TODO: make request to
        }
      }
    }
    dataRequest.open("GET", "https://theandroidmaster.github.io/Music/practice/data.json", true);
    dataRequest.send(null);
}
