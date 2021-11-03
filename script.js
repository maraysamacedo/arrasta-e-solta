let areas = {   //objeto area
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);  //evento quando começa a arrastar o ícone
    item.addEventListener('dragend', dragEnd);      //evento quando solta o ícone

});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);   //dragover = acontece quando eu estou arrastando o item e passo em cima de uma área com evento
    area.addEventListener('dragleave', dragLeave); //dragleave = acontece quando vc sai de uma área com evento
    area.addEventListener('drop', drop);           //drop = acontece quando vc solta o item em um lugar com evento, ou seja, que podia ser colocado o item
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


//Functions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');   //currentTarget: seleciona o local que encontra-se o item clicado(diferente de selecionar o item clicado); drag: clonar o item clicado para arrastar

}


function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');  //remover a tag selecionada
}

//Functions Area
//drop = dragover: para colocar o item no evento eu preciso estar em cima de uma área que possui evento

function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) {    //se a area estiver vazia, deixar o hover(com opacity) mostrando que pode ser incluso naquela area
        e.preventDefault();    //libero o comportamento para rodar essa função
        e.currentTarget.classList.add('hover');   //adiciona a classe do css recebendo uma resposta que a area está liberada
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');  //remove a classe do css 

}

function drop(e) {
    e.currentTarget.classList.remove('hover');

    if(e.currentTarget.querySelector('.item') === null) {   //se estiver vazio, adiciona. Caso contrário, não adiciona.
        let dragItem = document.querySelector('.item.dragging');   //selecionando a class "item" e "drag" que informam qual item estou incluindo na area com evento
        e.currentTarget.appendChild(dragItem);  //appendChild = adicione um item no local atual, ou seja, no local que estamos (o item deve possuir um evento)
        updateAreas();
    }
}

//Functions Neutral Area
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');   //selecionando a class "item" e "drag" que informam qual item estou incluindo na area com evento
    e.currentTarget.appendChild(dragItem);  //appendChild = adicione um item no local atual, ou seja, no local que estamos (o item deve possuir um evento)
    updateAreas();
}

//Logic Functions
function updateAreas() {    //verificação de qual item está dentro de cada área
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null) {    //se a area estiver preenchida, ou seja, há nenhum item dentro dela
            areas[name] = area.querySelector('.item').innerHTML;   // incluo o nome do "item" que está dentro da área (1, 2 ou 3)
        } else {
            areas[name] = null;
        }
    });

    if(areas.a ==='1' && areas.b === '2' && areas.c === '3') {  //se a=1, b=2 e c=3
        document.querySelector('.areas').classList.add('correct');   //adiciona a classe "correct" em 'areas', ou seja, as bordas ficarem verdes
    } else {                                                         
        document.querySelector('.areas').classList.remove('correct');  //caso não esteja, remova
    }
}