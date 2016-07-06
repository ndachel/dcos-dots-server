var exports = module.exports = {}

function Point (x,y)
{
  this.x = x;
  this.y = y;
}

function Square (){
  this.points = new Array();
  this.lines = new Array();
  this.owner = -1;
}

function Line (p1, p2, open){
  this.p1 = p1;
  this.p2 = p2;
  this.open = open;
}

exports.createBoard = function(n){
  var x, y, i, count = 0;
  var squareArr = new Array;
  var pointArr = new Array;
  //Build the points
  for (x = 0; x < n; x++){
    for (y = 0; y < n; y++){
      pointArr.push(new Point(x,y))
      count ++;
    }
  }

  //Build the squares and lines data
  var sq = Math.pow((n-1),2);
  for (i = 0; i < sq; i++){squareArr.push(new Square); }
  for (i = 1; i <= sq; i++){
    var row = Math.ceil(i/(n-1));
    var col = (i - ((n-1) * (row - 1)));
    squareArr[i-1].points.push(new Point(col -1, row -1));
    squareArr[i-1].points.push(new Point(col, row -1));
    squareArr[i-1].points.push(new Point(col, row));
    squareArr[i-1].points.push(new Point(col -1, row));
    squareArr[i-1].lines.push(new Line(squareArr[i-1].points[0], squareArr[i-1].points[1],true));
    squareArr[i-1].lines.push(new Line(squareArr[i-1].points[1], squareArr[i-1].points[2],true));
    squareArr[i-1].lines.push(new Line(squareArr[i-1].points[2], squareArr[i-1].points[3],true));
    squareArr[i-1].lines.push(new Line(squareArr[i-1].points[3], squareArr[i-1].points[0],true));
  }
  return squareArr;
}
