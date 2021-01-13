// Start scene
var scene = document.querySelector('a-scene');

(function start() {
	if (!scene.hasLoaded) {
		scene.addEventListener('loaded', start);
		return;
	}
}());

// Room name
var currentUrl = new URL(window.location),
	roomName   = currentUrl.search.substr(1);

if (!roomName) {
	roomName = Date.now();
	currentUrl.search = roomName;
	history.pushState({}, '', currentUrl.href);
}

var room = document.querySelector('[sharedspace]');
room.setAttribute('sharedspace', { room: roomName, hold: false });

// Orientation
room.addEventListener('avataradded', function onAdded(evt) {
	var avatar = evt.detail.avatar;

	if (!avatar.hasLoaded) {
		avatar.addEventListener('loaded', onAdded.bind(null, evt));
		return;
	}

	var avatarY = avatar.getAttribute('position').y;  
	avatar.object3D.lookAt(new THREE.Vector3(0, avatarY, 0));

	var radToDeg = THREE.Math.radToDeg,
		rotation = avatar.object3D.rotation;
		rotation.y += Math.PI;

	avatar.setAttribute('rotation', {
		x: radToDeg(rotation.x),
		y: radToDeg(rotation.y),
		z: radToDeg(rotation.z)
	});
});

/*
var username = prompt('Enter your username'),
	room     = document.querySelector('[sharedspace]');

room.addEventListener('enterparticipant', function(evt) {
	console.log('@' + username + ' join the room');
});

room.addEventListener('exitparticipant', function(evt) {
	console.log('@' + username + ' left the room');
});

// Swithcer
var presets = ['forest', 'matrix', 'japan'];
var environment = document.querySelector('[environment]');

function setEnvironment(preset) {
	environment.setAttribute('environment', { preset: preset });
}

function getNextPreset() {
	var currentPreset = environment.getAttribute('environment').preset,
		index         = presets.indexOf(currentPreset);

	return presets[(index + 1) % presets.length];
}

// Here comes the code to send and receive message….
window.addEventListener('keydown', function (evt) {
	if (evt.keyCode === 32) {
		var preset = getNextPreset();
		setEnvironment(preset);
		room.components.sharedspace.send('*', { type: 'environment', preset: preset });
	}
});
*/