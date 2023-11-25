function app() {
	// =============script to toggle the navigation menu open or close.
	const navigationMenuTrigger = document.getElementById("notification_menu");
	const navigationDropdown = document.getElementById("notification_dropdown");
	const navigationActionableItems =
		navigationDropdown.querySelectorAll("[role='menuitem']");

	function handleMenuKeypress(e) {
		if (e.key === "Escape") {
			toggleMenu();
		}
	}

	function handleArrowkeypress(e, index) {
		// check if user on the last item in the nodelist
		const isLastItem = index === navigationActionableItems.length - 1;
		const isFirstItem = index === 0;

		const nextItem = navigationActionableItems.item(
			index + 1
		); /* recall that we have a function that autofocuses on the first node item when the dropdown is opened, so, when dropdown opens the index is 1, to move to the next index we just add 1 to the current index*/

		const prevItem = navigationActionableItems.item(index - 1);

		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			// check if user is at the last item in the node list, if yes, put focus on the first item
			if (isLastItem) {
				navigationActionableItems.item(0).focus();
				return;
			}

			// put focus on the nextItem
			nextItem.focus();
		}

		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			// check if user is at the first item in the node list, if yes, put focus on the last item
			if (isFirstItem) {
				navigationActionableItems
					.item(navigationActionableItems.length - 1)
					.focus();
				return;
			}

			// put focus on the prevItem
			prevItem.focus();
		}
	}

	function openMenu() {
		// opens the closed dropdown
		navigationMenuTrigger.ariaExpanded = "true";
		// when the dropdown is opened, send focus to the first actionable item
		navigationActionableItems.item(0).focus();

		// add an event listener on the dropdown container
		navigationDropdown.addEventListener("keyup", handleMenuKeypress);

		// when the dropdown is open, add an event listener to all the actionable items
		navigationActionableItems.forEach((item, index) => {
			item.addEventListener("keyup", (e) => handleArrowkeypress(e, index));
		});
	}

	function closeMenu() {
		// closes the open dropdown
		navigationMenuTrigger.ariaExpanded = "false";
		// when the dropdown closes, send focus back to the trigger element
		navigationMenuTrigger.focus();
	}

	function toggleMenu() {
		// check if the menu is open or not
		const isExpanded =
			navigationMenuTrigger.attributes["aria-expanded"].value === "true";

		// toggle the visiblity of the dropdown
		navigationDropdown.classList.toggle("display_block");

		if (isExpanded) {
			// if the dropdown was open when the button was clicked, close the dropdown
			closeMenu();
		} else {
			// if the menu was closed when the button was clicked, open the dropdown
			openMenu();
		}
	}

	navigationMenuTrigger.addEventListener("click", toggleMenu);
}

app();
