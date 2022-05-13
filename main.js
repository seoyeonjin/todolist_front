const inputButton = document.getElementById('input-button');
const inputValue = document.getElementById('input-value');
const list = document.getElementById('list');
let count = 0;

inputButton.addEventListener('click', addItem);
inputValue.addEventListener('keyup', (e) => {
    if (e.code == "Enter") {
        addItem();
    }
})

function addItem() {
    if (inputValue.value != '') {
        const list_check = document.createElement('input');
        const list_input = document.createElement('input');
        const list_div = document.createElement('div');
        const list_button = document.createElement('button');

        //check box
        list_check.setAttribute('type', 'checkbox');
        list_check.setAttribute('id', 'check-input');

        //input 값
        list_input.setAttribute('id', 'item');
        list_input.setAttribute('value', inputValue.value);
        list_input.innerHTML = inputValue.value;

        //삭제 버튼
        list_button.setAttribute('id', 'delete-button');
        list_button.innerHTML = '❌';

        list_div.appendChild(list_check);
        list_div.appendChild(list_input);
        list_div.appendChild(list_button);

        count += 1;

        list.appendChild(list_div);

        list_button.addEventListener('click', deleteItem);
        list_check.addEventListener('click', checkItem);
        inputValue.value = '';
    }
}

function updateItem() {

}

function checkItem(event) {
    const checked = event.target.parentElement;
    if (event.target.checked) {
        checked.style.opacity = 0.4;
        count -= 1;
    } else {
        checked.style.opacity = 1;
        count += 1;
    }

}

function deleteItem(event) {
    const delete_item = event.target.parentElement;
    delete_item.remove();
    count -= 1;
}
