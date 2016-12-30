var simpleSlider = function(options){
    this.slider = document.querySelector(options.selector);
    this.slides = document.querySelectorAll(options.selector + ' li');

    this.type = options.type ? options.type : 'slide';
    this.interval = options.interval ? options.interval : 3000;
    this.imgPadding = options.imgPadding ? options.imgPadding : '';
    this.animationSpeed = options.animationSpeed ? options.animationSpeed : 0.3;
    this.navigationColor = options.navigationColor ? options.navigationColor : '#000000';
    this.counter = 0;
};
simpleSlider.prototype.addStyle = function(){
    [].forEach.call(this.slides, function(slide){
        slide.style.cssText +=  'box-sizing: border-box;' +
                                'padding: ' + this.imgPadding + 'px;';
    });
    this.slider.parentNode.style.position = 'relative';
};

/* Slide */

simpleSlider.prototype.slideStyle = function(){
    var vievportWidth = this.slider.parentNode.offsetWidth * this.slides.length;
    var slideWidth = vievportWidth / this.slides.length;
    this.slider.style.width = vievportWidth + 'px';
    this.slider.style.transition = 'transform ' + this.animationSpeed + 's ease';
    this.slider.parentNode.style.overflow = 'hidden';
    [].forEach.call(this.slides, function(slide){
        slide.style.width = slideWidth +'px';
        slide.style.display = "block";
        slide.style.float = "left";
        slide.children[0].style.width = '100%';
    });
};
simpleSlider.prototype.slideRight = function(){
    this.counter += 100 / this.slides.length;
    this.counter = this.counter >=100 ? 0 : this.counter;
    this.slider.style.transform = "translateX(-" + this.counter + "%)";
};
simpleSlider.prototype.slideLeft = function(){
    this.counter -= 100 / this.slides.length;
    this.counter = this.counter < 0 ? 100 - 100 / this.slides.length : this.counter;
    this.slider.style.transform = "translateX(-" + this.counter + "%)";
};
simpleSlider.prototype.slideNavigation = function(){
    var left = document.createElement('p');
    var right = document.createElement('p');
    left.className = 'simpleLeft';
    right.className = 'simpleRight';
    left.style.cssText +=   'position: absolute; ' +
        'width: 25px; ' +
        'height:25px; ' +
        'left:15px; ' +
        'top:50%; ' +
        'border-left:2px solid' +  this.navigationColor + '; ' +
        'border-bottom:2px solid' +  this.navigationColor + ';' +
        'transform:translateY(-50%) rotate(45deg);' +
        'cursor:pointer;' +
        'z-index: 99';
    right.style.cssText +=  'position: absolute;' +
        ' width: 25px; ' +
        'height:25px; ' +
        'right:15px; ' +
        'top:50%; ' +
        'border-right:2px solid' +  this.navigationColor + '; ' +
        'border-bottom:2px solid' +  this.navigationColor + ';' +
        'transform:translateY(-50%) rotate(-45deg);' +
        'cursor:pointer; ' +
        'z-index: 99';
    this.slider.parentNode.append(left, right);
    left.addEventListener('click', function(){
        this.slideLeft();
        this.stopInterval();
        this.intervalSlide()
    }.bind(this));
    right.addEventListener('click', function(){
        this.slideRight();
        this.stopInterval();
        this.intervalSlide()
    }.bind(this));
};

/* End slide */

/* Fade in */

simpleSlider.prototype.fadeInStyle = function(){
    this.slider.style.cssText += 'position: relative; width: 100%';
    [].forEach.call(this.slides, function(slide){
        slide.style.cssText +=  'position: absolute; ' +
                                'width: 100%; ' +
                                'opacity:0;' +
                                'transition: opacity ' + this.animationSpeed + 's ease';
        //If img are linked somewhere
        if(slide.querySelector('a')) slide.querySelector('a').style.cssText += 'display: block; position: relative; z-index:1';

        slide.querySelector('img').style.width = '100%';
    }.bind(this));
    this.slider.style.height = this.slides[0].querySelector('img').offsetHeight + 'px';
};
simpleSlider.prototype.rightFadeIn = function(){
    var current = this.counter === this.slides.length ? 0 : this.counter;
    var previous = current === 0 ? this.slides.length - 1 : current - 1;
    var next = current === this.slides.length -1 ? 0 : current + 1;
    this.slides[previous].style.opacity = 0;
    this.slides[next].style.opacity = 0;
    this.slides[current].style.opacity = 1;
    this.counter = this.counter === this.slides.length ? 0 : this.counter;
    this.counter++;
};
simpleSlider.prototype.leftFadeIn = function(){
    var current = this.counter === -1 ? this.slides.length -1 : this.counter;
    var previous = current === this.slides.length -1 ? 0 : current + 1;
    this.slides[previous].style.opacity = 0;
    this.slides[current].style.opacity = 1;
    this.counter = this.counter === 0 ? this.slides.length : this.counter;
    this.counter--;
};
simpleSlider.prototype.fadeInNavigation = function(){
    var left = document.createElement('p');
    var right = document.createElement('p');
    left.className = 'simpleLeft';
    right.className = 'simpleRight';
    left.style.cssText += 'position: absolute; ' +
        'width: 25px; ' +
        'height:25px; ' +
        'left:15px; ' +
        'top:50%; ' +
        'border-left:2px solid' +  this.navigationColor + '; ' +
        'border-bottom:2px solid' +  this.navigationColor + ';' +
        'transform:translateY(-50%) rotate(45deg);' +
        'cursor:pointer;' +
        'z-index: 99';
    right.style.cssText +=  'position: absolute;' +
        ' width: 25px; ' +
        'height:25px; ' +
        'right:15px; ' +
        'top:50%; ' +
        'border-right:2px solid' +  this.navigationColor + '; ' +
        'border-bottom:2px solid' +  this.navigationColor + ';' +
        'transform:translateY(-50%) rotate(-45deg);' +
        'cursor:pointer;' +
        'z-index: 99';
    this.slider.parentNode.append(left, right);
    left.addEventListener('click', function(){
        this.counter--;
        this.leftFadeIn();
        this.stopInterval();
        this.intervalFadeIn();
    }.bind(this));
    right.addEventListener('click', function(){
        this.counter--;
        this.rightFadeIn();
        this.stopInterval();
        this.intervalFadeIn()
    }.bind(this));
};

/* End fade in */

/* Interval for different slider styles */
simpleSlider.prototype.sliderFunc = null;
simpleSlider.prototype.intervalSlide = function(){
    this.sliderFunc = setInterval(this.slideRight.bind(this), this.interval);
};
simpleSlider.prototype.intervalFadeIn = function(){
    this.rightFadeIn();
    this.sliderFunc = setInterval(this.rightFadeIn.bind(this), this.interval);
};
simpleSlider.prototype.stopInterval = function(){
    window.clearInterval(this.sliderFunc);
};

/* End interval */

simpleSlider.prototype.init = function () {
    this.addStyle();

    if(this.type === 'fadeIn'){
        this.fadeInStyle();
        this.intervalFadeIn();
        this.fadeInNavigation();
    } else {
        this.slideStyle();
        this.intervalSlide();
    }
};
