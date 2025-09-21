// ======== MENU RESPONSIVO ========
let btnMenu   = document.getElementById('btn-menu');
let menu      = document.getElementById('menu-mobile');
let overlay   = document.getElementById('overlay-menu');

// Abrir menu
btnMenu.addEventListener('click', function () {
    menu.classList.add('abrir-menu');
    overlay.classList.add('ativo');
});

// Fechar menu ao clicar em um link dentro do menu
menu.addEventListener('click', function (e) {
    if (e.target.tagName === "A" || e.target.classList.contains("menu-mobile")) {
        menu.classList.remove('abrir-menu');
        overlay.classList.remove('ativo');
    }
});

// Fechar menu ao clicar no overlay
overlay.addEventListener('click', function () {
    menu.classList.remove('abrir-menu');
    overlay.classList.remove('ativo');
});


// ======== FORMULÁRIO DE CONTATO ========
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contato-form");
    if (!form) return; // se não existir o formulário, não faz nada

    const statusMsg = document.getElementById("status-msg");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome     = form.querySelector('[name="nome"]').value.trim();
        const email    = form.querySelector('[name="email"]').value.trim();
        const telefone = form.querySelector('[name="telefone"]').value.trim();
        const mensagem = form.querySelector('[name="mensagem"]').value.trim();

        // ======== Validação simples ========
        if (!nome || !email || !telefone || !mensagem) {
            statusMsg.textContent = "⚠️ Preencha todos os campos.";
            statusMsg.style.color = "orange";
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            statusMsg.textContent = "⚠️ E-mail inválido.";
            statusMsg.style.color = "orange";
            return;
        }

        // ======== ENVIO COM EMAILJS ========
        emailjs.send(
            "service_zxf2ckd",   // Service ID
            "template_1mbssvh",  // Template ID
            {
                from_name: nome,
                email_id: email,
                telefone: telefone,
                message: mensagem
            },
            "pB_oSw8pb6w0mgmRO"  // Public Key
        )
        .then(() => {
            statusMsg.textContent = "✅ Mensagem enviada com sucesso!";
            statusMsg.style.color = "green";
            form.reset();
            // Mensagem no console
            console.log("Sua mensagem foi enviada com sucesso!");
        })
        .catch((error) => {
            console.error("Erro no EmailJS:", error);
            statusMsg.textContent = "❌ Erro ao enviar. Tente novamente.";
            statusMsg.style.color = "red";
        });

    });
});
