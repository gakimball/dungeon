const MIN_WIDTH = 40;
const MAX_WIDTH = 60;
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 40;
const ROOM_ATTEMPTS = 100;

var mapViewer = document.querySelector('#map');

export default class Map {
  constructor() {
    this.map = [];
    this.WIDTH = 300;
    this.HEIGHT = 100;
    this.ROOM_COUNT = 10;

    this.setupMap();
    this.createRooms();
  }

  render() {
    mapViewer.innerHTML = '';

    for (var x = 0; x < this.WIDTH - 1; x++) {
      var row = this.map[x];

      for (var y = 0; y < this.HEIGHT - 1; y++) {
        var cell = row[y];
        mapViewer.innerHTML += cell;
      }

      mapViewer.innerHTML += '<br>'
    }
  }

  setupMap() {
    for (var x = 0; x < this.WIDTH - 1; x++) {
      this.map[x] = [];

      for (var y = 0; y < this.HEIGHT - 1; y++) {
        this.map[x][y] = ' '
      }
    }
  }

  createRooms() {
    var rooms = [];

    for (var i = 0; i < this.ROOM_COUNT; i++) {
      var width = getRandomInt(MIN_WIDTH, MAX_WIDTH);
      var height = getRandomInt(MIN_HEIGHT, MAX_HEIGHT);

      for (var j = 0; j < ROOM_ATTEMPTS; j++) {
        var x = getRandomInt(0, this.WIDTH - 1);
        var y = getRandomInt(0, this.HEIGHT - 1);
        var room = new Rectangle(x, y, width, height);
        var overlap = false;

        rooms.map(val => {
          if (room.overlaps(val) || room.X2 >= this.WIDTH - 1 || room.Y2 >= this.HEIGHT - 1) overlap = true;
        });

        if (!overlap) {
          rooms.push(room);
          break;
        }
      }
    }

    rooms.map(room => {
      for (var x = room.X1; x <= room.X2; x++) {
        for (var y = room.Y1; y <= room.Y2; y++) {
          var ch = '.';
          if (y === room.Y1 || y === room.Y2) ch = '#';
          else if (x === room.X1 || x === room.X2) ch = '#';

          this.map[x][y] = ch;
        }
      }
    });
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.X1 = x;
    this.Y1 = y;
    this.X2 = x + w;
    this.Y2 = y + h;
    this.WIDTH = w;
    this.HEIGHT = h;
  }

  overlaps(rect) {
    var A = this;
    var B = rect;

    return 
      A.X1 < B.X2 &&
      A.X2 > B.X1 &&
      A.Y1 < B.Y2 &&
      A.Y2 > B.Y1;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
