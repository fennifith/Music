var audio;
var compositions;


function loadCompositions(element) {
	var dataRequest = new XMLHttpRequest();
    dataRequest.onreadystatechange = function () {
      if (dataRequest.readyState === 4) {
        if (dataRequest.status === 200 || dataRequest.status == 0) {
          compositions = JSON.parse(dataRequest.responseText);
					var html = "";
					for (var i = 0; compositions[i]; i++) {
						html += "<div class=\"composition\" onclick=\"startAudio(" + i + ");\"><div class=\"pdf\" onclick=\"location.href = \'compositions/" + compositions[i].id + "/score.pdf\';\"><i class=\"material-icons\">picture_as_pdf</i></div><img src=\"compositions/" + compositions[i].id + "/thumb.png\"><div class=\"info\"><p><b>" + compositions[i].name + "</b><br>" + compositions[i].date + "</p></div></div>";
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
					for (var i = 0; obj[i]; i++) {
							loadYouTubePractice(obj[i], element);
					}
        }
      }
    }
    dataRequest.open("GET", "https://theandroidmaster.github.io/Music/practice/data.json", true);
    dataRequest.send(null);
}

function loadYouTubePractice(id, element) {
	var dataRequest = createCORSRequest("GET", "https://noembed.com/embed?url=" + getYouTubeUrl(id));
    dataRequest.onreadystatechange = function () {
      if (dataRequest.readyState === 4) {
        if (dataRequest.status === 200 || dataRequest.status == 0) {
          var obj = JSON.parse(dataRequest.responseText);
					element.innerHTML += "<div class=\"practice\" onclick=\"location.href = \'" + obj.url + "\';\"><img src=\"" + obj.thumbnail_url +"\"><div class=\"info\"><p>" + obj.title + "</p></div></div>";
        }
      }
    }
    dataRequest.send(null);
}

function startAudio(i) {
	if (audio) {
		audio.pause();
	}

	audio = new Audio("compositions/" + compositions[i].id + "/audio.wav");
	audio.play();
	onPlay(compositions[i]);
}

function playAudio(i) {
	if (audio) {
		audio.play();
		onPlay();
	}
}

function pauseAudio() {
	if (audio) {
		audio.pause();
	}

	onPause();
}

function getYouTubeUrl(id) {
	return "https://youtu.be/" + id;
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

setInterval(function () {
	if (audio)
		onTimeUpdate(audio.currentTime, audio.duration);
}, 10);
