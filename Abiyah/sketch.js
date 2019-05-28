let scoreboard = {  }

let pro = document.getElementById("pro")
let time
let enemy
let enemyRadius
let speed
let level
let direction_h
let direction_v
let score;
let x
let y
function setup() {
  createCanvas(windowWidth, windowHeight);
s = width/868
  x=222
  y=350
  a=150
  b=200
  direction_h=[1,1,1,1]
  direction_v=[1,1,1,1]
  score = 2
  level = 1
  speed = 4
  enemyRadius = 30
  enemy = 4
  time = 1000

  o=[300,400,500,600]
  p=[129, 229, 329, 429]
}


 function draw() {
   if (time > 0) {

   background(204, 229, 255);
     time = time-1
       
   for (i=0; i<enemy; i=i+1) {
      circle(o[i], p[i], enemyRadius);
      fill(251, 83, 83);
      o[i] = o[i] + speed*direction_h[i]
      p[i] = p[i] + speed*direction_v[i]

      if (dist( x*s,y, o[i],p[i]) < 20 + enemyRadius*s) {
        score = score + -3
    }
      if ( o[i] > width || o[i] < 0) {
        direction_h[i] = direction_h[i] * -1
      }
       if (p[i] > height || p[i] < 0) {
        direction_v[i] = direction_v[i] * -1
      }
  }
   	if (score > 100 && level == 1) {
      o = [300,420,500,630]
      direction_h = [1,-1, 1,-1]
      speed = speed + 2
      level = 2
    }
    if (score > 120 && level == 2) {
      o = [300,420,500,630]
      direction_h = [1,-1, 1,-1]
      speed = speed + 2
      level = 3
    }

    if (score > 150 && level == 3) {
      o = [300,420,500,630]
      direction_h = [1,-1, 1,-1]
      speed = speed + 2
      enemyRadius = enemyRadius + 20
      enemy = enemy - 1
      level = 4
    }




  fill(225, 2, 239);
  circle(x, y, 20);
  fill(153, 239, 2 );
  circle(a, b, 50);
  fill(251, 83, 83);
  a = a + 6
  b = b + 3
   if (dist( x,y, a,b) < 20 + 50) {
	score = score + 1
}
   if (keyIsDown(LEFT_ARROW)) {
    x = x - 5
  }
     if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5
  }
     if (keyIsDown(UP_ARROW)) {
    y = y - 5
  }

     if (keyIsDown(DOWN_ARROW)) {
    y = y + 5
  }
  if ( a > width) {
	a = 0
  }
  if ( b > height) {
	b = 0
    
  }
  
  textSize(25)
  text("Score: " + score, 150, 200)  
  text("Time: " + time, 300,250)
}
else{
  pro.innerHTML = "Name? <input id='record'><button onclick='restart()'>Restart</button>"
  let record = document.getElementById("record")
  noLoop()
}
   
 }
function restart() { 
		name = record.value 
       
		if (name != "") { 
			scoreboard[name] = score
		}
alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 1000
		score = 0
        level = 1
        o=[300,400,500,600]
        p=[129, 229, 329, 429]
        direction_h=[1,1,1,1]
        direction_v=[1,1,1,1]

        speed = 4
        enemyRadius = 30
        enemy = 4
		loop()
		pro.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

