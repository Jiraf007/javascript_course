// Получаем контекст для рисования на Canvas
let ctx = game.getContext('2d');




// == ОПИСАНИЕ КЛАССОВ ========================================================

// Создание класса круг
class Circle {
	// Конструктор. Выполняется при создании объекта
	constructor(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		// отрисуем на canvas при создании
		this.draw();
	}
	// Перемещение на x и y относительно текущей позиции
	move(x, y) {
		this.y += y;
		this.x += x;
	}
	// нарисовать объект на canvas
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
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
for (let i = 0; i < 50; i++) {
	let x = getRandomInt(0, 800);
	let y = getRandomInt(0, 400);
	targetsArr.push(new Circle(x, y, 10, 'yellow'));
}
// Создание нашего персонажа в позиции 100х100, радиусом 10, цвет - зеленый
let player = new Circle(100, 100, 10, 'green');


// Основной цикл игры. Здесь все пересчитывается и отрисовывается новый кадр
// Выполняется снова и снова бесконечное кол--во раз
function updState() {
	// Вычисляем, как должен переместиться игрок
	let alpha = Math.atan2(cursor.y - player.y, cursor.x - player.x) / Math.PI * 180;
	let deltaX = 2 * Math.cos(alpha * (Math.PI / 180));
	let deltaY = 2 * Math.sin(alpha * (Math.PI / 180));
	// перемещаем игрока
	player.move(deltaX, deltaY);

	// проверка коллизий (столкновение с другими кружками)
	for (let i in targetsArr) {
		if (Math.abs(player.x - targetsArr[i].x) < 20 && Math.abs(player.y - targetsArr[i].y) < 20) {
			targetsArr.splice(i, 1);
		}
	}

	//очистка холста и отрисовка нового кадра
	redraw();
	
	// Добавляем эту функцию в очередь на выполнение по внутреннему таймеру браузера
	requestAnimationFrame(updState);
}
// Вызовем хотя бы 1 раз, чтобы начать цикл
updState();




// == ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =================================================

// Функция перерисовки кадра на canvas
function redraw() {
	// Очистить весь канвас
	ctx.clearRect(0, 0, 800, 400);
	// рисуем игрока
	player.draw();

	//перерисовываем города-цели
	for (let index in targetsArr) {
		targetsArr[index].draw();
	}
}


// генератор случайных чисел
// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}