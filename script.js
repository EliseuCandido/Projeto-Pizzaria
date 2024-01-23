// CODIGO DE BOAS VINDAS, PEGA O USERNAME DO USUARIO ATRAVES PELO LOGIN

const username = localStorage.getItem('username');
const linkHome = document.querySelector("#link-home");

if (username) {
  linkHome.textContent = 'Bem-vindo(a), ' + username + '!';
}
// Sair caso tiver logado
const logoutSpan = document.querySelector("#logout-span");

if (username) {
  logoutSpan.textContent = "Sair";
  logoutSpan.addEventListener('click', () => {
    localStorage.removeItem('username');
    window.location.replace("login.html");
  });
}


// Seleciona os elementos do carrossel
const carouselContainer = document.querySelector('#carousel-container');
const carousel = document.querySelector('#carousel');
const carouselItems = carousel.querySelectorAll('.carousel-item');

// Define o tempo inicial para o primeiro slide
let slideTime = carouselItems[0].querySelector('img').dataset.time;

// Função para exibir o slide atual
function showSlide(index) {
  // Remove a classe "active" de todos os slides
  carouselItems.forEach(item => {
    item.classList.remove('active');
  });

  // Adiciona a classe "active" ao slide atual
  carouselItems[index].classList.add('active');

  // Obtém o tempo para o próximo slide
  slideTime = carouselItems[index].querySelector('img').dataset.time;

  // Reinicia o temporizador
  clearTimeout(timer);
  startTimer();
}

// Inicia o temporizador para troca de slides
let timer;
function startTimer() {
  timer = setTimeout(() => {
    // Verifica se está no último slide
    const currentIndex = Array.from(carouselItems).findIndex(item => item.classList.contains('active'));
    if (currentIndex === carouselItems.length - 1) {
      showSlide(0);
    } else {
      showSlide(currentIndex + 1);
    }
  }, slideTime);
}

// Adiciona evento de clique aos slides
carouselItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showSlide(index);
  });
});

// Inicia o carrossel
showSlide(0);

// ----------------------- PRODUTOS -------------------------------------------
var produtosLetra = document.querySelectorAll('.produtos-letra');
var produtosSection = document.querySelectorAll('.produtos-section');

for (var i = 0; i < produtosLetra.length; i++) {
  produtosLetra[i].addEventListener('click', function () {
    var sectionId = this.getAttribute('data-section');

    for (var j = 0; j < produtosSection.length; j++) {
      produtosSection[j].classList.remove('active');
    }

    document.getElementById(sectionId).classList.add('active');
  });
}


// CARINHO --------------------------------------
const carrinho = [];

function toggleCarrinho() {
  const carrinhoOverlay = document.getElementById('carrinhoOverlay');
  const carrinhoElement = document.getElementById('carrinho');
  const produtosContainer = document.querySelector('#deixarcinzaProdutos');
  const isOpen = carrinhoOverlay.style.display === 'flex';

  carrinhoOverlay.style.display = isOpen ? 'none' : 'flex';
  carrinhoElement.style.display = isOpen ? 'none' : 'block';


  // Deixar Itens atras escuro
  if (isOpen) {
    produtosContainer.classList.remove('disabled-products');
  } else {
    produtosContainer.classList.add('disabled-products');
  }
}
let total = 0;

function adicionarCarrinho(id, nome, preco, imgElement) {
  animateImageToCart(imgElement);

  total += preco;
  document.getElementById("valorTotal").innerText = total.toFixed(2);


  const itemIndex = carrinho.findIndex(item => item.id === id);

  if (itemIndex > -1) {
    carrinho[itemIndex].quantidade++;
  } else {
    carrinho.push({
      id,
      nome,
      preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}


function atualizarCarrinho() {
  const listaCarrinho = document.getElementById('listaCarrinho');
  const contadorCarrinho = document.getElementById('contadorCarrinho');
  listaCarrinho.innerHTML = '';

  let quantidadeTotal = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const itemName = document.createElement('span');
    itemName.textContent = `${item.nome} - Quantidade: ${item.quantidade}`;

    const itemImg = document.createElement('img');
    itemImg.src = document.getElementById(`imgProduto${item.id}`).src;
    itemImg.style.width = '50px';
    itemImg.style.height = 'auto';
    itemImg.style.marginRight = '10px';

    itemName.insertBefore(itemImg, itemName.firstChild);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const btnDiminuir = document.createElement('button');
    btnDiminuir.className = 'btn btn-secondary btn-sm';
    btnDiminuir.textContent = '-';
    btnDiminuir.onclick = () => {
      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        carrinho.splice(index, 1);
      }
      atualizarCarrinho();
    };

    const btnAumentar = document.createElement('button');
    btnAumentar.className = 'btn btn-secondary btn-sm';
    btnAumentar.textContent = '+';
    btnAumentar.onclick = () => {
      item.quantidade++;
      atualizarCarrinho();
    };

    btnGroup.appendChild(btnDiminuir);
    btnGroup.appendChild(btnAumentar);
    li.appendChild(itemName);
    li.appendChild(btnGroup);
    listaCarrinho.appendChild(li);

    quantidadeTotal += item.quantidade;
  });

  if (quantidadeTotal > 0) {
    contadorCarrinho.textContent = quantidadeTotal;
    contadorCarrinho.style.display = 'inline-block';
  } else {
    contadorCarrinho.style.display = 'none';
  }

}



// FUNCAO ANIMACAO ---------------------------------

function animateImageToCart(imgElement) {
  const cartIcon = document.getElementById('iconeCarrinho');
  const clonedImg = imgElement.cloneNode(true);
  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  // Calcular escala com base nas dimensões da imagem e do ícone do carrinho
  const scaleX = cartRect.width / imgRect.width;
  const scaleY = cartRect.height / imgRect.height;
  const targetX = cartRect.left - imgRect.left;
  const targetY = cartRect.top - imgRect.top;

  clonedImg.classList.add('animatedImage');
  clonedImg.style.top = `${imgRect.top}px`;
  clonedImg.style.left = `${imgRect.left}px`;
  clonedImg.style.width = `${imgRect.width}px`;
  clonedImg.style.height = `${imgRect.height}px`;
  clonedImg.style.position = 'fixed';

  document.body.appendChild(clonedImg);

  setTimeout(() => {
    clonedImg.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scaleX}, ${scaleY})`;
    clonedImg.style.opacity = '0';
  }, 100);

  setTimeout(() => {
    document.body.removeChild(clonedImg);
  }, 1000);
}



// DEIXAR ESCOLHAS DA PAGINA DESTACADA, PARA O CLIENTE SABER ONDE ESTÁ 

function selectNavItem(event) {
  event.preventDefault();

  // Remover a classe 'selected' de todos os itens do menu
  const navItems = document.querySelectorAll('.produtos-2 .nav-link');
  navItems.forEach((item) => {
    item.classList.remove('selected');
  });

  // Adicionar a classe 'selected' ao item clicado
  const clickedItem = event.target;
  clickedItem.classList.add('selected');
}
