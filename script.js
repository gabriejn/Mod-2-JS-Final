// Function to save data to local storage
function saveDataToLocalStorage() {
    localStorage.setItem('boxesData', JSON.stringify(boxes));
  }
  
  // Function to load data from local storage
  function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('boxesData');
    if (storedData) {
      boxes = JSON.parse(storedData);
    }
  }
  
  // Function to populate the dropdown with box names
  function populateBoxDropdown() {
    const selectBoxToAdd = document.getElementById('selectBoxToAdd');
    selectBoxToAdd.innerHTML = '<option value="" disabled selected>Select Box</option>';
  
    for (const box of boxes) {
      const option = document.createElement('option');
      option.value = box.boxId;
      option.textContent = box.boxName;
      selectBoxToAdd.appendChild(option);
    }
  }
  
  // Search results
  function displayResults(searchResults) {
    const boxContents = document.getElementById('boxContents');
    boxContents.innerHTML = '';
  
    if (searchResults.length === 0) {
      // Show the "No Results" popup
      const noResultsPopup = document.getElementById('noResultsPopup');
      noResultsPopup.style.display = 'block';
    } else {
      for (const result of searchResults) {
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('box');
  
        const boxTitle = document.createElement('h2');
        boxTitle.textContent = result.boxName;
        boxDiv.appendChild(boxTitle);
  
        const itemList = document.createElement('ul');
        result.items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          itemList.appendChild(listItem);
        });
  
        boxDiv.appendChild(itemList);
        boxContents.appendChild(boxDiv);
      }
  
      // Hide the "No Results" popup
      const noResultsPopup = document.getElementById('noResultsPopup');
      noResultsPopup.style.display = 'none';
    }
  
    // Show the box contents
    boxContents.style.display = 'block';
  }
  
  // Load data from local storage when the page loads
  window.addEventListener('load', () => {
    loadDataFromLocalStorage();
    populateBoxDropdown();
  });
  
  // Sample data structure without JSON
  let boxes = [
    { boxId: 1, boxName: 'Box 1', items: ['Item 1', 'Item 2'] },
    { boxId: 2, boxName: 'Box 2', items: ['Item A', 'Item B'] },
    // Add more boxes as needed
  ];
  
  // Function to search within all boxes
  function search(query) {
    query = query.toLowerCase();
  
    const results = [];
  
    for (const box of boxes) {
      const boxResults = {
        boxId: box.boxId,
        boxName: box.boxName,
        items: box.items.filter(item =>
          item.toLowerCase().includes(query)
        ),
      };
  
      if (boxResults.items.length > 0) {
        results.push(boxResults);
      }
    }
  
    return results;
  }
  
  // Function to display all contents within a selected box
  function displayBoxContents(boxId) {
    const selectedBox = boxes.find(box => box.boxId == boxId);
    if (selectedBox) {
      const boxContents = document.getElementById('boxContents');
      boxContents.innerHTML = '';
  
      const boxDiv = document.createElement('div');
      boxDiv.classList.add('box');
  
      const boxTitle = document.createElement('h2');
      boxTitle.textContent = selectedBox.boxName;
      boxDiv.appendChild(boxTitle);
  
      const itemList = document.createElement('ul');
      selectedBox.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        itemList.appendChild(listItem);
      });
  
      boxDiv.appendChild(itemList);
      boxContents.appendChild(boxDiv);
  
      // Show the box contents
      boxContents.style.display = 'block';
    }
  }
  
  // Event listener for the "Add" button and Enter key
  const addButton = document.getElementById('addButton');
  const itemNameInput = document.getElementById('itemNameInput');
  const selectBoxToAdd = document.getElementById('selectBoxToAdd');
  const searchInput = document.getElementById('searchInput');
  
  addButton.addEventListener('click', () => {
    addItem();
  });
  
  itemNameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  });
  
  function addItem() {
    const addBoxCheckbox = document.getElementById('addBoxCheckbox');
    const addItemCheckbox = document.getElementById('addItemCheckbox');
    const boxNameInput = document.getElementById('boxNameInput');
  
    if (addBoxCheckbox.checked) {
      const boxName = boxNameInput.value.trim();
      if (boxName !== '') {
        const newBox = {
          boxId: boxes.length + 1,
          boxName,
          items: [],
        };
        boxes.push(newBox);
        boxNameInput.value = ''; // Clear the input
        populateBoxDropdown(); // Update the dropdown
        alert(`Box "${boxName}" added successfully!`);
      } else {
        alert('Please enter a box name.');
      }
    }
  
    if (addItemCheckbox.checked) {
      const itemName = itemNameInput.value.trim();
      const selectedBoxId = selectBoxToAdd.value;
  
      if (itemName !== '' && selectedBoxId) {
        const selectedBox = boxes.find(box => box.boxId == selectedBoxId);
  
        if (selectedBox) {
          selectedBox.items.push(itemName);
          itemNameInput.value = ''; // Clear the input
          displayBoxContents(selectedBoxId); // Show contents of the selected box
          alert(`Item "${itemName}" added to "${selectedBox.boxName}" successfully!`);
        } 
      } else {
        alert('Please enter an item name and select a box.');
      }
    }
  
    // After updating your data, save it to local storage
    saveDataToLocalStorage();
  }
  
  // Event listener for showing/hiding input fields based on checkboxes
  const addBoxCheckbox = document.getElementById('addBoxCheckbox');
  const addItemCheckbox = document.getElementById('addItemCheckbox');
  const boxNameInput = document.getElementById('boxNameInput');
  
  addBoxCheckbox.addEventListener('change', () => {
    if (addBoxCheckbox.checked) {
      boxNameInput.style.display = 'inline-block';
    } else {
      boxNameInput.style.display = 'none';
    }
  });
  
  addItemCheckbox.addEventListener('change', () => {
    if (addItemCheckbox.checked) {
      boxNameInput.style.display = 'none';
      itemNameInput.style.display = 'inline-block';
      selectBoxToAdd.style.display = 'inline-block';
    } else {
      itemNameInput.style.display = 'none';
      selectBoxToAdd.style.display = 'none';
    }
  });
  

// Event listener for the search input
searchInput.addEventListener('input', () => {
    searchItems();
  });
  
  
  function searchItems() {
    const query = searchInput.value.trim();
  
    if (query !== '') {
      const searchResults = search(query);
      displayResults(searchResults);
    } else {
      displayResults([]);
    }
  }
  
  