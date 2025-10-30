document.addEventListener('DOMContentLoaded', () => {

    AOS.init();
    const sections = document.querySelectorAll('[data-role="section"]');
    document.addEventListener('click', async (e) => {
        const faq = e.target.closest('[data-action="showFaq"]');
        const sectionTriggerButton = e.target.closest('[data-role="trigger"]');

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
        if(sectionTriggerButton){
            if( !sectionTriggerButton.getAttribute('data-section-id') ) throw new Error('The button does not have {data-section-id} attribute');

            const sectionId = sectionTriggerButton.getAttribute('data-section-id');
            const sidebar = document.querySelector(`[data-role="section"]#${sectionId}`);
            const sidebarSection = sidebar.querySelector('[data-role="content"]');
            const closeButton = sidebar.querySelector('[data-role="closeSidebar"]');

            sidebar.classList.toggle('section--active');
            sidebarSection.classList.toggle('section-content--active');
            closeButton?.addEventListener('click', (e) => {
                sidebar.classList.remove('section--active');
                sidebarSection.classList.remove('sidebar-content--active');
            } , {once: true});
        }

    });


})
