/*CAMBIOS DE PAGINAS*/
function contentChange(id){
	var blocks = document.getElementsByClassName("blocks");
	var i;
	for(i = 0; i<blocks.length; i++){
		blocks[i].style.display = "none";
	}
  document.getElementById(id).style.display = 'block';
  
  var allForums = document.getElementsByClassName("forum_tables");
  var forumThemes = document.getElementById("forum_themes");
  var textarea = document.getElementById("newquestion");
	var button = document.getElementById("addquestion");
  for (var i = 0; i < allForums.length; i++){
    allForums[i].style.display = "none";
  }
  forumThemes.style.display = "block"
  textarea.style.display = "none";
	button.style.display = "none";
}


/*POP UPS*/
var EventsModal = document.getElementById("myEventsModal");
var EventsBtn = document.getElementById("myEventsBtn");
var EventsSpan = document.getElementById("EventsClose");
EventsBtn.onclick = function() {
  EventsModal.style.display = "block";
}
EventsSpan.onclick = function() {
  EventsModal.style.display = "none";
}

var SessionModal = document.getElementById("mySessionModal");
var SessionBtn = document.getElementById("mySessionBtn");
var SessionSpan = document.getElementById("SessionClose");
SessionBtn.onclick = function() {
  SessionModal.style.display = "block";
}
SessionSpan.onclick = function() {
  SessionModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == EventsModal) {
    EventsModal.style.display = "none";
  }
  if (event.target == SessionModal) {
    SessionModal.style.display = "none";
  }
}


/*REGISTER*/
function registerAction(){
	document.getElementById("register").action = "practica1.html";
	var email = document.getElementById("email").value;
	if(email == cookieEmail(getCookie(email))[0]){
		alert("Ya existe otro usuario con el mismo correo");
		document.getElementById("register").action = "login.html";
		return;
	}
    var username = document.getElementById("username").value;
    var nia = document.getElementById("nia").value;
    var pass = document.getElementById("pass").value;
    var namesurname = document.getElementById("namesurname").value;
    var born = document.getElementById("born").value;
    var DNI = document.getElementById("DNI").value;
    var roles = document.getElementById("roles").value;
    var grades = document.getElementById("grades").value;
    var uni = document.getElementById("uni").value;
    var lang = document.getElementById("lang").value;
    var user = username+"/"+nia+"/"+pass+"/"+namesurname+"/"+email+"/"+born+"/"+DNI+"/"+roles+"/"+grades+"/"+uni+"/"+lang;
    setCookie(email, user, 20);	
	localStorage.setItem('actual_user', email);
 }
  

/*LOGIN*/
function loginAction(){
	document.getElementById("login").action = "practica1.html";
	var log_email = document.getElementById("log-email").value;
	var pass = document.getElementById("log-password").value;
	var searchedUser = cookieEmail(getCookie(log_email));
	if(log_email==searchedUser[0] && pass==searchedUser[1]){
		localStorage.setItem('actual_user', log_email);
	}
	else{
		alert("Este usuario no está registrado");
		document.getElementById("login").action = "login.html";
		return;
	}
}


/*EMAIL Y CONTRASEÑA*/
function cookieEmail(cookie){
  var elements = cookie.split('/');
  var email = elements[4];
  var password = elements[2];

  var emailPass = [email, password];
  return emailPass;
}


/*NOMBRE COMPLETA*/
function obtainFullName(cookie){
  var elements = cookie.split('/');
  var fullName = elements[3];
  return fullName;
}


/*COOKIES*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for(var i = 0; i <cookies.length; i++) {
    var c = cookies[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
    }
    return "";
}


/*USUARIO CON ROL*/
function cookieUsername(cookie){
  var elements = cookie.split('/');
  var username = elements[0];
  var role = elements[7];

  var userRole = [username, role];
  return userRole;
}


/*ROLES*/
var actual_email = localStorage.getItem('actual_user');
var actual_user = cookieUsername(getCookie(actual_email));
var nombre_usuario = document.getElementById("nombre_usuario");
var nombre_usuario_logeado = actual_user[0];
var rol_usuario_logeado = actual_user[1];
nombre_usuario.innerHTML = nombre_usuario_logeado;
if (rol_usuario_logeado == "Estudiante"){
  var signatures1 = document.getElementById("signatures1");
  var signatures2 = document.getElementById("signatures2");
  var mycalifications1 = document.getElementById("mycalifications1");
  var mycalifications2 = document.getElementById("mycalifications2");
  signatures1.style.display="block";
  signatures2.style.display="block";
  mycalifications1.style.display="block";
  mycalifications2.style.display="block";
}else{
  var student_list1 = document.getElementById("student_list1");
  var student_list2 = document.getElementById("student_list2");
  var califications1 = document.getElementById("califications1");
  var califications2 = document.getElementById("califications2");
  student_list1.style.display="block";
  student_list2.style.display="block";
  califications1.style.display="block";
  califications2.style.display="block";
}


/*FORUM*/
var lastForum;
function forumMaker(id){
  var actualForum = document.getElementById(id);
  var allForums = document.getElementsByClassName("forum_tables");
  var forumThemes = document.getElementById("forum_themes");
  for (var i = 0; i < allForums.length; i++){
    allForums[i].style.display = "none";
  }
  forumThemes.style.display = "none";
	actualForum.style.display = "block";
	var textarea = document.getElementById("newquestion");
	var button = document.getElementById("addquestion");
	this.lastForum = id;
	textarea.style.display = "block";
	button.style.display = "block";
}

function addNewQuestion(){
	var img = "<img class = 'stphoto' src = 'images/profile.png'>";
	var nombre_usuario = obtainFullName(getCookie(actual_email));
	if(nombre_usuario==null) nombre_usuario = "default_name";
	var fechaActual = new Date();
	var amd = fechaActual.getDate()+"/"+(fechaActual.getMonth()+1)+"/"+fechaActual.getFullYear();
	var hm = fechaActual.getHours()+":"+fechaActual.getMinutes();
	fechaActual = amd+" "+hm;
	var textarea = document.getElementById("newquestion");
	document.getElementById(this.lastForum).insertRow(-1).innerHTML = 
	"<td>"+img+"</td>"+
	"<td>"+nombre_usuario+"</td>"+
	"<td>"+fechaActual+"</td>"+
  "<td>"+textarea.value+"</td>";
  textarea.value = textarea.defaultValue;
}
















