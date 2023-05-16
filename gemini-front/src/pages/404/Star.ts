class Star {
  x: number;
  y: number;
  length: number;
  opacity: number;
  factor: number;
  increment: number;

  constructor(x: number, y: number, length: number, opacity: number) {
    this.x = Math.round(x);
    this.y = Math.round(y);
    this.length = Math.round(length * (window.innerWidth / 1920)); // Adjust the length of the stars based on screen width
    this.opacity = opacity;
    this.factor = 1;
    this.increment = Math.random() * 0.03;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    if (this.opacity > 1) {
      this.factor = -1;
    } else if (this.opacity <= 0) {
      this.factor = 1;
      this.x = Math.round(Math.random() * window.innerWidth);
      this.y = Math.round(Math.random() * window.innerHeight);
    }

    this.opacity += this.increment * this.factor;
    context.beginPath();
    for (let i = 5; i--; ) {
      context.lineTo(0, this.length);
      context.translate(0, this.length);
      context.rotate((Math.PI * 2) / 10);
      context.lineTo(0, -this.length);
      context.translate(0, -this.length);
      context.rotate(-((Math.PI * 6) / 10));
    }
    context.lineTo(0, this.length);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
    context.shadowBlur = 5;
    context.shadowColor = "#ffff33";
    context.fill();

    context.restore();
  }
}

export default Star;
