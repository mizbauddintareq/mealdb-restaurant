const getSearchText = () => {
  const getSearchField = document.getElementById("search-field");
  const searchText = getSearchField.value;
  loadFoodData(searchText);
  getSearchField.value = "";
};

const loadFoodData = async (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    // console.log(error);
  }
};

loadFoodData("b");
