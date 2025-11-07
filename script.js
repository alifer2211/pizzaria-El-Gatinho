// Carrinho simples
const cart = {
  items: [],
  add(item){ this.items.push(item); this.render(); },
  remove(index){ this.items.splice(index,1); this.render(); },
  total(){ return this.items.reduce((s,i)=> s + i.price, 0); },
  render(){
    const list = document.querySelector('#cart-items');
    const total = document.querySelector('#cart-total');
    if(!list || !total) return;
    list.innerHTML = this.items.map((i,idx)=>`
      <tr>
        <td>${i.name}</td>
        <td>${i.size}</td>
        <td>${i.notes || '-'}</td>
        <td>R$ ${i.price.toFixed(2)}</td>
        <td><button class="btn btn-outline" onclick="cart.remove(${idx})">Remover</button></td>
      </tr>
    `).join('');
    total.textContent = `R$ ${this.total().toFixed(2)}`;
  }
};

// Modal da galeria
document.addEventListener('click', (e)=>{
  const img = e.target.closest('.gallery img');
  const modal = document.querySelector('#gallery-modal');
  const modalImg = document.querySelector('#gallery-modal img');
  if(img && modal && modalImg){
    modalImg.src = img.src;
    modal.style.display = 'flex';
  }
  if(e.target.id === 'modal-close'){ document.querySelector('#gallery-modal').style.display = 'none'; }
});

// Formulários
function handleSubmit(formId, msg){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`${msg}\n\n` + JSON.stringify(data, null, 2));
    form.reset();
  });
}
handleSubmit('form-pedido','Recebemos seu pedido!');
handleSubmit('form-rodizio','Reserva registrada!');
handleSubmit('form-locacao','Solicitação enviada!');

// Adicionar pizza do formulário
function addPizzaFromForm(){
  const size = document.getElementById('pizza-size').value;
  const flavor = document.getElementById('pizza-flavor').value;
  const border = document.getElementById('pizza-border').value;
  const notes = document.getElementById('pizza-notes').value;
  const basePrice = size === 'Gigante' ? 64.9 : size === 'Grande' ? 54.9 : 44.9;
  const extras = border === 'Catupiry' || border === 'Cheddar' ? 6 : border === 'Chocolate' ? 8 : 0;
  const price = basePrice + extras;
  cart.add({ name:`Pizza ${flavor}`, size, notes, price });
}
