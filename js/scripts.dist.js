let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    t.push(e);
  }
  function o(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = []),
          e.types.forEach(function(e) {
            t.types.push(e.type.name);
          });
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  function i(t) {
    o(t).then(function() {
      a(t);
    });
  }
  function a(t) {
    let e = document.getElementById('modal-title'),
      n = document.getElementById('modal-body');
    (e.innerHTML = ''), (n.innerHTML = '');
    const o = t.name.toUpperCase(),
      i = 'Height: ' + t.height + '"',
      a = ' Types: ' + t.types.join(', ');
    let c = document.createElement('img');
    c.classList.add('modal-img'),
      (c.src = t.imageUrl),
      e.append(o),
      n.append(i, a, c);
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = document.querySelector('.pokemon-list'),
        n = document.createElement('li'),
        o = document.createElement('button');
      (o.innerText = t.name),
        o.classList.add('button-class'),
        o.classList.add(
          'list-group-item',
          'list-group-item-action',
          'text-center',
          'text-uppercase'
        ),
        n.setAttribute('data-toggle', 'modal'),
        n.setAttribute('data-target', '#exampleModal'),
        n.appendChild(o),
        e.appendChild(n),
        o.addEventListener('click', function(e) {
          i(t);
        });
    },
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: o,
    showDetails: i,
    showModal: a
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
