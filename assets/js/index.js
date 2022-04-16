
$("#add_user").submit(function(event){
    alert("Data Submitted Successfully");
})
$('#update_user').submit(function(event){
    event.preventDefault();

    //getting the data from the submitted form
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array,function(n,i){
        //n returns all the data of the array
        //i returns the index
        data[n["name"]]=n["value"]
    })
    console.log(data);

    var request = {
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated successfully")
    })
})
if(window.location.pathname=="/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id") //Getting the current user id

        var request = {
            "url":`http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }
        if(confirm("Do you really want to delete")){
            $.ajax(request).done(function(response){
                alert("Data Deleted successfully")
                location.reload()
            })
        }
    })
}