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
        list_input.setAttribute('name', 'name');
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
        list_input.addEventListener('click', updateItem);
        inputValue.value = '';
    }
}

function updateItem(event) {
    original_name = event.target.value;
    //console.log("original: " + original_name);

    event.target.addEventListener('keypress', (event) => {
        if (event.code == "Enter") {
            console.log("original: " + original_name);
            event.target.setAttribute('value', event.target.value);
            original_name = event.target.value;
            console.log(event.target.value);
        }
    })
}

function checkItem(event) {
    const checked = event.target.parentElement;
    const original_name = event.target.nextSibling.value;
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
    const delete_value = event.target.value;
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