var materialCallback = null;
var fileCallback = null;

function materialAlert( title, text, callback ){
	console.log("material called");
	document.getElementById('materialModalTitle').innerHTML = title;
	document.getElementById('materialModalText').innerHTML = text;
	document.getElementById('materialModalButtonCANCEL').style.display = 'none';
	document.getElementById('materialModalButtonOK').style.display = 'none';
	document.getElementById('materialModalButtonDismiss').style.display = 'block';
	document.getElementById('materialModal').className = 'show';
	materialCallback = callback;
}

function materialConfirm( title, text, callback ){
	materialAlert( title, text, callback);
	document.getElementById('materialModalButtonCANCEL').style.display = 'block';
	document.getElementById('materialModalButtonOK').style.display = 'block';
	document.getElementById('materialModalButtonDismiss').style.display = 'none';
}
function closeMaterialAlert(e, result){
	e.stopPropagation();
	document.getElementById('materialModal').className = 'hide';
	if(typeof materialCallback == 'function') materialCallback(result);
}


function showFileModal(title, text, callback ){
	console.log("material called");
	document.getElementById('fileModalTitle').innerHTML = title;
	document.getElementById('fileModalText').innerHTML = text;
	document.getElementById('fileToUpload').value = null;
	document.getElementById('uploadFilePath').value = null;
	document.getElementById('fileUploadError').innerHTML = "";
	document.getElementById('fileUploadServiceModal').className = 'show';
	fileCallback = callback;
}


function closeFileModal(e){
	e.stopPropagation();
	document.getElementById('fileUploadServiceModal').className = 'hide';
}

function uploadFile(e, result){
	e.stopPropagation();
	document.getElementById('fileUploadServiceModal').className = 'hide';
	if(document.getElementById("fileToUpload").files.length<1){
		document.getElementById('fileUploadError').innerHTML = "Please select at least one file";
	}else{
		closeFileModal(e);
		if(typeof fileCallback == 'function'){
			fileCallback(document.getElementById("fileToUpload").files[0]);
		}
	}
}