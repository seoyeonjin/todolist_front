const inputButton = document.getElementById('input-button');
const inputValue = document.getElementById('input-value');
const list = document.getElementById('list');

inputButton.addEventListener('click', addItem);
inputValue.addEventListener('keyup', (e) => {
    if (e.code == "Enter") {
        addItem();
    }
})



function addItem() {
    if (inputValue.value != '') {
        const list_input = document.createElement('input');
        const list_div = document.createElement('div');

        //list_input.setAttribute('class', 'item');
        list_input.setAttribute('id', 'item');
        //list_input.setAttribute('type', 'text');
        list_input.setAttribute('value', inputValue.value);
        //list_input.setAttribute('placeholder', inputValue.value);
        const list_button = document.createElement('button');
        list_input.innerHTML = inputValue.value;
        list_button.setAttribute('id', 'delete-button');
        list_button.innerHTML = '❌'

        //list_input.innerHTML += "<button id='delete-button'></button>"; //onclick='deleteItem()'
        list_div.appendChild(list_input);
        list_div.appendChild(list_button);
        list.appendChild(list_div);
        //const deleteButton = document.getElementById('delete-button');

        list_button.addEventListener('click', deleteItem);
        inputValue.value = '';
    }
}

function updateItem() {

}

function deleteItem(event) {
    const delete_item = event.target.parentElement;
    delete_item.remove();
    // 삭제 이벤트 발생 -> 삭제 아이콘 클릭 
}

//remove 코드 가져온 것

/*function remove(cnt) {
    var li = document.getElementById('li'+cnt);
    list.removeChild(li);
}*/

/*function addItem(e) {
    const input = document.getElementById('input-value');
    const value = input.value;

    if (e.keyCode == 13) {

        let list_ul = document.getElementById('list-item');
        let list_input = document.createElement('li');
        list_li.setAttribute('class', 'item');
        list_li.innerHTML = value;
        list_ul.appendChild(list_li);

    }
    /*    input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("list-item").click();
            }
        });
}

let input_button = document.querySelector("#input-button");
input_button.addEventListener("click", addItem);
*/


