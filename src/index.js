var simpleSlider = function(options){
    this.slider = document.querySelector(options.selector);
    this.slides = document.querySelectorAll(options.selector + ' li');
    this.counter = 0;
};

simpleSlider.prototype.slidesStyle = function(){
    var vievportWidth = this.slider.parentNode.offsetWidth * this.slides.length;
    var slideWidth = vievportWidth / this.slides.length;
    this.slider.style.width = vievportWidth + 'px';
    this.slider.parentNode. style.overflow = 'hidden';
    this.slider.style.transition = 'transform 0.3s ease';
    for(var slide of this.slides){
        slide.style.width = slideWidth +'px';
        slide.style.display = "block";
        slide.style.float = "left";
        slide.children[0].style.width = '100%' ;
    }
}
simpleSlider.prototype.slideAnimation = function(){
        this.counter += 100 / this.slides.length;
        this.counter = this.counter >=100 ? 0 : this.counter;
        this.slider.style.transform = "translateX(-" + this.counter + "%)";
};
simpleSlider.prototype.init = function () {
    this.slidesStyle();
    setInterval(this.slideAnimation.bind(this), 3000);
};