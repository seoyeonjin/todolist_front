const inputButton = document.getElementById('input-button');
const inputValue = document.getElementById('input-value');
const list = document.getElementById('list');
let count = 0;
printCount(count);

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

        //삭제 버튼
        list_button.setAttribute('id', 'delete-button');
        list_button.innerHTML = '❌';

        list_div.appendChild(list_check);
        list_div.appendChild(list_input);
        list_div.appendChild(list_button);

        count += 1;
        printCount(count);

        list.appendChild(list_div);

        list_button.addEventListener('click', deleteItem);
        list_check.addEventListener('click', checkItem);
        list_input.addEventListener('keypress', updateItem);
        inputValue.value = '';
    }
}

function updateItem(event) {
    if (event.code == "Enter") {
        event.target.setAttribute('value', event.target.value);
    }
}

function checkItem(event) {
    const checked = event.target.parentElement;
    if (event.target.checked) {
        checked.style.opacity = 0.4;
        count -= 1;
        printCount(count);
    } else {
        checked.style.opacity = 1;
        count += 1;
        printCount(count);
    }

}

function deleteItem(event) {
    const delete_item = event.target.parentElement;
    delete_item.remove();
    count -= 1;
    printCount(count);
}

function printCount(count) {
    const count_div = document.getElementById("count");
    if (count == 0) {
        count_div.innerHTML = "남은 할 일이 없어요";
    }
    else {
        count_div.innerHTML = "남은 할 일: " + count;
    }
}