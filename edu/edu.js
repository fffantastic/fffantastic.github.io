const parts = document.querySelector(".js-names"),
    imgs = document.querySelector(".js-img-all"),
    adjusts = document.querySelector(".js-adjusts"),
    subTitle = document.querySelector(".js-subtitle"),
    btn = document.querySelector(".js-button");





const filterPart = edu.map(d=> d.part);
const filterSet = new Set(filterPart);
filterSet.forEach(v => {
    const option = `<option>${v}</option>`;
    parts.insertAdjacentHTML("beforeend", option);
    console.log(v);
});


parts.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    let result = edu.filter(d => d.part == selectedValue && d.role == 0);
    let result2 = edu.filter(d =>d.part == selectedValue && d.role == 1);
    deleteTags(".edu-pics");

    imgListUp(result, imgs);
    subTitle.classList.remove("view");
    imgListUp(result2, adjusts);
});

imgs.addEventListener("click",(e) => {
    console.log(e.target);
    if (e.target!= imgs){
        replacecImg(edu, e.target);
    }
}); 

adjusts.addEventListener("click",(e) => {
    if (e.target!= imgs){
        replacecImg(edu, e.target);
    }
}); 


function replacecImg(arr, target) {

    const selectOne = target;
    const result = arr.filter(d => d.id == selectOne.dataset.id);
    const imgStyle = selectOne.style.backgroundImage;

    const original = `url("${result[0].img}")`;
    const replace = `url("${result[0].decodeImg}")`;

    switch (imgStyle) {
        case original :
            selectOne.style.backgroundImage = replace;
            break;
        case replace :
            selectOne.style.backgroundImage = original;
            break;
    }
}

function imgListUp(arr, pos) {
    arr.forEach(v => {
        let imgDiv =
        `<div class="edu-pics">
        <div class="edu-pic" data-id="${v.id}" 
        style="background-image:url('${v.img}');"></div></div>`
        pos.insertAdjacentHTML("beforeend", imgDiv);
    });
}


// 데이터 비우기
function deleteTags(tags) {
    let check = document.querySelectorAll(tags)
    if (check) {
        check.forEach(v => v.remove());
    }
}
