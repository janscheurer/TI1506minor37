var main = function (toDoObjects) {
    "use strict";

    var test2 = "test2";

    var toDos = toDoObjects.map(function (toDo) {
          // we'll just return the description
          // of this toDoObject
          return toDo.description;
    });

    var replyClick = function(id){
        console.log(id);
    }

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                               
                toDoObjects.sort(function(x, y){
                    var date1 = new Date(x.date);
                    var date2 = new Date(y.date);
                return date1 - date2 ;
                })
                
                //$explanation = $("<a>").text("Click todo to set status to 'done'");
                $content = $("<ul id='list' class='list'>");
                $content.append($("<a>").text("Click a todo to cross it of your list"));

                toDoObjects.forEach(function (todo){
                    if (todo.status === 'active'){
                        $content.append($("<li>").text(todo.description));
                    }
                    else {
                        $content.append($("<li class='finished'>").text(todo.description));
                    }
                });
                
                $content.on("click", "li",function(event){
                    console.log($(this).text());
                    var descr = $(this).text();
                    toDoObjects.forEach(function (todo){
                        if (todo.description === descr){
                            if (todo.status === 'finished') {
                                todo.status = 'active'
                            }
                            else {
                                todo.status = 'finished';
                            }
                            $(".tabs a:first-child span").trigger("click");
                        }
                    })
                })                

            } else if ($element.parent().is(":nth-child(2)")) {
                var imps = ["High", "Medium", "Low"];

                var impObjects = imps.map(function (imp){
                    var toDosWithImp = [];

                    toDoObjects.forEach(function (toDo){
                        if (toDo.importance === imp){
                            toDosWithImp.push(toDo.description);
                        }
                    });

                    return {"name": imp, "toDos": toDosWithImp};
                })

                impObjects.forEach(function(imp) {
                    var $impName = $("<h3>").text(imp.name),
                        $content = $("<ul>");

                    imp.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    })

                    $("main .content").append($impName);
                    $("main .content").append($content);
                })
                

            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

                  
            } else if ($element.parent().is(":nth-child(4)")) {
                toDoObjects.sort(function(x, y){
                    var date1 = new Date(x.dateFinished);
                    var date2 = new Date(y.dateFinished);
                return date2 - date1 ;
                })

                $content = $("<ul>");
                $content.append($("<a>").text("Click a todo to permenantly remove it"))
                toDoObjects.forEach(function (todo){
                    if (todo.status === 'finished'){
                        $content.append($("<li class='finished'>").text(todo.description));
                    }
                });

                $content.on("click", "li",function(event){
                    console.log($(this).text());
                    var descr = $(this).text();
                    jQuery.each(toDoObjects, function(i, todo) {
                        if(todo.description === descr){
                            delete toDoObjects[i];
                            $(".tabs a:nth-child(4) span").trigger("click");
                        }
                    })
                            
                        
                    
                })                


            // ADD TAB
            } else if ($element.parent().is(":nth-child(5)")) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),

                    $dateInput = $("<input type='date'>").addClass("date"),
                    $dateLabel = $("<p>").text("Date (dd-mm-yyyy): "),

                    $inputImp1 = $("<input type='radio' name='importance' value='Low' >").addClass("imp1"),
                    $imp1Label = $("<label for='importance'>").text("Low"),
                    $inputImp2 = $("<input type='radio' name='importance' value='Medium' checked>").addClass("imp1"),
                    $imp2Label = $("<label for='importance'>").text("Medium"),
                    $inputImp3 = $("<input type='radio' name='importance' value='High'>").addClass("imp1"),
                    $imp3Label = $("<label for='importance'>").text("High"),
                    $importanceLabel = $("<p>").text("Importance: "),

                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags (seperated by comma): "),

                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        date = $dateInput.val();
                    
                    var imp = $("input[name=importance]:checked").val();
                    
                    toDoObjects.push({"description":description,"date":date,"importance":imp, "tags":tags, "status":"active"});

                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                    $dateInput.val("");

                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($dateLabel)
                                     .append($dateInput)
                                     .append($importanceLabel)
                                     .append($inputImp1)
                                     .append($imp1Label)
                                     .append($inputImp2)
                                     .append($imp2Label)
                                     .append($inputImp3)
                                     .append($imp3Label)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });

});