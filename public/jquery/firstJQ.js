var numofmessages = '';
var messages = [];
var messagefocus = 1;
var enableAnimation = true;
$(document).ready(function(){
	//$(".messagebox").hide();
	//document.cookie = 'name=Raffi&messages=3&message1=Very important message is very persistent!&message2=I\'m persistent and I\'m here to stay!&message3=I\'m staying forever because I\'m persistent!; expires=expires=Thu, 01 Jan 2014 00:00:01 GMT';
	console.log(document.cookie);
	if(document.cookie != ''){
		getNumberOfMessages(0);
		getMessages(0, numofmessages);
		console.log(messages);
		makeMessages();
		adjustControls();
	}
	checkCookie();
	$("#theform").ajaxForm({url: '/form/redirection', type: 'post', success: function(res){
			window.scrollTo(0, 0);
			console.log(res);
	}});
	$(".rightbutton").mousedown(function(){
		if(enableAnimation && messagefocus < numofmessages){
			enableAnimation = false;
			contPosition = $(this).parent().parent().children(".messagecontainer").css('left');
			contPosition = contPosition.substring(0, contPosition.indexOf("px"));
			contPosition = parseInt(contPosition);
			contPosition = (contPosition - 852) + 'px';
			$(this).parent().parent().children(".messagecontainer").animate({left:contPosition}, 600, function(){
				enableAnimation = true;
			});
			//$(this).parent().parent().children(".messagecontainer").css('left', contPosition);
			messagefocus++;
			adjustControls();
		}
	});
	$(".leftbutton").mousedown(function(){
		if(enableAnimation && messagefocus > 1){
			enableAnimation = false;
			contPosition = $(this).parent().parent().children(".messagecontainer").css('left');
			contPosition = contPosition.substring(0, contPosition.indexOf("px"));
			contPosition = parseInt(contPosition);
			contPosition = (contPosition + 852) + 'px';
			$(this).parent().parent().children(".messagecontainer").animate({left:contPosition}, 600, function(){
				enableAnimation = true;
			});
			//$(this).parent().parent().children(".messagecontainer").css('left', contPosition);
			messagefocus--;
			adjustControls();
		}
	});
});
function getCookie(c_name){
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1){
		c_value = null;
	}
	else{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1){
			//c_end = c_value.length;
			c_end = c_value.indexOf("&messages=");
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function checkCookie(){
	var username=getCookie("name");
	if (username!=null && username!=""){
		//alert("Welcome again " + username);
	}
	else {
		username=prompt("Please enter your name:","");
		if (username!=null && username!=""){
			setCookie("name",username,365);
		}
	}
}

function getNumberOfMessages(i){
	index = document.cookie.indexOf('&messages=');
	value = document.cookie.substring(index+10+i,index+11+i);
	if(!isNaN(value)){
		numofmessages = numofmessages + value;
		getNumberOfMessages(i+1);
	}
	else{
		numofmessages = parseInt(numofmessages);
	}
}

function getMessages(i, numofmsgs){
	index1 = '';
	index2 = '';
	index1 = document.cookie.indexOf('&message' + (i+1));
	if( (i+1) < numofmsgs){
		index2 = document.cookie.indexOf('&message' + (i+2));
		messages[i] = document.cookie.substring(index1+10,index2);
		if(i < numofmsgs-1)
			getMessages(i+1, numofmsgs);
	}
	else{
		messages[i] = document.cookie.substring(index1+10);
	}
}

function makeMessages(){
	for(i=0; i<numofmessages; i++){
		d1=document.createElement('div');
		$(d1).addClass("messagebox")
			.attr("id", "messagebox" + (i+1))
			.appendTo($(".messagecontainer"));
		d2=document.createElement('p');
		$(d2).addClass("messagetext")
			.html(messages[i])
			.appendTo($("#messagebox" + (i+1)));
		d3=document.createElement('button');
		$(d3).addClass("pagebutton okbutton")
			.attr("id", "okbutton" + (i+1))
			.html("OK")
			.appendTo($("#messagebox" + (i+1)))
			.on('mousedown', function() {
				$(this).parent().hide(600);
				numofmessages--;
				if(numofmessages <= 1)
					$(this).parent().parent().parent().children(".messagecontrols").hide();
				if(messagefocus > 1){
					contPosition = $(this).parent().parent().parent().children(".messagecontainer").css('left');
					contPosition = contPosition.substring(0, contPosition.indexOf("px"));
					contPosition = parseInt(contPosition);
					contPosition = (contPosition + 852) + 'px';
					$(this).parent().parent().parent().children(".messagecontainer").css('left', contPosition);
				}
				if(messagefocus != 1)
					messagefocus--;
				adjustControls();
			});
	}
}

function adjustControls(){
	if(messagefocus == 1){
		$(".leftbutton").hide();
		$(".rightbutton").show();
	}
	else
		if(messagefocus == numofmessages){
			$(".rightbutton").hide();
			$(".leftbutton").show();
		}
		else{
			$(".leftbutton").show();
			$(".rightbutton").show();
		}
}