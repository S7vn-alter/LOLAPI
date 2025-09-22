const apiUrl = "http://localhost:5149/api/champ";
let currentChampId = null;

// Cadastrar campeão
document.getElementById("champForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const formData = new FormData(this);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("Erro ao cadastrar campeão");

    const champ = await response.json();
    currentChampId = champ.id;

    // Exibir campeão no front (imagem do upload)
    const fileInput = this.querySelector("input[type=file]");
    const file = fileInput.files[0];
    mostrarCampeao(champ, file);

    document.getElementById("message").textContent = "Campeão cadastrado!";
  } catch (err) {
    console.error(err);
    document.getElementById("message").textContent = "Erro ao cadastrar.";
  }
});

// Buscar campeão por nome
async function buscarCampeao(){
  const nome = document.getElementById("searchName").value.trim();
  if (!nome) return;

  try {
    const response = await fetch(`${apiUrl}/ObterPorNome/${nome}`);
    if (!response.ok) throw new Error("Nenhum campeão encontrado");

    const champs = await response.json();
    const champ = champs[0]; // pegar o primeiro
    currentChampId = champ.id;

    mostrarCampeao(champ);
    document.getElementById("message").textContent = "Campeão encontrado!";
  } catch(err){
    console.error(err);
    esconderCampeao();
    document.getElementById("message").textContent = "Nenhum campeão encontrado.";
  }
}

// Deletar campeão
async function deletarCampeao(){
  if (!currentChampId){
    document.getElementById("message").textContent = "Nenhum campeão selecionado.";
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${currentChampId}`, {
      method: "DELETE"
    });

    if (response.status === 204){
      esconderCampeao();
      document.getElementById("message").textContent = "Nenhum campeão encontrado.";
      currentChampId = null;
    } else {
      document.getElementById("message").textContent = "Erro ao deletar.";
    }
  } catch(err){
    console.error(err);
    document.getElementById("message").textContent = "Erro na conexão.";
  }
}

// Exibir campeão
function mostrarCampeao(champ, file = null){
  document.getElementById("champDisplay").style.display = "block";
  document.getElementById("champName").textContent = champ.name;
  document.getElementById("champLane").textContent = champ.lane;
  document.getElementById("champQ").textContent = champ.skillQ;
  document.getElementById("champW").textContent = champ.skillW;
  document.getElementById("champE").textContent = champ.skillE;
  document.getElementById("champR").textContent = champ.skillR;

  const img = document.getElementById("champImage");
  if (file) {
    img.src = URL.createObjectURL(file);
  } else {
    img.src = ""; // Sem imagem salva no banco
  }
}

// Esconder campeão
function esconderCampeao(){
  document.getElementById("champDisplay").style.display = "none";
}