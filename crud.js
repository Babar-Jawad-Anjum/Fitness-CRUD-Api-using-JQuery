$(function(){

    // when page loads, call the given loadRecipies() function

    loadRecipies();

    // #recipies k andr aany wala jo btn-danger ha us pa jb click ho to handleDelete ko call kr do 

    $("#recipies").on("click", ".btn-danger", handleDelete);
    
    //for update record
    $("#recipies").on("click", ".btn-warning", handleUpdate);
    //updateSave button pa jab click ho to do following things
    $("#updateSave").click(function()
    {
        var id =  $("#updateId").val();
        var Name = $("#updateName").val();
        var Age = parseInt($("#updateAge").val());
        var Gender = $("#updateGender").val();
        var Weight = parseInt($("#updateWeight").val());
        var Email = $("#updateEmail").val();  
        console.log(id);
        $.ajax
        ({
            url: "https://babar-fitness-studio-api.herokuapp.com/api/users/update/" + id,
            data: {Name, Age, Gender, Weight, Email},
            method: "PUT",
            success: function(response)
            {
                loadRecipies();
                $("#updateModal").modal("hide"); //It'll hide the Modal
            }
        });
    });

    // do add recipie
    $("#add-data-btn").click(addRecipie);


});



function loadRecipies()
{
    // AJAX GET Request Start
    $.ajax
    ({
        url: "https://babar-fitness-studio-api.herokuapp.com/api/users",
        method: "GET",
        success: function(response)
        {

            console.log(response);
            var recipies = $("#recipies");
            recipies.empty();
            for(var i = 0; i < response.length; i++)
            {
                var record = response[i];
                recipies.append(`<div class="recipe custom-border" data-id="${record._id}"> <h3 id="id">${record._id} <button class="btn btn-sm btn-danger float-right p-2">Delete</button><button class="btn btn-sm btn-warning float-right p-2">Edit</button></h3> <p id="title">${record.Name}</p> <p id="body">${record.Age}</p> <p id="body">${record.Gender}</p> <p id="body">${record.Weight}</p> <p id="body">${record.Email}</p></div>`);
            }
        }
    });
    // AJAX GET Request End
}

function handleDelete()
{
    var btn = $(this); //$(this) btn variable ma us  ki value store kry ga jis pa click hoga as we have multiple buttons 
    var parentDiv = btn.closest(".recipe"); //btn ka parent .recipe
    let id = parentDiv.attr("data-id"); //this will save attr 'data-id' into id variable given in parentDiv
    // console.log("delete btn clicked");
    // console.log(id);

    $.ajax
    ({
        url: "https://babar-fitness-studio-api.herokuapp.com/api/users/delete/" + id,
        method: "DELETE",
        success: function()
        {
            loadRecipies(); //after deleting any data, that data will be deleted from server and we again call loadrecipies() method that will request 'GET' and fetch updated data from server 
        }
    });


}

function addRecipie()
{
    var Name = $("#name").val();
    var Age = parseInt($("#age").val());
    var Gender = $("#gender").val();
    var Weight = parseInt($("#weight").val());
    var Email = $("#gmail").val();
    $.ajax
    ({
        url: "https://babar-fitness-studio-api.herokuapp.com/api/users/post",
        method: "POST",
        data: {Name, Age, Gender, Weight, Email},
        success: function(response)
        {
            console.log(response);
            $("#name").val("");
            $("#age").val("");
            $("#gender").val("");
            $("#weight").val("");
            $("#gmail").val("");
            loadRecipies();
        }
    });
    
    alert("Data added successfully");
}

function handleUpdate()
{
    var btn = $(this); //$(this) btn variable ma us  ki value store kry ga jis pa click hoga as we have multiple buttons 
    var parentDiv = btn.closest(".recipe"); //btn ka parent .recipe
    let id = parentDiv.attr("data-id"); //this will save attr 'data-id' into id variable given in parentDiv
    $.ajax
    ({
        url: "https://babar-fitness-studio-api.herokuapp.com/api/users/" + id,
        success: function(response)
        {
            $("#updateId").val(response._id);
            $("#updateName").val(response.Name);
            $("#updateAge").val(response.Age);
            $("#updateGender").val(response.Gender);
            $("#updateWeight").val(response.Weight);
            $("#updateEmail").val(response.Email);
            $("#updateModal").modal("show"); //It'll show the Modal from HTML file 
        }
    })
    
}