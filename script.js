const list = document.querySelector("#list");
const pagination = document.querySelector("#pagination");
const pageselect = document.querySelector("#itemperpage");


let data = [];
let itemperpage = parseInt(pageselect.value);
let currentpage = 1;

for (let i = 0; i < 100; i++) {
    data.push(`Item${i + 1}`);
}

// let totalbtn = Math.ceil(data.length / itemperpage);

displaydata();


pagination.addEventListener('click', (event) => {
    if (event.target.classList.contains('prev')) {
        if (currentpage > 1) currentpage--;
    }
    else if (event.target.classList.contains('next')) {
        let totalbtn = Math.ceil(data.length / itemperpage);
        if (currentpage < totalbtn) currentpage++;
    }
    else if (event.target.tagName === 'BUTTON') {
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

    let backward = document.createElement('button');
    backward.textContent = "<";
    backward.classList.add('pagination', 'prev');
    pagination.appendChild(backward);


    // for (let i = 1; i <= totalbtn; i++) {
    //     if (
    //         i === 1 ||                              // always show first
    //         i === totalbtn ||                       // always show last
    //         i === currentpage ||                    // always show current
    //         i === currentpage - 1 ||                // show one before current
    //         i === currentpage + 1                   // show one after current
    //     ) {
    //         let pagelink = document.createElement('button');
    //         pagelink.textContent = i;
    //         pagelink.classList.add('pagination');
    //         if (i == currentpage) {
    //             pagelink.classList.add('active');
    //         }
    //         pagination.appendChild(pagelink);
    //     }
    //     else {
    //         let dots = document.createElement('button');
    //         dots.textContent = "...";
    //         dots.classList.add('pagination', 'dots');
    //         pagination.appendChild(dots);
    //     }
    // }

    // for (let i = 1; i <= totalbtn; i++) {
    //     let pagelink = document.createElement('button');
    //     pagelink.textContent = i;
    //     pagelink.classList.add('pagination');
    //     if (i == currentpage) {
    //         pagelink.classList.add('active');
    //     }
    //     pagination.appendChild(pagelink);
    // }

    let dotsAddedBefore = false;
    let dotsAddedAfter = false;

    for (let i = 1; i <= totalbtn; i++) {
        if (
            i === 1 ||
            i === totalbtn ||
            Math.abs(i - currentpage) <= 1
        ) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('pagination');
            if (i === currentpage) btn.classList.add('active');
            pagination.appendChild(btn);
        } else {
            if (i < currentpage && !dotsAddedBefore) {
                const dots = document.createElement('button');
                dots.textContent = "...";
                dots.classList.add('pagination', 'dots');
                dots.disabled = true;
                pagination.appendChild(dots);
                dotsAddedBefore = true;
            } else if (i > currentpage && !dotsAddedAfter) {
                const dots = document.createElement('button');
                dots.textContent = "...";
                dots.classList.add('pagination', 'dots');
                dots.disabled = true;
                pagination.appendChild(dots);
                dotsAddedAfter = true;
            }
        }
    }

    let forward = document.createElement('button');
    forward.textContent = ">";
    forward.classList.add('pagination', 'next');
    pagination.appendChild(forward);

}

console.log(...pagination.children);