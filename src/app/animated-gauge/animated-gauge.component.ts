import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'animated-gauge',
  templateUrl: './animated-gauge.component.html',
  /*template: `
      <div class="gauge">
        <div class="skill">
          <div class="outer">
            <div class="inner">
              <div data-value="65" id="number">65%</div>
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="160px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#e91e63" />
                <stop offset="100%" stop-color="#673ab7" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" stroke-linecap="round" />
          </svg>
        </div>
      </div>
    `,*/
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
