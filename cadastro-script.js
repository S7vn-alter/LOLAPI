// Ajuste esta URL para a porta/URL onde sua API está rodando (veja o Swagger)
const apiUrl = "http://localhost:5149/api/Champ"; // ✅ mesma URL do seu swagger

// ---------- CADASTRAR (multipart/form-data) ----------
const form = document.getElementById("champForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // monta FormData com os mesmos nomes que o Swagger/controller espera
    const fd = new FormData();
    fd.append("Name", document.getElementById("Name").value);
    fd.append("Lane", document.getElementById("Lane").value);
    fd.append("SkillQ", document.getElementById("SkillQ").value);
    fd.append("SkillW", document.getElementById("SkillW").value);
    fd.append("SkillE", document.getElementById("SkillE").value);
    fd.append("SkillR", document.getElementById("SkillR").value);
    fd.append("Passive", document.getElementById("Passive").value);
    fd.append("ImageChamp", document.getElementById("ImageChamp").value);

    // adiciona o arquivo (imagem)
    const fileInput = document.getElementById("file");
    if (fileInput && fileInput.files.length > 0) {
      fd.append("file", fileInput.files[0]); // mesmo nome do parâmetro no Controller
    }

    try {
      const resp = await fetch(apiUrl, {
        method: "POST",
        body: fd,
        mode: "cors" // importante se front != backend
      });

      if (resp.ok) {
        alert("✅ Campeão cadastrado com sucesso!");
        form.reset();
        // redireciona para a lista
        window.location.href = "./campeoes.html";
      } else {
        // mostra erro vindo da API (útil pra debug)
        const text = await resp.text();
        console.error("API respondeu com erro:", resp.status, text);
        alert("❌ Erro ao cadastrar. Veja console para detalhes.");
      }
    } catch (err) {
      console.error("Erro ao chamar API:", err);
      alert("❌ Erro na requisição (ver console).");
    }
  });
}

// ---------- LISTAR CAMPEÕES ----------
const champList = document.getElementById("champList");
if (champList) {
  fetch(`${apiUrl}/listarTodos`, { mode: "cors" }) // ✅ endpoint correto
    .then(r => {
      if (!r.ok) throw new Error("Status " + r.status);
      return r.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Resposta não é array:", data);
        champList.innerHTML = "<p>Nenhum campeão encontrado.</p>";
        return;
      }

      champList.innerHTML = "";
      data.forEach(c => {
        const imgUrl = c.ImageChamp || c.imageChamp || c.image || "";
        const name = c.Name || c.name || "";
        const lane = c.Lane || c.lane || "";
        const passive = c.Passive || c.passive || "";
        const skills = [
          c.SkillQ || c.skillQ || "",
          c.SkillW || c.skillW || "",
          c.SkillE || c.skillE || "",
          c.SkillR || c.skillR || ""
        ].filter(s => s).join(", ");

        champList.innerHTML += `
          <div class="champ-card">
            ${imgUrl ? `<img src="${imgUrl}" alt="${name}" />` : ""}
            <h2>${name}</h2>
            <p><b>Lane:</b> ${lane}</p>
            <p><b>Passiva:</b> ${passive}</p>
            <p><b>Skills:</b> ${skills}</p>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Erro ao carregar campeões:", err);
      champList.innerHTML = "<p>Erro ao carregar campeões (veja console).</p>";
    });
}

// ---------- BOTÃO “VER CAMPEÕES” ----------
const verBtn = document.getElementById("ver-campeoes");
if (verBtn) {
  verBtn.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}