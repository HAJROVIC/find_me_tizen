
//____________config
var hostname = 'findme2017.000webhostapp.com';


$(document).ready(function(){
    setProfileData();

$("#btn_apply_info").click(function(){

    var name=$("#npt_name").val();
    var mail=$("#npt_mail").val();
    var phone=$("#npt_phone").val();

    var formData = new FormData();
        formData.append("id", localStorage.getItem("user_id"));
        formData.append("name", name);
        formData.append("email", mail);
        formData.append("phone", phone);

     if (name !="" && mail!="" && phone!="") {   

    $.ajax({
        url: 'https://'+hostname+'/findme/users/editprofileTezen.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
        
                    localStorage.setItem("user_email", mail);  
                    localStorage.setItem("user_name", name);   
                    localStorage.setItem("user_phone", phone); 
                    setProfileData();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}
else {
    alert ("empty details !");
}

});

$("#btn_pass").click(function(){
    
    
    var newpass=$("#newPass").val();
    var formData = new FormData();
    formData.append("id", localStorage.getItem("user_id"));
    formData.append("password", newpass);
    if(verifPass() == true){
        
         $.ajax({
        url: 'https://'+hostname+'/findme/users/editpass.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
           localStorage.setItem("user_pass",newpass);
        },
        cache: false,
        contentType: false,
        processData: false
    });
         window.location="login.html";

    }else{
        alert("Sorry that's not your password !");
    }

});


$("#postImg").change( function( event ) {  
    var g= document.getElementById("postImg").files[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(g);
    fReader.onloadend = function(event){
    var img = document.getElementById("ImgPrf");
    img.src = event.target.result;
}
});
$("#postImg").click( function( event ) {
    if($("#btn_apl_img").hasClass('scalO'))
        $("#btn_apl_img").addClass('scalL').removeClass('scalO');

    
 });   

$("#btn_apl_img").click( function( event ) {

    var f = document.getElementById("postImg").files[0];
    var formData = new FormData();
    formData.append("id", localStorage.getItem("user_id"));
    formData.append("image", f);

         $.ajax({
        url: 'https://'+hostname+'/findme/users/editphoto.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
           //alert("done");
        },
        cache: false,
        contentType: false,
        processData: false
    });

});


});

//_______________________________________________________________________________________________________________________________________
function setProfileData(){
    		var name=localStorage.getItem("user_name");
    		var mail=localStorage.getItem("user_email");
    		var phone=localStorage.getItem("user_phone");
    		if(name != "")
            $('#npt_name').val(name);
    		if(mail != "")
    		$("#npt_mail").val(mail);
    		if(phone != "")
    		$("#npt_phone").val(phone);
    		if(localStorage.getItem("user_photo") != "")
    		$("#ImgPrf").attr("src",localStorage.getItem("user_photo"));
    	}

    	function verifPass(){
    		var vl=$("#acienPass").val();
    		if(vl == localStorage.getItem("user_pass"))
    			return true;
    		else
    			return false;
    	}