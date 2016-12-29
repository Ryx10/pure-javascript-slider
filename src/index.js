var simpleSlider = function(options){
    this.slider = document.querySelector(options.selector);
    this.slides = document.querySelectorAll(options.selector + ' li');
    this.interval = options.interval ? options.interval : 3000;
    this.animationSpeed = options.animationSpeed ? options.animationSpeed : 0.3;
    this.navigationColor = options.navigationColor ? options.navigationColor : '#000000';
    this.counter = 0;
};
simpleSlider.prototype.slidesStyle = function(){
    var vievportWidth = this.slider.parentNode.offsetWidth * this.slides.length;
    var slideWidth = vievportWidth / this.slides.length;
    this.slider.style.width = vievportWidth + 'px';
    this.slider.style.transition = 'transform ' + this.animationSpeed + 's ease';
    this.slider.parentNode.style.overflow = 'hidden';
    this.slider.parentNode.style.position = 'relative';
    for(var slide of this.slides){
        slide.style.width = slideWidth +'px';
        slide.style.display = "block";
        slide.style.float = "left";
        slide.children[0].style.width = '100%' ;
    }
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
simpleSlider.prototype.sliderFunc = null;
simpleSlider.prototype.intervalSlide = function(){
    this.sliderFunc = setInterval(this.slideRight.bind(this), this.interval);
};
simpleSlider.prototype.stopInterval = function(){
    window.clearInterval(this.sliderFunc);
};
simpleSlider.prototype.navigation = function(){
    var left = document.createElement('p');
    var right = document.createElement('p');
    left.className = 'simpleLeft';
    right.className = 'simpleRight';
    left.style.cssText = 'position: absolute; width: 25px; height:25px; left:15px; top:50%; border-left:2px solid' +  this.navigationColor + '; border-bottom:2px solid' +  this.navigationColor + ';transform:translateY(-50%) rotate(45deg);cursor:pointer;';
    right.style.cssText = 'position: absolute; width: 25px; height:25px; right:15px; top:50%; border-right:2px solid' +  this.navigationColor + '; border-bottom:2px solid' +  this.navigationColor + ';transform:translateY(-50%) rotate(-45deg);cursor:pointer;';
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
    }.bind(this))


};
simpleSlider.prototype.init = function () {
    this.navigation();
    this.slidesStyle();
    this.intervalSlide();

};
