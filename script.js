    const drinks = [
      { 
        name: "Caipirinha", 
        flavors: { 
          "Limão": {price: 25, img: "imagens/caipi_limao.jpg", description: "Cachaça, limão e açúcar."}, 
          "Maracujá": {price: 30, img: "imagens/caip_maracuja.jpg", description: "Cachaça, maracujá e açúcar."},
          "Morango": {price: 30, img: "imagens/caipirinha_morango.jpg", description: "Cachaça, morango e açúcar."},
          "Kiwi": {price: 30, img: "imagens/caip_kiwi.png", description: "Cachaça, kiwi e açúcar."}
        } 
      },
      { 
        name: "Caipivodka", 
        flavors: { 
          "Limão": {price: 35, img: "imagens/vodfka_limao.jpg", description: "Vodka, limão e açúcar."}, 
          "Morango": {price: 35, img: "imagens/vodka_morango.jpg", description: "Vodka, morango e açúcar."},
          "Maracujá": {price: 35, img: "imagens/vodka_maracuja.jpg", description: "Vodka, maracujá e açúcar."},
          "Kiwi": {price: 35, img: "imagens/vodka_kiwi.jpg", description: "Vodka, kiwi e açúcar."},
          "Pitaya": {price: 35, img: "imagens/vodka_pitaya.jpg", description: "Vodka, pitaya e açúcar."}
        } 
      },
      { 
        name: "Gin Tônica",
        flavors: { 
          "Tradicional": {price: 35, img: "imagens/gin_tonica.jpg", description: "Gin, água tônica e limão."}
        } 
      },
      {
        name: "Gin Tropical",
        flavors: {
           "Tradicional": {price: 40, img: "imagens/gin_tropical.jpg", description: "Gin, Red Bull Tropical e frutas."},
           "Frutas Vermelhas": {price: 40, img: "imagens/gin_tropical_frutas_vermelhas.jpeg", description: "Gin, Red Bull Tropical e frutas vermelhas."}
        }
      },
      { 
        name: "Aperol Spritz",
        flavors: { 
          "Tradicional": {price: 35, img: "imagens/aperol.jpg", description: "Aperol, espumante e água com gás."}
        } 
      },
      { 
        name: "Campari",
        flavors: { 
          "Tradicional": {price: 35, img: "imagens/campari.jpg", description: "Campari, espumante e água com gás."}
        }
      },
      {
        name: "Drink Da Casa",
        flavors: { 
          "Tradicional": {price: 35, img: "imagens/casa.jpg", description: "Malibu, curaçau blue, gin, espuma de limão e gelo."}
        }
      },
      {
        name: "Pina Colada",
        flavors: { 
          "Tradicional": {price: 35, img: "imagens/pina_colada.jpg", description: "Rum, leite de coco, suco de abacaxi e gelo."}
        }
      }
    ];

    // Cria dropdown customizado
    function createCustomDropdown(flavors, index) {
      const flavorKeys = Object.keys(flavors);
      const dropdown = document.createElement("div");
      dropdown.classList.add("custom-dropdown");
      dropdown.id = `dropdown-${index}`;
      dropdown.innerText = flavorKeys[0];

      const optionsList = document.createElement("ul");
      optionsList.classList.add("dropdown-options");
      
      flavorKeys.forEach(flavor => {
        const li = document.createElement("li");
        li.innerText = flavor;
        li.dataset.value = flavor;
        li.addEventListener("click", function(e) {
          dropdown.innerText = flavor;
          dropdown.appendChild(optionsList);
          updateCardFlavor(index, flavors, flavor);
          optionsList.classList.remove("open");
          e.stopPropagation();
        });
        optionsList.appendChild(li);
      });

      dropdown.appendChild(optionsList);
      dropdown.addEventListener("click", function(e) {
        optionsList.classList.toggle("open");
        e.stopPropagation();
      });
      return dropdown;
    }

    // Atualiza imagem e preço conforme sabor
    function updateCardFlavor(index, flavors, selectedFlavor) {
      const flavorData = flavors[selectedFlavor];
      const imgElem = document.getElementById(`img-${index}`);
      const priceElem = document.getElementById(`price-${index}`);
      imgElem.src = flavorData.img;
      imgElem.alt = `${flavorData.description} - ${selectedFlavor}`;
      priceElem.innerText = `R$${flavorData.price},00`;
    }

    // Carrega o menu
    function loadMenu() {
      const menu = document.getElementById("menu");
      drinks.forEach((drink, index) => {
        const item = document.createElement("div");
        item.classList.add("item");

        const defaultFlavorKey = Object.keys(drink.flavors)[0];
        const defaultFlavor = drink.flavors[defaultFlavorKey];

        item.innerHTML = `
          <img id="img-${index}" src="${defaultFlavor.img}" alt="${drink.name}">
          <h3>${drink.name}</h3>
          <p class="price" id="price-${index}">R$${defaultFlavor.price},00</p>
        `;
        if(Object.keys(drink.flavors).length > 1) {
          const dropdown = createCustomDropdown(drink.flavors, index);
          item.appendChild(dropdown);
        }
        menu.appendChild(item);
      });
    }

    // Fecha dropdowns ao clicar fora
    document.addEventListener("click", function() {
      document.querySelectorAll(".dropdown-options").forEach(list => {
        list.classList.remove("open");
      });
    });

    window.onload = loadMenu;