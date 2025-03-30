const list = document.querySelector("#list");
const pagination = document.querySelector("#pagination");
const pageselect = document.querySelector("#itemperpage");


let data = [];
let itemperpage = parseInt(pageselect.value);
let currentpage = 1;

for (let i = 0; i < 20; i++) {
    data.push(`Item${i + 1}`);
}

// let totalbtn = Math.ceil(data.length / itemperpage);

displaydata();


pagination.addEventListener('click', (event) => {
    if(event.target.classList.contains('prev')){
        if (currentpage > 1) currentpage--;
    }
    else if(event.target.classList.contains('next')){
        let totalbtn = Math.ceil(data.length / itemperpage);
        if (currentpage < totalbtn) currentpage++;
    }
    else if (event.target.tagName === 'A') {
        currentpage = event.target.textContent;
    }
    displaydata();
})

pageselect.addEventListener('change', (event) => {
    itemperpage = parseInt(event.target.value);
    currentpage = 1;
    displaydata();
})


function displaydata() {
    let startindex = (currentpage - 1) * itemperpage;
    let endindex = startindex + itemperpage;
    let datatoshow = data.slice(startindex, endindex);

    list.innerHTML = "";
    pagination.innerHTML = "";

    datatoshow.forEach((value, index) => {
        let listitem = document.createElement("li");
        listitem.textContent = value;
        listitem.classList.add("list");
        list.appendChild(listitem);
    })

    let totalbtn = Math.ceil(data.length / itemperpage);

    let backward = document.createElement('a');
    backward.textContent = "\u00AB";
    backward.classList.add('pagination', 'prev');
    pagination.appendChild(backward);

    for (let i = 1; i <= totalbtn; i++) {
        let pagelink = document.createElement('a');
        pagelink.textContent = i;
        if (i == currentpage) {
            pagelink.classList.add('pagination', 'active');
        }
        else {
            pagelink.classList.add('pagination');
        }
        pagination.appendChild(pagelink);
    }

    let forward = document.createElement('a');
    forward.textContent = "\u00BB";
    forward.classList.add('pagination' , 'next');
    pagination.appendChild(forward);

}