function app() {
	// =============script to toggle the notification menu open or close.
	const notificationMenuTrigger = document.getElementById("notification_menu");
	const notificationDropdown = document.getElementById("notification_dropdown");
	const notificationActionableItems =
		notificationDropdown.querySelectorAll("[role='menuitem']");

	function handleMenuKeypress(e) {
		if (e.key === "Escape") {
			toggleMenu();
		}
	}

	function handleArrowkeypress(e, index) {
		// check if user on the last item in the nodelist
		const isLastItem = index === notificationActionableItems.length - 1;
		const isFirstItem = index === 0;

		const nextItem = notificationActionableItems.item(
			index + 1
		); /* recall that we have a function that autofocuses on the first node item when the dropdown is opened, so, when dropdown opens the index is 1, to move to the next index we just add 1 to the current index*/

		const prevItem = notificationActionableItems.item(index - 1);

		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			// check if user is at the last item in the node list, if yes, put focus on the first item
			if (isLastItem) {
				notificationActionableItems.item(0).focus();
				return;
			}

			// put focus on the nextItem
			nextItem.focus();
		}

		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			// check if user is at the first item in the node list, if yes, put focus on the last item
			if (isFirstItem) {
				notificationActionableItems
					.item(notificationActionableItems.length - 1)
					.focus();
				return;
			}

			// put focus on the prevItem
			prevItem.focus();
		}
	}

	function openMenu() {
		// opens the closed dropdown
		notificationMenuTrigger.ariaExpanded = "true";
		// when the dropdown is opened, send focus to the first actionable item
		notificationActionableItems.item(0).focus();

		// add an event listener on the dropdown container
		notificationDropdown.addEventListener("keyup", handleMenuKeypress);

		// when the dropdown is open, add an event listener to all the actionable items
		notificationActionableItems.forEach((item, index) => {
			item.addEventListener("keyup", (e) => handleArrowkeypress(e, index));
		});
	}

	function closeMenu() {
		// closes the open dropdown
		notificationMenuTrigger.ariaExpanded = "false";
		// when the dropdown closes, send focus back to the trigger element
		notificationMenuTrigger.focus();
	}

	function toggleMenu() {
		// check if the dcdropdown menu is open, if it is. close it
		if (dcTrigger.ariaExpanded === "true") {
			dcToggle();
		}

		// check if the menu is open or not
		const isExpanded =
			notificationMenuTrigger.attributes["aria-expanded"].value === "true";

		// toggle the visiblity of the dropdown
		notificationDropdown.classList.toggle("display_block");

		if (isExpanded) {
			// if the dropdown was open when the button was clicked, close the dropdown
			closeMenu();
		} else {
			// if the menu was closed when the button was clicked, open the dropdown
			openMenu();
		}
	}

	notificationMenuTrigger.addEventListener("click", toggleMenu);

	// =============script to toggle the davi_collection menu open or close.
	// get the required elements
	const dcTrigger = document.getElementById("dc");
	const dcDropdownContainer = document.getElementById("dc_dropdown");
	const dcDropdownActionableItems =
		dcDropdownContainer.querySelectorAll('[role="menuitem"]');

	function handleDcMenuKeyup(e) {
		if (e.key === "Escape") {
			dcToggle();
		}
	}

	function hanleDcArrowKeyup(e, index) {
		// check if user on the last item in the nodelist
		const isLastItem = index === dcDropdownActionableItems.length - 1;
		const isFirstItem = index === 0;

		const nextItem = dcDropdownActionableItems.item(
			index + 1
		); /* recall that we have a function that autofocuses on the first node item when the dropdown is opened, so, when dropdown opens the index is 1, to move to the next index we just add 1 to the current index*/

		const prevItem = dcDropdownActionableItems.item(index - 1);

		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			// check if user is at the last item in the node list, if yes, put focus on the first item
			if (isLastItem) {
				dcDropdownActionableItems.item(0).focus();
				return;
			}

			// put focus on the nextItem
			nextItem.focus();
		}

		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			// check if user is at the first item in the node list, if yes, put focus on the last item
			if (isFirstItem) {
				dcDropdownActionableItems
					.item(dcDropdownActionableItems.length - 1)
					.focus();
				return;
			}

			// put focus on the prevItem
			prevItem.focus();
		}
	}

	function closeDcMenu() {
		// set the value of the aria expanded
		dcTrigger.ariaExpanded = "false";
		// return focus to the trigger element
		dcTrigger.focus();
	}

	function openDcMenu() {
		// set the value of the aria expanded
		dcTrigger.ariaExpanded = "true";
		// return focus to the first element
		dcDropdownActionableItems.item(0).focus();

		// when user presses escape, close the dropdown
		dcDropdownContainer.addEventListener("keyup", handleDcMenuKeyup);

		// when the dropdown is open, add an event listener to all the actionable items to listen for a keypress/keyup event
		dcDropdownActionableItems.forEach((item, index) => {
			item.addEventListener("keyup", (e) => {
				hanleDcArrowKeyup(e, index);
			});
		});
	}

	function dcToggle() {
		// check the aria-expanded of the notification, if true, call the toggle menu
		if (notificationMenuTrigger.ariaExpanded === "true") {
			toggleMenu();
		}

		// onclick of the button, toggle the class
		dcDropdownContainer.classList.toggle("display_block");

		// check if the aria expanded is open or not
		const isAriaExpanded =
			dcTrigger.attributes["aria-expanded"].value === "true";

		// if the aria expanded id true, call the function to close the menu, else do the opposite
		if (isAriaExpanded) {
			closeDcMenu();
		} else {
			openDcMenu();
		}
	}

	dcTrigger.addEventListener("click", dcToggle);

	// =================script to help cancel subscription===========
	const cancelIcon = document.getElementById("cancel_icon");
	const plan = document.getElementById("plan");
	cancelIcon.addEventListener("click", function () {
		plan.classList.toggle("hidden");
	});

	// ==================script for onboarding control
	const onBoardingControl = document.getElementById("onboarding_control");
	const onBoardingControlIcons = onBoardingControl.querySelectorAll("svg");
	const onBoardingDropdown = document.getElementById("onboarding_dropdown");

	onBoardingControl.addEventListener("click", function () {
		onBoardingDropdown.classList.toggle("hidden");
		onBoardingControlIcons.forEach((item) => {
			item.classList.toggle("hidden");
		});
	});

	// ====================script to handle animation on check
	// get the desired elements
	const checkboxButton = document.querySelectorAll("#checkbox");
	const markAsDone = "done";
	const hidden = "hidden";
	const progressBar = document.getElementById("progress_bar");
	const amountDone = document.getElementById("amount_done");
	let NumberOfCompleteditems = [];
	const checkboxStatus = document.querySelectorAll("#aria_live");
	console.log(checkboxStatus);

	function handleDone(
		item,
		index,
		notCompletedCheckbox,
		loadingCheckbox,
		completedCheckbox
	) {
		const indexNumber = index + 1;
		notCompletedCheckbox.classList.add(hidden);
		loadingCheckbox.classList.remove(hidden);
		checkboxStatus.item(index).ariaLabel = "Loading, please wait.";
		setTimeout(() => {
			loadingCheckbox.classList.add(hidden);
			completedCheckbox.classList.remove(hidden);
			item.ariaLabel = item.ariaLabel.replace("as done", "as not done");
			item.classList.add(markAsDone);
			checkboxStatus.item(index).ariaLabel = "Successful.";
			NumberOfCompleteditems.push(item);
			amountDone.textContent = NumberOfCompleteditems.length;
			let progressWidth =
				(NumberOfCompleteditems.length / checkboxButton.length) * 100;
			progressBar.style.width = `${progressWidth}%`;

			// send focus to the next checkbox on the list
			if (indexNumber < checkboxButton.length) {
				checkboxButton.item(indexNumber).focus();
			} else {
				checkboxButton.item(0).focus();
			}
		}, 500);
	}

	function handleNotDone(
		item,
		notCompletedCheckbox,
		loadingCheckbox,
		completedCheckbox
	) {
		completedCheckbox.classList.add(hidden);
		loadingCheckbox.classList.remove(hidden);
		checkboxStatus.item(index).ariaLabel = "Loading, please wait.";
		setTimeout(() => {
			loadingCheckbox.classList.add(hidden);
			notCompletedCheckbox.classList.remove(hidden);
			item.ariaLabel = item.ariaLabel.replace("as not done", "as done");
			item.classList.remove(markAsDone);
			checkboxStatus.item(index).ariaLabel = "Successful.";
			NumberOfCompleteditems.pop();
			amountDone.textContent = NumberOfCompleteditems.length;
			let progressWidth =
				(NumberOfCompleteditems.length / checkboxButton.length) * 100;
			progressBar.style.width = `${progressWidth}%`;
		}, 500);
	}

	function handleDoneOrNot(
		item,
		index,
		notCompletedCheckbox,
		loadingCheckbox,
		completedCheckbox
	) {
		const doneOrNot = item.classList.contains(markAsDone);
		if (doneOrNot) {
			handleNotDone(
				item,
				notCompletedCheckbox,
				loadingCheckbox,
				completedCheckbox
			);
		} else {
			handleDone(
				item,
				index,
				notCompletedCheckbox,
				loadingCheckbox,
				completedCheckbox
			);
		}
	}

	checkboxButton.forEach((item, index) => {
		const notCompletedCheckbox = item.querySelector("#dashed_icon");
		const loadingCheckbox = item.querySelector("#spinner_icon");
		const completedCheckbox = item.querySelector("#checked_icon");

		// add an event listener to the item
		item.addEventListener("click", function () {
			handleDoneOrNot(
				item,
				index,
				notCompletedCheckbox,
				loadingCheckbox,
				completedCheckbox
			);
		});
	});
}

app();
