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

//할일 조회
$.ajax({
    method: "GET",
    url: "https://us-central1-pilot-todo.cloudfunctions.net/todo",
})
    .done(function (res) {
        initItem(res);
    });

function initItem(res) {
    var keys = Object.keys(res);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        inputValue.value = key;
        if (inputValue.value != '') {
            const list_check = document.createElement('input');
            const list_input = document.createElement('input');
            const list_div = document.createElement('div');
            const list_button = document.createElement('button');

            list_div.setAttribute('class', 'items');
            //check box
            list_check.setAttribute('type', 'checkbox');
            list_check.setAttribute('id', 'check-input');
            if (res[key] == true) {
                count -= 1;
                list_check.checked = true;
                list_div.style.opacity = 0.4;
            }

            //input 값
            list_input.setAttribute('id', 'item');
            list_input.setAttribute('name', 'name');
            list_input.setAttribute('value', inputValue.value);
            //삭제 버튼
            list_button.setAttribute('id', 'delete-button');
            list_button.innerHTML = 'ㅡ';

            list_div.appendChild(list_check);
            list_div.appendChild(list_input);
            list_div.appendChild(list_button);
            count += 1;
            printCount(count);
            list.appendChild(list_div);
            list_button.addEventListener('click', deleteItem);
            list_check.addEventListener('click', checkItem);
            list_input.addEventListener('click', updateItem, { once: true });
            inputValue.value = '';
        }
    }
}

function addItem() {
    if (inputValue.value != '') {
        const list_check = document.createElement('input');
        const list_input = document.createElement('input');
        const list_div = document.createElement('div');
        const list_button = document.createElement('button');

        list_div.setAttribute('class', 'items');

        //check box
        list_check.setAttribute('type', 'checkbox');
        list_check.setAttribute('id', 'check-input');

        //input 값
        list_input.setAttribute('id', 'item');
        list_input.setAttribute('name', 'name');
        list_input.setAttribute('value', inputValue.value);

        //삭제 버튼
        list_button.setAttribute('id', 'delete-button');
        list_button.innerHTML = 'ㅡ';

        list_div.appendChild(list_check);
        list_div.appendChild(list_input);
        list_div.appendChild(list_button);

        count += 1;
        printCount(count);

        list.appendChild(list_div);

        //할일 추가
        $.ajax({
            method: "POST",
            url: "https://us-central1-pilot-todo.cloudfunctions.net/todo",
            data: { "name": inputValue.value },
        })

        list_button.addEventListener('click', deleteItem);
        list_check.addEventListener('click', checkItem);
        list_input.addEventListener('click', updateItem, { once: true });

        inputValue.value = '';
    }
}

function updateItem(event) {
    original_name = event.target.value;
    event.target.addEventListener('keypress', (event) => {
        if (event.code == "Enter" && event.isComposing === false) {
            event.target.setAttribute('value', event.target.value);
            value = event.target.value;
            if (original_name != value) {
                //할일 수정
                $.ajax({
                    method: "PUT",
                    url: "https://us-central1-pilot-todo.cloudfunctions.net/todo",
                    data: { "originalName": original_name, "changeName": event.target.value },
                })
                original_name = event.target.value;
                console.log(original_name);
            }
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

        //할일 완료
        $.ajax({
            method: "PUT",
            url: "https://us-central1-pilot-todo.cloudfunctions.net/todo",
            data: { "originalName": original_name, "changeValue": true },
        })
    } else {
        checked.style.opacity = 1;
        count += 1;
        printCount(count);

        //할일 미완료
        $.ajax({
            method: "PUT",
            url: "https://us-central1-pilot-todo.cloudfunctions.net/todo",
            data: { "originalName": original_name, "changeValue": false },
        })
    }

}

function deleteItem(event) {
    const delete_item = event.target.parentElement;
    const delete_value = event.target.previousSibling.value;
    delete_item.remove();
    count -= 1;
    printCount(count);

    //할일 삭제
    $.ajax({
        method: "DELETE",
        url: "https://us-central1-pilot-todo.cloudfunctions.net/todo",
        data: { "name": delete_value },
    })
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