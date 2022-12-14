function Todo() {
  let container = $(`
        <main id="todo">
            <h3 class="text-secondary">My Todo App</h3>
            <div class="tasks">
            
            </div>
        </main>
    `);
  InputBox().insertAfter(container.find("h3"));
  $("body").prepend(container);
}

function InputBox() {
  let handleAdd = function (e) {
    e.preventDefault();
    let text = $(this).find("input").val();
    if (text.length === 0) return;
    $(".tasks").append(Task(text));
    $(this).find("input").val("");
  };
  let field = $(`
        <form class="formArea">
            <input type="text" placeholder="Enter a task " class="form-control" name="" id="todoTask" />
            <button class="btn btn-success" type="submit">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
        </form>
    `);
  field.on("submit", handleAdd);
  return field;
}

function Task(content) {
  let handleDelete = function () {
    let checked = field.find("#done").prop("checked");
    if (checked) field.remove();
  };
  let field = $(`
    <div class="task">
        <div>
            <input type="checkbox" name="" id="done" />
            <label for="done">${content}</label>
        </div>

        <button class="btn btn-primary btn-sm"> 
            <i class="fa fa-trash" aria-hidden="true"></i> 
        </button>
    </div>
  `);
  field.find("button").on("click", handleDelete);
  return field;
}

$("window").on("load", Todo());
