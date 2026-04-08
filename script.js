let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let role = "";
let currentIndex = null;

recipes = recipes.filter(r => r && r.title && r.img);

function handleLogin(){
  if(username.value==="admin" && password.value==="123"){
    role="admin";
  }else{
    role="user";
  }

  loginPage.style.display="none";
  app.style.display="block";

  if(role==="admin"){
    adminPanel.style.display="block";
  }else{
    adminPanel.style.display="none";
  }

  display();
}

function logout(){
  location.reload();
}

function addRecipe(){
  let title=titleInput.value;
  let ing=ingredientsInput.value;
  let steps=stepsInput.value;
  let img=imageInput.value;

  if(!title||!img)return;

  recipes.push({title,ing,steps,img});
  save();
  display();
}

function display(list=recipes){
  recipeList.innerHTML="";
  list.forEach((r,i)=>{
    recipeList.innerHTML+=`
    <div class="recipe" onclick="openModal(${i})">
      <img src="${r.img}">
      <h3>${r.title}</h3>
    </div>`;
  });
}

function openModal(i){
  currentIndex=i;
  let r=recipes[i];

  mTitle.innerText=r.title;
  mImg.src=r.img;
  mIng.innerHTML=r.ing.replace(/\n/g,"<br>");
  mSteps.innerHTML=r.steps.replace(/\n/g,"<br>");

  modal.style.display="block";

  if(role==="admin"){
    adminBtns.style.display="flex";
  }else{
    adminBtns.style.display="none";
  }
}

function closeModal(){
  modal.style.display="none";
}

function deleteRecipe(){
  recipes.splice(currentIndex,1);
  save();
  display();
  closeModal();
}

function editRecipe(){
  let r=recipes[currentIndex];

  titleInput.value=r.title;
  ingredientsInput.value=r.ing;
  stepsInput.value=r.steps;
  imageInput.value=r.img;

  recipes.splice(currentIndex,1);
  save();
  closeModal();
}

function searchRecipe(){
  let v=searchInput.value.toLowerCase();
  let f=recipes.filter(r=>r.title.toLowerCase().includes(v));
  display(f);
}

function save(){
  localStorage.setItem("recipes",JSON.stringify(recipes));
}
