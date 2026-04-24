let points = [];
let numPoints = 80;
let margin = 80;

function setup() {
  createCanvas(600, 600);
  
  // Crear puntos dentro de un marco
  for (let i = 0; i < numPoints; i++) {
    let x = random(margin, width - margin);
    let y = random(margin, height - margin);
    let vx = random(-0.5, 0.5);
    let vy = random(-0.5, 0.5);
    points.push({ x, y, vx, vy });
  }
}

function draw() {
  background(255); // negro con toque café oscuro
  
  drawFrame();
  updatePoints();
  connectPoints();
}

function drawFrame() {
  noFill();
  stroke(80, 50, 30); // café
  strokeWeight(3);
  
  let offset = sin(frameCount * 0.02) * 10;
  
  rect(
    margin - offset,
    margin - offset,
    width - 2 * (margin - offset),
    height - 2 * (margin - offset)
  );
}

function updatePoints() {
  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    // Rebotar dentro del marco
    if (p.x < margin || p.x > width - margin) p.vx *= -1;
    if (p.y < margin || p.y > height - margin) p.vy *= -1;

    // Dibujar puntos
    noStroke();
    fill(90, 60, 30); // café claro
    circle(p.x, p.y, 4);
  }
}

function connectPoints() {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      
      if (d < 100) {
        stroke(50, 30, 20, map(d, 0, 100, 180, 0)); // café oscuro con transparencia
        strokeWeight(1);
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }
}