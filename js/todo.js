//TO DO
//add LocalStorage
//add validation
//remove alert boxes and add html errors
//redo remove function

var config = {
	listId: "todo-list",
	inputBoxId: "inputBox",
	addButtonId: "btnAdd",
	addButtonText: "+",
	editButtonId: "btnEdit",
	editButtonText: "edit",
	saveButtonId: "btnSave",
	saveButtonText: "save",
	removeButtonId: "btnRemove",
	removeButtonText: "delete",
	deleteLinkClass: "delete-link",
	editLinkClass: "edit-link",
	saveButtonClass: "save-btn",
}

var todoList = (function(config) {


	//Create initial html elements
	createInputBox();
	createAddButton();
	createListHtml();

	var addButton = document.getElementById(config.addButtonId),
		inputBox = document.getElementById(config.inputBoxId),
		list = document.getElementById(config.listId);

	var errors = [];
	var norepeat = false;

		function validate() {
			if (!norepeat && errors.length > 0) {
				createErrors(errors);
				norepeat = true;
			}
			else {
				removeErrors(errors);
			}
		}
		

    	addButton.addEventListener("click", addItem);

		//
		//Factory Functions
		//
		function createInputBox() {
			var inputBox = document.createElement("input");
			inputBox.setAttribute("id", config.inputBoxId);
			inputBox.setAttribute("placeholder", "What needs to be done?");
			inputBox.setAttribute("onkeydown", "if (event.keyCode == 13) document.getElementById('btnAdd').click()");

			document.getElementById("content").appendChild(inputBox);
		}

		function createAddButton() {
			var addButton = document.createElement("button");
			addButton.setAttribute("id", config.addButtonId);
			addButton.setAttribute("type", "submit");
			addButton.setAttribute("for", "inputBox");
			addButton.innerHTML = config.addButtonText;

			document.getElementById("content").appendChild(addButton);
		}

		function createRemoveButton() {
			var removeButton = document.createElement("button");
			removeButton.setAttribute("id", config.removeButtonId);
			removeButton.innerHTML = config.removeButtonText;
			removeButton.addEventListener("click", removeItem);

			return removeButton;
		}

		function createEditButton() {
			var editButton = document.createElement("button");
			editButton.setAttribute("id", config.editButtonId);
			editButton.innerHTML = config.editButtonText;
			editButton.addEventListener("click", editItem);

			return editButton;
		}

		function createSaveButton() {
			var saveButton = document.createElement("save");
			saveButton.setAttribute("id", config.saveButtonId);
			saveButton.innerHTML = config.saveButtonText;
			saveButton.addEventListener("click", saveItem);

		}

		function createErrors(errors) {
			var errorContainer = document.createElement("ul");
			errorContainer.setAttribute("id", "error-container");

			for (i = 0; i < errors.length; i++) {
				var errorItem = document.createElement("li");
				errorItem.setAttribute("class", "error");
				errorItem.innerHTML = errors[i];
				errorContainer.appendChild(errorItem);
			}

			document.getElementById("content").insertBefore(errorContainer, inputBox);

		}

		function removeErrors(errors) {
			errors.length = 0;  //empties array
			document.getElementById("error-container").innerHTML = "";
			var container = document.getElementById("error-container");
            var content = container.innerHTML;
            container.innerHTML= content;
		}

		function createListHtml() {
			var list = document.createElement("ul");
			list.setAttribute("id", config.listId);

			document.getElementById("content").appendChild(list);
		}

		//
		//Action Functions
		//
		function addItem() {
			var listElement = document.createElement('li'),
			    span = document.createElement('span');

			if (inputBox.value) {
				span.innerHTML = inputBox.value;

				listElement.appendChild(span);
				listElement.appendChild(createEditButton());
				listElement.appendChild(createRemoveButton());
				list.appendChild(listElement);

				validate();
			} else {
				errors.push("Can't submit if you have nothing to add, son.");
				validate();
			}

			inputBox.value = "";

		}

		function removeItem() {
			var parent = this.parentNode.parentNode, //ul
				child = this.parentNode; //li
			parent.removeChild(child);

		}

		function editItem() {
			var currentText = this.previousSibling.innerHTML;
			var span = this.previousSibling;

			span.innerHTML = "<input type='text' value='"+currentText+"' >";

			//Change edit button to save button
			this.setAttribute("id", config.saveButtonId);
			this.innerHTML = config.saveButtonText;
			this.removeEventListener("click", editItem);
			this.addEventListener("click", saveItem);

		}

		function saveItem() {
			var currentText = this.previousSibling.childNodes[0].value;
			var span = this.previousSibling;

			if (currentText != "") {

				span.innerHTML = currentText;

				//Change save button to edit button
				this.setAttribute("id", config.editButtonId);
				this.innerHTML = config.editButtonText;
				this.removeEventListener("click", saveItem);
				this.addEventListener("click", editItem);

			} else {
				errors.push("Please enter a task.");
				validate();
			}

		}
})(config);