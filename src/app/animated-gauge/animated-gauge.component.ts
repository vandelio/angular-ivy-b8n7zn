import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'animated-gauge',
  templateUrl: './animated-gauge.component.html',
  styleUrls: ['./animated-gauge.component.scss'],
})
export class AnimatedGaugeComponent implements OnInit {
  counter: number = 0;
  fullgauge = 472;
  numberElement;
  value: number;
  animatedValue: number = 0;

  styleSheet = null;

  constructor() {}

  ngOnInit() {
    this.numberElement = document.getElementById('number');
    this.value = Number(this.numberElement.getAttribute('data-value'));
    this.numberElement.innerHTML = this.value;

    this.animatedValue = gaugeCalculation(this.value, this.fullgauge);

    function gaugeCalculation(value, fullgauge) {
      return fullgauge - (fullgauge * value) / 100;
    }

    setTimeout(() => {
      setInterval(() => {
        if (this.counter === this.value) {
          clearInterval();
        } else {
          this.counter += 1;
          this.numberElement.innerHTML = this.counter + '%';
        }
      }, 10);
    }, 500);

    if (
      this.dynamicAnimation(
        'gaugeAnim',
        '100% {stroke-dashoffset: ' + this.animatedValue + ';}'
      )
    ) {
      let circle: any = document.querySelector('#svgCircle');
      circle.style.animation = 'gaugeAnim 2s linear forwards';
    }
  }

  dynamicAnimation(name, styles) {
    if (!this.styleSheet) {
      this.styleSheet = document.createElement('style');
      this.styleSheet.type = 'text/css';
      document.head.appendChild(this.styleSheet);
    }

    this.styleSheet.sheet.insertRule(
      `@keyframes ${name} {${styles}}`,
      this.styleSheet.length
    );
    return true;
  }
}
