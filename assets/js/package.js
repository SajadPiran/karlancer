document.addEventListener("DOMContentLoaded", () => {

    const giftButton = document.querySelector('.gift');
    const giftSection = document.querySelector('.gift-section');
    const giftInput = giftSection?.querySelector('input');
    const giftSubmit = giftSection?.querySelector('button');
    giftButton.addEventListener('click', () => {
        if( giftSection.style.opacity === '' ){
            giftSection.style.opacity = '1';
            giftSection.style.pointerEvents = 'auto';
            if( window.innerWidth >= 1024 ){
                giftSection.style.bottom = '-4rem';
            }
            else if( window.innerWidth >= 768 ){
                giftSection.style.bottom = '-2rem';
            }
            else{
                giftSection.style.bottom = '-64px';
            }
        }
        else{
            giftSection.style.opacity = '';
            giftSection.style.pointerEvents = 'none';
        }
    });

    new Swiper('.swiper' , {
        slidesPerView: 1,
        breakpoints : {
            640 : { slidesPerView: 2 },
            1024 : { slidesPerView: 3 },
            1600 : { slidesPerView: 4 },
        },
        autoplay: {delay: 5000},
        spaceBetween : 8,
        loop: true,
    });

});