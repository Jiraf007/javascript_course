// Получаем контекст для рисования на Canvas
let ctx = game.getContext('2d');




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
		this.speed -= 0.04;
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
for (let i = 0; i < 47; i++) {
	let x = getRandomInt(0, 800);
	let y = getRandomInt(0, 400);
	targetsArr.push(new Circle(x, y, 10, 'img/tomato.png'));
}

// Создание нашего персонажа в позиции 100х100, радиусом 10, цвет - зеленый
let player = new Player(100, 100, 10, 'img/happy-1.png', 2.5);

let enemy = new Enemy(0, 0, 10, 'img/monster-1.png', 2);

let dynamicFood = new DynamicFood(getRandomInt(0, 800), getRandomInt(0, 400), 15, 'img/bell-pepper.png', 2);
dynamicFood.pointX = dynamicFood.x;
dynamicFood.pointY = dynamicFood.y;
targetsArr.push(dynamicFood);

let bomb = new Bomb(getRandomInt(0, 800), getRandomInt(0, 400), 10, 'img/bomb.png');

let background = new Image();
background.src = 'img/background.jpg';

let requestId;
let gameOverFlag = 0;

// Основной цикл игры. Здесь все пересчитывается и отрисовывается новый кадр
// Выполняется снова и снова бесконечное кол--во раз
function updState() {
	player.moveToCursor();

	if (targetsArr.length > 0) enemy.findTargetOf(targetsArr, player);
	else enemy.setTarget(player);
	enemy.moveToTarget();

	dynamicFood.setPoint();
	dynamicFood.moveToRandomPoint();

	// проверка коллизий (столкновение с другими кружками)
	for (let i in targetsArr) {
		if (player.hasCollisionWith(targetsArr[i])) {
			player.growing(targetsArr[i].r / 10);
			player.deceleration();
			targetsArr.splice(i, 1);
		}
		else if (enemy.hasCollisionWith(targetsArr[i])) {
			enemy.growing(targetsArr[i].r / 10);
			enemy.deceleration();
			targetsArr.splice(i, 1);
		}
	}

	if (player.hasCollisionWith(bomb)) {
		player.decrease(player.r / 3);
		if (player.r > 7) {
			bomb.setPoint();
		}
		else gameOverFlag = 1;
	}
	if (enemy.hasCollisionWith(bomb)) {
		enemy.decrease(enemy.r / 3);
		bomb.setPoint();
	}

	if (enemy.hasCollisionWith(player)) {
		gameOverFlag = 1;
	}


	if (gameOverFlag == 1) {
		gameOver();
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

	enemy.draw();

	bomb.draw();

	//перерисовываем города-цели
	for (let index in targetsArr) {
		targetsArr[index].draw();
	}
}

function gameOver() {
	cancelAnimationFrame(requestId);
	ctx.clearRect(0, 0, 800, 400);
	ctx.font = "48px serif";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('GAME OVER', 400, 200);
}


// генератор случайных чисел
// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}