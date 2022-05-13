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
        const list_li = document.createElement('li');
        const list_div = document.createElement('div');
        list_li.setAttribute('class', 'item');
        list_li.setAttribute('id', 'item');
        list_li.innerHTML = inputValue.value;
        list_li.innerHTML += "<button onclick='deleteItem()'>❌삭제</button>";
        list_div.appendChild(list_li);
        list.appendChild(list_div);
        inputValue.value = '';
    }
}

function updateItem() {

}

function deleteItem() {
    // 삭제 이벤트 발생 -> 삭제 아이콘 클릭 
    // 삭제한 elemet의 parent element 선택 (Maybe div)
    // div 삭제하기
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
        let list_li = document.createElement('li');
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


