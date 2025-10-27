document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    let basketCached = '';
    const basketPopup = document.querySelector('#basket-popup');

    async function showBasket(){
        if(basketCached !== '') {
            basketPopup.style.opacity = '1';
            basketPopup.style.pointerEvents = 'auto';
            return;
        }
        basketPopup.style.opacity = '1';
        basketPopup.style.pointerEvents = 'auto';
        const request = await fetch('/checkout/basket');
        if( request.ok ){
            const response = await request.text();
            basketPopup.querySelector('section').remove();
            const html = (new DOMParser()).parseFromString(response , 'text/html');
            const responsePopup = html.querySelector('[data-popup]');
            html.querySelector('[data-action="close"]').addEventListener('click', () => {
                basketPopup.removeAttribute('style');
            });
            const ident = html.querySelector('[data-ident]').getAttribute('data-ident');

            html.querySelector('.checkout').addEventListener('click', () => {
                const url = `https://pay.tebex.io/${ident}/payment`;
                window.open(url , '_blank');
            });
            basketCached = responsePopup;
            basketPopup.appendChild(responsePopup);
        }
    }

    document.addEventListener('click', async (e) => {
        const faq = e.target.closest('[data-action="showFaq"]');
        const sidebarActionButton = e.target.closest('[data-action="showSidebar"]');
        const addPackage = e.target.closest('[data-action="add"]');
        const basket = e.target.closest('[data-action="basket"]');

        if(faq){
            const div = faq.querySelector('div');
            const svg = faq.querySelector('svg');
            const p = div.querySelector('p');
            const span = faq.querySelector('span');
            if(div.style.height){
                div.removeAttribute('style');
                p.removeAttribute('style');
                svg.removeAttribute('style');
                span.removeAttribute('style');
            }
            else{
                div.style.height = (div.scrollHeight + 8) + 'px';
                div.style.marginTop = '8px';
                p.style.paddingTop = '8px';
                svg.style.fill = '#ffffff';
                svg.style.rotate = '0deg';
                span.style.color = '#ffffff';
            }

        }
        if(sidebarActionButton){
            if( !sidebarActionButton.getAttribute('data-section-id') ) throw new Error('The button does not have {data-section-id} attribute');
            const sectionId = sidebarActionButton.getAttribute('data-section-id');
            const sidebar = document.querySelector(`[data-role="sidebar"]#${sectionId}`);
            const sidebarSection = sidebar.querySelector('[data-role="sidebarSection"]');
            const closeButton = sidebar.querySelector('[data-role="closeSidebar"]');

            sidebar.classList.toggle('sidebar--active');
            sidebarSection.classList.toggle('sidebar-section--active');
            closeButton?.addEventListener('click', (e) => {
                sidebar.classList.remove('sidebar--active');
                sidebarSection.classList.remove('sidebar-section--active');
            } , {once: true});
        }
        if(addPackage){
            const href = addPackage.getAttribute('data-href');
            const request = await fetch(href);
            const response = request.ok;
            if(response){
                showBasket();
            }
        }
        if(basket){
            showBasket();
        }
    });

    let loginCached = '';
    const loginButton = document.querySelectorAll('[data-role="login"]');
    const loginPopup = document.querySelector('#login-popup');
    async function showLogin(){
        if(loginCached !== '') {
            loginPopup.style.opacity = '1';
            loginPopup.style.pointerEvents = 'auto';
            return;
        }
        loginPopup.style.opacity = '1';
        loginPopup.style.pointerEvents = 'auto';
        const request = await fetch('https://one.tebex.io/login');
        if( request.ok ){
            const response = await request.text();
            loginPopup.querySelector('.loading-spinner').remove();
            const html = (new DOMParser()).parseFromString(response , 'text/html');
            const responsePopup = html.querySelector('[data-popup]');
            html.querySelector('[data-action="close"]').addEventListener('click', () => {
                loginPopup.removeAttribute('style');
            });
            loginCached = responsePopup;
            loginPopup.appendChild(responsePopup);
        }
    }
    loginButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        })
    })

    const giftButton = document.querySelector('.gift');
    const giftSection = document.querySelector('.gift-section');
    const giftInput = giftSection.querySelector('input');
    const giftSubmit = giftSection.querySelector('button');
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
            giftSection.removeAttribute('style');
        }
    });
    giftSubmit.addEventListener('click', async () => {
        if(giftInput.value !== ''){
            const url = giftSubmit.getAttribute('data-url');
            const request = await fetch(url + giftInput.value);
            if(request.ok){
                showBasket();
                giftSection.removeAttribute('style');
            }
        }
    });

})
