async function getImage() {
    let data = await fetch('https://picsum.photos/1280/720').then(response => { return response });
    return data.url;

}

async function displayImage() {
    await getImage().then(image => {
        var newImage = document.createElement('img');
        newImage.src = image;
        var location = document.getElementById('main');
        location.appendChild(newImage);

    })
}

async function getPost(){
    postId = Math.floor(Math.random() * 100) + 1;
    let data = await fetch('https://jsonplaceholder.typicode.com/posts/'+postId).then(response => {return response.json();});
    return data;
}

async function getUserById(userId){
    let user = await fetch('https://jsonplaceholder.typicode.com/users/'+userId).then(response => {return response.json();});
    return user;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function createArticle() {
    

    let postData = getPost().then(response => {
        return response;
    });
    postData = await postData;
    console.log(postData);
    var add = document.getElementById('addButton');
    add.disabled = true;


    var bigLocation = document.getElementById('main');
    var location = document.createElement('article');
    



    var title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = postData.title;
    location.appendChild(title);


    var list = document.createElement('ul');
    list.className = 'info__container';

    var info = document.createElement('li');
    info.innerHTML = postData.body;
    info.className = 'info__item';
    list.appendChild(info);


    var info_item = document.createElement('li');
    info_item.className = 'info__item';
    info_item.innerHTML = 'Added By';


    var author = document.createElement('span');
    author.className = 'info__mark';
    var user = await getUserById(postData.userId);
    

    author.innerHTML = user.name;
    location.setAttribute('username', user.name);
    info_item.appendChild(author);
    list.appendChild(info_item);

    var date = this.document.createElement('li');
    date.className = 'info__item';
    date.innerHTML = randomDate(new Date(2012, 0, 1), new Date());
    list.appendChild(date);

    location.appendChild(list);

    var action_container = document.createElement('div');
    action_container.className = 'actions__container';
    var buttonEdit = document.createElement('button');
    buttonEdit.type = 'button';
    buttonEdit.className = 'actions__btn';
    buttonEdit.innerHTML = 'Edit';

    var buttonDelete = document.createElement('button');
    buttonDelete.type = 'button';
    buttonDelete.className = 'actions__btn';
    buttonDelete.innerHTML = 'Delete';

    action_container.appendChild(buttonEdit);
    action_container.appendChild(buttonDelete);

    location.append(action_container);

    // <img src="bike.jpg" alt="Bike"></img>
    var articleImage = document.createElement('img');
    getImage().then(image => {
        articleImage.src = image;
    });
    articleImage.alt = 'picture';

    var content_container = document.createElement('div');
    content_container.className = 'content__container';

    var lorem = document.createElement('div');
    lorem.setAttribute('data-lorem', '2p');
    content_container.appendChild(lorem);
    location.appendChild(content_container);

    location.appendChild(articleImage);
    bigLocation.appendChild(location);
    add.disabled = false; 
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
    }))


}
async function getAllUsers(){
    let users = fetch('https://jsonplaceholder.typicode.com/users/').then(response =>{
        users = response.json();
        return users;
    });
    return users;

}
async function createSelect(){  
    
    let location = document.getElementById('main');
    let users = await getAllUsers();
    console.log(users);
    let dropdown = document.createElement('select');
    dropdown.name = 'users';
    dropdown.id = 'users';
    for(const user of users){
        var option = document.createElement('option');
        option.value=user.name;
        option.text = user.name;
        dropdown.appendChild(option);
    }
    location.appendChild(dropdown);

    let button = document.createElement('button');
    button.onclick = filterUsername;
    button.id = 'filterButton';
    button.innerHTML = 'filter';
    location.appendChild(button);

}

function filterUsername(){

    let articles = document.getElementsByTagName('article');
    //intai afisez toate articolele in caz ca a fost o filtrare anterioara
    for(var i = 0; i<articles.length;i++){
        articles[i].style.removeProperty('display');
    }

    let dropdown = document.getElementById('users');
    console.log(articles);
    console.log(articles[0].getAttribute('username'));
    for(var i = 0; i<articles.length;i++){
        console.log(articles[i]);
        if(articles[i].getAttribute('username') != dropdown.value)
           articles[i].style.display = "none";
    }
    console.log(articles);
}

document.addEventListener("DOMContentLoaded", function () {
    if(document.getElementById('users') == null)
        createSelect();
  });




