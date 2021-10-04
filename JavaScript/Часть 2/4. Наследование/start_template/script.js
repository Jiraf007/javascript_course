// Получаем контекст для рисования на Canvas
let ctx = game.getContext('2d');

let cnvWidth = document.documentElement.clientWidth;
let cnvHeight = document.documentElement.clientHeight;
console.log(cnvWidth, cnvHeight);


// == ОПИСАНИЕ КЛАССОВ ========================================================

// Создание класса круг
class Circle {
	// Конструктор. Выполняется при создании объекта
	constructor(x, y, r, imgUrl) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.img = new Image();
		this.img.src = imgUrl;
		// отрисуем на canvas при создании
		this.draw();
	}
	// нарисовать объект на canvas
	draw() {
		ctx.drawImage(this.img, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
	}
	hasCollisionWith(object) {
		if (this.getDistanceTo(object) < this.r + object.r)
			return true;
		else
			return false;
	}
}

class DynamicCircle extends Circle {
	constructor(x, y, r, imgUrl, speed) {
		super(x, y, r, imgUrl);
		this.speed = speed;
	}
	// Перемещение на x и y относительно текущей позиции
	move(x, y) {
		this.y += y;
		this.x += x;
	}
	moveToPoint(x, y) {
		let alpha = Math.atan2(y - this.y, x - this.x) / Math.PI * 180;
		let deltaX = this.speed * Math.cos(alpha * (Math.PI / 180));
		let deltaY = this.speed * Math.sin(alpha * (Math.PI / 180));
		// перемещаем игрока
		this.move(deltaX, deltaY);
	}
	getDistanceTo(object) {
		let d_x = Math.pow(this.x - object.x, 2);
		let d_y = Math.pow(this.y - object.y, 2);
		return Math.sqrt(d_x + d_y);
	}
	growing(r) {
		this.r += r;
	}
	deceleration() {
		this.speed -= 0.03;
	}
	decrease(r) {
		this.r -= r;
	}
}

class Player extends DynamicCircle {
	moveToCursor() {
		this.moveToPoint(cursor.x, cursor.y);
	}
}

class Enemy extends DynamicCircle {
	setTarget(object) {
		this.targetX = object.x;
		this.targetY = object.y;
	}
	moveToTarget() {
		this.moveToPoint(this.targetX, this.targetY);
	}
	findTargetOf(array, player) {
		let minDistance = this.getDistanceTo(player);
		let minObject = player;

		for (let i in array) {
			if (this.getDistanceTo(array[i]) < minDistance) {
				minDistance = this.getDistanceTo(array[i]);
				minObject = array[i];
			}
		}
		this.setTarget(minObject);
	}
}

class DynamicFood extends DynamicCircle {
	setPoint() {
		if ((Math.round(this.pointX - this.x) <= 1) && (Math.round(this.pointY - this.y) <= 1)) {
			this.pointX = getRandomInt(0, 800);
			this.pointY = getRandomInt(0, 400);
		}
		// console.log(Math.round(this.pointX - this.x), Math.round(this.pointY - this.y));
		// console.log(this.pointX, this.pointY);
		// this.moveToRandomPoint();
	}
	moveToRandomPoint() {
		this.moveToPoint(this.pointX, this.pointY);
		// if ((this.x == this.pointX) && (this.y ==this.pointY)) {
		// 	this.setPoint();
		// }
	}
}

class Bomb extends Circle {
	setPoint() {
		this.x = getRandomInt(0, 800);
		this.y = getRandomInt(0, 400);
	}
}

class Bush extends Circle {
	setPoint() {
		this.x = getRandomInt(0, 800);
		this.y = getRandomInt(0, 400);
	}
}




// === ОСНОВНАЯ ЛОГИКА ИГРЫ ===================================================

// Объект, в котором мы храним  координаты мыши
let cursor = { x: 0, y: 0 }
// При движении курсора в области canvas обновляем координаты мыши
game.addEventListener('mousemove', function (e) {
	cursor.x = e.clientX - game.getBoundingClientRect().left;
	cursor.y = e.clientY - game.getBoundingClientRect().top;
});


// создание массива, в котором будем хранить собираемые кружки
let targetsArr = [];
// наполняем массив
for (let i = 0; i < 27; i++) {
	let x = getRandomInt(0, 800);
	let y = getRandomInt(0, 400);
	targetsArr.push(new Circle(x, y, 10, 'img/tomato.png'));
}

let tomatoTimer = setInterval(function () {
	targetsArr.push(new Circle(getRandomInt(0, 800), getRandomInt(0, 400), 10, 'img/tomato.png'))
}, 2000);

// Создание нашего персонажа в позиции 100х100, радиусом 10, цвет - зеленый
let player = new Player(100, 100, 10, 'img/happy-1.png', 2.5);

// let enemy = new Enemy(0, 0, 10, 'img/monster-1.png', 2);
let enemiesArr = [];
// наполняем массив
for (let i = 0; i < 3; i++) {
	let x = getRandomInt(0, 800);
	let y = getRandomInt(0, 400);
	enemiesArr.push(new Enemy(x, y, 10, 'img/monster-1.png', 2));
}
let enemyTimer = setInterval(function () {
	let x = getRandomInt(0, 800);
	let y = getRandomInt(0, 400);
	enemiesArr.push(new Enemy(x, y, 10, 'img/monster-1.png', 2));
}, 10000);


let dynamicFood = new DynamicFood(getRandomInt(0, 800), getRandomInt(0, 400), 15, 'img/bell-pepper.png', 2);
dynamicFood.pointX = dynamicFood.x;
dynamicFood.pointY = dynamicFood.y;
let dynamicFoodTimer = setInterval(function () {
	targetsArr.push(dynamicFood);
}, 4000);

let bomb = new Bomb(getRandomInt(0, 800), getRandomInt(0, 400), 10, 'img/bomb.png');

let bush = new Bush(getRandomInt(0, 800), getRandomInt(0, 400), 15, 'img/bush.png')

let background = new Image();
background.src = 'img/background2.jpg';

let requestId;
let gameOverFlag = 0;
let winFlag = 0;

// Основной цикл игры. Здесь все пересчитывается и отрисовывается новый кадр
// Выполняется снова и снова бесконечное кол--во раз
function updState() {
	player.moveToCursor();

	if (enemiesArr.length != 0) {
		for (let i in enemiesArr) {
			if (targetsArr.length > 0) enemiesArr[i].findTargetOf(targetsArr, player);
			else enemiesArr[i].setTarget(player);
			enemiesArr[i].moveToTarget();
		}

	}

	dynamicFood.setPoint();
	dynamicFood.moveToRandomPoint();

	// проверка коллизий (столкновение с другими кружками)
	for (let i in targetsArr) {
		if (player.hasCollisionWith(targetsArr[i])) {
			player.growing(targetsArr[i].r / 10);
			player.deceleration();
			targetsArr.splice(i, 1);
		}
		else if (enemiesArr.length != 0) {
			for (let i in enemiesArr) {
				for (let j in targetsArr) {
					if (enemiesArr[i].hasCollisionWith(targetsArr[j])) {
						enemiesArr[i].growing(targetsArr[j].r / 10);
						enemiesArr[i].deceleration();
						targetsArr.splice(j, 1);
					}
				}
			}
		}
	}

	if (player.hasCollisionWith(bomb)) {
		player.decrease(player.r / 3);
		if (player.r > 7) {
			bomb.setPoint();
		}
		else gameOverFlag = 1;
	}

	if (player.hasCollisionWith(bush) && (player.r < bush.r)) {
		player.decrease(player.r / 5);
		if (player.r > 7) {
			bomb.setPoint();
		}
		else gameOverFlag = 1;
	}

	if (enemiesArr.length != 0) {
		for (let i in enemiesArr) {
			if (enemiesArr[i].hasCollisionWith(bomb)) {
				enemiesArr[i].decrease(enemiesArr[i].r / 3);
				if (enemiesArr[i].r > 7) {
					bomb.setPoint();
				}
				else enemiesArr.splice(i, 1);
			}
			else if (enemiesArr[i].hasCollisionWith(bush) && (enemiesArr[i].r < bush.r)) {
				enemiesArr[i].decrease(enemiesArr[i].r / 5);
				if (enemiesArr[i].r > 7) {
					bomb.setPoint();
				}
				else enemiesArr.splice(i, 1);
			}
			else if (enemiesArr[i].hasCollisionWith(player)) {
				if (player.r <= enemiesArr[i].r) gameOverFlag = 1;
				else {
					player.growing(enemiesArr[i].r / 10);
					enemiesArr.splice(i, 1);
				}
			}
		}
	}

	if (enemiesArr.length == 0) winFlag = 1;

	if (gameOverFlag == 1) {
		gameOver();
	}
	else if (winFlag == 1) {
		win();
	}
	else {
		requestId = requestAnimationFrame(updState);
		redraw();
	}
	//очистка холста и отрисовка нового кадра

	// Добавляем эту функцию в очередь на выполнение по внутреннему таймеру браузера
}
// Вызовем хотя бы 1 раз, чтобы начать цикл
updState();




// == ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =================================================

// Функция перерисовки кадра на canvas
function redraw() {
	// Очистить весь канвас
	ctx.clearRect(0, 0, 800, 400);

	ctx.drawImage(background, 0, 0, 800, 400);
	// рисуем игрока
	player.draw();

	for (let i in enemiesArr) {
		enemiesArr[i].draw();
	}

	bomb.draw();

	bush.draw();

	//перерисовываем города-цели
	for (let index in targetsArr) {
		targetsArr[index].draw();
	}
}


function stopAnimation() {
	cancelAnimationFrame(requestId);
	clearInterval(tomatoTimer);
	clearInterval(dynamicFoodTimer);
	clearInterval(enemyTimer);
}

function gameOver() {
	stopAnimation();
	ctx.clearRect(0, 0, 800, 400);
	ctx.font = "48px serif";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('GAME OVER', 400, 200);
}

function win() {
	stopAnimation();
	ctx.clearRect(0, 0, 800, 400);
	ctx.font = "48px serif";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('YOU WON', 400, 200);
}


// генератор случайных чисел
// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}