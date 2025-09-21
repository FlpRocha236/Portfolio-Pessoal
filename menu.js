
// ======== FORMULÁRIO DE CONTATO COM EMAILJS ========
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contato-form");
    if (!form) return;

    const statusMsg = document.getElementById("status-msg");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome     = form.querySelector('[name="nome"]').value.trim();
        const email    = form.querySelector('[name="email"]').value.trim();
        const telefone = form.querySelector('[name="telefone"]').value.trim();
        const mensagem = form.querySelector('[name="mensagem"]').value.trim();

        // Validação simples
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

        // Envio com EmailJS
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
        })
        .catch((error) => {
            console.error("Erro no EmailJS:", error);
            statusMsg.textContent = "❌ Erro ao enviar. Tente novamente.";
            statusMsg.style.color = "red";
        });
    });
});
