function q(){
    let input = document.getElementById("a");
    let text = input.value.trim();
    if (text === "")return;
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = text;
    span.onclick = function(){
        span.classList.toggle("done");
    };
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Удалить";
    deleteBtn.onclick = function(){
        li.remove();
    };
    li.appendChild(span);
    li.appendChild(deleteBtn);
    document.getElementById("b").appendChild(li);
    input.value = "";
}