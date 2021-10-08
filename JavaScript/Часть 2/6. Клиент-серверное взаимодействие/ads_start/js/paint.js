'use strict';

let cnvEl = document.querySelector('canvas');
let ctx = cnvEl.getContext('2d');

let drawMode = 0;

cnvEl.addEventListener('mousemove', function (e) {
	let offsetY = cnvEl.getBoundingClientRect().top;
	let offsetX = cnvEl.getBoundingClientRect().left;

	let color = document.querySelector('#colorField').value;

	if (drawMode) {
		ctx.beginPath();
		ctx.arc(e.clientX - offsetX, e.clientY - offsetY, 10, 0, 2 * Math.PI)
		ctx.fillStyle = color;
		ctx.fill();
	}
});

cnvEl.addEventListener('mousedown', function () {
	drawMode = 1;
});
cnvEl.addEventListener('mouseup', function () {
	drawMode = 0;
});