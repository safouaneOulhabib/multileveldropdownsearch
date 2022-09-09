   // Variables declaration
   let typingTimer;
   let searchInput = document.querySelector("#searchInput");
   let sectionOne = document.querySelector(".dropdown-section-1");
   let sectionTwo = document.querySelector(".dropdown-section-2");
   let dropdownMenu = document.querySelector(".dropdown-menu");

   function handleSearchInputKeyUp(event) {
       showSpinner();
       let keyword = event.target.value;
       clearTimeout(typingTimer);
       if (keyword) {
           typingTimer = setTimeout(`getSectionOneData('${keyword}')`, 2000);
       } else {
           hideSpinner();
           dropdownMenu.classList.remove("d-block");
       }

   }

   function showSpinner() {
       let spinner = document.querySelector(".spinner-border");
       if (spinner.classList.contains("d-none")) {
           spinner.classList.remove("d-none")
           spinner.classList.add("d-block");
       }
   }

   function hideSpinner() {
       let spinner = document.querySelector(".spinner-border");
       if (spinner.classList.contains("d-block")) {
           spinner.classList.remove("d-block")
           spinner.classList.add("d-none");
       }
   }

   function getSectionOneData(keyword) {
       hideSpinner();
       sectionTwo.innerHTML = "";
       sectionOne.innerHTML = "";

       for (let i = 1; i < 31; i++) {
           sectionOne.innerHTML += `<a class="dropdown-item" href="#" onclick="handleSectionOneItemClick(event)">${keyword} - ${i}</a>`;
       }
       dropdownMenu.classList.add("d-block");
   }

   function getSectionTwoData(keyword) {
       return new Promise((resolve, reject) => {
           sectionTwo.innerHTML = "";
           for (let i = 1; i < 31; i++) {
               sectionTwo.innerHTML += `<a class="dropdown-item" href="#" onclick="handleSectionTwoItemClick(event)" >Article - ${i}</a>`;
           }
           resolve();
       });
   }

   function deactivateSectionOneDropdownItems() {
       return new Promise((resolve, reject) => {

           let sectionOneDropdownItems = sectionOne.children;

           Array.from(sectionOneDropdownItems).forEach((dropdownItem) => {
               dropdownItem.classList.remove("active");
           });
           resolve();
       });
   }

   function deactivateSectionTwoDropdownItems() {
       return new Promise((resolve, reject) => {

           let sectionTwoDropdownItems = sectionTwo.children;

           Array.from(sectionTwoDropdownItems).forEach((dropdownItem) => {
               dropdownItem.classList.remove("active");
           });
           resolve();
       });
   }

   function activateSectionOneItem(event) {
       deactivateSectionOneDropdownItems().then(() => {
           event.target.classList.add("active");
       })
   }

   function activateSectionTwoItem(event) {
       deactivateSectionTwoDropdownItems().then(() => {
           event.target.classList.add("active");
       })
   }

   function handleSectionOneItemClick(event) {
       showSpinner();
       activateSectionOneItem(event);
       let keyword = event.target.innerHTML;
       getSectionTwoData(keyword).then(() => {
           hideSpinner();
       });
   }


   function handleSectionTwoItemClick(event) {
       activateSectionTwoItem(event);
       let keyword = event.target.innerHTML;
       searchInput.value = keyword;
   }