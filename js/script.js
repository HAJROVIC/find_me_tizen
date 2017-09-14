/**
*
* Detect Mobile Touch Support
*
**/

var touchSupport = false;
var eventClick = 'click';
var eventHover = 'mouseover mouseout';
var hostname = 'findme2017.000webhostapp.com';
// Get the modal
var modal;
var btn;
var span;
var firstCircle;

(function(){
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
		touchSupport = true;
		eventClick = 'touchon touchend';
		eventHover = 'touchstart touchend';
	} else {
		$('html').addClass('no-touch');
	}
})();




/**
*
* Hides Adress Bar
*
**/

function hideAddressBar() {
	if(!window.location.hash) {
		if(document.documentElement.scrollHeight < window.outerHeight) {

			/* Expands Page Height if it's smaller than window */

			document.body.style.minHeight = (window.outerHeight + 60) + 'px';
			document.getElementById('container').style.minHeight = (window.outerHeight + 60) + 'px';
			document.getElementById('content-container').style.minHeight = (window.outerHeight + 60) + 'px';
		}

		setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
	}
}
 
window.addEventListener('load', function(){ if(!window.pageYOffset){ hideAddressBar(); } } );




/**
*
* Photoswipe
*
**/

var photoswipeContainer = '.photoswipe a';
		
if($(photoswipeContainer).length > 0){
	(function(window, $, PhotoSwipe){

		$(document).ready(function(){
			
			var options = {
			
				/* Customizing toolbar */

				getToolbar: function(){
					return '<div class="ps-toolbar-previous icon-left-open"></div>'
					+ '<div class="ps-toolbar-play icon-play"></div>'
					+ '<div class="ps-toolbar-next icon-right-open"></div>';
				},
						
				getImageCaption: function(el){
					var captionText, captionEl, captionBack;
					
					/* Get the caption from the alt tag */

					if (el.nodeName === "IMG"){
						captionText = el.getAttribute('alt'); 
					}

					var i, j, childEl;
					for (i=0, j=el.childNodes.length; i<j; i++){
						childEl = el.childNodes[i];
						if (el.childNodes[i].nodeName === 'IMG'){
							captionText = childEl.getAttribute('alt'); 
						}
					}
					
					/* Return a DOM element with custom styling */

					captionBack = document.createElement('a');
					captionBack.setAttribute('id', 'ps-custom-back');
					captionBack.setAttribute('class', 'icon-cancel-1');
					
					captionEl = document.createElement('div');
					captionEl.appendChild(captionBack);
					
					captionBack = document.createElement('span');
					captionBack.innerHTML=captionText;
					captionEl.appendChild(captionBack);
					return captionEl;
				},
				
				enableMouseWheel: false,
				captionAndToolbarOpacity: 1,
			}




			/* Creating Photoswipe instance */

			var instance = PhotoSwipe.attach(window.document.querySelectorAll(photoswipeContainer), options );




			/* Adding listener to custom back button */

			instance.addEventHandler(PhotoSwipe.EventTypes.onShow, function(e){
				$('.ps-caption').addClass('active');
				$('.ps-toolbar').addClass('active');
				$('.ps-document-overlay').addClass('active');
				$('.ps-carousel').addClass('active');

				if($('html').hasClass('no-csstransforms')){
					$(document).on('click', '#ps-custom-back', function() {
						e.target.hide();
					});
				}else{
					$(document).on(eventClick, '#ps-custom-back' , function(){
						$('.ps-caption').removeClass('active');
						$('.ps-toolbar').removeClass('active');
						setTimeout(function(){
							$('.ps-document-overlay').removeClass('active');
							$('.ps-document-overlay').addClass('unload');
							$('.ps-carousel').removeClass('active');
							setTimeout(function(){
								e.target.hide();
							}, 400);
						}, 400);
					});
				}

			});




			/* Play/Pause Icon Change */

			/* Slideshow Start */

			instance.addEventHandler(PhotoSwipe.EventTypes.onSlideshowStart, function(e){
				$('.ps-toolbar-play').removeClass('icon-play');
				$('.ps-toolbar-play').addClass('icon-pause');
				$('.ps-toolbar-play').addClass('hover');
			});

			/* Slideshow End */

			instance.addEventHandler(PhotoSwipe.EventTypes.onSlideshowStop, function(e){
				$('.ps-toolbar-play').removeClass('icon-pause');
				$('.ps-toolbar-play').addClass('icon-play');
				$('.ps-toolbar-play').removeClass('hover');
			});
					
		}, false);	

	}(window, window.jQuery, window.Code.PhotoSwipe));




	/* Hover Effects - Photoswipe */

	$(document).on(eventHover, '#ps-custom-back, .ps-toolbar-previous, .ps-toolbar-play, .ps-toolbar-next', function() {
		$(this).toggleClass('hover');
	});
}

jQuery(document).ready(function($) {
	$('#sidemenu-container').toggleClass('active');
	$('#sidemenu-container').toggleClass('active');

	/**
	*
	* Touch Gestures
	*        &
	* Hover and Animation Triggers
	*
	**/

	/* Hover Effects */

	$('.portfolio-grid article a, .button, button, input[type="submit"], input[type="reset"], input[type="button"], #header a, .header-button, #nav-container a, .nav-child-container, .gallery-container a, #ps-custom-back').bind(eventHover, function(event) {
		$(this).toggleClass('hover');
	});

	/* Sidebar multi-level menu */
	
	$('.nav-child-container').bind(eventClick, function(event) {
		event.preventDefault();
		var $this = $(this);
		var ul = $this.next('ul');
		var ulChildrenHeight = ul.children().length * 46;

		if(!$this.hasClass('active')){
			$this.toggleClass('active');
			ul.toggleClass('active');
			ul.height(ulChildrenHeight + 'px');
		}else{
			$this.toggleClass('active');
			ul.toggleClass('active');
			ul.height(0);
		}
	});

	/* Sidebar Functionality */
	
	var opened = false;
	$('#menu-trigger').bind(eventClick, function(event) {
		$('#content-container').toggleClass('active');
		$('#sidemenu').toggleClass('active');
		if(opened){
			opened = false;
			setTimeout(function() {
				$('#sidemenu-container').removeClass('active');
			}, 500);
		} else {
			$('#sidemenu-container').addClass('active');
			opened = true;
		}
	});
		
	$('.nav a').bind('click', function(event) {
		event.preventDefault();
		var path = $(this).attr('href');
		$('#content-container').toggleClass('active');
		$('#sidemenu').toggleClass('active');
		setTimeout(function() {
			window.location = path;
		}, 500);
	});

	/* Swipe menu support */
		
	$('.touch-gesture #content').hammer().on('swiperight', function(event) {
		$('#content-container').addClass('active');
		$('#sidemenu').addClass('active');
		if(opened){
			opened = false;
			setTimeout(function() {
				$('#sidemenu-container').removeClass('active');
			}, 500);
		} else {
			$('#sidemenu-container').addClass('active');
			opened = true;
		}
	});
	
	$('.touch-gesture #content').hammer().on('swipeleft', function(event) {
		$('#content-container').removeClass('active');
		$('#sidemenu').removeClass('active');
		if(opened){
			opened = false;
			setTimeout(function() {
				$('#sidemenu-container').removeClass('active');
			}, 500);
		} else {
			$('#sidemenu-container').addClass('active');
			opened = true;
		}
	});




	/**
	*
	* Check if the child menu has an active item.
	* If yes, then it will expand the menu by default.
	*
	**/
	
	var $navItems = $('.nav ul li a');

	$navItems.each(function(index){
		if ($(this).hasClass('current')) {
			$parentUl = $(this).parent().parent();
			$parentUl.height($parentUl.children('li').length * 46 + "px");
			$parentUl.prev().addClass('active');
			$parentUl.addClass('active');
			$anchor = $parentUl.prev();
			$anchor.children('.nav-child-container').addClass('active');
		}
	});




	/**
	*
	* Flexslider
	*
	**/

	var $flexsliderContainer = $('.flexslider');

	if($flexsliderContainer.length > 0){
		$flexsliderContainer.flexslider({
			controlsContainer: ".flexslider-controls",
			prevText: '<span class="icon-left-open-big"></span>',
			nextText: '<span class="icon-right-open-big"></span>',
			slideshowSpeed: 5000,
			animationSpeed: 600,
			slideshow: true,
			smoothHeight: false,
			animationLoop: true,
		});
	}




	/**
	*
	* Alert boxes
	*
	**/

	var $alertBoxes = $('.alert-box .close');

	$alertBoxes.bind(eventClick, function(event) {
		event.preventDefault();
		var $parent = $(this).parent('.alert-box');
		$parent.fadeOut(500);
		setTimeout(function() { $parent.hide(0); }, 500);
	});




	/**
	*
	* H5 Validate - Form jQuery Validation
	*
	**/

	$('form').h5Validate();
});

//hassine
function initp(){   
	$("#image").append('<img src='+localStorage.getItem("user_photo")+' alt="">'); 
	$("#details").append('<p class="title" >'+localStorage.getItem("user_name")+'</p>');
	$("#details").append('<p class="subtitle" >'+localStorage.getItem("user_email")+'</p>');
}

function init(){   
	$("#image").append('<img src='+localStorage.getItem("user_photo")+' alt="">'); 
	$("#details").append('<p class="title" >'+localStorage.getItem("user_name")+'</p>');
	$("#details").append('<p class="subtitle" >'+localStorage.getItem("user_email")+'</p>');

	
	$.getJSON("https://"+hostname+"/findme/news/testCircles.php?user_id="+localStorage.getItem("user_id"),function(data){
		$.each(data.circles,function(){
			var title=this['title'];
			var id = this['id'];
			localStorage.setItem("firstCircle",id);
			$("#circles-list").append('<li><a onclick="setCircleIdFriends('+id+')"  class="hajri" href="#"> '+title+'</a></li>');
               
				});
		
});
	
    $.post(
        'https://'+hostname+'/findme/getFriends.php',
        {
            circle_id : 1                
        },

        function(data){            	         
        var par = $.parseJSON(data);  
   			for (var i=0;i<par.users.length;i++) {
   				if(localStorage.getItem("user_id")!=par.users[i].id){
       				//$("#gallery").append('<a href=""><img src='+par.users[i].photo+'alt=""></a>');   
       				//alert(par.users[i].photo);
       				}

     		}		                   
        }
     );
    setCircleIdFriends2(1);
};

function setCircleIdFriends2(c) {
    
    // Save data to the current local store
	localStorage.setItem("circle_id", c);
	$("#gallery").empty();

	$.post(
	        'https://'+hostname+'/findme/getFriends.php',
	        {
	            circle_id : localStorage.getItem("circle_id")                
	        },

	        function(data){            	         
	        var par = $.parseJSON(data);        
	   			for (var i=0;i<par.users.length;i++) {
	   				if(localStorage.getItem("user_id")!=par.users[i].id){
	       				$("#gallery").append('<a href=""><img src='+par.users[i].photo+' alt=""></a>');           				
	       				}

	     		}		                   
	        }
	     );

}

function setCircleIdFriends(c) {
    
    // Save data to the current local store
	localStorage.setItem("circle_id", c);
	$("#gallery").empty();

	$.post(
	        'https://'+hostname+'/findme/getFriends.php',
	        {
	            circle_id : localStorage.getItem("circle_id")                
	        },

	        function(data){            	         
	        var par = $.parseJSON(data);        
	        alert(par.users.length);
	   			for (var i=0;i<par.users.length;i++) {
	   				if(localStorage.getItem("user_id")!=par.users[i].id){
	       				$("#gallery").append('<a href=""><img src='+par.users[i].photo+' alt=""></a>');           				
	       				}

	     		}		                   
	        }
	     );
	/* Sidebar Functionality */

	$('#content-container').toggleClass('active');
	$('#sidemenu').toggleClass('active');

		setTimeout(function() {
			$('#sidemenu-container').removeClass('active');
		}, 500);

}
function initIndex(){   
	$("#image").append('<img src='+localStorage.getItem("user_photo")+' alt="">'); 
	$("#details").append('<p class="title" >'+localStorage.getItem("user_name")+'</p>');
	$("#details").append('<p class="subtitle" >'+localStorage.getItem("user_email")+'</p>');
	
	
};
function logout(){   
	localStorage.clear();
	localStorage.setItem("logged", false); 
	 window.location.replace("login.html");
};

//********************************************************HAJRI********************************************************************
$(document).ready(function(){
	//________________________________init___________________________________
	document.getElementById("erreurCreationCircle").style.display="none";
	document.getElementById("erreurJoinCircle").style.display="none";
	document.getElementById("data").reset();


			
	$.getJSON("https://"+hostname+"/findme/news/testCircles.php?user_id="+localStorage.getItem("user_id"),function(data){
		$.each(data.circles,function(){
			localStorage.setItem("firstCircle",data.circles);
			var title=this['title'];
			var id = this['id'];
			localStorage.setItem("firstCircle",id);
			$("#circles-list").append('<li><a onclick="setCircleId('+id+')"  class="hajri" href="#"> '+title+'</a></li>');
               
				});
		
});

	$.getJSON("https://"+hostname+"/findme/news/getAllCircleNews.php?circle_id="+localStorage.getItem("firstCircle"),function(data){
		$.each(data.news,function(){
			var pht=this['photo'];
			var user_name=this['user_name'];
			var url = this['url'];
			var description = this['content'];
			var d =this['when'];
		$("#content").append('<div class="card"><img src='+pht+' class="postUsr"><b class="posUsrN">'+user_name+'</b><div class="datePostPos" style="color: #79b7d2"><i class="icon-back-in-time"> </i>'+d+'</div><img id="CardImg" src='+url+' style="width:100%"><div class="CardTextContainer"> <p>'+description+'</p> </div></div>');
	});
});

	////////add

 $("#addcirl").click(function(){
	
	$("#erreurCreationCircle").empty();
	
	if($("#circleName").val()=="" || $("#circlePwd").val()=="" ){
		$("#erreurCreationCircle").append("Empty details !");
		document.getElementById("erreurCreationCircle").style.display="block";

 	}
	else{
     $.post(

            'https://'+hostname+'/findme/circle.php',
            {

                title : $("#circleName").val(),  
                code : $("#circlePwd").val(),
                description : $("#circleDescription").val(),   
                creator : localStorage.getItem("user_id")

            },

            function(data){
                var retour = $.parseJSON(data);
                if(retour["error"]==true){  
                 var e=retour["error_msg"];  
 				 $("#erreurCreationCircle").append(""+e);  
 				 document.getElementById("erreurCreationCircle").style.display="block";

                }  
                else{
                	document.getElementById("erreurCreationCircle").style.display="none";
                	modal.style.display = "none";
                }              

            } 
         );}
 });
  
   $("#joincirl").click(function(){
	$("#erreurJoinCircle").empty();
	if ($("#circleCodeJoin").val()!="") {
     $.post(

            'https://'+hostname+'/findme/inviter.php',
            {
                circle_code : $("#circleCode").val(),   
                user_id : localStorage.getItem("user_id")

            }
         );
					document.getElementById("erreurJoinCircle").style.display="block";
                	modal.style.display = "none";
 }
 else {
 	$("#erreurJoinCircle").append("Empty details !");
	document.getElementById("erreurJoinCircle").style.display="block";
 }
 }); 

$("form#data").submit(function(){
  var pc = document.getElementById("postCreat").value;
 // var pi = document.getElementById("postImg").value;

    var formData = new FormData($(this)[0]);
    formData.append("circle_id", localStorage.getItem("circle_id"));
    formData.append("id_user", localStorage.getItem("user_id"));
    if ((pc != "") && ($("#file-return").attr('src') !="")) {

    $.ajax({
        url: 'https://'+hostname+'/findme/news/addNews.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
        },
        cache: false,
        contentType: false,
        processData: false
    });
}else{
	alert("choose a photo");
}
    document.getElementById("data").reset();
    $("#file-return").attr('src')="";
    return false;
});


});
function setCircleId(c) {
    // Save data to the current local store
	localStorage.setItem("circle_id", c);
	$("#content").empty();

	$.getJSON("https://"+hostname+"/findme/news/getAllCircleNews.php?circle_id="+localStorage.getItem("circle_id"),function(data){
		
		$.each(data.news,function(){
			var pht=this['photo'];
			var user_name=this['user_name'];
			var url = this['url'];
			var description = this['content'];
			var d =this['when'];
		$("#content").append('<div class="card"><img src='+pht+' class="postUsr"><b class="posUsrN">'+user_name+'</b><span style="color: #79b7d2"><i class="icon-back-in-time"> </i>'+d+'</span><img id="CardImg" src='+url+' style="width:100%"><div class="CardTextContainer"> <p>'+description+'</p> </div></div>');
	});
});

/* Sidebar Functionality */

		$('#content-container').toggleClass('active');
		$('#sidemenu').toggleClass('active');

			setTimeout(function() {
				$('#sidemenu-container').removeClass('active');
			}, 500);
		 
}



// ajout de la classe JS à HTML
document.querySelector("html").classList.add('js');
 
// initialisation des variables
var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");
 

 
// affiche un retour visuel dès que input:file change
$("#postImg").change( function( event ) {  
    var g= document.getElementById("postImg").files[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(g);
    fReader.onloadend = function(event){
	var img = document.getElementById("file-return");
	img.src = event.target.result;
	img.height=80;
	img.width=80;
	img.style="margin-top: 5px;";
}
});

// When the user clicks the button, open the modal 
function popCreateCircle() {
    
	modal=document.getElementById('CircleCreation');
    modal.style.display = "block";
    span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
			span.onclick = function() {
   				 modal.style.display = "none";
			}
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
    	if (event.target == modal) {
        modal.style.display = "none";
    	}
		}
}
function popJoinCircle(){
	modal=document.getElementById('circleJoin');
    modal.style.display = "block";
    span = document.getElementsByClassName("close")[1];
    // When the user clicks on <span> (x), close the modal
			span.onclick = function() {
   				 modal.style.display = "none";
			}
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
    	if (event.target == modal) {
        modal.style.display = "none";
    	}
		}
}





