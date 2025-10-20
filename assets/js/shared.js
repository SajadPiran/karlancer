document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    document.addEventListener('click', (e) => {
        const faq = e.target.closest('[data-action="showFaq"]');
        const sidebarActionButton = e.target.closest('[data-action="showSidebar"]');

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
    })
})
