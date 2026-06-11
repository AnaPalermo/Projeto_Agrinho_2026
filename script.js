// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // ---------------------- SISTEMA DE ABAS ----------------------
    const tabsBtns = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    function activateTab(tabId) {
        // Esconde todos os painéis
        panes.forEach(pane => {
            pane.classList.remove('active-pane');
        });
        // Remove a classe 'active' de todos os botões
        tabsBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        // Mostra o painel correspondente
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.classList.add('active-pane');
        // Ativa o botão correspondente
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    // Adiciona evento de clique em cada botão de aba
    tabsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId) activateTab(tabId);
        });
    });

    // Garante que a primeira aba esteja ativa (caso não esteja por algum motivo)
    const firstActiveTab = document.querySelector('.tab-btn.active');
    if (firstActiveTab) {
        const defaultTab = firstActiveTab.getAttribute('data-tab');
        if (defaultTab) activateTab(defaultTab);
    }

    // ---------------------- CONTADOR DE VISUALIZAÇÕES (localStorage) ----------------------
    let visitCount = localStorage.getItem('greenBioVisitas');
    if (visitCount === null) {
        visitCount = 1;
    } else {
        visitCount = Number(visitCount) + 1;
    }
    localStorage.setItem('greenBioVisitas', visitCount);
    const contadorSpan = document.getElementById('visitasContador');
    if (contadorSpan) {
        contadorSpan.innerText = visitCount;
    }

    // ---------------------- BOTÕES "LEIA O ARTIGO COMPLETO" (simulação) ----------------------
    const botoesArtigo = document.querySelectorAll('.btn-artigo');
    botoesArtigo.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Apenas simula a abertura de um link (abre # em nova aba)
            window.open('#', '_blank');
            // Opcional: pequeno log no console
            const card = btn.closest('.card');
            const titulo = card?.querySelector('h3')?.innerText || 'artigo';
            console.log(`[Simulação] Abriria artigo completo: ${titulo}`);
        });
        // Garantia de target blank (já está no HTML, mas reforça)
        btn.setAttribute('target', '_blank');
    });
});