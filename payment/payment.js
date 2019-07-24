let btnclique = document.getElementById('click');

window.onload = () => {
    
};

btnclique.addEventListener('click', testeclique);

function testeclique() {
    console.log('oi');
    let nome = "nome do cliente";
    checkout(nome);
}