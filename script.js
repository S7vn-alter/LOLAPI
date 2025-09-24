const apiUrl = "http://localhost:5149/api/Champ/listarTodos";

// Função para buscar os campeões
async function carregarChamps() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erro ao buscar campeões");
    }

    const champs = await response.json();
    const champList = document.getElementById("champ-list");

    // Limpa antes de exibir
    champList.innerHTML = "";

    if (champs.length === 0) {
      champList.innerHTML = "<p>Nenhum campeão encontrado.</p>";
      return;
    }

    // Renderiza cada campeão
    champs.forEach(champ => {
      const champDiv = document.createElement("div");
      champDiv.style.border = "1px solid #ccc";
      champDiv.style.margin = "10px";
      champDiv.style.padding = "10px";
      champDiv.style.maxWidth = "300px";

      champDiv.innerHTML = `
        <h2>${champ.name}</h2>
        <p><strong>Lane:</strong> ${champ.lane}</p>
        <p><strong>Q:</strong> ${champ.skillQ}</p>
        <p><strong>W:</strong> ${champ.skillW}</p>
        <p><strong>E:</strong> ${champ.skillE}</p>
        <p><strong>R:</strong> ${champ.skillR}</p>
        <img src="${champ.imageChamp}" alt="${champ.name}" width="200">
      `;

      champList.appendChild(champDiv);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("champ-list").innerHTML = "<p>Erro ao carregar campeões.</p>";
  }
}

// Carrega quando a página abre
window.onload = carregarChamps;