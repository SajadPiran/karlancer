document.addEventListener("DOMContentLoaded", () => {
    const features = document.querySelectorAll('.items [data-aos="fade-up"]');
    const faqs = document.querySelectorAll('.faq [data-aos="fade-up"]');
    if(window.innerWidth >= 1024) {
        features.forEach((feature, index) => feature.setAttribute('data-aos-delay', `${50 * (index + 1)}`));
        faqs.forEach((faq, index) => faq.setAttribute('data-aos-delay', `${100 * (index + 1)}`));
    }
    const sliderMainImage = document.querySelector('#slider-image');
    const slider = new Swiper('.features', {
        slidesPerView: 4,
        autoplay: {delay: 10000},
        loop: true,
        on: {
            slideNextTransitionEnd: function (swiper) {
                const index = swiper.activeIndex;
                const element = swiper.slides[index];
                sliderMainImage.src = element.src;
            },
            click: function (swiper) {
                const index = swiper.clickedIndex;
                const element = swiper.slides[index];
                sliderMainImage.src = element.src;
            }
        }
    });
    const payments = new Swiper('.payments' , {
        slidesPerView: 1,
        breakpoints : {
            640 : { slidesPerView: 2 },
            1024 : { slidesPerView: 3 },
            1200 : { slidesPerView: 4 },
        },
        autoplay: {delay: 5000},
        spaceBetween : 16,
        loop: true,
    });
    const comments = new Swiper('.comments' , {
        slidesPerView: 1,
        breakpoints : {
            640 : { slidesPerView: 2 },
            1024 : { slidesPerView: 3 },
            1600 : { slidesPerView: 4 },
        },
        autoplay: {delay: 5000},
        centeredSlides: true,
        spaceBetween : 8,
        loop: true,
    });

});