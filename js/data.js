var audio;
var compositions;
var practice;

function loadCompositions(element) {
	var dataRequest = new XMLHttpRequest();
    dataRequest.onreadystatechange = function () {
      if (dataRequest.readyState === 4) {
        if (dataRequest.status === 200 || dataRequest.status == 0) {
          compositions = JSON.parse(dataRequest.responseText);
					var html = "";
					for (var i = 0; compositions[i]; i++) {
						html += "<div class=\"composition\" onclick=\"startCompositionAudio(" + i + ");\"><div class=\"pdf\" onclick=\"window.open(\'compositions/" + compositions[i].id + "/score.pdf\', \'_blank\');\"><i class=\"material-icons\">picture_as_pdf</i></div><img src=\"compositions/" + compositions[i].id + "/thumb.png\"><div class=\"info\"><p><b>" + compositions[i].name + "</b><br>" + compositions[i].date + "</p></div></div>";
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
          practice = JSON.parse(dataRequest.responseText);
					var html = "";
					for (var i = 0; practice[i]; i++) {
						html += "<div class=\"practice\" onclick=\"startPracticeAudio(" + i + ");\"><img src=\"practice/" + practice[i].id +"/thumb.png\"><div class=\"info\"><b>" + practice[i].name + "</b></div></div>";
					}
					element.innerHTML = html;
        }
      }
    }
    dataRequest.open("GET", "https://theandroidmaster.github.io/Music/practice/data.json", true);
    dataRequest.send(null);
}

function startCompositionAudio(i) {
	if (audio) {
		audio.pause();
	}

	audio = new Audio("compositions/" + compositions[i].id + "/audio.wav");
	audio.play();
	onPlay(compositions[i]);
}

function startPracticeAudio(i) {
	if (audio) {
		audio.pause();
	}

	audio = new Audio("practice/" + practice[i].id + "/audio.mp3");
	audio.play();
	onPlay(practice[i]);
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
