const parts = document.querySelector(".js-names"),
    imgs = document.querySelector(".js-img-all"),
    adjusts = document.querySelector(".js-adjusts"),
    subTitle = document.querySelector(".js-subtitle"),
    btn = document.querySelector(".js-button"),
    modalBack = document.querySelector(".js-modal"),
    modal = document.querySelector(".js-data");




// 셀렉트에 목록 출력
const filterPart = edu.map(d=> d.part);
const filterSet = new Set(filterPart);
filterSet.forEach(v => {
    const option = `<option>${v}</option>`;
    parts.insertAdjacentHTML("beforeend", option);
});

// 셀렉트 박스에서 항목을 선택할 때마다
parts.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    let result = edu.filter(d => d.part == selectedValue && d.role == 0);
    let result2 = edu.filter(d =>d.part == selectedValue && d.role == 1);
    let result3 = edu.filter(d =>d.part == selectedValue && d.role == 2);
    deleteTags(".edu-pics");
    deleteTags(".edu-btn");

    createBtn(result3, btn);
    imgListUp(result, imgs);
    subTitle.classList.remove("view");
    imgListUp(result2, adjusts);
});

// 이미지를 클릭하면 컴포지션 구조 표시
imgs.addEventListener("click", (e) => {
    if (e.target!= imgs){
        replacecImg(edu, e.target);
    }
}); 
// 이미지를 클릭하면 컴포지션 구조 표시
adjusts.addEventListener("click", (e) => {
    if (e.target!= imgs){
        replacecImg(edu, e.target);
    }
}); 

// 모달창 열기
btn.addEventListener("click", (e) =>{
    if(e.target != btn) {
        deleteTags(".edu-explain");
        const selected = e.target;
        const result = edu.filter(d => d.id == selected.dataset.id);
        const content =
        `<div class="edu-explain">
        <div class="box btwn"> <div class="fontF">${result[0].name}</div>
        <span class="close">×</span><div>
        <div>${result[0].explain}</div>
        <img src="${result[0].img}"/>
        </div>`
        
        console.log(result);
        modalBack.classList.toggle("view");
        modalBack.classList.add(result[0].color);
        modal.insertAdjacentHTML("beforeend", content);
    } 

});

// 모달창 닫기
modalBack.addEventListener("click",() => {
    modalBack.classList.toggle("view");
});


// 이미지 바꾸기
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
// 이미지 생성
function imgListUp(arr, pos) {
    arr.forEach(v => {
        const imgDiv =
        `<div class="edu-pics">
        <div class="edu-pic" data-id="${v.id}" 
        style="background-image:url('${v.img}');"></div></div>`
        pos.insertAdjacentHTML("beforeend", imgDiv);
    });
}
// 버튼 생성
function createBtn(arr,pos) {
    arr.forEach(v => {
        const btnTag = document.createElement("button");
        btnTag.classList.add("fonF", "edu-btn", v.color);
        btnTag.innerText = v.name;
        btnTag.dataset.id = v.id;
        pos.appendChild(btnTag);
    });
}
// 데이터 비우기
function deleteTags(tags) {
    let check = document.querySelectorAll(tags)
    if (check) {
        check.forEach(v => v.remove());
    }
}

