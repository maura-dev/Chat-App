//CHECKS IF A USER IS LOGGED IN. IF NOT REDIRECT BACK TO LOGIN
if(isLoggedIn() == false) {
    window.location.assign("../login.html");
}
else {
    loggedUser = isLoggedIn();
}

//GET USER RECORD
loggedUserRecord = getUserByUsername(loggedUser);

profile = `<div class="chat-box-img">
<img src="../users/${loggedUserRecord.img}">
</div>
<p>@${loggedUserRecord.userName}</p>
`;
document.getElementById("profile").innerHTML = profile; 

// document.getElementById("menu-profile").innerHTML = profile; 

profileBox = `<h3><a href="./profile.html">${loggedUserRecord.fullName}</a></h3>`;
document.getElementById("profile-box").innerHTML = profileBox; 

userType = loggedUserRecord.userType;

if(userType == "admin") {
    isAdmin = `<li><a href="./admin3/index.html" id="side-menu-extra"><i class="fas fa-user-cog fa-1x"></i><b> Admin Panel</b></a></li>`;
} else { isAdmin = ``; }
sideMenu = `<ul class="side-menu">
  			<li><a href="./chatroom.html"><i class="fas fa-comments fa-1x"></i> Chat Rooms</a></li>
  			<li><a href="./idiary.html"><i class="fas fa-book fa-1x"></i> iDiary</a></li>
  			<li><a href="./ireminder.html"><i class="fas fa-business-time fa-1x"></i> iReminder</a></li>
  			<li><a href="./isearch.html"><i class="fas fa-search fa-1x"></i> iSearch</a></li>
  			<li><a href="./settings.html"><i class="fas fa-cog fa-1x"></i> Settings</a></li> 
            ${isAdmin}  
            <li><a href="./logout.html"><i class="fas fa-reply-all fa-1x"></i> Log Out</a></li>   			
          </ul>`
document.getElementById("side-menu-container").innerHTML = sideMenu; 


//GET USER RECORD FOR PROFILE DETAILS IN SETTINGS PAGE//
settingsProfile=`<img src="../users/${loggedUserRecord.img}">
<div>
<p>${loggedUserRecord.fullName}</p>
<p>@${loggedUserRecord.userName}</p>
</div>`

document.getElementById("settings-profile-box").innerHTML= settingsProfile

document.getElementById("profile-phone-number").innerHTML= `${loggedUserRecord.phone}`

document.getElementById("profile-location").innerHTML= `${loggedUserRecord.location}, Nigeria`


 function changeBio(){
  document.getElementById("settings-main").style.opacity="0.3"
  document.getElementById("editBioForm").style.display="block"
  document.getElementById("editBioForm").style.opacity="1"
  bio= document.getElementById("profile-bio-details").innerHTML
  document.getElementById("editBioInput").value= bio

}

function displayEditedBio(){
  document.getElementById("settings-main").style.opacity="1"
  document.getElementById("editBioForm").style.display="none"
  newBio= document.getElementById("editBioInput").value
  document.getElementById("profile-bio-details").innerHTML= newBio
}

function backBio(){
  document.getElementById("settings-main").style.opacity="1"
  document.getElementById("editBioForm").style.display="none"
}









