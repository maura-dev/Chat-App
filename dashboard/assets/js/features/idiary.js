logged=JSON.parse(localStorage.getItem("logged"))
		
		
		//DISPLAY LOADER BESIDE THE SEARCH BUTTON BEFORE RESULTS SHOW UP
		function displayLoader(){
			document.getElementById("idiary-loader").style.display="inline-block"
			setTimeout(searchIncludes,1000)
		}

		//DISPLAY LOADER BESIDE THE BACK BUTTON BEFORE ALL SAVED NOTES SHOW UP
		function displayBackLoader(){
			document.getElementById("idiary-back-loader").style.display="inline-block"
			setTimeout(back,1000)
		}

		//TO SEARCH FOR A SAVED NOTE
		function searchIncludes(){
			
		input= document.getElementById("searchInput").value
	
		input=input.toLowerCase()//CONVERTS THE SEARCH INPUT TO LOWER CASE
		db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				docId = doc.id
				const {iDairy} = doc.data();
			allMessagez = iDairy.filter(x=>x.message.toLowerCase().includes(input))
			document.getElementById("records").style.display="block"
			document.getElementById("back-btn").style.display="block"
			document.getElementById("top").style.display="none"
			document.getElementById("top-heading").style.display="none"
		
			if(allMessagez==null||allMessagez==undefined){
				document.getElementById("records").innerHTML=`<b> No notes found</b>`
			}
			
			else{
				displaySearchedMessages()
				
				if(allMessagez.length==1){
				document.getElementById("records").innerHTML=`<b> 1 note found</b>`
				}
				else{
				document.getElementById("records").innerHTML=`<b>${allMessagez.length} notes found</b>`
				}
			}
				
			})
			});
	
		//FILTERS FOR MESSAGES THAT INCLUDE THE SEARCH PARAMETER
		
		
		}
	
	
		//TO GO BACK TO THE MAIN DISPLAY OF ALL SAVED MESSAGES
		function back(){
		location.reload()
		}
	
		//TO SHOW THE ADD NEW MESSAGE FORM
		function addNewMessage(){
		//document.getElementById("overlay").style.display="block"
		document.getElementById("addNew").style.display="block"
		document.getElementById("top").style.display="none"
		document.getElementById("messages").style.display="none"
		document.getElementById("top-heading").style.display="none"
		document.getElementById("messageInput").value=""
		}

		//TO DISPLAY ALL SAVED NOTES PLUS NEWLY ADDED NOTE
		function displayAddedMessage(){
		document.getElementById("top").style.display="block"
		document.getElementById("addNew").style.display="none"
		document.getElementById("top-heading").style.display="block"
		document.getElementById("messages").style.display="block"
		todaysDate= new Date()//TO GET THE TIME STAMP FOR ALL MESSAGES
	
		newMessage={
			time : todaysDate,
			message: document.getElementById("messageInput").value
		}

		db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				docId = doc.id
		});
		
		db.collection("users").doc(docId).set({
			iDairy: firebase.firestore.FieldValue.arrayUnion(newMessage)
		}, { merge: true })
		  .then(() => {
			console.log("Document added");
			displayMessages()
			
		});
		});
		

		}


	
		//FUNCTION TO DISPLAY EDIT MESSAGE FORM
		function showEditMessageForm(x){
		//document.getElementById("overlay").style.display="block"	
		document.getElementById("editNew").style.display="block"
		document.getElementById("top").style.display="none"
		document.getElementById("messages").style.display="none"
		document.getElementById("top-heading").style.display="none"
	
		//SHOWS USER DETAILS AS VALUES TO BE EDITED
		db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				docId = doc.id
				console.log(doc.data())
				if (doc.exists) {
					db.collection("users").doc(docId).get()
					  .then(() => {
						document.getElementById("messageId").value= x
						document.getElementById("editMessageInput").value= doc.data().iDairy[x].message 
				});}
		});})}
	
	
		//FUNCTION FOR EDITING MESSAGES
		function displayEditedMessage(x){
		//document.getElementById("overlay").style.display="none"
		document.getElementById("top").style.display="block"
		document.getElementById("editNew").style.display="none"
		document.getElementById("top-heading").style.display="block"
		document.getElementById("messages").style.display="block"
		todaysDate= new Date()//TO GET THE TIME STAMP FOR ALL MESSAGES
		messageId= document.getElementById("messageId").value
	
		// editedMessage= {
		// time: "Last edited on " + todaysDate, 
		// message: document.getElementById("editMessageInput").value
		// }
		
		db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				docId = doc.id
				console.log(doc.data())
				const {message} = doc.data();
				if (doc.exists) {
					db.collection("users").doc(docId).update({

						// [`iDairy.${0}`]: { 
						// 	time: "Last edited on " + todaysDate, 
						// 	message: document.getElementById("editMessageInput").value
						// }
					
					"iDairy" : [ 
							{
								time: todaysDate, 
								message: document.getElementById("editMessageInput").value
							}
						]
					})
					  .then(() => {
						swal("GREAT!", "You have successfully edited this note!", "success");
						displayMessages()
						//document.getElementById("messages").style.display="block"
					});
				  }

				
		})});
		//document.getElementById("messages").style.display="none"
		}
	
	
		//FUNCTION FOR DELETING MESSAGES
		function deleteMessages(x){
			swal({
				title: "Are you sure?",
				text: "Once deleted, you will not be able to recover this note!",
				icon: "warning",
				buttons: true,
				dangerMode: true,
				})

				.then((willDelete) => {
				if (willDelete) {
					db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							docId = doc.id
							console.log(doc.data())
							const {userName, location} = doc.data();
							if (doc.exists) {
								db.collection("users").doc(docId).update({
									"iDairy" : firebase.firestore.FieldValue.arrayRemove(doc.data().iDairy[x])
								})
								  .then(() => {
									
									swal(" This note has been deleted!", {
										icon: "success",
										});
									console.log("Document deleted");
									displayMessages()
								});
							  }
		
							displayMessages()
					});
					});

				} 

				else {
					swal("This note is safe!");
					displayMessages()
				}
				});

		}
	
	
		function displaySearchedMessages(){
		content=""
		db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				docId = doc.id
				const {iDairy} = doc.data();
				var allMessagez = iDairy.filter(x=>x.message.toLowerCase().includes(input))
				console.log(allMessagez)
				y= allMessagez.length
				content=""
			})
				for(var x=y-1; x>=0; x--){
					content+=`<div id="messageContainer">
						<sup>${ToTime(allMessagez[x].time)}</sup><br>
						<p> ${allMessagez[x].message}</p><br>
						</div>`
				}
				document.getElementById("messages").innerHTML= content
		});
		
		}
	
	
		
		function displayMessages(){
		
			db.collection("users").where("userName", "==", logged).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					docId = doc.id
					// console.log(doc.data())
					const {iDairy} = doc.data();
					y= iDairy.length
					content=""
		for(var x=y-1; x>=0; x--){
			content+=`
				<div id="messageContainer">
				<sup>${ToTime(iDairy[x].time)}</sup>
				<p> ${iDairy[x].message}</p>
				<div id="buttons">
					<span style="font-size:20px; color:#03045e;" id="edit-icon" onclick="showEditMessageForm(${x})" align="right">
					<i class="far fa-edit"></i>
					</span>
	
					<span style="font-size:20px; color:#03045e;" id="delete-icon" onclick="deleteMessages(${x})">
					<i class="far fa-trash-alt"></i>
					</span>
				</div>
				
			</div>`
		}})
		document.getElementById("messages").innerHTML= content
			});
		}
	
		displayMessages()

		var autoExpand = function (field) {

		// Reset field height
		field.style.height = 'inherit';

		// Calculate the height
		var height = field.scrollHeight - 19
		             
		field.style.height = height + 'px';

		};

		document.addEventListener('input', function (event) {
			if (event.target.tagName.toLowerCase() !== 'textarea') return;
			autoExpand(event.target);
		}, false);
