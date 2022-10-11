const getSearchText = () => {
  const getSearchField = document.getElementById("search-field");
  const searchText = getSearchField.value;

  if (searchText === "") {
    Swal.fire({
      icon: "error",
      title: "Search box empty",
    });
    return;
  }

  document.getElementById("wifi-loader").classList.remove("d-none");
  loadFoodData(searchText);
  getSearchField.value = "";
};

const loadFoodData = async (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.meals == null) {
      Swal.fire({
        icon: "error",
        title: "No data found",
      });
      document.getElementById("wifi-loader").classList.add("d-none");
      document.getElementById("food-container").innerHTML = "";
      return;
    }
    displayData(data.meals);
  } catch (error) {
    // console.log(error);
  }
};

const displayData = (meals) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
         <div class="card h-100 shadow-lg p-1 mb-5 bg-body rounded border-0">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text fw-bold">
                  ${meal.strIngredient1}, ${meal.strIngredient2}
                </p>
                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onclick="getMealDetails(${meal.idMeal})"
                >
                  See Details
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                        
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body" id="m-body"></div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
        `;
    foodContainer.appendChild(div);

    document.getElementById("wifi-loader").classList.add("d-none");
  });
};

const getMealDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.meals[0]);
  } catch (error) {
    // console.log(error)
  }
};

const displayDetails = (details) => {
  //   console.log(strInstructions);
  const title = document.getElementById("exampleModalLabel");
  title.innerText = details.strMeal;
  const mBody = document.getElementById("m-body");
  const div = document.createElement("div");
  div.innerHTML = `
        <p> <span class="fw-bold">Instructions:</span> ${details.strInstructions}</p>
    `;
  mBody.appendChild(div);
};

loadFoodData("");
