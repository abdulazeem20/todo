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

function Action() {
  let handleSelect = function () {
    let eachTaskBox = $(this).parents("#todo").find(".done");
    $.each(eachTaskBox, (i, el) => {
      if ($(this).prop("checked")) {
        $(el).prop({ checked: true });
        $(el).parent().next().css({ display: "block" });
      } else {
        $(el).prop({ checked: false });
        $(el).parent().next().css({ display: "none" });
      }
    });
  };

  let handleDelete = function () {
    let eachTaskBox = $(this).parents("#todo").find(".done");
    $.each(eachTaskBox, (i, el) => {
      if ($(el).prop("checked")) {
        $(el).parents(".task").remove();
      }
    });
    if ($(this).parents("#todo").find(".done").length == 0)
      $(this).parent().remove();
  };
  let field = $(`
  <div class="action">
    <input type="checkbox" name=""  id="general" />
    <button class="delete btn btn-danger btn-sm" >Delete All</button>
  </div>
  `);
  field.find("input").on("click", handleSelect);
  field.find("button").on("click", handleDelete);
  return field;
}

function InputBox() {
  let handleAdd = function (e) {
    e.preventDefault();
    let text = $(this).find("input").val();
    if (text.length === 0) return;
    $(".tasks").append(Task(text));
    $(this).find("input").val("");
    if ($(this).parents("#todo").find(".action").length == 0) {
      $(this).parents("#todo").prepend(Action());
    }
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
    let remainingTask = field.parents("#todo").find(".task").length;
    remainingTask == 1 && field.parents("#todo").find(".action").remove();
    if (checked) field.remove();
  };
  let field = $(`
    <div class="task">
        <div>
            <input type="checkbox" class="done" name="" id="done" />
            <label for="done">${content}</label>
        </div>

        <button class="btn btn-primary btn-sm" style="display:none;"> 
            <i class="fa fa-trash" aria-hidden="true"></i> 
        </button>
    </div>
  `);
  field.find("#done").on("click", function () {
    $(this).parents("#todo").find("#general").prop({ checked: false });
    if ($(this).prop("checked")) {
      field.find("button").css({ display: "block" });
    } else {
      field.find("button").css({ display: "none" });
    }
  });
  field.find("button").on("click", handleDelete);
  return field;
}

$("window").on("load", Todo());
