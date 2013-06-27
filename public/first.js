function change() {
	bgc = document.getElementById('yesno1').style['background-color'];
	if(bgc == "rgb(224, 223, 230)" || bgc == ""){
		document.getElementById('yesno1').style['background-color'] = "#D62229";
		document.getElementById('yesno1').style['color'] = "#FFFFFF";
		document.getElementById('sb').style['margin-left'] = '43px';
	}
	else{
		document.getElementById('yesno1').style['background-color'] = "#E0DFE6";
		document.getElementById('yesno1').style['color'] = "#555000";
		document.getElementById('sb').style['margin-left'] = '1px';
	}
}